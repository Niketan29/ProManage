import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import TaskList from "../../components/task/TaskList";
import { createTaskApi, deleteTaskApi, getTasksApi } from "../../api/taskApi";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function Tasks() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Todo");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const projectTitle = location.state?.projectTitle;

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getTasksApi(projectId);
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line
  }, [projectId]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setCreating(true);
    setError("");

    try {
      const res = await createTaskApi({
        title,
        status,
        projectId,
      });
      setTasks((prev) => [res.data, ...prev]);
      setTitle("");
      setStatus("Todo");
      toast.success("Task created");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create task");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setError("");
    try {
      await deleteTaskApi(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      toast.success("Task deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {projectTitle ? `${projectTitle}` : "Tasks"}
          </h2>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard/projects")}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-white border hover:bg-gray-50"
          >
            ← Back to Projects
          </button>

          <button
            onClick={loadTasks}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-black transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Create Task */}
      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 mb-4">Create New Task</h3>

        <form
          onSubmit={handleCreateTask}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title *"
            className="w-full rounded-xl border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <button
            disabled={creating}
            className="rounded-xl bg-blue-600 text-white font-semibold px-4 py-2.5 hover:bg-blue-700 transition disabled:opacity-60"
          >
            {creating ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 mb-4">Task List</h3>

        {loading ? (
          <Loader text="Loading tasks..." />
        ) : tasks.length === 0 ? (
          <div className="text-gray-600 text-sm">
            No tasks yet. Create your first one above 👆
          </div>
        ) : (
          <TaskList tasks={tasks} onDelete={handleDeleteTask} />
        )}
      </div>
    </div>
  );
}
