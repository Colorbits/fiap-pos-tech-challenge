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
    const isException = exception instanceof HttpException;
    // check the httpStatus code and add custom logic if you want

    const status = isException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = isException
      ? exception.getResponse()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      message,
      status,
      host: ctx.getRequest().get('host'),
    };

    this.httpAdapterHost.httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      status,
    );
  }
}
