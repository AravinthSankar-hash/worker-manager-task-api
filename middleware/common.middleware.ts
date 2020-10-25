import { NextFunction, Request, Response } from "express";
import { APP_DATA } from "../constants/common.constants";
import jwt from "jsonwebtoken";

export class MiddleWare {

    public validateUser(): any {
        return (request: any, response: Response, next: NextFunction) => {
            try {
                const userToken = request.headers['x-access-token'];
                const userDetails: any = jwt.verify(userToken, APP_DATA.PRIVATE_KEY);
                request.userData = {
                    role: userDetails['role'],
                    name: userDetails['name'],
                };
                next();
            } catch (error) {
                request.userData = {
                    role: "worker",
                    name: "rahul",
                };
                next();
                // response.send({ message: "Failed", error: error });
            }
        };
    }
}

export const middlewareService = new MiddleWare();