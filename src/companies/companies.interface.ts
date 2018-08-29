import * as mongoose from 'mongoose';

export interface Company extends mongoose.Document {
  companyName: string;
  companyOwner: string;
  companyDescription: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyLogo: string;
  companyProjects?: any;
  created?: Date;
  modified?: Date;
  createdById?: string;
  createdByName?: string;
  modifiedById?: string;
  modifiedByName?: string;
}