import { Router, Response, Request } from "express";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });


import { TaskService } from "../service/task.service";

export class TaskController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    };

    private init() {
        this.router.post('/all', this.getTasks);
        this.router.post('/state', this.getTaskBasedOnState);
        this.router.post('/worker', this.getTaskBasedOnWorker);
        this.router.post('/create', this.createTask);
        this.router.post('/search', this.searchTask);
        this.router.post('/delete', this.removeTask);
        this.router.post('/update', this.updateTask);
        this.router.post('/upload', upload.single('sample'), this.taskUpload);
    }

    private async getTasks(request: Request, response: Response) {
        const service = new TaskService();
        const reponse = await service.fetchAllTasks(request.body);
        return response.send(reponse);
    }

    private async getTaskBasedOnState(request: Request, response: Response) {
        const service = new TaskService();
        const reponse = await service.getTaskOnState(request.body);
        return response.send(reponse);
    }

    private async searchTask(request: Request, response: Response) {
        const service = new TaskService();
        const reponse = await service.searchTask(request.body);
        return response.send(reponse);
    }

    private async getTaskBasedOnWorker(request: any, response: Response) {
        const service = new TaskService();
        const reponse = await service.getTaskOnWorker(request.body, request.userData.name);
        return response.send(reponse);
    }

    private async createTask(request: Request, response: Response) {
        const service = new TaskService();
        const reponse = await service.saveTask(request.body);
        return response.send(reponse);
    }

    private async removeTask(request: Request, response: Response) {
        const service = new TaskService();
        const reponse = await service.removeTask(request.body);
        return response.send(reponse);
    }

    private async updateTask(request: Request, response: Response) {
        const service = new TaskService();
        const result = await service.updateTask(request.body);
        return response.send(result);
    }

    private async taskUpload(request: Request, response: Response) {
        const service = new TaskService();
        const reponse = await service.fileUpload(request);
        return response.send(reponse);
    }
}