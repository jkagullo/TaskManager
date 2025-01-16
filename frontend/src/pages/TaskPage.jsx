import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Task from '../components/Task';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Low',
        completed: false
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await axios.get('http://localhost:4000/api/tasks');
        setTasks(res.data.tasks);
    }

    const createTask = async () => {
        await axios.post('http://localhost:4000/api/tasks', newTask);
        fetchTasks();
    }

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:4000/api/tasks/${id}`);
        fetchTasks();
    }

    const updateTask = async (id, updatedTask) => {
        try {
          await axios.put(`http://localhost:4000/api/tasks/${id}`, updatedTask);
          fetchTasks();
        } catch (error) {
          console.error('Error updating task:', error);
        }
      };

    return (
        <div>
            <div>
            <h1>Task Manager</h1>
            <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />

            <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />

            <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />

            <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button onClick={createTask}>Add Task</button>
            </div>
        <div>
        <div>   
            {tasks.map((task) => (
          <Task key={task._id} task={task} onDelete={deleteTask} onUpdate={updateTask} />
        ))}
        </div>
        </div>
    </div>
    )
}

export default TaskPage;