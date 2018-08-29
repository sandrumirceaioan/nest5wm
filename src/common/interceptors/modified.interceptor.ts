import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class ModifiedInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    let request = context.switchToHttp().getRequest();
    let decoded: any = jwt_decode(request.headers['x-access-token']);
    request.body.modifiedById = decoded.id;
    request.body.modifiedByName = decoded.user;
    return call$;
  }
}