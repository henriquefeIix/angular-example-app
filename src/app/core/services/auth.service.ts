import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Credentials } from '../models/credentials.model';
import { environment } from 'src/environments/environment';

export interface Login {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private credentialsSubject = new BehaviorSubject<Credentials | null>(null);
  credentials$ = this.credentialsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const item = localStorage.getItem('credentials');
    const credentials = (item) ? JSON.parse(item) : null;
    this.credentialsSubject.next(credentials);
  }

  login(login: Login): void {
    this.http.post<Credentials>(`${environment.apiUrl}/login`, login).subscribe({
      next: (value) => {
        localStorage.setItem('credentials', JSON.stringify(value));
        this.credentialsSubject.next(value);
        this.router.navigate(['/users']);
      },
      error: (error) => console.error(error)
    });
  }

  logout(): void {
    localStorage.clear();
    this.credentialsSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCredentials(): Credentials | null {
    const item = localStorage.getItem('credentials');
    return (item) ? JSON.parse(item) : null;
  }

}
