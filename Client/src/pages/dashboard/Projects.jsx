import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import {
  createProjectApi,
  deleteProjectApi,
  getProjectsApi,
} from "../../api/projectApi";
import ProjectCard from "../../components/project/ProjectCard";
import toast from "react-hot-toast";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getProjectsApi();
      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setCreating(true);
    setError("");
    try {
      const res = await createProjectApi({ title, description });
      setProjects((prev) => [res.data, ...prev]);
      setTitle("");
      setDescription("");
      toast.success("Project created ✅", { id: "projectCreated" });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await deleteProjectApi(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("Project deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete project ❌");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600 text-sm">
            Create projects and manage tasks inside them.
          </p>
        </div>

        <button
          onClick={loadProjects}
          className="self-start sm:self-auto px-4 py-2 rounded-xl text-sm font-semibold bg-white border hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 mb-4">Create New Project</h3>

        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title *"
            className="w-full rounded-xl border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full rounded-xl border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            disabled={creating}
            className="rounded-xl bg-blue-600 text-white font-semibold px-4 py-2.5 hover:bg-blue-700 transition disabled:opacity-60"
          >
            {creating ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 mb-4">Your Projects</h3>

        {loading ? (
          <Loader text="Loading projects..." />
        ) : projects.length === 0 ? (
          <div className="text-gray-600 text-sm">
            No projects yet. Create your first one above 👆
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p._id} project={p} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
