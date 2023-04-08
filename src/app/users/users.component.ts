import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  action?: any;

  constructor(private dialog: MatDialog) { }

  create(): void {
    this.openDialog();
  }

  edit(user: User) {
    this.openDialog(user);
  }

  private openDialog(user?: User): void {
    const dialogRef = this.dialog.open(UserRegistrationComponent, {
      width: '600px',
      autoFocus: false,
      data: { user: user },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe({
      next: (value) => { this.action = value },
      error: (error) => console.log(error)
    });
  }

}
