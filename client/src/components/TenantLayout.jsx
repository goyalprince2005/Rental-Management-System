
import React from "react";
import { Outlet } from "react-router-dom";

import TenantNavbar from "./TenantNavbar";
import { useTenantTheme } from "../context/TenantThemeContext";

// =========================================================
// TENANT PORTAL LAYOUT
// =========================================================

function TenantLayout() {
  const { theme, isDarkMode } = useTenantTheme();

  return (
    <div
      className={`tenant-theme min-h-screen transition-colors duration-200 ${
        isDarkMode
          ? "dark bg-gray-900 text-gray-100"
          : "bg-slate-50 text-gray-900"
      }`}
      data-theme={theme}
    >
      {/* ================================================= */}
      {/* TENANT NAVBAR */}
      {/* ================================================= */}

      <TenantNavbar />

      {/* ================================================= */}
      {/* TENANT PAGE CONTENT */}
      {/* ================================================= */}

      <main className="min-h-[calc(100vh-4rem)] bg-slate-50 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100">
        <Outlet />
      </main>
    </div>
  );
}

export default TenantLayout;
