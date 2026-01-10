import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="border rounded-2xl p-4 hover:shadow-md transition bg-white">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-bold text-gray-900 truncate">
            {project.title}
          </h4>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {project.description || "No description"}
          </p>
        </div>

        <button
          onClick={() => onDelete(project._id)}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-50 text-red-600 hover:bg-red-100"
        >
          Delete
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Created: {new Date(project.createdAt).toLocaleDateString()}
        </span>

        <button
          onClick={() => navigate(`/dashboard/tasks/${project._id}`, {state: { projectTitle: project.title }})}
          className="px-3 py-2 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-black transition"
        >
          View Tasks →
        </button>
      </div>
    </div>
  );
}
