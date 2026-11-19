
import React from "react";
import { Outlet } from "react-router-dom";

import { useOwnerTheme } from "../context/OwnerThemeContext";

function OwnerLayout({ children }) {
  const { theme, isDarkMode } = useOwnerTheme();

  return (
    <div
      className={`owner-theme min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "dark bg-gray-950 text-gray-100"
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

export default OwnerLayout;
