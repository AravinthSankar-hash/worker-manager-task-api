import express from "express";
import cors from "cors";

import { DB } from "./config/dbConfig";
import { Helper } from "./helpers/comman.helpers";
import { UserController } from "./controller/user.controller";
import { TaskController } from "./controller/task.controller";
import { middlewareService } from "./middleware/common.middleware";

const app = express();

app.use(cors())
app.use(express.json());
const helperService = new Helper();
app.use(helperService.unless(['/user/login', '/user/add'], middlewareService.validateUser()));

app.use("/user/", new UserController().router);
app.use("/task/", new TaskController().router);

const port = 1234;
DB.getDBConnection();
app.listen(port, () => console.log(`Listening on port ${port}...`))

process.on("error", (error) => {console.log(error)})
