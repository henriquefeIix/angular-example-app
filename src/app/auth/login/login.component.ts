import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService, Login } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = this.fb.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required, Validators.minLength(4)] }]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login((this.form.value) as Login);
    }
  }

}
