import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './players/catalog/catalog.component';
import { SearchComponent } from './players/search/search.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateComponent } from './players/create/create.component';
import { DetailsComponent } from './players/details/details.component';
import { EditComponent } from './players/edit/edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    CatalogComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    CreateComponent,
    DetailsComponent,
    EditComponent,
    NotFoundComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, FormsModule, HttpClientModule],
})
export class FeaturesModule {}
