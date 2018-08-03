import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { Model } from 'mongoose';
import * as md5 from 'md5';
import * as jwt from "jwt-then";
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ){}

     /* login user */
    async loginUser(params): Promise<User> {
        if (!params.userName || !params.password) throw new HttpException('username and password required', HttpStatus.BAD_REQUEST);
        let salt = '4m0$pr4l3*s0!p3n~d3';
        params.password = md5(params.password+salt);
        let loggedUser = await this.userModel.findOne(params);
        console.log(new HttpException('ceva2', 400));
        if (!loggedUser) throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);

        const JWT = {KEY: 's0!p3n~d34m0$pr4l3*',ALGORITHMS: 'HS256'};
        let token = await jwt.sign({
            id: loggedUser._id,
            user: loggedUser.userName,
            type: loggedUser.userType
        }, JWT.KEY, {
            algorithm: JWT.ALGORITHMS,
            expiresIn: 60*60*24
        });

        if (!token) throw new HttpException('token could not be created', HttpStatus.INTERNAL_SERVER_ERROR);
        
        loggedUser = loggedUser.toJSON();
        loggedUser.token = token;
        return loggedUser;
    }

    /* check logged */
    async checkLogged(params): Promise<User> {
        try {
            const token = await jwt.verify(params.token, 's0!p3n~d34m0$pr4l3*');
            const logged = await this.userModel.findOne({_id: new ObjectId(token.id)});
            return logged;
        } catch(e) {
            throw new HttpException(e, HttpStatus.UNAUTHORIZED);
        }
    }

    // async allUsers(params): Promise<User[]>{
    //     let query = {}; 
    //     let users = await this.userModel.find(query).sort({userName: -1}).select({ "userName": 1, "_id": 1});
    //     return users;
    // }
}