import express from "express";
import {
    createTask,
    getTasksByProject,
    updateTaskStatus,
    deleteTask
} from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();


router.post("/", protect, createTask);
router.get("/:projectId", protect, getTasksByProject);
router.put("/:id", protect, updateTaskStatus);
router.delete("/:id", protect, deleteTask);



export default router;