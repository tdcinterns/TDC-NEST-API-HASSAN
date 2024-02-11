import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(page: number = 1, perPage: number = 10) {
    const skip = (page - 1) * perPage;

    return this.prismaService.prisma().task.findMany({
      skip,
      take: perPage,
    });
  }

  async findOne(id: number) {
    return this.prismaService.prisma().task.findUnique({
      where: { id },
    });
  }

  async create(title: string, description: string, userId: number) {
    return this.prismaService.prisma().task.create({
      data: { title, description, userId },
    });
  }

  async update(id: number, title: string, description: string) {
    return this.prismaService.prisma().task.update({
      where: { id },
      data: { title, description },
    });
  }

  async remove(id: number) {
    return this.prismaService.prisma().task.delete({
      where: { id },
    });
  }
}
