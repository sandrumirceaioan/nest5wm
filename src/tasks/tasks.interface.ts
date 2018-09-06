import * as mongoose from 'mongoose';

export interface Task extends mongoose.Document {
    taskName: string;
    taskDescription: string;
    taskProject: string;
    taskProjectId: string;
    taskCompany: string;
    taskCompanyId: string;
    taskStatus: string;
    taskAssignedTo: string;
    taskDifficulty: string;
    taskDeadline: Date;
    created?: Date;
    modified?: Date;
    createdById?: string;
    createdByName?: string;
    modifiedById?: string;
    modifiedByName?: string;
}