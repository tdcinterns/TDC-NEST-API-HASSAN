// src/tasks/tasks.controller.ts

import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { TasksService } from './tasks.service';
import { UserRole } from 'src/auth/roles.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    return this.tasksService.findAll(page, perPage);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async create(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('userId') userId: number,
  ) {
    return this.tasksService.create(title, description, userId);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return this.tasksService.update(+id, title, description);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
