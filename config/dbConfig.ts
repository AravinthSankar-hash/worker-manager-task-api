import mongodb =  require('mongodb');

import { APP_DATA } from "../constants/common.constants";

class DBConnection {
    public dbURL = APP_DATA.MONGODB_URL;
    public dbName = 'worker_manager';
    public dbConnection: any;
    public gfs: any;
    
    public getDBConnection = async () => {
        let client = await mongodb.MongoClient.connect(this.dbURL, { useUnifiedTopology: true, useNewUrlParser: true });
        const db = await client.db(this.dbName);
        this.dbConnection = db
        this.gfs = new mongodb.GridFSBucket(db, {
            bucketName: "uploads"
        });
        return;
    }
}

export const DB = new DBConnection();
