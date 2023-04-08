import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

import { UserAccountComponent } from './user-registration/components/user-account/user-account.component';
import { UserAddressComponent } from './user-registration/components/user-address/user-address.component';
import { UserInformationComponent } from './user-registration/components/user-information/user-information.component';

import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    title: 'User Management'
  },
]

@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    UserRegistrationComponent,
    UserAccountComponent,
    UserAddressComponent,
    UserInformationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class UsersModule { }
