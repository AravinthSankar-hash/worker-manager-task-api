import { Router, Response, Request } from "express";
import { UserService } from "../service/user.service";

export class UserController {
    public router: Router;
 
    constructor() {
        this.router = Router();
        this.init();
    };
 
    private init() {
        this.router.post('/login', this.validateUser);
        this.router.post('/add', this.addUser);
        this.router.get('/all', this.getAllUsers);
        this.router.get('/isactive', this.checkApi);
    }

    private async addUser(request: any,  response: Response) {
        const reponse = await new UserService().saveUser(request.body);
        return response.send(reponse);
    }

    private async getAllUsers(request: any,  response: Response) {
        const reponse = await new UserService().fetchAllUsers();
        return response.send(reponse);
    }

    private async checkApi(request: Request, response: Response) {
        return response.send("OK");
    }

    private async validateUser(request: any,  response: Response) {
        const service = new UserService();
        const reponse = await service.checkUser(request.body);
        return response.send(reponse);
    }
}