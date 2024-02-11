import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { PrismaModule } from '../prisma/prisma.module'; 
import { TasksService } from './tasks.service';
import { TasksMiddleware } from './tasks.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TasksMiddleware).forRoutes('tasks');
  }
}
