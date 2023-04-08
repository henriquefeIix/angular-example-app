import { AfterViewInit, Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { UserService } from 'src/app/core/services/user.service';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { Credentials } from 'src/app/core/models/credentials.model';
import { User } from 'src/app/core/models/user.model';
import { Observable } from 'rxjs';

type UserRegistration = User & { confirmation?: string };

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') private stepper!: MatStepper;

  label?: string;
  user!: UserRegistration;

  firstStep = true;
  lastStep = false;

  @ViewChild('account') accountComponent?: UserAccountComponent;

  constructor(
    private dialogRef: MatDialogRef<UserRegistrationComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data.user) {
      this.user = this.data.user;
      this.label = 'Update';
    }
  }

  ngAfterViewInit(): void {
    this.stepper.selectionChange.asObservable().subscribe((value) => {
      this.firstStep = value.selectedIndex === 0;
      this.lastStep = value.selectedIndex === this.stepper.steps.length - 1;
    });
  }

  onFormValid(data: any): void {
    this.user = { ...this.user, ...data };
  }

  save(): void {
    if (this.user.password && this.user.password !== this.user.confirmation) {
      this.accountComponent?.form.get('password')?.setErrors({ incorrect: true });
      this.accountComponent?.form.get('confirmation')?.setErrors({ incorrect: true });
    } else {
      delete this.user.confirmation;
      Object.keys(this.user).forEach((key) => !this.user[key] && delete this.user[key]);
      const action = (this.user.id) ? 'update' : 'save';
      this.sendRequest((this.user as User)).subscribe({
        next: (value) => {
          const user = ('accessToken' in value) ? value.user : value;
          this.dialogRef.close({ action, user });
        },
        error: (error) => console.error(error)
      });
    }
  }

  goBack(): void {
    this.stepper.previous();
  }

  goFoward(): void {
    this.stepper.next();
  }

  private sendRequest(user: User): Observable<User | Credentials> {
    return (user.id) ? this.userService.update(user.id, user) : this.userService.create(user);
  }

}
