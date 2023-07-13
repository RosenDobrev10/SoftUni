import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { IPlayer } from 'src/app/core/interfaces/Player';
import { AuthService } from 'src/app/core/services/auth.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { Modal, initTE } from 'tw-elements';

@Component({
  selector: 'app-details',
  templateUrl: './details.component copy.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  player!: IPlayer;
  subscribe$!: Subscription;
  errorMessage!: string;
  isOwner!: boolean;
  isLogged!: boolean;
  userId!: string;
  canLike$!: Observable<number>;
  likes$!: Observable<number>;
  showModal: boolean = false;

  constructor(
    private playerService: PlayerService,
    private authService: AuthService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Details');
    this.isLogged = this.authService.isLogged;
    const playerId: string = this.route.snapshot.params['playerId'];
    this.userId = this.authService.getUserData()?._id as string;
    this.likes$ = this.playerService.likesForPlayer(playerId);
    this.canLike$ = this.playerService.canLike(playerId, this.userId);
    initTE({ Modal });
    
    this.subscribe$ = this.playerService.getPlayerById(playerId).subscribe({
      next: (playerData) => {
        this.player = playerData;
        this.titleService.setTitle(this.player.name);
        this.isOwner = playerData._ownerId == this.userId;
      },
      error: (error) => this.errorMessage = error.error.message
    });
  }

  deletePlayer(playerId: string) {
      this.subscribe$ = this.playerService.deletePlayerById(playerId).subscribe({
        error: (error) => this.errorMessage = error.error.message,
        complete: () => this.router.navigate(['players'])
      });
  }
  
  showModalFn(): void {
    this.showModal = true;
  }

  closeModalFn(): void {
    this.showModal = false;
  }


  likePlayer(playerId: string) {
    this.subscribe$ = this.playerService.likePlayerById(playerId).subscribe({
      error: (error) => this.errorMessage = error.error.message,
      complete: () => {
        this.canLike$ = this.playerService.canLike(playerId, this.userId);
        this.likes$ = this.playerService.likesForPlayer(playerId);
        this.router.navigate(['/players', 'details', playerId])
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe$ != undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}
