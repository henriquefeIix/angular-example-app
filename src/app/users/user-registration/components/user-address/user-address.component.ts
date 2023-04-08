import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddressService } from 'src/app/core/services/address.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {

  form = this.fb.group({
    code: ['', { validators: [Validators.required] }],
    address: ['', { validators: [Validators.required] }],
    number: ['', { validators: [Validators.required] }],
    city: ['', { validators: [Validators.required] }],
    state: ['', { validators: [Validators.required] }],
    district: ['', { validators: [Validators.required] }]
  });

  @Input() user?: any;
  @Output() formValidEvent = new EventEmitter();

  constructor(
    private addressService: AddressService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form.statusChanges
      .pipe(filter((s) => s === 'VALID'))
      .subscribe(() => this.onFormValid());

    this.form.patchValue({ ...this.user });
  }

  onCodeChange(): void {
    if (this.form.value.code?.length == 9) {
      const code = (this.form.value.code as string);

      this.addressService.get(code).subscribe({
        next: (value) => this.form.patchValue({ ...value }),
        error: () => this.form.reset()
      });
    }
  }

  onFormValid(): void {
    this.formValidEvent.emit(this.form.value);
  }

}
