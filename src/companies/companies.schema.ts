import * as mongoose from 'mongoose';

export const CompaniesSchema = new mongoose.Schema({
  companyName: {
    type: String,
    unique: true
  },
  companyOwner: String,
  companyDescription: String,
  companyAddress: String,
  companyPhone: String,
  companyEmail: String,
  companyLogo: {
    type: String,
    default: 'default-image.png'
  },
  created: {
    type: Date,
    default: function(){
        return new Date().getTime()
    }
  },
  modified: {
    type: Date
  },
  createdById: String,
  createdByName: String,
  modifiedById: String,
  modifiedByName: String
});
