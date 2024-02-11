import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TasksMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, body } = req;

    if ((method === 'POST' || method === 'PUT') && body) {
      const { title, description } = body;

      if (!title) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          error: 'Title is required for creating or updating a task.',
        });
      }

      if (description && description.length > 255) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          error: 'Description length should not exceed 255 characters.',
        });
      }
    }

    next();
  }
}
