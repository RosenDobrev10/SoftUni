import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersRoutingModule } from './players-routing.module';

import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [CatalogComponent, CreateComponent, DetailsComponent, EditComponent, SearchComponent],
  imports: [CommonModule, RouterModule, FormsModule, SharedModule, PlayersRoutingModule],
  exports: [CatalogComponent, CreateComponent, DetailsComponent, EditComponent, SearchComponent],
})
export class PlayersModule {}