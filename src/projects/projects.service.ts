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
    
    async addProject(project: Project): Promise<Project>{
        let check = await this.oneProjectbyName(project.projectName);
        if (check) throw new HttpException(`${project.projectName} project already exists`, HttpStatus.BAD_REQUEST);
        let newProject = new this.projectModel(project);
        let save = newProject.save();
        return save;
    }

    async allProjects(): Promise<Project[]>{
        return await this.projectModel.find().sort({created: 1});
    }

    async oneProjectbyName(projectName: String): Promise<Project>{
        return await this.projectModel.findOne({projectName});
    }
    

}