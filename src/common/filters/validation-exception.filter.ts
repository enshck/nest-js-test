import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    const errors =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse?.message;

    response.status(status).json({
      name: 'Validation data error',
      errors: errors,
    });
  }
}
