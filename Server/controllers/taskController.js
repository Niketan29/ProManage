import Task from "../models/task.js";


export const createTask = async (req, res) => {
try {
const task = await Task.create(req.body);
return res.status(201).json(task);
} catch (error) {
return res.status(500).json({ message: error.message });
}
};


export const getTasksByProject = async (req, res) => {
try {
const tasks = await Task.find({ projectId: req.params.projectId });
res.json(tasks);
} catch (error) {
return res.status(500).json({ message: error.message });
}
};


export const updateTaskStatus = async (req, res) => {
try {
const task = await Task.findByIdAndUpdate(
req.params.id,
{ status: req.body.status },
{ new: true }
);


res.json(task);
} catch (error) {
return res.status(500).json({ message: error.message });
}
};


export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
