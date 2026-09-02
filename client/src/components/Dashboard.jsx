import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Menu,
  Home,
  Building2,
  DoorOpen,
  Users,
  Receipt,
  CreditCard,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Printer,
  ChevronRight,
  AlertTriangle,
  Info,
} from "lucide-react";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({
    top: 0,
    left: 0,
  });

  const navigate = useNavigate();

  const menuItems = [
    {
      id: "properties",
      label: "Properties",
      icon: Building2,
      description:
        "View and manage all your rental properties.",
      path: "/properties",
    },
    {
      id: "rooms",
      label: "Rooms",
      icon: DoorOpen,
      description:
        "View and manage rooms across your properties.",
      path: "/rooms",
    },
    {
      id: "tenants",
      label: "Tenants",
      icon: Users,
      description:
        "Manage tenant information and occupancy.",
      path: "/tenants",
    },
    {
      id: "rent",
      label: "Rent & Bills",
      icon: Receipt,
      description:
        "Track rent collection, pending bills and monthly dues.",
      path: "/rent-bills",
    },
    {
      id: "payments",
      label: "Payments",
      icon: CreditCard,
      description:
        "View and manage rental payment transactions.",
      path: "/payments",
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      description:
        "Manage tenant agreements and important rental documents.",
      path: "/documents",
    },
    {
      id: "reports",
      label: "Reports",
      icon: BarChart3,
      description:
        "View rental income, occupancy and property reports.",
      path: "/reports",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      description:
        "Manage your rental system preferences and settings.",
      path: "/settings",
    },
  ];

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setHoveredItem(null);
  };

  const handleMenuHover = (itemId, event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setHoveredItem(itemId);

    setHoverPosition({
      top: rect.top,
      left: rect.right + 12,
    });
  };

  const handleNavigation = (path) => {
    if (!path) return;

    closeMenu();
    navigate(path);
  };

  const activeItem = menuItems.find(
    (item) => item.id === hoveredItem
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TOP NAVBAR ================= */}

      <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6">

        <div className="flex items-center gap-4">

          {/* HAMBURGER */}

          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setHoveredItem(null);
            }}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            title="Rental Menu"
          >
            <Menu size={24} />
          </button>

          {/* TITLE */}

          <div>
            <h1 className="text-xl font-bold text-blue-600">
              Rental Management
            </h1>

            <p className="text-xs text-gray-500 hidden sm:block">
              Owner Dashboard
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-2">

          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            title="Notifications"
          >
            <Bell size={21} />
          </button>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            title="Print"
          >
            <Printer size={21} />
          </button>

          <button className="hidden sm:block px-4 py-2 border rounded-lg hover:bg-gray-100">
            Owner
          </button>

        </div>

      </header>

      {/* ================= RENTAL MENU ================= */}

      {menuOpen && (
        <div className="fixed inset-0 z-50">

          {/* OVERLAY */}

          <div
            className="absolute inset-0 bg-black/30"
            onClick={closeMenu}
          />

          {/* MENU PANEL */}

          <aside
            className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl"
            onMouseLeave={() => setHoveredItem(null)}
          >

            {/* MENU HEADER */}

            <div className="p-5 border-b">

              <h2 className="text-xl font-bold text-blue-600">
                Rental Menu
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Owner Panel
              </p>

            </div>

            {/* SCROLLABLE MENU AREA */}

            <div className="h-[calc(100%-89px)] overflow-y-auto">

              <nav className="p-4 space-y-1">

                {/* DASHBOARD */}

                <button
                  onClick={() =>
                    handleNavigation("/owner-dashboard")
                  }
                  onMouseEnter={() => setHoveredItem(null)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white"
                >
                  <Home size={20} />
                  Dashboard
                </button>

                {/* OTHER OPTIONS */}

                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() =>
                        handleNavigation(item.path)
                      }
                      onMouseEnter={(event) =>
                        handleMenuHover(item.id, event)
                      }
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition"
                    >

                      <span className="flex items-center gap-3">

                        <Icon size={20} />

                        {item.label}

                      </span>

                      <ChevronRight size={18} />

                    </button>
                  );
                })}

                {/* LOGOUT */}

                <div className="border-t pt-3 mt-3">

                  <button
                    onClick={() => {
                      closeMenu();
                      navigate("/");
                    }}
                    onMouseEnter={() => setHoveredItem(null)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>

                </div>

              </nav>

            </div>

          </aside>

          {/* HOVER INFORMATION CARD */}

          {activeItem && (
            <div
              className="fixed w-72 bg-white border border-gray-200 shadow-xl rounded-xl p-4 z-50"
              style={{
                top: hoverPosition.top,
                left: hoverPosition.left,
              }}
            >

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">

                  <Info
                    size={18}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-gray-800">
                    {activeItem.label}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {activeItem.description}
                  </p>

                </div>

              </div>

            </div>
          )}

        </div>
      )}

      {/* ================= MAIN DASHBOARD ================= */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* WELCOME */}

        <div className="mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome back, Owner 👋
          </h2>

          <p className="text-gray-500 mt-1">
            Here's what's happening with your rental properties.
          </p>

        </div>

        {/* SUMMARY CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* TOTAL PROPERTIES */}

          <div className="bg-white rounded-xl shadow-sm p-5 border">

            <Building2
              className="text-blue-600"
              size={28}
            />

            <p className="text-gray-500 mt-4">
              Total Properties
            </p>

            <h3 className="text-3xl font-bold mt-1">
              2
            </h3>

          </div>

          {/* TOTAL ROOMS */}

          <div className="bg-white rounded-xl shadow-sm p-5 border">

            <DoorOpen
              className="text-green-600"
              size={28}
            />

            <p className="text-gray-500 mt-4">
              Total Rooms
            </p>

            <h3 className="text-3xl font-bold mt-1">
              25
            </h3>

          </div>

          {/* ACTIVE TENANTS */}

          <div className="bg-white rounded-xl shadow-sm p-5 border">

            <Users
              className="text-purple-600"
              size={28}
            />

            <p className="text-gray-500 mt-4">
              Active Tenants
            </p>

            <h3 className="text-3xl font-bold mt-1">
              22
            </h3>

          </div>

          {/* PENDING RENT */}

          <div className="bg-white rounded-xl shadow-sm p-5 border">

            <CreditCard
              className="text-orange-500"
              size={28}
            />

            <p className="text-gray-500 mt-4">
              Pending Rent
            </p>

            <h3 className="text-3xl font-bold mt-1">
              ₹25,000
            </h3>

          </div>

        </div>

        {/* PROPERTY + ATTENTION */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          {/* MY PROPERTIES */}

          <div className="bg-white rounded-xl shadow-sm border">

            <div className="p-5 border-b flex justify-between items-center">

              <div>

                <h2 className="text-xl font-bold">
                  My Properties
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Property and room overview
                </p>

              </div>

              <button
                onClick={() => navigate("/properties")}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                View All →
              </button>

            </div>

            <div className="p-5 space-y-4">

              {/* PROPERTY A */}

              <div className="border rounded-xl p-4 hover:shadow-sm transition">

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold text-lg">
                      Green View Apartments
                    </h3>

                    <p className="text-sm text-gray-500">
                      📍 Bhopal
                    </p>

                  </div>

                  <Building2
                    size={24}
                    className="text-blue-600"
                  />

                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center">

                  <div className="bg-gray-50 rounded-lg p-2">

                    <p className="text-xs text-gray-500">
                      Floors
                    </p>

                    <p className="font-bold">
                      5
                    </p>

                  </div>

                  <div className="bg-gray-50 rounded-lg p-2">

                    <p className="text-xs text-gray-500">
                      Rooms
                    </p>

                    <p className="font-bold">
                      13
                    </p>

                  </div>

                  <div className="bg-green-50 rounded-lg p-2">

                    <p className="text-xs text-gray-500">
                      Available
                    </p>

                    <p className="font-bold text-green-600">
                      3
                    </p>

                  </div>

                </div>

              </div>

              {/* PROPERTY B */}

              <div className="border rounded-xl p-4 hover:shadow-sm transition">

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold text-lg">
                      Shyam Residency
                    </h3>

                    <p className="text-sm text-gray-500">
                      📍 Bhopal
                    </p>

                  </div>

                  <Building2
                    size={24}
                    className="text-blue-600"
                  />

                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center">

                  <div className="bg-gray-50 rounded-lg p-2">

                    <p className="text-xs text-gray-500">
                      Floors
                    </p>

                    <p className="font-bold">
                      2
                    </p>

                  </div>

                  <div className="bg-gray-50 rounded-lg p-2">

                    <p className="text-xs text-gray-500">
                      Rooms
                    </p>

                    <p className="font-bold">
                      6
                    </p>

                  </div>

                  <div className="bg-green-50 rounded-lg p-2">

                    <p className="text-xs text-gray-500">
                      Available
                    </p>

                    <p className="font-bold text-green-600">
                      1
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ATTENTION REQUIRED */}

          <div className="bg-white rounded-xl shadow-sm border">

            <div className="p-5 border-b flex justify-between items-center">

              <div>

                <h2 className="text-xl font-bold">
                  Attention Required
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Things that need your attention
                </p>

              </div>

              <AlertTriangle
                size={25}
                className="text-orange-500"
              />

            </div>

            <div className="p-5 space-y-4">

              {/* RENT PENDING */}

              <div className="flex items-center justify-between p-4 rounded-xl bg-red-50">

                <div>

                  <p className="font-semibold text-red-700">
                    Rent Pending
                  </p>

                  <p className="text-sm text-red-600">
                    5 tenants have pending rent
                  </p>

                </div>

                <span className="font-bold text-red-700">
                  5
                </span>

              </div>

              {/* VACANT ROOMS */}

              <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-50">

                <div>

                  <p className="font-semibold text-yellow-700">
                    Vacant Rooms
                  </p>

                  <p className="text-sm text-yellow-700">
                    3 rooms are currently available
                  </p>

                </div>

                <span className="font-bold text-yellow-700">
                  3
                </span>

              </div>

              {/* DOCUMENTS */}

              <div className="flex items-center justify-between p-4 rounded-xl bg-orange-50">

                <div>

                  <p className="font-semibold text-orange-700">
                    Documents Expiring
                  </p>

                  <p className="text-sm text-orange-700">
                    4 tenant documents need attention
                  </p>

                </div>

                <span className="font-bold text-orange-700">
                  4
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ================= RECENT TENANTS ================= */}

        <div className="mt-8 bg-white rounded-xl shadow-sm border overflow-hidden">

          <div className="p-5 border-b flex justify-between items-center">

            <div>

              <h2 className="text-xl font-bold">
                Recent Tenants
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Recently added or active tenants
              </p>

            </div>

            <button
              onClick={() => navigate("/tenants")}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              View All →
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-5 py-4">
                    Tenant
                  </th>

                  <th className="px-5 py-4">
                    Property
                  </th>

                  <th className="px-5 py-4">
                    Room
                  </th>

                  <th className="px-5 py-4">
                    Rent
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {/* TENANT 1 */}

                <tr className="border-t">

                  <td className="px-5 py-4 font-medium">
                    Rahul Sharma
                  </td>

                  <td className="px-5 py-4">
                    Green View Apartments
                  </td>

                  <td className="px-5 py-4">
                    101
                  </td>

                  <td className="px-5 py-4">
                    ₹5,000
                  </td>

                  <td className="px-5 py-4">

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>

                  </td>

                </tr>

                {/* TENANT 2 */}

                <tr className="border-t">

                  <td className="px-5 py-4 font-medium">
                    Aman Kumar
                  </td>

                  <td className="px-5 py-4">
                    Green View Apartments
                  </td>

                  <td className="px-5 py-4">
                    102
                  </td>

                  <td className="px-5 py-4">
                    ₹6,000
                  </td>

                  <td className="px-5 py-4">

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>

                  </td>

                </tr>

                {/* TENANT 3 */}

                <tr className="border-t">

                  <td className="px-5 py-4 font-medium">
                    Neha Sharma
                  </td>

                  <td className="px-5 py-4">
                    Shyam Residency
                  </td>

                  <td className="px-5 py-4">
                    203
                  </td>

                  <td className="px-5 py-4">
                    ₹5,500
                  </td>

                  <td className="px-5 py-4">

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      Due
                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

        {/* ================= RECENT PAYMENTS ================= */}

        <div className="mt-8 bg-white rounded-xl shadow-sm border overflow-hidden">

          <div className="p-5 border-b flex justify-between items-center">

            <div>

              <h2 className="text-xl font-bold">
                Recent Payments
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Latest rent payment activity
              </p>

            </div>

            <button
              onClick={() => navigate("/payments")}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              View All →
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-5 py-4">
                    Tenant
                  </th>

                  <th className="px-5 py-4">
                    Property
                  </th>

                  <th className="px-5 py-4">
                    Room
                  </th>

                  <th className="px-5 py-4">
                    Amount
                  </th>

                  <th className="px-5 py-4">
                    Date
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {/* PAYMENT 1 */}

                <tr className="border-t">

                  <td className="px-5 py-4">
                    Rahul Sharma
                  </td>

                  <td className="px-5 py-4">
                    Green View Apartments
                  </td>

                  <td className="px-5 py-4">
                    101
                  </td>

                  <td className="px-5 py-4 font-medium">
                    ₹5,000
                  </td>

                  <td className="px-5 py-4">
                    Aug 01, 2026
                  </td>

                  <td className="px-5 py-4">

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Paid
                    </span>

                  </td>

                </tr>

                {/* PAYMENT 2 */}

                <tr className="border-t">

                  <td className="px-5 py-4">
                    Aman Kumar
                  </td>

                  <td className="px-5 py-4">
                    Green View Apartments
                  </td>

                  <td className="px-5 py-4">
                    102
                  </td>

                  <td className="px-5 py-4 font-medium">
                    ₹6,000
                  </td>

                  <td className="px-5 py-4">
                    Aug 02, 2026
                  </td>

                  <td className="px-5 py-4">

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Paid
                    </span>

                  </td>

                </tr>

                {/* PAYMENT 3 */}

                <tr className="border-t">

                  <td className="px-5 py-4">
                    Neha Sharma
                  </td>

                  <td className="px-5 py-4">
                    Shyam Residency
                  </td>

                  <td className="px-5 py-4">
                    203
                  </td>

                  <td className="px-5 py-4 font-medium">
                    ₹5,500
                  </td>

                  <td className="px-5 py-4">
                    Aug 05, 2026
                  </td>

                  <td className="px-5 py-4">

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      Due
                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;