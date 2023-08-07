import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  imports: [CommonModule, RouterModule, FormsModule, SharedModule, AuthRoutingModule],
  exports: [LoginComponent, RegisterComponent, ProfileComponent],
})
export class AuthModule {}