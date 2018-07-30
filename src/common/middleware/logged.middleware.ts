import { Injectable, NestMiddleware, MiddlewareFunction, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from "jwt-then";

@Injectable()
export class LoggedMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return async (req, res, next) => {
            let logged = await jwt.verify(req.headers['x-access-token'], 's0!p3n~d34m0$pr4l3*');
            if (!logged) throw new HttpException('Please log in to continue!', HttpStatus.UNAUTHORIZED);
            next();
        }
    }
}