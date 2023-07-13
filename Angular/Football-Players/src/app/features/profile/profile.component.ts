import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IPlayer } from 'src/app/core/interfaces/Player';
import { AuthService } from 'src/app/core/services/auth.service';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  players!: IPlayer[];
  subscribe$!: Subscription;
  errorMessage!: string;
  
  constructor(
    private playerService: PlayerService,
    private authService: AuthService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserData()?._id as string;
    const userEmail = this.authService.getUserData()?.email as string;
    this.titleService.setTitle(userEmail);

      this.subscribe$ = this.playerService.getMyPlayers(userId).subscribe({
        next: (players) => (this.players = players),
        error: (error) => (this.errorMessage = error.error.message),
      });
  }

  ngOnDestroy(): void {
    if (this.subscribe$ != undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}
