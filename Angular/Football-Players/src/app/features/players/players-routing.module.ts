import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { isLoggedGuard } from '../../core/guards/is-logged.guard';

import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', pathMatch: 'full' ,component: CatalogComponent },
  { path: 'search', component: SearchComponent },
  { path: 'add', canActivate: [isLoggedGuard], component: CreateComponent },
  { path: 'details/:playerId', component: DetailsComponent },
  { path: 'edit/:playerId', canActivate: [isLoggedGuard], component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersRoutingModule {}