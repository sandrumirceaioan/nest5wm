import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './tasks.interface';
import * as moment from 'moment';
import { ProjectsService } from 'projects/projects.service';
import { CompaniesService } from 'companies/companies.service';


const ObjectId = Types.ObjectId;

@Injectable()
export class TasksService {

    constructor(
        @InjectModel('Task') private readonly taskModel: Model<Task>,
        private projectsService: ProjectsService
    ){ }
    
    async add(task): Promise<Task> {
        if (task.taskDeadline) task.taskDeadline = moment(task.taskDeadline.formatted).endOf('day').utc();
        let project = await this.projectsService.oneById(task.taskProjectId);
        task.taskProject = project.projectName;
        task.taskCompany = project.projectCompany;
        task.taskCompanyId = project.projectCompanyId;
        let newTask = new this.taskModel(task);
        let added = await newTask.save();
        return added;
    }

    async allPaginated(params): Promise<any> {
        let count = await this.count();
        let tasks = await this.taskModel.find().skip(parseInt(params.skip)).limit(10);
        return { tasks, count };
    }

    async count(): Promise<number> {
        return await this.taskModel.collection.estimatedDocumentCount({});
    }

}