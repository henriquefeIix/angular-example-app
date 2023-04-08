import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { filter } from 'rxjs';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  roles: Role[] = [
    { value: 'A', viewValue: 'Administrator' },
    { value: 'C', viewValue: 'Consumer' }
  ];

  form = this.fb.group({
    role: ['', { validators: [Validators.required] }],
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required, Validators.minLength(4)] }],
    confirmation: ['', { validators: [Validators.required, Validators.minLength(4)] }]
  });

  @Input() user?: any;
  @Output() formValidEvent = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form.statusChanges
      .pipe(filter((s) => s === 'VALID'))
      .subscribe(() => this.onFormValid());

    const fields = ['password', 'confirmation'];

    if (this.user) {
      delete this.user.password;
      this.form.patchValue({ ...this.user });
      this.clearValidators(fields);
    }

    fields.forEach((field) => this.form.get(field)?.reset());
  }

  onPasswordChange(): void {
    if (this.user) {
      const fields = ['password', 'confirmation'];
      if (this.form.get('password')?.value) {
        this.addValidators(fields, [Validators.required, Validators.minLength(4)]);
      } else {
        this.clearValidators(fields);
      }
    }
  }

  private addValidators(fields: string[], validators: ValidatorFn[]) {
    fields.forEach((field) => {
      this.form.get(field)?.addValidators(validators);
      this.form.get(field)?.updateValueAndValidity();
    });
  }

  private clearValidators(fields: string[]): void {
    fields.forEach((field) => {
      this.form.get(field)?.clearValidators();
      this.form.get(field)?.updateValueAndValidity();
    });
  }

  private onFormValid(): void {
    this.formValidEvent.emit(this.form.value);
  }

}
