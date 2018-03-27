import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {TodoService} from './services/todo.service';
import {UserService} from './services/user.service';
import {PagerService} from './services/pager.service';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    TodoService,
    UserService,
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
