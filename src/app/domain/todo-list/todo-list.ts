// src/app/domain/todo-list/todo-list.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ITodo, ITodoRequest } from '../../shared/models/todo-models/todo-models';
import { TodoCreate } from './components/todo-create/todo-create';
import { Todo } from './components/todo/todo';
import { TodoListService } from './service/todo-list.service';

@Component({
  selector: 'app-todo-list',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    Todo,
    TodoCreate,
    Card,
    SelectModule,
    InputGroupModule,
    InputGroupAddonModule,
    IftaLabelModule,
  ],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {
  newTodoText = '';
  currentPage = 1;
  perPage = 10;
  totalPages = 1;

  filterTitle: string = '';
  filterStatus: boolean | undefined = undefined;

  statusOptions = [
    { label: 'Todos', value: undefined },
    { label: 'Completo', value: true },
    { label: 'Incompleto', value: false },
  ];

  constructor(private readonly todoListHandle: TodoListService) {}

  ngOnInit(): void {
    this.todoListHandle.loadTodos();
  }

  loadTodos(page: number) {
    this.currentPage = page;

    const isCompleted = this.filterStatus === undefined ? undefined : this.filterStatus;

    this.todoListHandle.loadTodos(page, this.perPage, {
      title: this.filterTitle,
      isCompleted: isCompleted,
    });

    this.todoListHandle.todos$$.subscribe((result) => {
      if (result?.paging) {
        this.totalPages = result.paging.pages;
        this.currentPage = result.paging.currentPage;
      }
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadTodos(page);
  }

  addTodo(title: string) {
    if (!title.trim()) return;

    const newTodo: ITodoRequest = {
      title: title.trim(),
      isCompleted: false,
      editing: false,
    };

    this.todoListHandle.addTodoService(newTodo);
  }

  onDeleteTodo(id: string) {
    this.todoListHandle.deleteTodo(id);
  }

  onToggleEdit(todo: ITodo) {
    todo.editing = true;
  }

  onSaveEdit(todo: { todo: ITodo; event: any }) {
    todo.todo.title = todo.event.target.value;
    this.todoListHandle.updateTodo(todo.todo);
  }

  onCancelEdit(todo: ITodo) {
    todo.editing = false;
  }

  onToggleComplete(todo: ITodo) {
    this.todoListHandle.updateTodo(todo);
  }

  get todos$() {
    return this.todoListHandle.todos$$;
  }
}
