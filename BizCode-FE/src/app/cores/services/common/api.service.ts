import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  baseUrl = signal(environment.apiUrl);

  get<T>(url: string, params?: Record<string, any>): Observable<T> {
    return this.http.get<T>(`${this.baseUrl()}/${url}`, {
      params: this.buildParams(params),
    });
  }

  post<T>(url: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl()}/${url}`, body);
  }

  put<T>(url: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseUrl()}/${url}`, body);
  }

  patch<T>(url: string, body: unknown): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl()}/${url}`, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl()}/${url}`);
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