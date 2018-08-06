import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './companies.interface';

@Injectable()
export class CompaniesService {

    constructor(
        @InjectModel('Company') private readonly companyModel: Model<Company>
    ){ }

    async addCompany(company: Company): Promise<Company>{
        let check = await this.oneCompany(company.companyName);
        if (check) throw new HttpException(`${company.companyName} company already exists`, HttpStatus.BAD_REQUEST);
        let newCompany = new this.companyModel(company);
        let save = newCompany.save();
        return save;
    }

    async allCompanies(): Promise<Company[]>{
        return await this.companyModel.find().sort({created: 1});
    }

    async oneCompany(companyName: String): Promise<Company>{
        return await this.companyModel.findOne({companyName});
    }

}