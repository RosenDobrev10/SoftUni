import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent, PlayerComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, LoaderComponent, PlayerComponent],
})
export class SharedModule {}
