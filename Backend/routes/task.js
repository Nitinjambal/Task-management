import express from "express";
import { AddNewTask, DeleteTask, GetTasks, UpdateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/addTask", isAuthenticated, AddNewTask);
router.get("/getAllTask", isAuthenticated, GetTasks);
router.route("/:id").put(isAuthenticated,UpdateTask).delete(isAuthenticated,DeleteTask);


export default router;