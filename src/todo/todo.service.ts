import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/Todo.entity';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args/';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'Piedra del alma',
      done: false,
    },
    {
      id: 2,
      description: 'Piedra del espacio',
      done: true,
    },
    {
      id: 3,
      description: 'Piedra del poder',
      done: false,
    },
    {
      id: 4,
      description: 'Piedra del tiempo',
      done: false,
    },
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.done).length;
  }

  get uncompletedTodos() {
    return this.todos.filter((todo) => !todo.done).length;
  }

  create(CreateTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = CreateTodoInput.description;
    todo.done = false;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    this.todos.push(todo);
    return todo;
  }

  findAll(status: StatusArgs): Todo[] {
    if (status.status !== undefined) {
      return this.todos.filter((todo) => todo.done === status.status);
    }
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  update({ id, description, done }: UpdateTodoInput): Todo {
    const todoToUpdate = this.findOne(id);
    if (description) {
      todoToUpdate.description = description;
    }
    if (done !== undefined) {
      todoToUpdate.done = done;
    }
    this.todos = this.todos.map((todo) =>
      todo.id === id ? todoToUpdate : todo,
    );
    return todoToUpdate;
  }

  delete(id: number) {
    this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);

    return true;
  }
}
