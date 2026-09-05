import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  CreditCard,
  FileText,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function TenantNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("tenantId");
    setIsOpen(false);
    navigate("/tenant-login");
  };

  // ================= MY DETAILS =================

  const handleMyDetails = () => {
    const tenantId = localStorage.getItem("tenantId");

    if (tenantId) {
      setIsOpen(false);
      navigate(`/tenant-details/${tenantId}?view=tenant`);
    }
  };

  // ================= SIDEBAR CLOSE =================

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // ================= ACTIVE PAGE =================

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* ===================================================== */}
      {/* ================= TOP NAVBAR ======================== */}
      {/* ===================================================== */}

      <header className="bg-white shadow-sm border-b sticky top-0 z-40">

        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

          {/* ================= LEFT SIDE ================= */}

          <div className="flex items-center gap-3">

            {/* HAMBURGER BUTTON */}

            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-lg hover:bg-green-50 transition"
              aria-label="Open tenant menu"
            >
              <Menu
                size={24}
                className="text-gray-700"
              />
            </button>


            {/* LOGO */}

            <button
              onClick={() => navigate("/tenant-dashboard")}
              className="flex items-center gap-3"
            >

              <div className="p-2 bg-green-50 rounded-lg">

                <Home
                  size={22}
                  className="text-green-600"
                />

              </div>

              <span className="text-xl font-bold text-green-600">
                Tenant Portal
              </span>

            </button>

          </div>


          {/* ================= LOGOUT ================= */}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >

            <LogOut size={18} />

            <span className="hidden sm:inline">
              Logout
            </span>

          </button>

        </div>

      </header>


      {/* ===================================================== */}
      {/* ================= BACKGROUND OVERLAY ================= */}
      {/* ===================================================== */}

      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />


      {/* ===================================================== */}
      {/* ================= TENANT SIDEBAR ===================== */}
      {/* ===================================================== */}

      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* ================= SIDEBAR HEADER ================= */}

        <div className="h-20 border-b px-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="p-2 bg-green-50 rounded-lg">

              <Home
                size={22}
                className="text-green-600"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-green-600">
                Tenant Portal
              </h2>

              <p className="text-xs text-gray-500">
                Tenant Panel
              </p>

            </div>

          </div>


          {/* CLOSE BUTTON */}

          <button
            onClick={closeSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Close tenant menu"
          >

            <X size={22} />

          </button>

        </div>


        {/* ================= SIDEBAR MENU ================= */}

        <div className="p-3 overflow-y-auto h-[calc(100vh-5rem)]">

          {/* ================= DASHBOARD ================= */}

          <button
            onClick={() => {
              closeSidebar();
              navigate("/tenant-dashboard");
            }}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition text-left mb-2 ${
              isActive("/tenant-dashboard")
                ? "bg-green-50 text-green-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >

            <Home size={22} />

            <span className="text-base font-medium">
              Dashboard
            </span>

          </button>


          {/* ================= MY DETAILS ================= */}

          <button
            onClick={handleMyDetails}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition text-left mb-2 ${
              location.pathname.startsWith("/tenant-details")
                ? "bg-green-50 text-green-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >

            <User size={22} />

            <span className="text-base font-medium">
              My Details
            </span>

          </button>


          {/* ================= PAYMENTS ================= */}

          <button
            onClick={() => {
              closeSidebar();
              navigate("/tenant-payments");
            }}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition text-left mb-2 ${
              isActive("/tenant-payments")
                ? "bg-green-50 text-green-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >

            <CreditCard size={22} />

            <span className="text-base font-medium">
              Payments
            </span>

          </button>


          {/* ================= DOCUMENTS ================= */}

          <button
            onClick={() => {
              closeSidebar();
              navigate("/tenant-documents");
            }}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition text-left mb-2 ${
              isActive("/tenant-documents")
                ? "bg-green-50 text-green-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >

            <FileText size={22} />

            <span className="text-base font-medium">
              Documents
            </span>

          </button>


          {/* ================= NOTICES ================= */}

          <button
            onClick={() => {
              closeSidebar();
              navigate("/tenant-notices");
            }}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition text-left mb-2 ${
              isActive("/tenant-notices")
                ? "bg-green-50 text-green-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >

            <Bell size={22} />

            <span className="text-base font-medium">
              Notices
            </span>

          </button>


          {/* ================= DIVIDER ================= */}

          <div className="border-t my-4" />


          {/* ================= SIDEBAR LOGOUT ================= */}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left text-red-600 hover:bg-red-50 transition"
          >

            <LogOut size={22} />

            <span className="text-base font-medium">
              Logout
            </span>

          </button>

        </div>

      </aside>
    </>
  );
}

export default TenantNavbar;