import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  CreditCard,
  FileText,
  Bell,
  Wrench,
  LogOut,
  Menu,
  X,
  Settings,
  ChevronDown,
} from "lucide-react";

function TenantNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // ================= MOCK TENANT DATA =================

  const tenants = {
    "1": {
      name: "Rahul Sharma",
    },
    "2": {
      name: "Aman Kumar",
    },
    "3": {
      name: "Neha Sharma",
    },
  };

  // ================= GET LOGGED-IN TENANT =================

  const tenantId = localStorage.getItem("tenantId");
  const tenant = tenants[tenantId];

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("tenantId");
    setIsOpen(false);
    setIsProfileOpen(false);
    navigate("/tenant-login");
  };

  // ================= MY DETAILS =================

  const handleMyDetails = () => {
    const currentTenantId = localStorage.getItem("tenantId");

    if (currentTenantId) {
      setIsOpen(false);
      setIsProfileOpen(false);
      navigate(`/tenant-details/${currentTenantId}?view=tenant`);
    }
  };

  // ================= CHANGE PASSWORD =================

  const handleChangePassword = () => {
    setIsProfileOpen(false);
    navigate("/tenant-change-password");
  };

  // ================= SIDEBAR CLOSE =================

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // ================= PROFILE DROPDOWN CLOSE =================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ================= ACTIVE PAGE =================

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isDetailsActive = () => {
    return location.pathname.startsWith("/tenant-details");
  };

  const isChangePasswordActive = () => {
    return location.pathname === "/tenant-change-password";
  };

  // ================= TOP NAVIGATION =================

  const navigateFromNavbar = (path) => {
    navigate(path);
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


          {/* ================================================= */}
          {/* ================= TOP NAV LINKS ================= */}
          {/* ================================================= */}

          <nav className="hidden lg:flex items-center gap-1">

            {/* ================= DASHBOARD ================= */}

            <button
              onClick={() => navigateFromNavbar("/tenant-dashboard")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive("/tenant-dashboard")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Dashboard
            </button>


            {/* ================= PAYMENTS ================= */}

            <button
              onClick={() => navigateFromNavbar("/tenant-payments")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive("/tenant-payments")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Payments
            </button>


            {/* ================= DOCUMENTS ================= */}

            <button
              onClick={() => navigateFromNavbar("/tenant-documents")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive("/tenant-documents")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Documents
            </button>


            {/* ================= NOTICES ================= */}

            <button
              onClick={() => navigateFromNavbar("/tenant-notices")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive("/tenant-notices")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Notices
            </button>


            {/* ================= MAINTENANCE ================= */}

            <button
              onClick={() => navigateFromNavbar("/tenant-maintenance")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive("/tenant-maintenance")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Maintenance
            </button>

          </nav>


          {/* ================================================= */}
          {/* ================= PROFILE + LOGOUT ============== */}
          {/* ================================================= */}

          <div className="flex items-center gap-2">

            {/* ================= PROFILE DROPDOWN ================= */}

            <div
              ref={profileRef}
              className="relative"
            >

              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isProfileOpen
                    ? "bg-green-50 text-green-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-label="Open tenant profile"
              >

                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">

                  <User
                    size={20}
                    className="text-green-600"
                  />

                </div>

                <div className="hidden md:block text-left">

                  <p className="text-sm font-semibold text-gray-800">
                    {tenant ? tenant.name : "Tenant"}
                  </p>

                  <p className="text-xs text-gray-500">
                    My Account
                  </p>

                </div>

                <ChevronDown
                  size={17}
                  className={`hidden sm:block transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />

              </button>


              {/* ================= PROFILE MENU ================= */}

              {isProfileOpen && (

                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border overflow-hidden z-50">

                  {/* PROFILE HEADER */}

                  <div className="p-4 border-b bg-gray-50">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">

                        <User
                          size={22}
                          className="text-green-600"
                        />

                      </div>

                      <div className="min-w-0">

                        <p className="font-semibold text-gray-800 truncate">
                          {tenant ? tenant.name : "Tenant"}
                        </p>

                        <p className="text-xs text-gray-500">
                          Tenant Account
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* MY DETAILS */}

                  <button
                    onClick={handleMyDetails}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                      isDetailsActive()
                        ? "bg-green-50 text-green-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >

                    <User size={18} />

                    <span className="text-sm font-medium">
                      My Details
                    </span>

                  </button>


                  {/* CHANGE PASSWORD */}

                  <button
                    onClick={handleChangePassword}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                      isChangePasswordActive()
                        ? "bg-green-50 text-green-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >

                    <Settings size={18} />

                    <span className="text-sm font-medium">
                      Change Password
                    </span>

                  </button>


                  {/* DIVIDER */}

                  <div className="border-t" />


                  {/* LOGOUT */}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition"
                  >

                    <LogOut size={18} />

                    <span className="text-sm font-medium">
                      Logout
                    </span>

                  </button>

                </div>

              )}

            </div>


        

          </div>

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
              isDetailsActive()
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


          {/* ================= MAINTENANCE ================= */}

          <button
            onClick={() => {
              closeSidebar();
              navigate("/tenant-maintenance");
            }}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition text-left mb-2 ${
              isActive("/tenant-maintenance")
                ? "bg-green-50 text-green-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >

            <Wrench size={22} />

            <span className="text-base font-medium">
              Maintenance & Complaints
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