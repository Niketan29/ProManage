import api from "./axios";

export const getProjectsApi = () => api.get("/api/projects");
export const createProjectApi = (data) => api.post("/api/projects", data);
export const deleteProjectApi = (id) => api.delete(`/api/projects/${id}`);
