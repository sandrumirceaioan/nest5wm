import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Company } from './companies.interface';

const ObjectId = Types.ObjectId;

@Injectable()
export class CompaniesService {

    constructor(
        @InjectModel('Company') private readonly companyModel: Model<Company>
    ){ }

    async addCompany(company: Company): Promise<Company>{
        let check = await this.oneCompanybyName(company.companyName);
        if (check) throw new HttpException(`${company.companyName} company already exists`, HttpStatus.BAD_REQUEST);
        let newCompany = new this.companyModel(company);
        let save = newCompany.save();
        return save;
    }

    async allCompanies(): Promise<Company[]>{
        return await this.companyModel.find().sort({created: 1});
    }

    async oneCompanybyName(companyName: String): Promise<Company>{
        return await this.companyModel.findOne({companyName});
    }

    async oneCompanyById(params): Promise<Company>{
        let company = await this.companyModel.findOne({_id: new ObjectId(params.id)});
        if (!company) throw new HttpException('company not found', HttpStatus.BAD_REQUEST);
        return company;
    }

    async updateLogo(params, file): Promise<Company> {
        let query = {
            _id: new ObjectId(params._id)
        };
        let set = {
            companyLogo: file.filename
        };
            let updatedCompany = await this.companyModel.findOneAndUpdate(query, set, {new: true});
            if (!updatedCompany) throw new HttpException('company logo not updated', HttpStatus.INTERNAL_SERVER_ERROR);
            return updatedCompany;
    }
    

}