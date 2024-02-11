import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TasksService', () => {
  let tasksService: TasksService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, PrismaService],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = [{ id: 1, title: 'Task 1', description: 'Description 1', userId: 1 }];
      jest.spyOn(prismaService.prisma().task, 'findMany').mockResolvedValue(result);

      expect(await tasksService.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a task by ID', async () => {
      const result = { id: 1, title: 'Task 1', description: 'Description 1', userId: 1 };
      jest.spyOn(prismaService.prisma().task, 'findUnique').mockResolvedValue(result);

      expect(await tasksService.findOne(1)).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const taskData = { title: 'New Task', description: 'Description', userId: 1 };
      const result = { id: 2, ...taskData };
      jest.spyOn(prismaService.prisma().task, 'create').mockResolvedValue(result);

      expect(await tasksService.create(taskData.title, taskData.description, taskData.userId)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update a task by ID', async () => {
      const taskData = { title: 'Updated Task', description: 'Updated Description', userId: 1 };
      const result = { id: 1, ...taskData };
      jest.spyOn(prismaService.prisma().task, 'update').mockResolvedValue(result);

      expect(await tasksService.update(1, taskData.title, taskData.description)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should remove a task by ID', async () => {
      jest.spyOn(prismaService.prisma().task, 'delete').mockResolvedValue({ id: 1, title: 'Task 1', description: 'Description 1', userId: 1 });

      expect(await tasksService.remove(1)).toEqual({ id: 1, title: 'Task 1', description: 'Description 1', userId: 1 });
    });
  });
});
