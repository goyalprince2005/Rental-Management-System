
import React from "react";
import { Outlet } from "react-router-dom";

import { useTenantTheme } from "../context/TenantThemeContext";

function TenantLayout({ children }) {
  const { theme, isDarkMode } = useTenantTheme();

  return (
    <div
      className={`tenant-theme min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "dark bg-gray-900 text-gray-100"
          : "bg-slate-50 text-gray-900"
      }`}
      data-theme={theme}
    >
      <main className="min-h-screen">
        {children || <Outlet />}
      </main>
    </div>
  );
}

export default TenantLayout;