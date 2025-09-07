import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todos',
    loadComponent: () => import('./domain/todo-list/todo-list').then((m) => m.TodoList),
  },
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: '**', redirectTo: 'todos' },
];
