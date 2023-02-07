import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HeroesModule } from './heroes/heroes.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,

    // Feature
    DashboardModule,
    HeroesModule,

    // App
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
