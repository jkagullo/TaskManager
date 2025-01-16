import Task from "../models/taskModel.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({
            message: "Tasks fetched successfully",
            status: "Success",
            tasks: tasks
        });
        console.log("Tasks fetched successfully", tasks);
    } catch (err) {
        res.status(500).json({
            message: "Tasks not found",
            status: "Error",
        });
    }
}

export const createTask = async (req, res) => {
    try {
        const { title, description, completed, dueDate, priority } = req.body;
        const task = new Task({
            title,
            description,
            completed,
            dueDate,
            priority,
        });
        const createdTask = await task.save();
        res.status(201).send({
            message: "Task created successfully",
            status: "Success",
        });
    } catch (err){
        res.status(501).json({
            message: "Task not created",
            status: "Error",
        });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed, dueDate, priority } = req.body;
        const task = await Task.findById(id);

        if (task) {
            task.title = title;
            task.description = description;
            task.completed = completed;
            task.dueDate = dueDate;
            task.priority = priority;

            const updatedTask = await task.save();
            res.json(updatedTask);
        } else {
            res.status(404).json({
                message: "Task not found",
                status: "Error",
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Task not updated",
            status: "Error",
        })
    }
}

export const deleteTask = async (req,res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);

        if (task) {
            res.json({
                message: "Task removed",
                status: "Success",
            });
        } else {
            res.status(404).json({
                message: "Task not found",
                status: "Error",
            });
        }
    } catch (err) {
        console.log(`Error deleting task: ${err}`);
        res.status(500).json({
            message: "Task not deleted",
            status: "Error",
        });
    }
}

