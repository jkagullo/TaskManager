import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Add a description!"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
    },
}, {timestamps: true});

const Task = mongoose.model("Task", taskSchema);

export default Task;