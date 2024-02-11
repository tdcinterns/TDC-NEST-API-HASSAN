import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { TasksService } from './tasks.service';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    return this.tasksService.findAll(page, perPage);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Post()
  async create(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('userId') userId: number,
  ) {
    return this.tasksService.create(title, description, userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return this.tasksService.update(+id, title, description);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
