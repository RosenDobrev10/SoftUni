import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IPlayer } from 'src/app/core/interfaces/Player';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  player!: IPlayer;
  subscribe$!: Subscription;
  errorMessage!: string;

  constructor(
    private playerService: PlayerService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Edit');
    const playerId = this.route.snapshot.params['playerId'];
    this.subscribe$ = this.playerService.getPlayerById(playerId).subscribe({
      next: (playerData) => this.player = playerData,
      error: (error) => this.errorMessage = error.error.message
    });
  }

  onEditHandler(formData: NgForm) {
    const playerId = this.route.snapshot.params['playerId'];
    
    this.subscribe$ = this.playerService.editPlayer(playerId, formData.value).subscribe({
      error: (err) => this.errorMessage = err.error.message,
      complete: () => this.router.navigate([ '/players', 'details', `${playerId}`])
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe$ != undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}
