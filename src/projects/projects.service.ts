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
    
    async addProject(project: Project): Promise<Project> {
        let check = await this.oneProjectbyName(project.projectName);
        if (check) throw new HttpException(`${project.projectName} project already exists`, HttpStatus.BAD_REQUEST);
        let newProject = new this.projectModel(project);
        let save = newProject.save();
        return save;
    }

    async allProjects(params): Promise<any> {
        let count = await this.countProjects();
        let projects = await this.projectModel.find().skip(params.skip).limit(10);
        return { projects, count };
    }

    async oneProjectbyName(projectName: String): Promise<Project> {
        return await this.projectModel.findOne({projectName});
    }

    async oneProjectById(params): Promise<Project> {
        let project = await this.projectModel.findOne({_id: new ObjectId(params.id)});
        if (!project) throw new HttpException('project not found', HttpStatus.BAD_REQUEST);
        return project;
    }

    async countProjects(): Promise<number> {
        return await this.projectModel.collection.estimatedDocumentCount({});
    }

    async updateOne(params): Promise<Project> {
        let query = {
            _id: new ObjectId(params._id)
        };
        let updatedProject = await this.projectModel.findOneAndUpdate(query, params, {new: true});
        if (!updatedProject) throw new HttpException('project not updated', HttpStatus.BAD_REQUEST);
        return updatedProject;
    }

    async updateLogo(params, file): Promise<Project> {
        let query = {
            _id: new ObjectId(params._id)
        };
        let set = {
            projectLogo: file.filename
        };
            let updatedProject = await this.projectModel.findOneAndUpdate(query, set, {new: true});
            if (!updatedProject) throw new HttpException('project logo not updated', HttpStatus.BAD_REQUEST);
            return updatedProject;
    }
    

}