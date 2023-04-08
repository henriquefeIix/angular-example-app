import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from './core/models/credentials.model';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'User Management';
  credentials$?: Observable<Credentials | null>;

  constructor(private authService: AuthService) {
    this.credentials$ = this.authService.credentials$;
  }

  onLogout(): void {
    this.authService.logout();
  }

}
