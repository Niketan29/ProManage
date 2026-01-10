import api from "./axios";

export const getTasksApi = (projectId) => api.get(`/api/tasks/${projectId}`);
export const createTaskApi = (data) => api.post("/api/tasks", data);
export const deleteTaskApi = (taskId) => api.delete(`/api/tasks/${taskId}`);
