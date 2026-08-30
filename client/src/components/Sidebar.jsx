import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      path: null,
      description: "Manage your rental management settings.",
    },
  ];

  const handleNavigation = (item) => {
    if (item.path) {
      navigate(item.path);
      setHoveredItem(null);
    }
  };

  const closeSidebar = () => {
    setIsOpen(false);
    setHoveredItem(null);
  };

  return (
    <>
      {/* ================= HAMBURGER BUTTON ================= */}

      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition ${
          isOpen
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <Menu size={24} />
      </button>

      {/* ================= BACKGROUND OVERLAY ================= */}

      <div
        className={`fixed inset-0 bg-black/20 z-30 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      {/* ================= SIDEBAR ================= */}

      <div
        className={`fixed left-0 top-0 h-screen w-72 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
        onMouseLeave={() => setHoveredItem(null)}
      >

        {/* ================= SIDEBAR HEADER ================= */}

        <div className="h-32 border-b px-6 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-blue-600">
              Rental Menu
            </h2>

            <p className="text-gray-500 mt-1">
              Owner Panel
            </p>
          </div>

          <button
            onClick={closeSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>

        </div>

        {/* ================= MENU ITEMS ================= */}

        <div className="p-3 overflow-y-auto h-[calc(100vh-8rem)]">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.name)}
              >

                {/* MENU BUTTON */}

                <button
                  onClick={() => handleNavigation(item)}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-gray-100 transition text-left"
                >

                  <Icon size={24} />

                  <span className="text-lg">
                    {item.name}
                  </span>

                  <span className="ml-auto text-xl">
                    ›
                  </span>

                </button>

                {/* ================= HOVER INFORMATION ================= */}

                {hoveredItem === item.name && (
                  <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 w-72 bg-white rounded-xl shadow-xl border p-5 z-50">

                    <div className="flex items-start gap-3">

                      <div className="p-2 bg-blue-50 rounded-full">

                        <Icon
                          size={20}
                          className="text-blue-600"
                        />

                      </div>

                      <div>

                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 leading-5">
                          {item.description}
                        </p>

                      </div>

                    </div>

                  </div>
                )}

              </div>
            );
          })}

        </div>
      </div>
    </>
  );
}

export default Sidebar;