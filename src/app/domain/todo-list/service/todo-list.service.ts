// src/app/domain/todo-list/service/todo-list.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoService } from '../../../core/services/api/todo.service';
import { ISearch, ITodo, ITodoRequest } from '../../../shared/models/todo-models/todo-models';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  todos$ = new BehaviorSubject<ISearch<ITodo> | undefined>(undefined);

  constructor(private readonly todoApi: TodoService) {}

  loadTodos(
    page: number = 1,
    perPage: number = 10,
    filters: { title?: string; isCompleted?: boolean } = {}
  ) {
    this.todoApi.getTodos(page, perPage, filters).subscribe((response) => {
      console.log(response);
      this.todos$.next(response);
    });
  }

  addTodoService(newTodo: ITodoRequest) {
    this.todoApi.createTodo(newTodo).subscribe((response) => {
      // notificao de sucesso
      this.loadTodos();
    });
  }

  deleteTodo(id: string) {
    this.todoApi.deleteTodo(id).subscribe(() => {
      // notificao de sucesso
      this.loadTodos();
    });
  }

  updateTodo(todo: ITodo) {
    this.todoApi.updateTodo(todo).subscribe(() => {
      // notificao de sucesso
      this.loadTodos();
    });
  }

  get todos(): ISearch<ITodo> | undefined {
    return this.todos$.value;
  }

  get todos$$() {
    return this.todos$.asObservable();
  }
}
