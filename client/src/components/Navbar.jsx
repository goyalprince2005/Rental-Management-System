import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Building2,
  DoorOpen,
  Users,
  Receipt,
  CreditCard,
  FileText,
  BarChart3,
  Settings,
  UserCircle,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Dashboard",
      path: "/owner-dashboard",
      icon: Home,
    },
    {
      name: "Properties",
      path: "/properties",
      icon: Building2,
    },
    {
      name: "Rooms",
      path: "/rooms",
      icon: DoorOpen,
    },
    {
      name: "Tenants",
      path: "/tenants",
      icon: Users,
    },
    {
      name: "Rent & Bills",
      path: "/rent-bills",
      icon: Receipt,
    },
    {
      name: "Payments",
      path: "/payments",
      icon: CreditCard,
    },
    {
      name: "Documents",
      path: "/documents",
      icon: FileText,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: BarChart3,
    },
  ];

  return (
    <nav className="bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="h-16 flex items-center justify-between">

          {/* ================= LOGO ================= */}

          <button
            onClick={() => navigate("/owner-dashboard")}
            className="flex items-center gap-2 shrink-0"
          >

            <div className="p-2 bg-blue-50 rounded-lg">

              <Home
                size={22}
                className="text-blue-600"
              />

            </div>

            <span className="text-lg font-bold text-blue-600 hidden sm:block">
              Rental Management
            </span>

          </button>


          {/* ================= NAVIGATION ================= */}

          <div className="hidden lg:flex items-center gap-1 overflow-x-auto">

            {navItems.map((item) => {

              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition whitespace-nowrap"
                >

                  <Icon size={18} />

                  <span className="text-sm font-medium">
                    {item.name}
                  </span>

                </button>
              );

            })}

          </div>


          {/* ================= SETTINGS / OWNER ================= */}

          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition shrink-0"
            title="Settings"
          >

            <UserCircle
              size={28}
              className="text-gray-600"
            />

            <span className="hidden xl:block text-sm font-medium text-gray-700">
              Owner
            </span>

          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;