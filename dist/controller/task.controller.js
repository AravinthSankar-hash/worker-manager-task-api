"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload = multer_1.default({ dest: 'uploads/' });
var task_service_1 = require("../service/task.service");
var TaskController = /** @class */ (function () {
    function TaskController() {
        this.router = express_1.Router();
        this.init();
    }
    ;
    TaskController.prototype.init = function () {
        this.router.post('/all', this.getTasks);
        this.router.post('/state', this.getTaskBasedOnState);
        this.router.post('/worker', this.getTaskBasedOnWorker);
        this.router.post('/create', this.createTask);
        this.router.post('/search', this.searchTask);
        this.router.post('/delete', this.removeTask);
        this.router.post('/update', this.updateTask);
        this.router.post('/upload', upload.single('sample'), this.taskUpload);
    };
    TaskController.prototype.getTasks = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var service, reponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = new task_service_1.TaskService();
                        return [4 /*yield*/, service.fetchAllTasks(request.body)];
                    case 1:
                        reponse = _a.sent();
                        return [2 /*return*/, response.send(reponse)];
                }
            });
        });
    };
    TaskController.prototype.getTaskBasedOnState = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var service, reponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = new task_service_1.TaskService();
                        return [4 /*yield*/, service.getTaskOnState(request.body)];
                    case 1:
                        reponse = _a.sent();
                        return [2 /*return*/, response.send(reponse)];
                }
            });
        });
    };
    TaskController.prototype.searchTask = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var service, reponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = new task_service_1.TaskService();
                        return [4 /*yield*/, service.searchTask(request.body)];
                    case 1:
                        reponse = _a.sent();
                        return [2 /*return*/, response.send(reponse)];
                }
            });
        });
    };
    TaskController.prototype.getTaskBasedOnWorker = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var service, reponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = new task_service_1.TaskService();
                        return [4 /*yield*/, service.getTaskOnWorker(request.body, request.userData.name)];
                    case 1:
                        reponse = _a.sent();
                        return [2 /*return*/, response.send(reponse)];
                }
            });
        });
    };
    TaskController.prototype.createTask = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var service, reponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = new task_service_1.TaskService();
                        return [4 /*yield*/, service.saveTask(request.body)];
                    case 1:
                        reponse = _a.sent();
                        return [2 /*return*/, response.send(reponse)];
                }
            });
        });
    };
    TaskController.prototype.removeTask = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var service, reponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = new task_service_1.TaskService();
                        return [4 /*yield*/, service.removeTask(request.body)];
                    case 1:
                        reponse = _a.sent();
                        return [2 /*return*/, response.send(reponse)];
                }
            });
        });
    };
    TaskController.prototype.updateTask = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var service, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = new task_service_1.TaskService();
                        return [4 /*yield*/, service.updateTask(request.body)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, response.send(result)];
                }
            });
        });
    };
    TaskController.prototype.taskUpload = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var service, reponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = new task_service_1.TaskService();
                        return [4 /*yield*/, service.fileUpload(request)];
                    case 1:
                        reponse = _a.sent();
                        return [2 /*return*/, response.send(reponse)];
                }
            });
        });
    };
    return TaskController;
}());
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map