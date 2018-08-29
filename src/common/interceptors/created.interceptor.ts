import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class CreatedInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    let request = context.switchToHttp().getRequest();
    let decoded: any = jwt_decode(request.headers['x-access-token']);
    request.body.createdById = decoded.id;
    request.body.createdByName = decoded.user;
    return call$;
  }
}