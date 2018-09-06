import * as mongoose from 'mongoose';

export const TasksSchema = new mongoose.Schema({
    taskName: {
        type: String,
        unique: true
    },
    taskDescription: String,
    taskProject: String,
    taskProjectId: String,
    taskCompany: String,
    taskCompanyId: String,
    taskStatus: {
        type: String,
        default: 'new'
    },
    taskAssignedTo: String,
    taskDifficulty: String,
    taskDeadline: Date,
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
