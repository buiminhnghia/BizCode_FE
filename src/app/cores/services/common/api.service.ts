import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  baseUrl = signal(environment.apiUrl);

  get<T>(url: string, params?: Record<string, any>): Observable<T> {
    return this.http.get<T>(this.resolve(url), { params: this.buildParams(params) });
  }

  post<T>(url: string, body: unknown): Observable<T> {
    return this.http.post<T>(this.resolve(url), body);
  }

  put<T>(url: string, body: unknown): Observable<T> {
    return this.http.put<T>(this.resolve(url), body);
  }

  patch<T>(url: string, body: unknown): Observable<T> {
    return this.http.patch<T>(this.resolve(url), body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.resolve(url));
  }

  private resolve(url: string): string {
    return `${this.baseUrl().replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;
  }

  private buildParams(params?: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();

    if (!params) return httpParams;

    Object.keys(params).forEach((key) => {
      const value = params[key];

      if (value !== null && value !== undefined) {
        httpParams = httpParams.set(key, value);
      }
    });

    return httpParams;
  }
}
