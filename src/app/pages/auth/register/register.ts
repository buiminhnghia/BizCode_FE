import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  protected readonly year = new Date().getFullYear();
  protected readonly showPassword = signal(false);
  protected readonly showVerifyModal = signal(false);

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.showVerifyModal.set(true);
  }

  closeModal() {
    this.showVerifyModal.set(false);
  }
}
