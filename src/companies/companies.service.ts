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

    async addCompany(company: CreateCompanyDto, file: File): Promise<Company>{

        //console.log(company, file);

        let query = {companyName: company.companyName};
        let alreadyExists = await this.companyModel.findOne(query);
        if (alreadyExists) throw new HttpException('Company already exists!', HttpStatus.BAD_REQUEST);
        let newCompany = new this.companyModel(company);
        try {
            let company = await newCompany.save();
            return company;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async allCompanies(): Promise<Company[]>{
        let companies = await this.companyModel.find().sort({created: 1});
        return companies;
    }

}