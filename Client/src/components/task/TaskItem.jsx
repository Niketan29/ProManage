export default function TaskItem({ task, onDelete }) {
  const statusColor =
    task.status === "Done"
      ? "bg-green-100 text-green-700"
      : task.status === "In Progress"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-700";

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h4 className="text-base sm:text-lg font-bold text-gray-900 break-words">
            {task.title}
          </h4>
          <p className="text-xs text-gray-500 mt-2">
            Created: {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => onDelete(task._id)}
          className="shrink-0 px-3 py-2 rounded-xl text-sm font-semibold bg-red-50 text-red-600 hover:bg-red-100"
        >
          Delete
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusColor}`}
        >
          {task.status}
        </span>

        <span className="text-xs text-gray-400">Task ID: {task._id.slice(-6)}</span>
      </div>
    </div>
  );
}
