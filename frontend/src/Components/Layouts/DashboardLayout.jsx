import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-slate-50">

      {/* Sidebar Always Visible */}
      <DashboardSidebar />

      {/* Main Content + Navbar */}
      <div className="flex-1 p-6">

        {/* Navbar also always visible */}
        <DashboardNavbar />

        {/* Page content changes here */}
        <Outlet />

      </div>
    </div>
  );
}
