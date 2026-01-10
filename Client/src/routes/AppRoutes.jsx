import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/dashboard/Projects";
import Tasks from "../pages/dashboard/Tasks";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Overview from "../pages/dashboard/Overview";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks/:projectId" element={<Tasks />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// function Overview() {
//   const stats = [
//     { label: "Projects", value: "Manage all projects easily" },
//     { label: "Tasks", value: "Track tasks per project" },
//     { label: "Productive", value: "Stay consistent daily" },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="card p-6">
//         <h2 className="text-2xl font-extrabold text-gray-900">
//           Dashboard Overview
//         </h2>
//         <p className="text-gray-600 mt-2 text-sm">
//           Welcome to ProManage. Create projects and manage tasks efficiently.
//         </p>
//       </div>

//       <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//         {stats.map((s) => (
//           <div key={s.label} className="card p-5 hover:shadow-md transition">
//             <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
//               {s.label}
//             </p>
//             <p className="mt-2 text-sm font-semibold text-gray-900">
//               {s.value}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="card p-6">
//         <h3 className="font-bold text-gray-900">Tip 💡</h3>
//         <p className="text-gray-600 text-sm mt-2">
//           Use the Projects section to add new projects and open tasks inside
//           them.
//         </p>
//       </div>
//     </div>
//   );
// }
