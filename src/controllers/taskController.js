import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}

export async function getTaskById(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Validation failed',
        details: ['ID must be a number']
      });
    }
    
    const task = await taskService.getTaskById(id);
    res.json(task);
  } catch (error) {
    if (error.message === 'Task not found') {
      res.status(404).json({ error: 'Task not found' });
    } else {
      next(error);
    }
  }
}
