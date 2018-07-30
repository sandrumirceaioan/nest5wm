import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class CreatedByInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    let request = context.switchToHttp().getRequest();
    let decoded: any = jwt_decode(request.headers['x-access-token']);
    request.body.createdBy = decoded.id;
    return call$.pipe(
      catchError(err =>
        throwError(new HttpException(err, HttpStatus.BAD_GATEWAY)),
      )
    );
  }
}