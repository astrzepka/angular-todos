import { Injectable } from '@angular/core';

import {User} from '../models/user';
import {USERS} from '../../mock-users';
import {filter} from 'lodash';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

  private userListURL = 'https://jsonplaceholder.typicode.com/users';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userListURL);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.userListURL}/${id}`);
  }

  findUsers(name: string): User[] {
    return filter(USERS, user => {
      if (user.username.match(new RegExp(name, 'i'))) {
        return user.id;
      }
    });
  }

}
