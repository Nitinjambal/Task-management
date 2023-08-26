import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";


export const AddNewTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user
        })

        res.status(201).json({
            success: true,
            message: "Task Added Succussfully",
        })
    } catch (error) {
        next(error)
    }
}


export const GetTasks = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const userTasks = await Task.find({ user: userId })
        res.status(200).json({
            success: true,
            userTasks,
        })
    } catch (error) {
        next(error)
    }
}


export const UpdateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) return next(new ErrorHandler("Task Not Found", 404))
        task.isCompleted = !task.isCompleted
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Got Updated Succussfully"
        })
    } catch (error) {
        next(error)

    }
}


export const DeleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) return next(new ErrorHandler("Task Not Found", 404))

        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "Task Got Deleted"
        })

    } catch (error) {
        next(error);
    }
}
