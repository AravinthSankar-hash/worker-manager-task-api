const GridFsStorage = require('multer-gridfs-storage');
import fs from "fs";

import { DB } from "../config/dbConfig";
import { APP_DATA } from "../constants/common.constants";
const storage = new GridFsStorage({ url: APP_DATA.GRIDFS_MONGODB_URL });

export class TaskService {
    public async fetchAllTasks(paginationDetails: any) {
        try {
            const tasksCollection = await DB.dbConnection.collection("tasks");
            const tasks = await tasksCollection.find({}).limit(paginationDetails.limit).skip(paginationDetails.skip).sort({createdOn: -1}).toArray();
            return tasks;
        } catch (error) {
            return error;
        }
    }

    public async getTaskOnState(stateDetails: any) {
        try {
            const tasksCollection = await DB.dbConnection.collection("tasks");
            const tasks = await tasksCollection.find({ status: stateDetails.state.toLowerCase() }).limit(stateDetails.limit).skip(stateDetails.skip).toArray();
            return tasks;
        } catch (error) {
            return error;
        }
    }

    public async searchTask(stateDetails: any) {
        try {
            let searchCondition = {};
            if (stateDetails.searchText === "") {
                searchCondition = {};
            } else {
                searchCondition = {$or:[
                    {taskName: stateDetails.searchText},
                    {tID: Number(stateDetails.searchText)}
                ]}; 
            }
            const tasksCollection = await DB.dbConnection.collection("tasks");
            const tasks = await tasksCollection.find(searchCondition).toArray();
            return tasks;
        } catch (error) {
            return error;
        }
    }

    public async getTaskOnWorker(stateDetails: any, userName: string) {
        try {
            const tasksCollection = await DB.dbConnection.collection("tasks");
            const tasks = await tasksCollection.find({ assignedTo: userName.toLowerCase() }).limit(stateDetails.limit).skip(stateDetails.skip).toArray();
            return tasks;
        } catch (error) {
            return error;
        }
    }

    public async saveTask(taskDetails: any) {
        try {
            const tasksCollection = await DB.dbConnection.collection("tasks");
            const tID = await this.getNextSequenceValue("TID");
            taskDetails.tID = tID;
            taskDetails.createdOn = new Date();
            taskDetails.taskName = taskDetails.taskName.toLowerCase();
            const tasks = await tasksCollection.insertOne(taskDetails);
            return tasks;
        } catch (error) {
            return error;
        }
    }

    public async getNextSequenceValue(sequenceName: string) {
        try {
            const counterCollection = await DB.dbConnection.collection("counters");
            const sequenceDocument = await counterCollection.findOneAndUpdate(
                { _id: sequenceName },
                { $inc: { sequence_value: 1 } },
            );
            return sequenceDocument.value.sequence_value;
        } catch (error) {
            throw error;
        }
    }

    public async removeTask(taskDetails: any) {
        try {
            const tasksCollection = await DB.dbConnection.collection("tasks");
            const tasks = await tasksCollection.remove({ OID: taskDetails.OID });
            return tasks;
        } catch (error) {
            return error;
        }
    }

    public async updateTask(taskDetails: any) {
        try {
            const tasksCollection = await DB.dbConnection.collection("tasks");
            const response = await tasksCollection.updateOne(
                { tID: taskDetails.tID },
                { $set: taskDetails }
            )
            return response;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    public fileUpload(payLoad: any) {
        const { file } = payLoad;
        const stream = fs.createReadStream(file.path);
        file.metadata = {
            taskID: payLoad.body.taskID
        }
        return storage.fromStream(stream, payLoad, file)
            .then( async (reponse: any) => {
                const taskDetails = {
                    tID: Number(payLoad.body.taskID),
                    status: "submitted"
                }
                await this.updateTask(taskDetails);
                return reponse;
            })
            .catch((error: Error) => {return error});   
    }

    public async fileUploadd (payLoad: any) {
        const { file } = payLoad;
        const stream = fs.createReadStream(file.path);
        file.metadata = {
            taskID: payLoad.body.taskID
        }
        await storage.fromStream(stream, payLoad, file)
        const taskDetails = {
            tID: Number(payLoad.body.taskID),
            state: "submitted"
        }
        await this.updateTask(taskDetails);
    }
}