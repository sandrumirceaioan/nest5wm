import * as mongoose from 'mongoose';

export interface Project extends mongoose.Document {
    projectName: string;
    projectDescription: string;
    projectTags: object;
    projectCompany: string;
    projectCompanyId: string;
    projectLogo: string;
    created?: Date;
    createdBy?: string;
}