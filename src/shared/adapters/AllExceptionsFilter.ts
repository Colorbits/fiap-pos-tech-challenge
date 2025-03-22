import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    // check the httpStatus code and add custom logic if you want
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      message: 'Custom Error from Nest',
      status: httpStatus,
      host: ctx.getRequest().get('host'),
    };

    this.httpAdapterHost.httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      httpStatus,
    );
  }
}
