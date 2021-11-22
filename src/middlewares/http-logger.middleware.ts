import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, path: url, query, body, header } = request;

    response.on('close', () => {
      const { statusCode } = response;

      this.logger.log({
        text: 'Request',
        data: {
          method,
          url,
          statusCode,
          query,
          body,
          auth: header['Authorization'],
        },
      });
    });

    next();
  }
}
