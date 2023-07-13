import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { IPlayer } from 'src/app/core/interfaces/Player';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  players!: IPlayer[];
  subscribe$!: Subscription;
  errorMessage!: string;
  searchTerm!: string;
  isLoading: boolean = false

  constructor(
    private playerService: PlayerService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Search');
  }

  onSearchHandler(formData: NgForm) {
    const { search } = formData.value;
    this.isLoading = true;
    
    this.subscribe$ = this.playerService.search(search).subscribe({
      next: (players) => {
        this.players = players;
        this.isLoading = false;
      },
      error: (error) => (this.errorMessage = error.error.message),
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe$ != undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}
