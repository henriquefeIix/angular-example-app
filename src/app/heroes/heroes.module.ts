import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from '../dashboard/dashboard.module';
import { HeroesRoutingModule } from './heroes-routing.module';

@NgModule({
  declarations: [
    HeroesComponent,
    HeroDetailComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
