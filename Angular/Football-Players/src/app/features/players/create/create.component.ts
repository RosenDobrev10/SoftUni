import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {
  subscribe$!: Subscription;
  errorMessage!: string;

  constructor(
    private playerService: PlayerService,
    private titleService: Title,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Add');
  }

  onCreateHandler(formData: NgForm) {
    const userId = this.authService.getUserData()?._id;
    const userInput = formData.value;
    userInput._ownerId = userId;
    
      this.subscribe$ = this.playerService.createPlayer(userInput).subscribe({
        next: () => this.router.navigate(['/players']),
        error: (error) => this.errorMessage = error.error.message,
      });
  }

  ngOnDestroy(): void {
    if (this.subscribe$ != undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}
