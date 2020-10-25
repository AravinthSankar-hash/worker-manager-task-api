import { Response, Request, NextFunction } from "express";

export class Helper {
    public unless (paths: any, middleware: any) {
        return function(req: Request, res: Response, next: NextFunction) {
            if (paths.includes(req.path)) {
                return next();
            } else {
                return middleware(req, res, next);
            }
        };
    };
}