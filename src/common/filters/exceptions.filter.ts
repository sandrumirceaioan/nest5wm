import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {

    let response = host.switchToHttp().getResponse();
    let status = (exception instanceof HttpException) ? exception.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: exception.message.message || exception.message
      });
  }
}