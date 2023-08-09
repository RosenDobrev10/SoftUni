import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { isLoggedGuard } from '../../core/guards/is-logged.guard';
import { isGuestGuard } from '../../core/guards/is-guest.guard';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', canActivate: [isGuestGuard], component: LoginComponent },
  { path: 'register', canActivate: [isGuestGuard] , component: RegisterComponent },
  { path: 'profile', canActivate: [isLoggedGuard], component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}