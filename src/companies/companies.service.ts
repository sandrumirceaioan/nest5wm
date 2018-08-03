import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './companies.interface';

@Injectable()
export class CompaniesService {

    constructor(
        @InjectModel('Company') private readonly companyModel: Model<Company>
    ){

        console.log(new HttpException('ceva', 400));

    }

    async addCompany(company: Company): Promise<Company>{
        let query = {companyName: company.companyName};
        let alreadyExists = await this.companyModel.findOne(query);
        console.log(new HttpException('altceva', 400));
        if (alreadyExists) throw new HttpException('pula', HttpStatus.I_AM_A_TEAPOT);
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