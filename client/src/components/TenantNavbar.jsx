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

  // Used to remember the page position
  // while the sidebar is open.
  const scrollPositionRef = useRef(0);

  // Used to close the sidebar after navigation.
  const navigationTimerRef = useRef(null);

  // =========================================================
  // MOCK TENANT DATA
  // =========================================================

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

  // =========================================================
  // GET LOGGED-IN TENANT
  // =========================================================

  const tenantId = localStorage.getItem("tenantId");
  const tenant = tenants[tenantId];

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    clearNavigationTimer();

    localStorage.removeItem("tenantId");

    setIsOpen(false);
    setIsProfileOpen(false);

    navigate("/tenant-login");
  };

  // =========================================================
  // MY DETAILS
  // =========================================================

  const handleMyDetails = () => {
    const currentTenantId = localStorage.getItem("tenantId");

    if (!currentTenantId) {
      return;
    }

    /*
      IMPORTANT:

      Do NOT close the sidebar before navigation.

      We navigate first while the sidebar + overlay
      are still covering the background page.

      This prevents the old page movement from being
      visible to the user.
    */

    navigate(
      `/tenant-details/${currentTenantId}?view=tenant`
    );

    closeSidebarAfterNavigation();
    setIsProfileOpen(false);
  };

  // =========================================================
  // CHANGE PASSWORD
  // =========================================================

  const handleChangePassword = () => {
    /*
      Navigate first.
      Keep sidebar/overlay visible during the route change.
    */

    navigate("/tenant-change-password");

    closeSidebarAfterNavigation();

    setIsProfileOpen(false);
  };

  // =========================================================
  // CLEAR NAVIGATION TIMER
  // =========================================================

  const clearNavigationTimer = () => {
    if (navigationTimerRef.current) {
      clearTimeout(navigationTimerRef.current);
      navigationTimerRef.current = null;
    }
  };

  // =========================================================
  // SIDEBAR NAVIGATION
  // =========================================================

  const handleSidebarNavigation = (path) => {
    /*
      IMPORTANT:

      Do NOT call setIsOpen(false) immediately.

      First navigate while the sidebar and overlay are
      still visible.

      Therefore the user cannot see the background page
      changing/moving underneath.
    */

    navigate(path);

    closeSidebarAfterNavigation();
  };

  // =========================================================
  // CLOSE SIDEBAR AFTER NAVIGATION
  // =========================================================

  const closeSidebarAfterNavigation = () => {
    clearNavigationTimer();

    /*
      Wait for the route change to happen underneath
      the overlay.

      The user sees the sidebar closing instead of
      seeing the background page jump.
    */

    navigationTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      navigationTimerRef.current = null;
    }, 300);
  };

  // =========================================================
  // NORMAL SIDEBAR CLOSE
  // =========================================================

  const closeSidebar = () => {
    clearNavigationTimer();
    setIsOpen(false);
  };

  // =========================================================
  // PROFILE DROPDOWN CLOSE
  // =========================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================================================
  // LOCK BACKGROUND PAGE
  // =========================================================

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      /*
        Save current scroll position only when
        sidebar opens.
      */

      scrollPositionRef.current = window.scrollY;

      /*
        Completely freeze the background page.

        The page stays exactly where it was.
      */

      body.style.position = "fixed";
      body.style.top = `-${scrollPositionRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";

      /*
        Prevent horizontal movement caused by
        scrollbar disappearing.
      */

      html.style.overflow = "hidden";
      html.style.overscrollBehavior = "none";

    } else {
      /*
        Restore normal page.
      */

      const savedScrollPosition =
        scrollPositionRef.current;

      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";

      html.style.overflow = "";
      html.style.overscrollBehavior = "";

      /*
        IMPORTANT:

        Restore the previous position only if the
        sidebar was simply closed.

        The new page is already rendered when we
        close after navigation, so restoring the
        old scroll position can cause a jump.

        Therefore we only restore the position when
        there was no route navigation timer running.
      */

      if (!navigationTimerRef.current) {
        window.scrollTo(0, savedScrollPosition);
      }
    }

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";

      html.style.overflow = "";
      html.style.overscrollBehavior = "none";
    };
  }, [isOpen]);

  // =========================================================
  // CLEANUP TIMER
  // =========================================================

  useEffect(() => {
    return () => {
      clearNavigationTimer();
    };
  }, []);

  // =========================================================
  // ACTIVE PAGE
  // =========================================================

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isDetailsActive = () => {
    return location.pathname.startsWith(
      "/tenant-details"
    );
  };

  const isChangePasswordActive = () => {
    return (
      location.pathname ===
      "/tenant-change-password"
    );
  };

  // =========================================================
  // TOP NAVIGATION
  // =========================================================

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

            {/* HAMBURGER */}

            <button
              type="button"
              onClick={() => {
                clearNavigationTimer();

                /*
                  Save position before opening.
                */

                scrollPositionRef.current =
                  window.scrollY;

                setIsOpen(true);
                setIsProfileOpen(false);
              }}
              className="p-2 rounded-lg hover:bg-green-50 transition"
              aria-label="Open tenant menu"
              title="Open Menu"
            >
              <Menu
                size={24}
                className="text-gray-700"
              />
            </button>

            {/* LOGO */}

            <button
              type="button"
              onClick={() =>
                navigate("/tenant-dashboard")
              }
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

            {/* DASHBOARD */}

            <button
              type="button"
              onClick={() =>
                navigateFromNavbar(
                  "/tenant-dashboard"
                )
              }
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive("/tenant-dashboard")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Dashboard
            </button>

            {/* PAYMENTS */}

            <button
              type="button"
              onClick={() =>
                navigateFromNavbar(
                  "/tenant-payments"
                )
              }
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive("/tenant-payments")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Payments
            </button>

            {/* DOCUMENTS */}

            <button
              type="button"
              onClick={() =>
                navigateFromNavbar(
                  "/tenant-documents"
                )
              }
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive("/tenant-documents")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Documents
            </button>

            {/* NOTICES */}

            <button
              type="button"
              onClick={() =>
                navigateFromNavbar(
                  "/tenant-notices"
                )
              }
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive("/tenant-notices")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Notices
            </button>

            {/* MAINTENANCE */}

            <button
              type="button"
              onClick={() =>
                navigateFromNavbar(
                  "/tenant-maintenance"
                )
              }
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
          {/* ================= PROFILE ======================== */}
          {/* ================================================= */}

          <div className="flex items-center">

            <div
              ref={profileRef}
              className="relative"
            >

              <button
                type="button"
                onClick={() =>
                  setIsProfileOpen(
                    (prev) => !prev
                  )
                }
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
                    {tenant
                      ? tenant.name
                      : "Tenant"}
                  </p>

                  <p className="text-xs text-gray-500">
                    My Account
                  </p>

                </div>

                <ChevronDown
                  size={17}
                  className={`hidden sm:block transition-transform ${
                    isProfileOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>

              {/* PROFILE MENU */}

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
                          {tenant
                            ? tenant.name
                            : "Tenant"}
                        </p>

                        <p className="text-xs text-gray-500">
                          Tenant Account
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* MY DETAILS */}

                  <button
                    type="button"
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
                    type="button"
                    onClick={
                      handleChangePassword
                    }
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

                  <div className="border-t" />

                  {/* LOGOUT */}

                  <button
                    type="button"
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
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 touch-none ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
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
            type="button"
            onClick={closeSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Close tenant menu"
          >
            <X
              size={22}
              className="text-gray-700"
            />
          </button>

        </div>

        {/* ================= SIDEBAR MENU ================= */}

        <div className="p-3 overflow-y-auto h-[calc(100vh-5rem)] overscroll-contain">

          {/* ================= DASHBOARD ================= */}

          <button
            type="button"
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-dashboard"
              )
            }
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
            type="button"
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
            type="button"
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-payments"
              )
            }
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
            type="button"
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-documents"
              )
            }
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
            type="button"
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-notices"
              )
            }
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
            type="button"
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-maintenance"
              )
            }
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

          {/* ================= LOGOUT ================= */}

          <button
            type="button"
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