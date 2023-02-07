import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule
  ]
})
export class DashboardModule { }
