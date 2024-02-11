import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(page?: number, perPage?: number): Promise<{
        id: number;
        title: string;
        description: string;
        userId: number;
    }[]>;
    findOne(id: string): Promise<{
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
    update(id: string, title: string, description: string): Promise<{
        id: number;
        title: string;
        description: string;
        userId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        title: string;
        description: string;
        userId: number;
    }>;
}
