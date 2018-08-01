import * as mongoose from 'mongoose';
import { isEmail } from 'validator';

export const CompaniesSchema = new mongoose.Schema({
  companyName: String,
  companyOwner: String,
  companyDescription: String,
  companyAddress: String,
  companyPhone: String,
  companyEmail: {
    type: String,
    unique: true,
    validate: [ isEmail, 'Invalid email format!' ]
  },
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
  createdBy: String
});
