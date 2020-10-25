import jwt from "jsonwebtoken";
import { DB } from "../config/dbConfig";
import { APP_DATA } from "../constants/common.constants";

export class UserService {
    public async saveUser(userDetails: any) {
        try {
            const usersCollection = await DB.dbConnection.collection("users");
            return usersCollection.insert(userDetails);
        } catch(error) {
            return error;
        }
    }

    public async fetchAllUsers() {
        try {
            const usersCollection = await DB.dbConnection.collection("users");
            return usersCollection.find({role: "worker"}).toArray();
        } catch(error) {
            return error;
        }
    }

    public async checkUser(userDetails: any) {
        try {
            const usersCollection = await DB.dbConnection.collection("users");
            const userData = await usersCollection.find({username: userDetails.username}).toArray();
            if (!userData.length) {
                return [{ data: "User Not found", isActive: false }];
            } else if (userDetails.password === userData[0].password) {
                userData[0].isActive = true;
                const tokenData = {
                    name: userData[0].username,
                    role: userData[0].role
                }
                userData[0].token = this.createToken(tokenData);
                return userData;
            } else {
                return [{ data: "Invalid Credentials", isActive: false }];
            }
        } catch(error) {
            return error;
        }
    }

    public createToken (userDetails: object) {
        return jwt.sign(userDetails, APP_DATA.PRIVATE_KEY);
    }
}
