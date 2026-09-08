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
  const scrollPositionRef = useRef(0);

  // ================= NAVIGATION ITEMS =================

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

  // ================= ACTIVE PAGE =================

  const isActive = (path) => {
    return location.pathname === path;
  };

  // ================= NAVIGATION =================

  const handleNavigation = (path) => {
    setMenuOpen(false);
    setProfileOpen(false);
    navigate(path);
  };

  // ================= LOGOUT =================

  const handleLogout = () => {
    setMenuOpen(false);
    setProfileOpen(false);
    navigate("/");
  };

  // ================= SETTINGS =================

  const handleSettings = () => {
    setProfileOpen(false);
    navigate("/settings");
  };

  // ================= CLOSE PROFILE =================

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

  // ================= LOCK BACKGROUND SCROLL =================

  useEffect(() => {
    if (menuOpen) {
      scrollPositionRef.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top =
        `-${scrollPositionRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehavior = "none";
    } else {
      const savedScrollPosition =
        scrollPositionRef.current;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";

      window.scrollTo(0, savedScrollPosition);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
    };
  }, [menuOpen]);

  // ================= CLOSE MENU =================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* ===================================================== */}
      {/* ================= TOP NAVBAR ======================== */}
      {/* ===================================================== */}

      <nav className="bg-white border-b shadow-sm sticky top-0 z-40">

        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <div className="h-16 flex items-center justify-between">

            {/* ================= LEFT SIDE ================= */}

            <div className="flex items-center gap-3">

              {/* ================= HAMBURGER ================= */}

              <button
                onClick={() => {
                  setMenuOpen(true);
                  setProfileOpen(false);
                }}
                className="p-2 rounded-lg hover:bg-blue-50 transition"
                aria-label="Open owner menu"
                title="Open Menu"
              >
                <Menu
                  size={24}
                  className="text-gray-700"
                />
              </button>


              {/* ================= LOGO ================= */}

              <button
                onClick={() =>
                  handleNavigation("/owner-dashboard")
                }
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

            </div>


            {/* ================================================= */}
            {/* ================= DESKTOP NAV =================== */}
            {/* ================================================= */}

            <div className="hidden lg:flex items-center gap-1 overflow-x-auto">

              {navItems.map((item) => {

                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <button
                    key={item.name}
                    onClick={() =>
                      handleNavigation(item.path)
                    }
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                  >

                    <Icon size={18} />

                    <span>
                      {item.name}
                    </span>

                  </button>
                );

              })}

            </div>


            {/* ================================================= */}
            {/* ================= OWNER PROFILE ================= */}
            {/* ================================================= */}

            <div
              ref={profileRef}
              className="relative shrink-0"
            >

              <button
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

                <span className="hidden xl:block text-sm font-medium text-gray-700">
                  Owner
                </span>

              </button>


              {/* ================= PROFILE DROPDOWN ================= */}

              {profileOpen && (

                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border overflow-hidden z-50">

                  {/* PROFILE */}

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

      </nav>


      {/* ===================================================== */}
      {/* ================= BACKGROUND OVERLAY ================= */}
      {/* ===================================================== */}

      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />


      {/* ===================================================== */}
      {/* ================= HAMBURGER SIDEBAR ================= */}
      {/* ===================================================== */}

      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* ================= SIDEBAR HEADER ================= */}

        <div className="h-20 border-b px-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="p-2 bg-blue-50 rounded-lg">

              <Home
                size={22}
                className="text-blue-600"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-blue-600">
                Rental Management
              </h2>

              <p className="text-xs text-gray-500">
                Owner Panel
              </p>

            </div>

          </div>


          {/* ================= CLOSE ================= */}

          <button
            onClick={closeMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Close owner menu"
          >

            <X size={22} />

          </button>

        </div>


        {/* ================= SIDEBAR MENU ================= */}

        <div className="p-3 overflow-y-auto h-[calc(100vh-5rem)] overscroll-contain">

          <nav className="space-y-1">

            {navItems.map((item) => {

              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <button
                  key={item.name}
                  onClick={() =>
                    handleNavigation(item.path)
                  }
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition text-left ${
                    active
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >

                  <Icon size={21} />

                  <span className="text-base font-medium">
                    {item.name}
                  </span>

                </button>
              );

            })}


            {/* ================= SETTINGS ================= */}

            <button
              onClick={() =>
                handleNavigation("/settings")
              }
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition text-left ${
                isActive("/settings")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >

              <Settings size={21} />

              <span className="text-base font-medium">
                Settings
              </span>

            </button>


            {/* ================= DIVIDER ================= */}

            <div className="border-t my-4" />


            {/* ================= LOGOUT ================= */}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition"
            >

              <LogOut size={21} />

              <span className="text-base font-medium">
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