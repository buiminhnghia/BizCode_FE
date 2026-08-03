import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINT } from '../api-endpoint';
import { RegisterRequest } from '../models/auth/req-register.model';
import { BaseResponse } from '../models/common/base-response.model';
import { ApiService } from './common/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(ApiService);

  register(payload: RegisterRequest): Observable<BaseResponse<unknown>> {
    return this.apiService.post<BaseResponse<unknown>>(API_ENDPOINT.AUTH.REGISTER, payload);
  }
}
