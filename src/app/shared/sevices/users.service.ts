import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.api.getUsers);
  }
}
