"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksMiddleware = void 0;
const common_1 = require("@nestjs/common");
let TasksMiddleware = class TasksMiddleware {
    use(req, res, next) {
        const { method, body } = req;
        if ((method === 'POST' || method === 'PUT') && body) {
            const { title, description } = body;
            if (!title) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    error: 'Title is required for creating or updating a task.',
                });
            }
            if (description && description.length > 255) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    error: 'Description length should not exceed 255 characters.',
                });
            }
        }
        next();
    }
};
exports.TasksMiddleware = TasksMiddleware;
exports.TasksMiddleware = TasksMiddleware = __decorate([
    (0, common_1.Injectable)()
], TasksMiddleware);
//# sourceMappingURL=tasks.middleware.js.map