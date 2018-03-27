import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Todo} from '../models/todo';
import {UserService} from './user.service';
import {switchMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {of} from 'rxjs/observable/of';
import {combineLatest} from 'rxjs/observable/combineLatest';

const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable()
export class TodoService {

  private todoListURL = 'https://jsonplaceholder.typicode.com/todos';
  constructor(
    private userService: UserService,
    private http: HttpClient
  ) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoListURL).pipe(
      switchMap(todos => {
        const userObservables = todos.map(todo => {
          return this.userService.getUserById(todo.userId);
        });
        return combineLatest(...userObservables, (...users) => {
          todos.forEach((todo, index) => {
            todo.user = users[index];
          });
          return todos;
        });

      })
    );
  }

  getTodosByUserId(id: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoListURL + `?userId=${id}`);
  }
}
