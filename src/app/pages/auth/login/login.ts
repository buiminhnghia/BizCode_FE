import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  protected readonly showPassword = signal(false);

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.router.navigate(['/app/thong-tin-doanh-nghiep']);
  }
}
