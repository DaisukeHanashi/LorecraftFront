import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./Home/home.component').then(m => m.HomeComponent)},
  { path: 'login', loadComponent: () => import('./Login/login.component').then(m => m.LoginComponent)},
  { path: 'signup', loadComponent: () => import('./Signup/signup.component').then(m => m.SignupComponent)},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];
