import { NavLink } from "react-router-dom";

const linkBase = "block px-4 py-3 rounded-xl text-sm font-semibold transition";

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-72 bg-white border-r p-4
        transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="hidden md:flex items-center gap-2 px-2 py-3">
          <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
            PM
          </div>
          <div>
            <p className="font-extrabold text-gray-900 leading-4">ProManage</p>
            <p className="text-xs text-gray-500">Project Dashboard</p>
          </div>
        </div>

        <div className="h-12 flex items-center justify-between md:hidden">
          <p className="font-bold text-gray-900">Menu</p>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        <nav className="mt-2 space-y-2">
          <NavLink
            to="/dashboard/projects"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            📁 Projects
          </NavLink>

          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            📊 Overview
          </NavLink>
        </nav>

      </aside>
    </>
  );
}
