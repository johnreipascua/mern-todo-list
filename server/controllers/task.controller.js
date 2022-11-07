const Task = require('../models/task.model');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const addTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, task });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ success: false, msg: 'task not found'});
        }
        res.status(200).json({ success: true, task });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
        if (!task) {
            return res.status(404).json({ success: false, msg: 'task not found'});
        }
        res.status(200).json({ success: true, task });
    } catch (error) {
        
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ success: false, msg: 'task not found'});
        }
        res.status(200).json({ success: true, task });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    getAllTasks, addTask, getTask, updateTask, deleteTask
}