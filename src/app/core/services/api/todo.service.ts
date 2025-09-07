// app/services/api/todo.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.production';
import { ISearch, ITodo, ITodoRequest } from '../../../shared/models/todo-models/todo-models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly API_URL = environment.apiUrl;
  private readonly VERSION = 'v1';
  private readonly TODOS = 'todos';

  constructor(private readonly http: HttpClient) {}

  getTodos(
    page: number = 1,
    perPage: number = 10,
    filters: { title?: string; isCompleted?: boolean } = {}
  ) {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('perPage', perPage.toString());
    if (filters.isCompleted !== undefined) {
      params.append('isCompleted', filters.isCompleted.toString());
    }

    if (filters.title !== undefined) {
      params.append('title', filters.title);
    }

    return this.http.get<ISearch<ITodo>>(
      `${this.API_URL}/${this.VERSION}/${this.TODOS}?${params.toString()}`
    );
  }

  createTodo(data: ITodoRequest) {
    return this.http.post(`${this.API_URL}/${this.VERSION}/${this.TODOS}`, data);
  }

  updateTodo(data: ITodo) {
    return this.http.put(`${this.API_URL}/${this.VERSION}/${this.TODOS}/${data.id}`, data);
  }

  deleteTodo(id: string) {
    return this.http.delete(`${this.API_URL}/${this.VERSION}/${this.TODOS}/${id}`);
  }
}
