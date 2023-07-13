import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { isLoggedGuard } from './core/guards/is-logged.guard';
import { isGuestGuard } from './core/guards/is-guest.guard';

import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/players/search/search.component';
import { CatalogComponent } from './features/players/catalog/catalog.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CreateComponent } from './features/players/create/create.component';
import { DetailsComponent } from './features/players/details/details.component';
import { EditComponent } from './features/players/edit/edit.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotFoundComponent } from './features/not-found/not-found.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'players', component: CatalogComponent },
  { path: 'login', canActivate: [isGuestGuard], component: LoginComponent },
  { path: 'register', canActivate: [isGuestGuard] , component: RegisterComponent },
  { path: 'add', canActivate: [isLoggedGuard], component: CreateComponent },
  { path: 'players/details/:playerId', component: DetailsComponent },
  { path: 'players/edit/:playerId', canActivate: [isLoggedGuard], component: EditComponent },
  { path: 'profile', canActivate: [isLoggedGuard], component: ProfileComponent },
  { path: '**', component: NotFoundComponent },
];

//TODO LAZY LOADING TO DETAILS AND EDIT 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
