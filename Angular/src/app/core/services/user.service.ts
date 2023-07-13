import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from 'src/app/core/interfaces/User';
import { CONSTANTS } from '../environments/constants';
import { ENDPOINTS } from '../environments/endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<IUser> {
    const url = CONSTANTS.host + ENDPOINTS.register;
    return this.http.post<IUser>(url, { email, password });
  }

  login(email: string, password: string): Observable<IUser> {
    const url = CONSTANTS.host + ENDPOINTS.login;
    return this.http.post<IUser>(url, { email, password });
  }

  logout(): Observable<unknown> {
    const url = CONSTANTS.host + ENDPOINTS.logout;
    return this.http.get<unknown>(url);
  }
}
