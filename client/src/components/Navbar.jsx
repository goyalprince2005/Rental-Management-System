
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
  const [hoveredSidebarItem, setHoveredSidebarItem] = useState(null);
  const [hoverCardPosition, setHoverCardPosition] = useState({
    top: 0,
    left: 0,
  });

  const profileRef = useRef(null);

  // =========================================================
  // NAVIGATION ITEMS
  // =========================================================

  const navItems = [
    { name: "Dashboard", path: "/owner-dashboard", icon: Home },
    { name: "Properties", path: "/properties", icon: Building2 },
    { name: "Rooms", path: "/rooms", icon: DoorOpen },
    { name: "Tenants", path: "/tenants", icon: Users },
    { name: "Rent & Bills", path: "/rent-bills", icon: Receipt },
    { name: "Payments", path: "/payments", icon: CreditCard },
    { name: "Documents", path: "/documents", icon: FileText },
    { name: "Reports", path: "/reports", icon: BarChart3 },
  ];

  // =========================================================
  // SIDEBAR INFORMATION
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

  const isActive = (path) => location.pathname === path;

  // =========================================================
  // NAVIGATION HANDLERS
  // =========================================================

  const handleNavigation = (path) => {
    setMenuOpen(false);
    setProfileOpen(false);
    setHoveredSidebarItem(null);
    navigate(path);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    setProfileOpen(false);
    setHoveredSidebarItem(null);
    navigate("/");
  };

  const handleMyDetails = () => {
    setProfileOpen(false);
    navigate("/settings");
  };

  const handleChangePassword = () => {
    setProfileOpen(false);
    navigate("/owner-change-password");
  };

  // =========================================================
  // HOVER INFORMATION POSITION
  // =========================================================

  const handleSidebarHover = (itemName, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const cardWidth = 290;
    const viewportPadding = 12;

    const leftPosition = Math.max(
      viewportPadding,
      Math.min(
        rect.right + 12,
        window.innerWidth - cardWidth - viewportPadding
      )
    );

    setHoveredSidebarItem(itemName);
    setHoverCardPosition({
      top: rect.top + rect.height / 2,
      left: leftPosition,
    });
  };

  const handleSidebarLeave = () => {
    setHoveredSidebarItem(null);
  };

  const currentHoverInfo = hoveredSidebarItem
    ? sidebarInfo[hoveredSidebarItem]
    : null;

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
      document.removeEventListener("mousedown", handleClickOutside);
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

  // Close the menu and its hover information.
  const closeMenu = () => {
    setMenuOpen(false);
    setHoveredSidebarItem(null);
  };

  // Close the sidebar with Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {/* =====================================================
          TOP NAVBAR
      ====================================================== */}

      <nav className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
        <div className="w-full px-3 sm:px-4 lg:px-5">
          <div className="flex h-16 items-center justify-between gap-2">
            {/* LEFT SIDE */}

            <div className="flex min-w-0 shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(true);
                  setProfileOpen(false);
                }}
                className="shrink-0 rounded-lg p-2 transition hover:bg-blue-50"
                aria-label="Open owner menu"
                title="Open Menu"
              >
                <Menu size={24} className="text-gray-700" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigation("/owner-dashboard")}
                className="flex shrink-0 items-center gap-2"
                aria-label="Go to owner dashboard"
              >
                <div className="rounded-lg bg-blue-50 p-2">
                  <Home size={21} className="text-blue-600" />
                </div>

                <span className="hidden whitespace-nowrap text-lg font-bold text-blue-600 sm:block">
                  Rental Management
                </span>
              </button>
            </div>

            {/* DESKTOP NAVIGATION */}

            <div className="mx-3 hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon size={17} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* OWNER PROFILE */}

            <div ref={profileRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setProfileOpen((previous) => !previous)}
                className={`flex items-center gap-2 rounded-lg p-2 transition ${
                  profileOpen
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
                title="Owner Account"
                aria-label="Open owner account"
                aria-expanded={profileOpen}
              >
                <UserCircle
                  size={28}
                  className={profileOpen ? "text-blue-600" : "text-gray-600"}
                />
                <span className="hidden text-sm font-medium text-gray-700 sm:block">
                  Owner
                </span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border bg-white shadow-xl">
                  <div className="border-b bg-gray-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-50 p-2">
                        <UserCircle size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Owner</p>
                        <p className="text-xs text-gray-500">
                          Owner Account
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleMyDetails}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                      isActive("/settings")
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <UserCircle size={18} />
                    <span className="text-sm font-medium">My Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleChangePassword}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                      isActive("/owner-change-password")
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

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* =====================================================
          BACKGROUND OVERLAY
      ====================================================== */}

      <button
        type="button"
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-label="Close owner menu overlay"
        tabIndex={menuOpen ? 0 : -1}
      />

      {/* =====================================================
          HAMBURGER SIDEBAR
      ====================================================== */}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 max-w-[85vw] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Owner sidebar"
        aria-hidden={!menuOpen}
      >
        {/* SIDEBAR HEADER */}

        <div className="flex h-20 items-center justify-between border-b px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="shrink-0 rounded-lg bg-blue-50 p-2">
              <Home size={22} className="text-blue-600" />
            </div>

            <div className="min-w-0">
              <h2 className="whitespace-nowrap text-lg font-bold leading-tight text-blue-600">
                Rental Management
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">Owner Panel</p>
            </div>
          </div>

          <div className="group relative shrink-0">
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-lg p-2 transition hover:bg-gray-100"
              aria-label="Close owner menu"
            >
              <X size={22} className="text-gray-700" />
            </button>

            <div className="pointer-events-none absolute right-0 top-full z-[70] mt-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="relative whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-lg">
                Close sidebar
                <span className="absolute -top-1 right-3 h-2 w-2 rotate-45 bg-gray-900" />
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR MENU */}

        <div className="h-[calc(100vh-5rem)] overflow-x-hidden overflow-y-auto overscroll-contain px-3 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseLeave={handleSidebarLeave}
                >
                  <button
                    type="button"
                    onMouseEnter={(event) =>
                      handleSidebarHover(item.name, event)
                    }
                    onFocus={(event) =>
                      handleSidebarHover(item.name, event)
                    }
                    onBlur={handleSidebarLeave}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon size={20} className="shrink-0" />
                    <span className="flex-1 text-[15px] font-medium">
                      {item.name}
                    </span>
                  </button>
                </div>
              );
            })}

            {/* SETTINGS */}

            <div
              className="relative"
              onMouseLeave={handleSidebarLeave}
            >
              <button
                type="button"
                onMouseEnter={(event) =>
                  handleSidebarHover("Settings", event)
                }
                onFocus={(event) =>
                  handleSidebarHover("Settings", event)
                }
                onBlur={handleSidebarLeave}
                onClick={() => handleNavigation("/settings")}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                  isActive("/settings")
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-current={isActive("/settings") ? "page" : undefined}
              >
                <Settings size={20} className="shrink-0" />
                <span className="flex-1 text-[15px] font-medium">
                  Settings
                </span>
              </button>
            </div>

            <div className="my-4 border-t" />

            {/* LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={20} className="shrink-0" />
              <span className="text-[15px] font-medium">Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* =====================================================
          FIXED SIDEBAR INFORMATION CARD
      ====================================================== */}

      {menuOpen && currentHoverInfo && (
        <div
          className="pointer-events-none fixed z-[80]"
          style={{
            top: `${hoverCardPosition.top}px`,
            left: `${hoverCardPosition.left}px`,
            transform: "translateY(-50%)",
          }}
          aria-hidden="true"
        >
          <div className="relative w-[290px] rounded-xl border border-blue-100 bg-white px-5 py-4 text-gray-700 shadow-xl">
            {/* CARD TITLE */}

            <p className="mb-3 text-base font-bold text-blue-600">
              {currentHoverInfo.title}
            </p>

            <div className="mb-3 h-px bg-blue-100" />

            {/* CARD INFORMATION */}

            <div className="space-y-2">
              {currentHoverInfo.items.map((text) => (
                <div
                  key={text}
                  className="flex items-start gap-2.5 text-sm leading-6 text-gray-700"
                >
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  <span>{text}</span>
                </div>
              ))}
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
