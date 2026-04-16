import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Cars", to: "/cars" },
  { label: "Services", to: "/services" },
  { label: "Service Records", to: "/service-records" },
  { label: "Payments", to: "/payments" },
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span>Car Wash</span>
          {username && <span className="text-sm text-slate-300">({username})</span>}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded px-3 py-2 text-sm transition ${
                  active ? "bg-blue-600 text-white" : "text-slate-200 hover:bg-slate-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded bg-red-500 px-3 py-2 text-sm font-medium hover:bg-red-600"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
