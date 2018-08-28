import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project } from './projects.interface';
import { CompaniesService } from 'companies/companies.service';

const ObjectId = Types.ObjectId;

@Injectable()
export class ProjectsService {

    constructor(
        @InjectModel('Project') private readonly projectModel: Model<Project>,
        private companiesService: CompaniesService
    ){ }
    
    async add(project: Project): Promise<Project> {
        let check = await this.onebyName(project.projectName);
        if (check) throw new HttpException(`${project.projectName} project already exists`, HttpStatus.BAD_REQUEST);
        let company = await this.companiesService.oneById(project.projectCompanyId);
        project.projectCompany = company.companyName;
        let newProject = new this.projectModel(project);
        let save = newProject.save();
        return save;
    }

    async all(params): Promise<any> {
        let count = await this.count();
        let projects = await this.projectModel.find().skip(parseInt(params.skip)).limit(10).sort({_id:-1});
        return { projects, count };
    }

    async onebyName(projectName): Promise<Project> {
        return await this.projectModel.findOne({projectName});
    }

    async oneById(id): Promise<Project> {
        let project = await this.projectModel.findOne({_id: new ObjectId(id)});
        if (!project) throw new HttpException('project not found', HttpStatus.BAD_REQUEST);
        return project;
    }

    async allById(id): Promise<any> {
        let projects = await this.projectModel.find({projectCompanyId: id}).sort({_id:-1});
        if (!projects) throw new HttpException('projects not found', HttpStatus.BAD_REQUEST);
        return projects;
    }

    async count(): Promise<number> {
        return await this.projectModel.collection.estimatedDocumentCount({});
    }

    async updateOne(params): Promise<Project> {
        let query = {
            _id: new ObjectId(params._id)
        };
        let company = await this.companiesService.oneById(params.projectCompanyId);
        params.projectCompany = company.companyName;
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