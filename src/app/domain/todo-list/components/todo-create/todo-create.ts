// src/app/domain/todo-list/components/todo-create/todo-create.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-todo-create',
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './todo-create.html',
  styleUrl: './todo-create.css',
})
export class TodoCreate {
  @Output() addTodo = new EventEmitter<string>();

  criando: boolean = false;
  novoTexto: string = '';

  iniciarCriacao() {
    this.criando = true;
    setTimeout(() => {
      const input = document.getElementById('novo-todo-input');
      input?.focus();
    });
  }

  concluirCriacao(event: Event) {
    const valor = this.novoTexto.trim();
    if (valor) {
      this.addTodo.emit(valor);
    }
    this.resetar();
  }

  cancelarCriacao() {
    this.resetar();
  }

  private resetar() {
    this.criando = false;
    this.novoTexto = '';
  }
}
