import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project } from './projects.interface';

const ObjectId = Types.ObjectId;

@Injectable()
export class ProjectsService {

    constructor(
        @InjectModel('Project') private readonly projectModel: Model<Project>
    ){ }

    async addProject(project: Project, file): Promise<Project>{
        console.log(project, file);
        return;
        // let check = await this.oneCompanybyName(project.projectName);
        // if (check) throw new HttpException(`${project.projectName} project already exists`, HttpStatus.BAD_REQUEST);
        // let newCompany = new this.projectModel(project);
        // let save = newCompany.save();
        // return save;
    }

    async allProjects(): Promise<Project[]>{
        return await this.projectModel.find().sort({created: 1});
    }

    async oneCompanybyName(companyName: String): Promise<Project>{
        return await this.projectModel.findOne({companyName});
    }
    

}