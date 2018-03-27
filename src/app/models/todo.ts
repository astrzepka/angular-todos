import {User} from './user';

export class Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}
