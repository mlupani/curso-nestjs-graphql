import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/Todo.entity';
import { TodoService } from './todo.service';
import { UpdateTodoInput, CreateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args/';
import { AggregationType } from './types/aggregation.type';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], {
    name: 'todos',
    description: 'retorna una lista de todos',
  })
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, {
    name: 'todo',
    description: 'retorna un todo',
  })
  findOne(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, {
    name: 'createTodo',
  })
  createTodo(@Args('CreateTodoInput') createTodoInput: CreateTodoInput): Todo {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, {
    name: 'updateTodo',
  })
  updateTodo(@Args('updateTodoImput') updateTodoInput: UpdateTodoInput): Todo {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Boolean)
  deleteTodo(@Args('id', { type: () => Int }) id: number): boolean {
    return this.todoService.delete(id);
  }

  //agregations
  @Query(() => Int)
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => Int)
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => Int)
  uncompletedTodos(): number {
    return this.todoService.uncompletedTodos;
  }

  @Query(() => AggregationType)
  aggregations(): AggregationType {
    return {
      totalTodos: this.todoService.totalTodos,
      completedTodos: this.todoService.completedTodos,
      uncompletedTodos: this.todoService.uncompletedTodos,
      totalCompleted: this.todoService.totalTodos,
    };
  }
}
