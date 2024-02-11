"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = class TasksService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAll(page = 1, perPage = 10) {
        const skip = (page - 1) * perPage;
        return this.prismaService.prisma().task.findMany({
            skip,
            take: perPage,
        });
    }
    async findOne(id) {
        return this.prismaService.prisma().task.findUnique({
            where: { id },
        });
    }
    async create(title, description, userId) {
        return this.prismaService.prisma().task.create({
            data: { title, description, userId },
        });
    }
    async update(id, title, description) {
        return this.prismaService.prisma().task.update({
            where: { id },
            data: { title, description },
        });
    }
    async remove(id) {
        return this.prismaService.prisma().task.delete({
            where: { id },
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map