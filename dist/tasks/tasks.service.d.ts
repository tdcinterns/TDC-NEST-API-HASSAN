import { PrismaService } from '../prisma/prisma.service';
export declare class TasksService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(page?: number, perPage?: number): Promise<{
        id: number;
        title: string;
        description: string;
        userId: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        userId: number;
    }>;
    create(title: string, description: string, userId: number): Promise<{
        id: number;
        title: string;
        description: string;
        userId: number;
    }>;
    update(id: number, title: string, description: string): Promise<{
        id: number;
        title: string;
        description: string;
        userId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        userId: number;
    }>;
}
