import * as mongoose from 'mongoose';

export interface Task extends mongoose.Document {
    taskName: string;
    taskDescription: string;
    taskProject: string;
    taskProjectId: string;
    taskCompany: string;
    taskCompanyId: string;
    taskStatus: string;
    taskDifficulty: string;
    taskDeadline: Date;
    created?: Date;
    createdBy?: string;
    modified?: Date;
    modifiedBy?: string; 
}