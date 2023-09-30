import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AggregationType {
  @Field(() => Int)
  totalTodos: number;
  @Field(() => Int)
  completedTodos: number;
  @Field(() => Int)
  uncompletedTodos: number;
  @Field(() => Int, {
    deprecationReason: 'use completedTodos instead',
  })
  totalCompleted: number;
}
