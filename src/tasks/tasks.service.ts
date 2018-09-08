import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './tasks.interface';
import * as moment from 'moment';
import { ProjectsService } from 'projects/projects.service';
import { CompaniesService } from 'companies/companies.service';
import * as _ from 'underscore';


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
        let skip = params.page ? (params.page - 1) * 15 : 0;
        let filter: any = {};
        if(params.search != 'undefined' && params.search != '') filter.taskName = {$regex: ".*" + params.search + ".*", $options: '-i'};
        if(params.user != 'undefined') filter.taskAssignedTo = params.user;
        let count = await this.count(filter);
        let tasks = await this.taskModel.find(filter).skip(skip).limit(15).select({ "taskName": 1, "_id": 1});;
        return { tasks, count };
    }

    async count(e): Promise<number> {
        return await this.taskModel.count(e);
    }

}