/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoCreate } from './todo-create';

describe('TodoCreate', () => {
  let component: TodoCreate;
  let fixture: ComponentFixture<TodoCreate>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TodoCreate],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
