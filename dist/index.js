"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dbConfig_1 = require("./config/dbConfig");
var comman_helpers_1 = require("./helpers/comman.helpers");
var user_controller_1 = require("./controller/user.controller");
var task_controller_1 = require("./controller/task.controller");
var common_middleware_1 = require("./middleware/common.middleware");
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
var helperService = new comman_helpers_1.Helper();
app.use(helperService.unless(['/user/login', '/user/add'], common_middleware_1.middlewareService.validateUser()));
app.use("/user/", new user_controller_1.UserController().router);
app.use("/task/", new task_controller_1.TaskController().router);
var port = 1234;
dbConfig_1.DB.getDBConnection();
app.listen(port, function () { return console.log("Listening on port " + port + "..."); });
process.on("error", function (error) { console.log(error); });
//# sourceMappingURL=index.js.map