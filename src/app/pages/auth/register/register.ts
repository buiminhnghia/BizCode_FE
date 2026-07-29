import { Component, OnDestroy, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

const VERIFY_REDIRECT_DELAY_MS = 3000;

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnDestroy {
  protected readonly year = new Date().getFullYear();
  protected readonly showPassword = signal(false);
  protected readonly showVerifyModal = signal(false);

  private redirectTimer?: ReturnType<typeof setTimeout>;

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.showVerifyModal.set(true);
    this.redirectTimer = setTimeout(() => {
      this.router.navigate(['/app/thong-tin-doanh-nghiep']);
    }, VERIFY_REDIRECT_DELAY_MS);
  }

  closeModal() {
    this.showVerifyModal.set(false);
    clearTimeout(this.redirectTimer);
  }

  ngOnDestroy() {
    clearTimeout(this.redirectTimer);
  }
}
