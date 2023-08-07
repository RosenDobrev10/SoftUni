import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  subscribe$!: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  get isLogged(): boolean {
    return this.authService.isLogged;
  }

  get userEmail(): string {
    return this.authService.getUserData()?.email as string;
  }

  logout(): void {
    this.subscribe$ = this.userService.logout().subscribe({
      error: (error) => {
        console.error(error.message);
        this.authService.clearUserData();
        this.router.navigate(['/']);
      },
      complete: () => {
        this.authService.clearUserData();
        this.router.navigate(['/']);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe$ != undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}
