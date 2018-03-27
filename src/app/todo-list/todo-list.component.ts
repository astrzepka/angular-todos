import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';


import {Todo} from '../models/todo';
import {TodoService} from '../services/todo.service';
import {UserService} from '../services/user.service';

import {PagerService} from '../services/pager.service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private userService: UserService,
    private pagerService: PagerService
  ) { }

  private filterTerm = new Subject<string>();
  private allTodos: Todo[];
  pagedTodos: any[];
  filteredTodos: Todo[];

  pager: any = {};

  ngOnInit() {
    this.getTodos();
  }

  filterList(term: string): void {
    this.filterTerm.next(term);
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => {
        this.allTodos = todos;

        this.filterTerm.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          startWith(''),
          switchMap((term: string) => {
            const userIds = this.userService.findUsers(term).map(user => user.id);
            return [this.allTodos.filter(todo => userIds.indexOf(todo.userId) > -1)];
          })
        ).subscribe(filtered => {
          this.filteredTodos = filtered;
          this.setPage(1);
        });

      });
  }

  setPage(page: number): void {
    if ( page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.filteredTodos.length, page);
    this.pagedTodos = this.filteredTodos.slice(this.pager.startIndex, this.pager.endIndex - 1);
  }
}
