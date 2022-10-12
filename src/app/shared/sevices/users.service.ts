import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
 })
export class UsersService {

  constructor(public http: HttpClient) { }

  getUsers(token: string): Observable<User[]> {
    const headers = new HttpHeaders().set( "X-Token", token);
    return this.http.get<User[]>(environment.api.getUsers, {headers});
  }
}
