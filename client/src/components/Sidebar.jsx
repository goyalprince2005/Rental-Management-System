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
  Settings,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

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

    closeSidebar();
    navigate(item.path);
  };

  // =========================================================
  // PREVENT BACKGROUND SCROLL WHILE SIDEBAR IS OPEN
  // =========================================================

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // =========================================================
  // HIDE HOVER CARD WHEN ROUTE CHANGES
  // =========================================================

  useEffect(() => {
    setHoveredItem(null);
  }, [location.pathname]);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {/* HAMBURGER BUTTON */}

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open owner navigation"
        aria-expanded={isOpen}
        aria-controls="owner-sidebar"
        className={`fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-blue-50 text-gray-700 transition ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Menu size={24} />
      </button>

      {/* BACKGROUND OVERLAY */}

      <button
        type="button"
        aria-label="Close owner navigation"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/20 z-30 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* SIDEBAR */}

      <aside
        id="owner-sidebar"
        aria-label="Owner navigation"
        aria-hidden={!isOpen}
        className={`fixed left-0 top-0 h-screen w-72 max-w-[85vw] bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {/* SIDEBAR HEADER */}

        <div className="h-32 border-b px-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-blue-600">
              Rental Menu
            </h2>

            <p className="text-gray-500 mt-1">Owner Panel</p>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* MENU ITEMS */}

        <nav className="p-3 overflow-y-auto h-[calc(100vh-8rem)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isHovered = hoveredItem === item.name;

            return (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.name)}
                onFocus={() => setHoveredItem(item.name)}
              >
                <button
                  type="button"
                  onClick={() => handleNavigation(item)}
                  aria-current={isActive ? "page" : undefined}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition text-left ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <Icon size={22} />

                  <span className="text-base">{item.name}</span>

                  <span className="ml-auto text-xl" aria-hidden="true">
                    ›
                  </span>
                </button>

                {/* HOVER INFORMATION CARD */}

                {isOpen && isHovered && (
                  <div
                    role="tooltip"
                    className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 w-64 max-w-[70vw] bg-white rounded-xl shadow-xl border border-blue-100 p-4 z-50 pointer-events-none"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-full shrink-0">
                        <Icon size={20} className="text-blue-600" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-blue-700">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-600 mt-1 leading-5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
