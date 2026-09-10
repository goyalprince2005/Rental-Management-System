import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Menu,
  X,
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
  UserCircle,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // =========================================================
  // NAVIGATION ITEMS
  // =========================================================

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

  // =========================================================
  // ACTIVE PAGE
  // =========================================================

  const isActive = (path) => {
    return location.pathname === path;
  };

  // =========================================================
  // NAVIGATION
  // =========================================================

  const handleNavigation = (path) => {
    setMenuOpen(false);
    setProfileOpen(false);
    navigate(path);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    setMenuOpen(false);
    setProfileOpen(false);
    navigate("/");
  };

  // =========================================================
  // SETTINGS
  // =========================================================

  const handleSettings = () => {
    setProfileOpen(false);
    navigate("/settings");
  };

  // =========================================================
  // CLOSE PROFILE WHEN CLICKING OUTSIDE
  // =========================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================================================
  // LOCK BACKGROUND SCROLL WHEN MENU IS OPEN
  // =========================================================

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (menuOpen) {
      // Prevent the page behind the sidebar from scrolling.
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";

      // Prevent pull/overscroll movement.
      html.style.overscrollBehavior = "none";
      body.style.overscrollBehavior = "none";

      // Prevent horizontal overflow.
      html.style.overflowX = "hidden";
      body.style.overflowX = "hidden";

      // Keep scrollbar space stable so the page does not
      // shift left/right when the scrollbar disappears.
      html.style.scrollbarGutter = "stable";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";

      html.style.overscrollBehavior = "";
      body.style.overscrollBehavior = "";

      html.style.overflowX = "";
      body.style.overflowX = "";

      html.style.scrollbarGutter = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";

      html.style.overscrollBehavior = "";
      body.style.overscrollBehavior = "";

      html.style.overflowX = "";
      body.style.overflowX = "";

      html.style.scrollbarGutter = "";
    };
  }, [menuOpen]);

  // =========================================================
  // CLOSE MENU
  // =========================================================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* ===================================================== */}
      {/* TOP NAVBAR */}
      {/* ===================================================== */}

      <nav className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
        <div className="w-full px-3 sm:px-4 lg:px-5">
          <div className="h-16 flex items-center justify-between gap-2">

            {/* ================================================= */}
            {/* LEFT SIDE */}
            {/* ================================================= */}

            <div className="flex items-center gap-2 min-w-0 shrink-0">

              {/* HAMBURGER */}

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(true);
                  setProfileOpen(false);
                }}
                className="p-2 rounded-lg hover:bg-blue-50 transition shrink-0"
                aria-label="Open owner menu"
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
                  handleNavigation("/owner-dashboard")
                }
                className="flex items-center gap-2 shrink-0"
              >
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Home
                    size={21}
                    className="text-blue-600"
                  />
                </div>

                <span className="hidden sm:block text-lg font-bold text-blue-600 whitespace-nowrap">
                  Rental Management
                </span>
              </button>
            </div>

            {/* ================================================= */}
            {/* DESKTOP NAVIGATION */}
            {/* ================================================= */}

            <div className="hidden xl:flex flex-1 items-center justify-center gap-1 min-w-0 mx-3">

              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() =>
                      handleNavigation(item.path)
                    }
                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                  >
                    <Icon size={17} />

                    <span>
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ================================================= */}
            {/* OWNER PROFILE */}
            {/* ================================================= */}

            <div
              ref={profileRef}
              className="relative shrink-0"
            >
              <button
                type="button"
                onClick={() =>
                  setProfileOpen((prev) => !prev)
                }
                className={`flex items-center gap-2 p-2 rounded-lg transition ${
                  profileOpen ||
                  isActive("/settings")
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
                title="Owner Settings"
                aria-label="Open owner settings"
              >
                <UserCircle
                  size={28}
                  className={
                    profileOpen ||
                    isActive("/settings")
                      ? "text-blue-600"
                      : "text-gray-600"
                  }
                />

                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  Owner
                </span>
              </button>

              {/* ================================================= */}
              {/* PROFILE DROPDOWN */}
              {/* ================================================= */}

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border overflow-hidden z-50">

                  {/* PROFILE HEADER */}

                  <div className="p-4 border-b bg-gray-50">
                    <div className="flex items-center gap-3">

                      <div className="p-2 bg-blue-50 rounded-full">
                        <UserCircle
                          size={24}
                          className="text-blue-600"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">
                          Owner
                        </p>

                        <p className="text-xs text-gray-500">
                          Owner Account
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* SETTINGS */}

                  <button
                    type="button"
                    onClick={handleSettings}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                      isActive("/settings")
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Settings size={18} />

                    <span className="text-sm font-medium">
                      Settings
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
      </nav>

      {/* ===================================================== */}
      {/* BACKGROUND OVERLAY */}
      {/* ===================================================== */}

      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ===================================================== */}
      {/* HAMBURGER SIDEBAR */}
      {/* ===================================================== */}

      <aside
        className={`fixed left-0 top-0 h-screen w-[300px] max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* ================================================= */}
        {/* SIDEBAR HEADER */}
        {/* ================================================= */}

        <div className="h-20 px-5 border-b flex items-center justify-between">

          <div className="flex items-center gap-3 min-w-0">

            <div className="p-2 bg-blue-50 rounded-lg shrink-0">
              <Home
                size={22}
                className="text-blue-600"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-bold text-blue-600 leading-tight whitespace-nowrap">
                Rental Management
              </h2>

              <p className="text-xs text-gray-500 mt-0.5">
                Owner Panel
              </p>
            </div>
          </div>

          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={closeMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition shrink-0"
            aria-label="Close owner menu"
          >
            <X
              size={22}
              className="text-gray-700"
            />
          </button>
        </div>

        {/* ================================================= */}
        {/* SIDEBAR MENU */}
        {/* ================================================= */}

        <div className="h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain overflow-x-hidden px-3 py-4">

          <nav className="space-y-1">

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() =>
                    handleNavigation(item.path)
                  }
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
                    active
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon
                    size={20}
                    className="shrink-0"
                  />

                  <span className="text-[15px] font-medium">
                    {item.name}
                  </span>
                </button>
              );
            })}

            {/* ================================================= */}
            {/* SETTINGS */}
            {/* ================================================= */}

            <button
              type="button"
              onClick={() =>
                handleNavigation("/settings")
              }
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
                isActive("/settings")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Settings
                size={20}
                className="shrink-0"
              />

              <span className="text-[15px] font-medium">
                Settings
              </span>
            </button>

            {/* ================================================= */}
            {/* DIVIDER */}
            {/* ================================================= */}

            <div className="border-t my-4" />

            {/* ================================================= */}
            {/* LOGOUT */}
            {/* ================================================= */}

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition"
            >
              <LogOut
                size={20}
                className="shrink-0"
              />

              <span className="text-[15px] font-medium">
                Logout
              </span>
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Navbar;