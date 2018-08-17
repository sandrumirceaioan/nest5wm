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

    async add(company: Company): Promise<Company>{
        let check = await this.oneByName(company.companyName);
        if (check) throw new HttpException(`${company.companyName} company already exists`, HttpStatus.BAD_REQUEST);
        let newCompany = new this.companyModel(company);
        let save = newCompany.save();
        return save;
    }

    async all(): Promise<Company[]>{
        return await this.companyModel.find().sort({created: 1});
    }

    async oneByName(companyName: String): Promise<Company>{
        return await this.companyModel.findOne({companyName});
    }

    async oneById(id): Promise<Company>{
        let company = await this.companyModel.findOne({_id: new ObjectId(id)});
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
            if (!updatedCompany) throw new HttpException('company logo not updated', HttpStatus.BAD_REQUEST);
            return updatedCompany;
    }

    async updateOne(params): Promise<Company> {
        let query = {
            _id: new ObjectId(params._id)
        };
        let updatedCompany = await this.companyModel.findOneAndUpdate(query, params, {new: true});
        if (!updatedCompany) throw new HttpException('company not updated', HttpStatus.BAD_REQUEST);
        return updatedCompany;
    }

    async deleteOne(gg){
        return;
    }
    

}