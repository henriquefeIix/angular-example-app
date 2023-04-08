import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolePipe } from './pipes/role.pipe';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    RolePipe
  ],
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  exports: [
    RolePipe,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ],
})
export class SharedModule { }
