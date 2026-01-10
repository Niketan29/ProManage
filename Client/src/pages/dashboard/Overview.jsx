import { useEffect, useMemo, useState } from "react";
import Skeleton from "../../components/common/Skeleton";
import { getProjectsApi } from "../../api/projectApi";
import { getTasksApi } from "../../api/taskApi";
import { getErrorMessage } from "../../utils/getErrorMessage";

export default function Overview() {
  const [loading, setLoading] = useState(true);
  const [projectsCount, setProjectsCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const stats = useMemo(() => {
    const totalTasks = tasks.length;

    const todo = tasks.filter((t) => t.status === "Todo").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const done = tasks.filter((t) => t.status === "Done").length;

    return { totalTasks, todo, inProgress, done };
  }, [tasks]);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError("");

      try {
        const projectsRes = await getProjectsApi();
        const projects = Array.isArray(projectsRes.data) ? projectsRes.data : [];
        setProjectsCount(projects.length);

        const tasksArr = [];
        for (const p of projects) {
          const tRes = await getTasksApi(p._id);
          if (Array.isArray(tRes.data)) tasksArr.push(...tRes.data);
        }

        setTasks(tasksArr);
      } catch (err) {
        setError(getErrorMessage(err, "Failed to load dashboard stats"));
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="card p-6">
          <Skeleton lines={3} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card p-5"><Skeleton lines={2} /></div>
          <div className="card p-5"><Skeleton lines={2} /></div>
          <div className="card p-5"><Skeleton lines={2} /></div>
          <div className="card p-5"><Skeleton lines={2} /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="card p-6">
        <h2 className="text-2xl font-extrabold text-gray-900">
          Dashboard Overview
        </h2>
        <p className="text-gray-600 mt-2 text-sm">
          Live summary of your projects & tasks.
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Projects" value={projectsCount} />
        <StatCard label="Total Tasks" value={stats.totalTasks} />
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-gray-900">Task Status Split</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <StatusPill label="Todo" value={stats.todo} />
          <StatusPill label="In Progress" value={stats.inProgress} />
          <StatusPill label="Done" value={stats.done} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card p-5 hover:shadow-md transition">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-extrabold text-gray-900">{value}</p>
    </div>
  );
}

function StatusPill({ label, value }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <p className="text-sm font-bold text-gray-900">{label}</p>
      <p className="text-sm text-gray-600 mt-1">{value} tasks</p>
    </div>
  );
}
