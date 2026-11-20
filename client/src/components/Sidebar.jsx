
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  LayoutDashboard,
  Building2,
  DoorOpen,
  Users,
  Receipt,
  CreditCard,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // =========================================================
  // NAVIGATION ITEMS
  // =========================================================

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/owner-dashboard",
      description: "View your rental management dashboard.",
    },
    {
      name: "Properties",
      icon: Building2,
      path: "/properties",
      description: "View and manage all your rental properties.",
    },
    {
      name: "Rooms",
      icon: DoorOpen,
      path: "/rooms",
      description: "View and manage rooms across your properties.",
    },
    {
      name: "Tenants",
      icon: Users,
      path: "/tenants",
      description: "View and manage your rental tenants.",
    },
    {
      name: "Rent & Bills",
      icon: Receipt,
      path: "/rent-bills",
      description: "Manage rental bills and monthly rent information.",
    },
    {
      name: "Payments",
      icon: CreditCard,
      path: "/payments",
      description: "View and manage rental payment transactions.",
    },
    {
      name: "Documents",
      icon: FileText,
      path: "/documents",
      description: "Manage rental-related documents.",
    },
    {
      name: "Reports",
      icon: BarChart3,
      path: "/reports",
      description: "View rental reports and statistics.",
    },

    // =====================================================
    // NEW: COMPLAINTS
    // =====================================================

    {
      name: "Complaints",
      icon: MessageSquare,
      path: "/owner-complaints",
      description: "View tenant complaints and manage responses.",
    },

    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
      description: "Manage your rental management settings.",
    },
  ];

  // =========================================================
  // CLOSE SIDEBAR
  // =========================================================

  const closeSidebar = () => {
    setIsOpen(false);
    setHoveredItem(null);
  };

  // =========================================================
  // NAVIGATION
  // =========================================================

  const handleNavigation = (item) => {
    if (!item.path) return;

    navigate(item.path);
    closeSidebar();
  };

  // =========================================================
  // CLOSE SIDEBAR WITH ESCAPE
  // =========================================================

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setHoveredItem(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // =========================================================
  // CLOSE SIDEBAR AFTER NAVIGATION
  // =========================================================

  useEffect(() => {
    setIsOpen(false);
    setHoveredItem(null);
  }, [location.pathname]);

  // =========================================================
  // PAGE UI
  // =========================================================

  return (
    <>
      {/* =====================================================
          HAMBURGER BUTTON + TOOLTIP
      ===================================================== */}

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
        title="Open sidebar"
        aria-expanded={isOpen}
        aria-controls="owner-sidebar"
        className={`group fixed left-4 top-4 z-[9999]
          rounded-lg bg-blue-50 dark:bg-gray-800
          p-2 text-gray-700 dark:text-gray-200
          shadow-sm hover:bg-blue-100 dark:hover:bg-gray-700
          transition
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${
            isOpen
              ? "pointer-events-none opacity-0"
              : "opacity-100"
          }`}
      >
        <Menu size={24} />

        {/* TOOLTIP */}

        <span
          role="tooltip"
          className="pointer-events-none invisible
            absolute left-full top-1/2 z-[70] ml-3
            -translate-y-1/2 whitespace-nowrap
            rounded-md bg-gray-800 dark:bg-gray-700
            px-3 py-2 text-sm font-medium text-white
            shadow-lg opacity-0 transition-opacity duration-200
            group-hover:visible group-hover:opacity-100
            group-focus-visible:visible
            group-focus-visible:opacity-100"
        >
          Open sidebar
        </span>
      </button>

      {/* =====================================================
          BACKGROUND OVERLAY
      ===================================================== */}

      <button
        type="button"
        aria-label="Close sidebar"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeSidebar}
        className={`fixed inset-0 z-40
          bg-black/30 dark:bg-black/60
          transition-opacity duration-300
          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
      />

      {/* =====================================================
          SIDEBAR DRAWER
      ===================================================== */}

      <aside
        id="owner-sidebar"
        aria-label="Owner navigation"
        aria-hidden={!isOpen}
        className={`fixed left-0 top-0 z-50 flex
          h-screen w-72 max-w-[85vw] flex-col
          border-r border-gray-100 dark:border-gray-700
          bg-white dark:bg-gray-900
          shadow-xl dark:shadow-black/30
          transition-transform duration-300 ease-in-out
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        onMouseLeave={() => setHoveredItem(null)}
      >

        {/* =================================================
            SIDEBAR HEADER
        ================================================= */}

        <div
          className="flex h-20 shrink-0 items-center
            justify-between border-b border-gray-100
            dark:border-gray-700 px-5"
        >
          <div>
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Rental Menu
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Owner Panel
            </p>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="rounded-lg p-2
              text-gray-600 dark:text-gray-300
              transition hover:bg-blue-50
              dark:hover:bg-gray-800
              hover:text-blue-600 dark:hover:text-blue-400
              focus:outline-none focus:ring-2
              focus:ring-blue-500"
          >
            <X size={22} />
          </button>
        </div>

        {/* =================================================
            NAVIGATION OPTIONS
        ================================================= */}

        <nav
          aria-label="Main navigation"
          className="flex-1 space-y-1 overflow-y-auto p-3"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path;

            return (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() =>
                  setHoveredItem(item.name)
                }
                onFocus={() =>
                  setHoveredItem(item.name)
                }
              >
                <button
                  type="button"
                  onClick={() => handleNavigation(item)}
                  aria-current={isActive ? "page" : undefined}
                  title={item.description}
                  className={`flex w-full items-center
                    gap-3 rounded-xl px-4 py-3.5
                    text-left transition
                    focus:outline-none focus:ring-2
                    focus:ring-blue-500
                    ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950 font-semibold text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                >
                  <Icon size={21} className="shrink-0" />

                  <span className="flex-1 text-sm font-medium">
                    {item.name}
                  </span>

                  <span
                    className="text-lg"
                    aria-hidden="true"
                  >
                    ›
                  </span>
                </button>

                {hoveredItem === item.name && (
                  <span className="sr-only">
                    {item.description}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* =================================================
            SIDEBAR FOOTER
        ================================================= */}

        <div
          className="shrink-0 border-t border-gray-100
            dark:border-gray-700 p-4"
        >
          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            Rental Management System
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
