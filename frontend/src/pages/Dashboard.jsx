import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const cards = [
  { title: "Manage Cars", to: "/cars", color: "bg-blue-500" },
  { title: "Manage Services", to: "/services", color: "bg-emerald-500" },
  { title: "Service Records", to: "/service-records", color: "bg-violet-500" },
  { title: "Payments", to: "/payments", color: "bg-amber-500" },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="mb-6 text-left text-2xl font-semibold text-gray-900">Dashboard</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className={`${card.color} rounded-lg p-6 text-left text-white shadow transition hover:scale-[1.01]`}
            >
              <p className="text-xl font-semibold">{card.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
