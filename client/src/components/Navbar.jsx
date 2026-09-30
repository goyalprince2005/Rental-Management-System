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
  Lock,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  /*
   * Stores the sidebar item currently being hovered.
   */
  const [hoveredSidebarItem, setHoveredSidebarItem] =
    useState(null);

  /*
   * Position of the hover information card.
   */
  const [hoverCardPosition, setHoverCardPosition] =
    useState({
      top: 0,
      left: 0,
    });

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
  // SIDEBAR HOVER INFORMATION
  // =========================================================
  //
  // These are informational descriptions for the existing
  // owner-side sections.
  //
  // They are NOT notification badges.
  // They do NOT represent pending actions.
  // They do NOT use red notification counters.
  // =========================================================

  const sidebarInfo = {
    Dashboard: {
      title: "Dashboard",
      items: [
        "Properties overview",
        "Rooms overview",
        "Active tenants",
        "Pending rent",
        "Vacant rooms",
        "Expiring documents",
        "Recent tenants",
        "Recent payments",
      ],
    },

    Properties: {
      title: "Properties",
      items: [
        "Property list",
        "Property information",
        "Add property",
        "Edit property",
        "View property details",
        "Property rooms",
      ],
    },

    Rooms: {
      title: "Rooms",
      items: [
        "Room list",
        "Room availability",
        "Room details",
        "Tenant assignment",
        "Edit room",
        "Room rent information",
      ],
    },

    Tenants: {
      title: "Tenants",
      items: [
        "Tenant list",
        "Tenant details",
        "Tenant property",
        "Tenant room",
        "Tenant rent information",
        "Edit tenant",
      ],
    },

    "Rent & Bills": {
      title: "Rent & Bills",
      items: [
        "Rent records",
        "Bill information",
        "Due amounts",
        "Payment status",
        "Tenant-wise rent details",
      ],
    },

    Payments: {
      title: "Payments",
      items: [
        "Payment records",
        "Tenant payments",
        "Payment amounts",
        "Payment status",
        "Payment history",
      ],
    },

    Documents: {
      title: "Documents",
      items: [
        "Document records",
        "Tenant documents",
        "Property documents",
        "Document information",
        "Document status",
      ],
    },

    Reports: {
      title: "Reports",
      items: [
        "Rental reports",
        "Payment reports",
        "Tenant information",
        "Property information",
        "Room information",
        "Report summaries",
      ],
    },

    Settings: {
      title: "Settings",
      items: [
        "Owner account settings",
        "Account information",
        "Application settings",
      ],
    },
  };

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
    setHoveredSidebarItem(null);

    navigate(path);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    setMenuOpen(false);
    setProfileOpen(false);
    setHoveredSidebarItem(null);

    navigate("/");
  };

  // =========================================================
  // MY DETAILS
  // =========================================================

  const handleMyDetails = () => {
    setProfileOpen(false);

    /*
     * Owner details page will be added later.
     * For now, Settings acts as the owner account/details page.
     */

    navigate("/settings");
  };

  // =========================================================
  // CHANGE PASSWORD
  // =========================================================

  const handleChangePassword = () => {
    setProfileOpen(false);

    navigate("/owner-change-password");
  };

  // =========================================================
  // SIDEBAR HOVER HANDLER
  // =========================================================

  const handleSidebarHover = (itemName, event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const cardWidth = 260;

    /*
     * Keep the card inside the visible browser window.
     */

    const leftPosition = Math.min(
      rect.right + 12,
      window.innerWidth - cardWidth - 12
    );

    setHoveredSidebarItem(itemName);

    setHoverCardPosition({
      top: rect.top + rect.height / 2,
      left: leftPosition,
    });
  };

  // =========================================================
  // CLOSE SIDEBAR HOVER CARD
  // =========================================================

  const handleSidebarLeave = () => {
    setHoveredSidebarItem(null);
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
  // LOCK BACKGROUND SCROLL WHEN SIDEBAR IS OPEN
  // =========================================================

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (menuOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";

      html.style.overscrollBehavior = "none";
      body.style.overscrollBehavior = "none";

      html.style.overflowX = "hidden";
      body.style.overflowX = "hidden";

      html.style.scrollbarGutter = "stable";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";

      html.style.overscrollBehavior = "";
      body.style.overscrollBehavior = "";

      html.style.overflowX = "";
      body.style.overflowX = "";

      html.style.scrollbarGutter = "";

      setHoveredSidebarItem(null);
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
    setHoveredSidebarItem(null);
  };

  // =========================================================
  // CURRENT HOVER INFORMATION
  // =========================================================

  const currentHoverInfo =
    hoveredSidebarItem
      ? sidebarInfo[hoveredSidebarItem]
      : null;

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
                  handleNavigation(
                    "/owner-dashboard"
                  )
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
                  profileOpen
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
                title="Owner Account"
                aria-label="Open owner account"
              >

                <UserCircle
                  size={28}
                  className={
                    profileOpen
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

                  {/* MY DETAILS */}

                  <button
                    type="button"
                    onClick={handleMyDetails}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                      isActive("/settings")
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >

                    <UserCircle size={18} />

                    <span className="text-sm font-medium">
                      My Details
                    </span>

                  </button>

                  {/* CHANGE PASSWORD */}

                  <button
                    type="button"
                    onClick={handleChangePassword}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                      isActive(
                        "/owner-change-password"
                      )
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >

                    <Lock size={18} />

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
        className={`fixed left-0 top-0 h-screen w-75 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
        onMouseLeave={handleSidebarLeave}
      >

        {/* SIDEBAR HEADER */}

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

          {/* ================================================= */}
          {/* CLOSE SIDEBAR BUTTON */}
          {/* ================================================= */}

          <div className="relative group shrink-0">

            <button
              type="button"
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Close owner menu"
            >

              <X
                size={22}
                className="text-gray-700"
              />

            </button>

            {/* CLOSE SIDEBAR TOOLTIP */}

            <div className="pointer-events-none absolute right-0 top-full mt-2 z-[70] opacity-0 group-hover:opacity-100 transition-opacity duration-200">

              <div className="relative whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-lg">

                Close sidebar

                <span className="absolute -top-1 right-3 h-2 w-2 rotate-45 bg-gray-900" />

              </div>

            </div>

          </div>

        </div>

        {/* ===================================================== */}
        {/* SIDEBAR MENU */}
        {/* ===================================================== */}

        <div className="h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain overflow-x-hidden px-3 py-4">

          <nav className="space-y-1">

            {navItems.map((item) => {

              const Icon = item.icon;

              const active =
                isActive(item.path);

              return (
                <div
                  key={item.name}
                  className="relative"
                >

                  {/* SIDEBAR NAVIGATION BUTTON */}

                  <button
                    type="button"
                    onMouseEnter={(event) =>
                      handleSidebarHover(
                        item.name,
                        event
                      )
                    }
                    onFocus={(event) =>
                      handleSidebarHover(
                        item.name,
                        event
                      )
                    }
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

                    <span className="text-[15px] font-medium flex-1">
                      {item.name}
                    </span>

                  </button>

                </div>
              );

            })}

            {/* ================================================= */}
            {/* SETTINGS */}
            {/* ================================================= */}

            <div className="relative">

              <button
                type="button"
                onMouseEnter={(event) =>
                  handleSidebarHover(
                    "Settings",
                    event
                  )
                }
                onFocus={(event) =>
                  handleSidebarHover(
                    "Settings",
                    event
                  )
                }
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

                <span className="text-[15px] font-medium flex-1">
                  Settings
                </span>

              </button>

            </div>

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

      {/* ===================================================== */}
      {/* FIXED SIDEBAR INFORMATION CARD */}
      {/* ===================================================== */}

      {menuOpen && currentHoverInfo && (

        <div
          className="fixed z-[80] pointer-events-none"
          style={{
            top: `${hoverCardPosition.top}px`,
            left: `${hoverCardPosition.left}px`,
            transform: "translateY(-50%)",
          }}
        >

          {/* ================================================= */}
          {/* WHITE + BLUE INFORMATION CARD */}
          {/* ================================================= */}

          <div className="relative w-[260px] rounded-xl bg-white border border-blue-100 px-4 py-3 text-gray-700 shadow-xl">

            {/* CARD TITLE */}

            <p className="text-sm font-semibold text-blue-600 mb-2">
              {currentHoverInfo.title}
            </p>

            {/* SMALL DIVIDER */}

            <div className="h-px bg-blue-50 mb-2" />

            {/* CARD INFORMATION */}

            <div className="space-y-1.5">

              {currentHoverInfo.items.map(
                (text, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-2 text-xs text-gray-600"
                  >

                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />

                    <span>
                      {text}
                    </span>

                  </div>

                )
              )}

            </div>

            {/* TOOLTIP ARROW */}

            <span className="absolute right-full top-1/2 -translate-y-1/2 border-y-[7px] border-r-[7px] border-y-transparent border-r-white" />

          </div>

        </div>

      )}

    </>
  );
}

export default Navbar;