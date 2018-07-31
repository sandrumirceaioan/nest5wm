import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import * as jwt from "jwt-then";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    try {
      // get request - verify token - jwt return error itself
      const request = context.switchToHttp().getRequest();
      const token = await jwt.verify(request.headers['x-access-token'], 's0!p3n~d34m0$pr4l3*');
         
      // get context roles - if no role, free to access
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles) return true;
    
      // check if user role exists in current route roles array 
      if (roles.indexOf(token.type) > -1) {
        return true;
      } else {
        throw new HttpException('Access denied!', HttpStatus.UNAUTHORIZED);
      }
    } catch(e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }

  }
}