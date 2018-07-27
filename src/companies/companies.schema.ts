import * as mongoose from 'mongoose';
import * as mongooseHidden from 'mongoose-hidden';

export const CompaniesSchema = new mongoose.Schema({
  companyName: String,
  companyOwner: String,
  companyDescription: String,
  companyAddress: String,
  companyPhone: String,
  companyEmail: {
    type: String,
    unique: true
  },
  created: {
    type: Date,
    default: function(){
        return new Date().getTime()
    }
  },
  createdBy: String
});
