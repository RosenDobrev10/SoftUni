import { Injectable } from '@angular/core';

import { IUser } from 'src/app/core/interfaces/User';
import { CONSTANTS } from '../environments/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  getUserData(): IUser | null {
    const token = localStorage.getItem(CONSTANTS.userData);
    if (token) {
      return JSON.parse(token);
    }
    return null;
  }

  setUserData(data: IUser): void {
    localStorage.setItem(CONSTANTS.userData, JSON.stringify(data));
  }

  clearUserData(): void {
    localStorage.removeItem(CONSTANTS.userData);
  }

  get isLogged(): boolean {
    return localStorage.getItem(CONSTANTS.userData) ? true : false;
  }
}
