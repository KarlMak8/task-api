import * as taskRepository from '../repositories/taskRepo.js';

export async function getAllTasks() {
  return taskRepository.findAll();
}

export async function createTask(newTask) {
  return taskRepository.create(newTask);
}

export async function getTaskById(id) {
  const task = await taskRepository.findById(id);
  if (!task) {
    throw new Error('Task not found');
  }
  return task;
}
