import { NgModule, inject } from '@angular/core';
import { CanActivateFn, Router, RouterModule, Routes } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { map, tap } from 'rxjs';

const authGuardFn: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService).credentials$.pipe(
    map((value) => value !== null),
    tap((value) => !value && router.navigate(['/login']))
  );
}

const loginGuardFn: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService).credentials$.pipe(
    map((value) => value === null),
    tap((value) => !value && router.navigate(['/users']))
  );
}

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [authGuardFn]
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [loginGuardFn]
  },
  {
    path: '**',
    redirectTo: 'users'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
