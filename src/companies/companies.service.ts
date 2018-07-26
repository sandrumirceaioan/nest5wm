import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompaniesSchema } from './companies.schema';
import { Company } from './companies.interface';
import { CreateCompanyDto } from "./companies.dto";

const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class CompaniesService {

    constructor(
        @InjectModel('Company') private readonly companyModel: Model<Company>
    ){}

    

}