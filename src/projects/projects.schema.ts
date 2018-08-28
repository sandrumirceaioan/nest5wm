import * as mongoose from 'mongoose';

export const ProjectsSchema = new mongoose.Schema({
    projectName: {
        type: String,
        unique: true
    },
    projectDescription: String,
    projectTags: [],
    projectCompany: String,
    projectCompanyId: String,
    projectLogo: {
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
