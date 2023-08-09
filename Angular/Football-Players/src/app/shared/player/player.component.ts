import { Component, Input } from '@angular/core';

import { IPlayer } from 'src/app/core/interfaces/Player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  @Input() player!: IPlayer
}
