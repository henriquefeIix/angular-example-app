import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter } from 'rxjs';

interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit {

  genders: Gender[] = [
    { value: 'F', viewValue: 'Female' },
    { value: 'M', viewValue: 'Male' },
    { value: 'O', viewValue: 'Other' }
  ];

  form = this.fb.group({
    name: ['', { validators: [Validators.required] }],
    birthDate: ['', { validators: [Validators.required] }],
    cpf: ['', { validators: [Validators.required] }],
    gender: ['', { validators: [Validators.required] }]
  });

  @Input() user?: any;
  @Output() formValidEvent = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form.statusChanges
      .pipe(filter((s) => s === 'VALID'))
      .subscribe(() => this.onFormValid());

    this.form.patchValue({ ...this.user });
  }

  onFormValid(): void {
    this.formValidEvent.emit(this.form.value);
  }

}
