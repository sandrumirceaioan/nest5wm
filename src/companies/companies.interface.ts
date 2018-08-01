import * as mongoose from 'mongoose';

export interface Company extends mongoose.Document {
  companyName: string;
  companyOwner: string;
  companyDescription: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyLogo: string;
  created?: Date;
  createdBy?: string;
}