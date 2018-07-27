import { NestInterceptor, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class Createdby implements NestInterceptor {
  intercept(request: any, call$: Observable<any>): Observable<any> {
    let token = request.headers['x-access-token'];
    let decoded = jwt_decode(token);
    request.body.createdBy = decoded.id;
    return call$;
  }
}