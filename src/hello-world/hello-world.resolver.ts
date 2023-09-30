import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { name: 'hello', description: 'retorna hola mundo' })
  helloWorld() {
    return 'Hola mundo!';
  }

  @Query(() => Float, {
    name: 'randomNumber',
    description: 'retorna un numero aleatorio',
  })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'retorna un numero aleatorio entre 0 y 10',
  })
  getRandomFromZeroTo(
    @Args('to', {
      type: () => Int,
      nullable: true,
      defaultValue: 6,
    })
    to: number = 6,
  ): number {
    return Math.floor(Math.random() * to);
  }
}
