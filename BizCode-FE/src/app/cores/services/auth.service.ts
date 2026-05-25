import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './common/api.service';
import { API_ENDPOINT } from '../api-endpoint';
import { RegisterRequest } from '../models/auth/req-register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(ApiService);
  register(payload: RegisterRequest): Observable<any> {
    return this.apiService.post(
      API_ENDPOINT.AUTH.REGISTER,
      payload
    );
  }
}