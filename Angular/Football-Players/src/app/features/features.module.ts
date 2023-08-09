import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [HomeComponent, NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class FeaturesModule {}
