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
var GridFsStorage = require('multer-gridfs-storage');
var fs_1 = __importDefault(require("fs"));
var dbConfig_1 = require("../config/dbConfig");
var common_constants_1 = require("../constants/common.constants");
var storage = new GridFsStorage({ url: common_constants_1.APP_DATA.GRIDFS_MONGODB_URL });
var TaskService = /** @class */ (function () {
    function TaskService() {
    }
    TaskService.prototype.fetchAllTasks = function (paginationDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var tasksCollection, tasks, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, dbConfig_1.DB.dbConnection.collection("tasks")];
                    case 1:
                        tasksCollection = _a.sent();
                        return [4 /*yield*/, tasksCollection.find({}).limit(paginationDetails.limit).skip(paginationDetails.skip).sort({ createdOn: -1 }).toArray()];
                    case 2:
                        tasks = _a.sent();
                        return [2 /*return*/, tasks];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TaskService.prototype.getTaskOnState = function (stateDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var tasksCollection, tasks, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, dbConfig_1.DB.dbConnection.collection("tasks")];
                    case 1:
                        tasksCollection = _a.sent();
                        return [4 /*yield*/, tasksCollection.find({ status: stateDetails.state.toLowerCase() }).limit(stateDetails.limit).skip(stateDetails.skip).toArray()];
                    case 2:
                        tasks = _a.sent();
                        return [2 /*return*/, tasks];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, error_2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TaskService.prototype.searchTask = function (stateDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var searchCondition, tasksCollection, tasks, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        searchCondition = {};
                        if (stateDetails.searchText === "") {
                            searchCondition = {};
                        }
                        else {
                            searchCondition = { $or: [
                                    { taskName: stateDetails.searchText },
                                    { tID: Number(stateDetails.searchText) }
                                ] };
                        }
                        return [4 /*yield*/, dbConfig_1.DB.dbConnection.collection("tasks")];
                    case 1:
                        tasksCollection = _a.sent();
                        return [4 /*yield*/, tasksCollection.find(searchCondition).toArray()];
                    case 2:
                        tasks = _a.sent();
                        return [2 /*return*/, tasks];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, error_3];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TaskService.prototype.getTaskOnWorker = function (stateDetails, userName) {
        return __awaiter(this, void 0, void 0, function () {
            var tasksCollection, tasks, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, dbConfig_1.DB.dbConnection.collection("tasks")];
                    case 1:
                        tasksCollection = _a.sent();
                        return [4 /*yield*/, tasksCollection.find({ assignedTo: userName.toLowerCase() }).limit(stateDetails.limit).skip(stateDetails.skip).toArray()];
                    case 2:
                        tasks = _a.sent();
                        return [2 /*return*/, tasks];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, error_4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TaskService.prototype.saveTask = function (taskDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var tasksCollection, tID, tasks, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, dbConfig_1.DB.dbConnection.collection("tasks")];
                    case 1:
                        tasksCollection = _a.sent();
                        return [4 /*yield*/, this.getNextSequenceValue("TID")];
                    case 2:
                        tID = _a.sent();
                        taskDetails.tID = tID;
                        taskDetails.createdOn = new Date();
                        taskDetails.taskName = taskDetails.taskName.toLowerCase();
                        return [4 /*yield*/, tasksCollection.insertOne(taskDetails)];
                    case 3:
                        tasks = _a.sent();
                        return [2 /*return*/, tasks];
                    case 4:
                        error_5 = _a.sent();
                        return [2 /*return*/, error_5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TaskService.prototype.getNextSequenceValue = function (sequenceName) {
        return __awaiter(this, void 0, void 0, function () {
            var counterCollection, sequenceDocument, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, dbConfig_1.DB.dbConnection.collection("counters")];
                    case 1:
                        counterCollection = _a.sent();
                        return [4 /*yield*/, counterCollection.findOneAndUpdate({ _id: sequenceName }, { $inc: { sequence_value: 1 } })];
                    case 2:
                        sequenceDocument = _a.sent();
                        return [2 /*return*/, sequenceDocument.value.sequence_value];
                    case 3:
                        error_6 = _a.sent();
                        throw error_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TaskService.prototype.removeTask = function (taskDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var tasksCollection, tasks, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, dbConfig_1.DB.dbConnection.collection("tasks")];
                    case 1:
                        tasksCollection = _a.sent();
                        return [4 /*yield*/, tasksCollection.remove({ OID: taskDetails.OID })];
                    case 2:
                        tasks = _a.sent();
                        return [2 /*return*/, tasks];
                    case 3:
                        error_7 = _a.sent();
                        return [2 /*return*/, error_7];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TaskService.prototype.updateTask = function (taskDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var tasksCollection, response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, dbConfig_1.DB.dbConnection.collection("tasks")];
                    case 1:
                        tasksCollection = _a.sent();
                        return [4 /*yield*/, tasksCollection.updateOne({ tID: taskDetails.tID }, { $set: taskDetails })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_8 = _a.sent();
                        console.log(error_8);
                        return [2 /*return*/, error_8];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TaskService.prototype.fileUpload = function (payLoad) {
        var _this = this;
        var file = payLoad.file;
        var stream = fs_1.default.createReadStream(file.path);
        file.metadata = {
            taskID: payLoad.body.taskID
        };
        return storage.fromStream(stream, payLoad, file)
            .then(function (reponse) { return __awaiter(_this, void 0, void 0, function () {
            var taskDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        taskDetails = {
                            tID: Number(payLoad.body.taskID),
                            status: "submitted"
                        };
                        return [4 /*yield*/, this.updateTask(taskDetails)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, reponse];
                }
            });
        }); })
            .catch(function (error) { return error; });
    };
    TaskService.prototype.fileUploadd = function (payLoad) {
        return __awaiter(this, void 0, void 0, function () {
            var file, stream, taskDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = payLoad.file;
                        stream = fs_1.default.createReadStream(file.path);
                        file.metadata = {
                            taskID: payLoad.body.taskID
                        };
                        return [4 /*yield*/, storage.fromStream(stream, payLoad, file)];
                    case 1:
                        _a.sent();
                        taskDetails = {
                            tID: Number(payLoad.body.taskID),
                            state: "submitted"
                        };
                        return [4 /*yield*/, this.updateTask(taskDetails)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TaskService;
}());
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map