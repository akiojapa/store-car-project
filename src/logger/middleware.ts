import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    this.logger.log(`Request ${method} ${url}`);
    next();
  }

}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { method, url } = req;
    this.logger.log(`Request ${method} ${url}`);
    next();
  }
}

