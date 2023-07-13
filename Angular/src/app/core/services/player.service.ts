import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPlayer } from '../../core/interfaces/Player';
import { CONSTANTS } from '../../core/environments/constants';
import { ENDPOINTS } from '../../core/environments/endpoints';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  getAllPlayers(): Observable<IPlayer[]> {
    const url = CONSTANTS.host + ENDPOINTS.catalog;
    return this.http.get<IPlayer[]>(url);
  }

  getPlayerById(playerId: string): Observable<IPlayer> {
    const url = CONSTANTS.host + ENDPOINTS.details(playerId);
    return this.http.get<IPlayer>(url);
  }

  createPlayer(playerData: IPlayer): Observable<IPlayer> {
    const url = CONSTANTS.host + ENDPOINTS.createPlayer;
    return this.http.post<IPlayer>(url, playerData);
  }

  editPlayer(playerId: string, playerData: IPlayer): Observable<IPlayer> {
    const url = CONSTANTS.host + ENDPOINTS.edit(playerId);
    return this.http.put<IPlayer>(url, playerData);
  }

  deletePlayerById(playerId: string): Observable<unknown> {
    const url = CONSTANTS.host + ENDPOINTS.delete(playerId);
    return this.http.delete<unknown>(url);
  }

  likePlayerById(playerId: string): Observable<unknown> {
    const url = CONSTANTS.host + ENDPOINTS.likePlayer;
    return this.http.post<unknown>(url, {playerId});
  }

  canLike(playerId: string, userId: string): Observable<number> {
    const url = CONSTANTS.host + ENDPOINTS.canLike(playerId, userId);
    return this.http.get<number>(url);
  }

  likesForPlayer(playerId: string): Observable<number> {
    const url = CONSTANTS.host + ENDPOINTS.likesForPlayer(playerId);
    return this.http.get<number>(url);
  }

  search(search: string): Observable<IPlayer[]> {
    const url = CONSTANTS.host + ENDPOINTS.search(search);
    return this.http.get<IPlayer[]>(url);
  }

  getMyPlayers(userId: string): Observable<IPlayer[]> {
    const url = CONSTANTS.host + ENDPOINTS.getMyPlayers(userId);
    return this.http.get<IPlayer[]>(url);
  }

}
