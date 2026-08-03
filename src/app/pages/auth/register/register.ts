import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../cores/services/auth.service';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_S = 60;
const VERIFY_REDIRECT_DELAY_MS = 1200;

/** Backend tách họ tên thành FirstName (tên) và LastName (họ + đệm). */
function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { firstName: parts[0] ?? '', lastName: '' };
  return { firstName: parts[parts.length - 1], lastName: parts.slice(0, -1).join(' ') };
}

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly year = new Date().getFullYear();
  protected readonly showPassword = signal(false);
  protected readonly showVerifyModal = signal(false);
  protected readonly verifyEmail = signal('');
  protected readonly verifying = signal(false);

  protected readonly submitting = signal(false);
  protected readonly submitError = signal('');

  protected readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[\d\s.+-]{9,15}$/)]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)],
    ],
    acceptTerms: [false, Validators.requiredTrue],
  });

  protected readonly otpDigits = signal<string[]>(Array(OTP_LENGTH).fill(''));
  protected readonly otpError = signal('');
  protected readonly resendCountdown = signal(0);
  protected readonly isOtpComplete = computed(() => this.otpDigits().every((d) => d !== ''));

  private readonly otpInputs = viewChildren<ElementRef<HTMLInputElement>>('otpInput');

  private redirectTimer?: ReturnType<typeof setTimeout>;
  private resendTimer?: ReturnType<typeof setInterval>;

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.submitting()) return;

    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { fullName, email, phoneNumber, password } = this.form.getRawValue();
    const { firstName, lastName } = splitFullName(fullName);
    const trimmedEmail = email.trim();

    this.submitting.set(true);
    this.submitError.set('');

    this.authService
      .register({
        firstName,
        lastName,
        email: trimmedEmail,
        phoneNumber: phoneNumber.trim(),
        password,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.submitting.set(false);

          if (res?.isSuccess === false || res?.type === 'error') {
            this.submitError.set(res.message || 'Đăng ký không thành công. Vui lòng thử lại.');
            return;
          }

          this.openVerifyModal(trimmedEmail);
        },
        error: (err: HttpErrorResponse) => {
          this.submitting.set(false);
          this.submitError.set(this.toErrorMessage(err));
        },
      });
  }

  onOtpInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const digit = input.value.replace(/\D/g, '').slice(-1);
    input.value = digit;
    this.setDigit(index, digit);
    this.otpError.set('');

    if (digit && index < OTP_LENGTH - 1) {
      this.focusOtp(index + 1);
    }
  }

  onOtpKeydown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace' && !this.otpDigits()[index] && index > 0) {
      event.preventDefault();
      this.setDigit(index - 1, '');
      this.focusOtp(index - 1);
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusOtp(index - 1);
      return;
    }

    if (event.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      event.preventDefault();
      this.focusOtp(index + 1);
    }
  }

  onOtpPaste(event: ClipboardEvent) {
    const pasted = event.clipboardData?.getData('text').replace(/\D/g, '') ?? '';
    if (!pasted) return;

    event.preventDefault();
    const digits = pasted.slice(0, OTP_LENGTH).split('');
    const next = Array(OTP_LENGTH).fill('');
    digits.forEach((d, i) => (next[i] = d));
    this.otpDigits.set(next);
    this.syncInputValues();
    this.otpError.set('');
    this.focusOtp(Math.min(digits.length, OTP_LENGTH - 1));
  }

  onOtpFocus(event: FocusEvent) {
    (event.target as HTMLInputElement).select();
  }

  confirmOtp() {
    if (!this.isOtpComplete()) {
      this.otpError.set('Vui lòng nhập đủ 6 chữ số của mã xác thực.');
      return;
    }

    // TODO: gọi API xác thực OTP khi backend có endpoint (hiện Register đã set IsVerify = true).
    this.verifying.set(true);
    this.redirectTimer = setTimeout(() => {
      this.router.navigate(['/app/thong-tin-doanh-nghiep']);
    }, VERIFY_REDIRECT_DELAY_MS);
  }

  resendOtp() {
    if (this.resendCountdown() > 0) return;
    this.resetOtp();
    this.startResendCountdown();
    this.focusOtp(0);
  }

  closeModal() {
    this.showVerifyModal.set(false);
    this.verifying.set(false);
    this.clearTimers();
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  private openVerifyModal(email: string) {
    this.verifyEmail.set(email);
    this.resetOtp();
    this.showVerifyModal.set(true);
    this.startResendCountdown();
    setTimeout(() => this.focusOtp(0));
  }

  private toErrorMessage(err: HttpErrorResponse): string {
    if (err.status === 0) {
      return 'Không kết nối được tới máy chủ. Kiểm tra backend đã chạy và đã bật CORS chưa.';
    }

    const body = err.error as { message?: string } | string | null;
    if (typeof body === 'object' && body?.message) return body.message;

    return `Đăng ký thất bại (mã lỗi ${err.status}).`;
  }

  private setDigit(index: number, value: string) {
    this.otpDigits.update((digits) => digits.map((d, i) => (i === index ? value : d)));
    const input = this.otpInputs()[index]?.nativeElement;
    if (input) input.value = value;
  }

  private resetOtp() {
    this.otpDigits.set(Array(OTP_LENGTH).fill(''));
    this.otpError.set('');
    this.verifying.set(false);
    this.syncInputValues();
  }

  private syncInputValues() {
    this.otpInputs().forEach((ref, i) => (ref.nativeElement.value = this.otpDigits()[i]));
  }

  private focusOtp(index: number) {
    this.otpInputs()[index]?.nativeElement.focus();
  }

  private startResendCountdown() {
    clearInterval(this.resendTimer);
    this.resendCountdown.set(RESEND_COOLDOWN_S);
    this.resendTimer = setInterval(() => {
      this.resendCountdown.update((s) => s - 1);
      if (this.resendCountdown() <= 0) clearInterval(this.resendTimer);
    }, 1000);
  }

  private clearTimers() {
    clearTimeout(this.redirectTimer);
    clearInterval(this.resendTimer);
  }
}
