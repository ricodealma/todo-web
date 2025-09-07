// src/app/domain/todo-list/components/todo/todo.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ITodo } from '../../../../shared/models/todo-models/todo-models';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, InputTextModule, ButtonModule, CheckboxModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  @Input() todo: ITodo | undefined;
  @Output() deleteTodo = new EventEmitter<string>();
  @Output() toggleEdit = new EventEmitter<ITodo>();
  @Output() saveEdit = new EventEmitter<{ todo: ITodo; event: Event }>();
  @Output() cancelEdit = new EventEmitter<ITodo>();
  @Output() toggleComplete = new EventEmitter<ITodo>();
}
