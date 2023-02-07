import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <mat-card fxFlexAlign="center">
      <mat-card-title>404: Page Not Found</mat-card-title>
      <mat-card-content>We couldn't found that page! Not even with ray-x vision.</mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" routerLink="/">Take Me Home</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      :host {
        text-align: center
      }

      .mdc-card {
        padding: 50px;
      }

      .mat-mdc-card-actions {
         margin: auto;
      }
    `
  ]
})
export class PageNotFoundComponent {

}
