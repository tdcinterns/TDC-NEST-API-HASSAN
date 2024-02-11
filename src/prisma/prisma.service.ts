import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaService {
  constructor() {}

  prisma(): PrismaClient {
    return prisma;
  }
}
