import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

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
  Sun,
  Moon,
} from "lucide-react";

function TenantNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================================================
  // COMPONENT STATE
  // =========================================================

  const [isOpen, setIsOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  const [
    hoveredSidebarItem,
    setHoveredSidebarItem,
  ] = useState(null);

  const [
    hoverCardPosition,
    setHoverCardPosition,
  ] = useState({
    top: 0,
    left: 0,
  });

  // =========================================================
  // THEME STATE
  // =========================================================

  const [isDarkMode, setIsDarkMode] = useState(
    () => {
      const savedTheme =
        localStorage.getItem(
          "rentalManagementTheme"
        );

      if (savedTheme) {
        return savedTheme === "dark";
      }

      return document.documentElement.classList.contains(
        "dark"
      );
    }
  );

  // =========================================================
  // REFS
  // =========================================================

  const profileRef = useRef(null);

  const scrollPositionRef = useRef(0);

  const navigationTimerRef = useRef(null);

  // =========================================================
  // TENANT DATA
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

  const tenantId =
    localStorage.getItem("tenantId");

  const tenant = tenants[tenantId];

  // =========================================================
  // SIDEBAR INFORMATION
  // =========================================================

  const sidebarInfo = {
    Dashboard: {
      title: "Dashboard",
      items: [
        "Rent overview",
        "Current payment status",
        "Recent payments",
        "Property information",
        "Room information",
        "Tenant account summary",
      ],
    },

    "My Details": {
      title: "My Details",
      items: [
        "Personal information",
        "Mobile number",
        "Property information",
        "Room information",
        "Monthly rent",
        "Rent due date",
      ],
    },

    Payments: {
      title: "Payments",
      items: [
        "Current rent",
        "Rent due date",
        "Late payment charges",
        "Total payable amount",
        "UPI payment QR",
        "Recent payment history",
      ],
    },

    Documents: {
      title: "Documents",
      items: [
        "Tenant documents",
        "Uploaded documents",
        "Document information",
        "Document status",
      ],
    },

    Notices: {
      title: "Notices",
      items: [
        "Owner notices",
        "Important announcements",
        "Notice details",
        "Read and unread notices",
      ],
    },

    "Maintenance & Complaints": {
      title: "Maintenance & Complaints",
      items: [
        "Submit complaint",
        "Maintenance category",
        "Complaint description",
        "Complaint status",
        "Previous complaints",
      ],
    },
  };

  // =========================================================
  // APPLY THEME
  // =========================================================

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");

      localStorage.setItem(
        "rentalManagementTheme",
        "dark"
      );
    } else {
      root.classList.remove("dark");

      localStorage.setItem(
        "rentalManagementTheme",
        "light"
      );
    }

    window.dispatchEvent(
      new CustomEvent("themeChanged", {
        detail: {
          theme: isDarkMode ? "dark" : "light",
        },
      })
    );
  }, [isDarkMode]);

  // =========================================================
  // TOGGLE THEME
  // =========================================================

  const toggleTheme = () => {
    setIsDarkMode((previous) => !previous);
  };

  // =========================================================
  // CLEAR NAVIGATION TIMER
  // =========================================================

  const clearNavigationTimer = () => {
    if (navigationTimerRef.current) {
      clearTimeout(
        navigationTimerRef.current
      );

      navigationTimerRef.current = null;
    }
  };

  // =========================================================
  // CLOSE SIDEBAR AFTER NAVIGATION
  // =========================================================

  const closeSidebarAfterNavigation = () => {
    clearNavigationTimer();

    navigationTimerRef.current =
      setTimeout(() => {
        setIsOpen(false);

        setHoveredSidebarItem(null);

        navigationTimerRef.current = null;
      }, 300);
  };

  // =========================================================
  // NORMAL SIDEBAR CLOSE
  // =========================================================

  const closeSidebar = () => {
    clearNavigationTimer();

    setIsOpen(false);

    setHoveredSidebarItem(null);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    clearNavigationTimer();

    localStorage.removeItem("tenantId");

    setIsOpen(false);

    setIsProfileOpen(false);

    setHoveredSidebarItem(null);

    navigate("/tenant-login");
  };

  // =========================================================
  // MY DETAILS
  // =========================================================

  const handleMyDetails = () => {
    const currentTenantId =
      localStorage.getItem("tenantId");

    if (!currentTenantId) {
      navigate("/tenant-login");
      return;
    }

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
    navigate("/tenant-change-password");

    closeSidebarAfterNavigation();

    setIsProfileOpen(false);
  };

  // =========================================================
  // SIDEBAR NAVIGATION
  // =========================================================

  const handleSidebarNavigation = (path) => {
    navigate(path);

    closeSidebarAfterNavigation();
  };

  // =========================================================
  // SIDEBAR HOVER HANDLER
  // =========================================================

  const handleSidebarHover = (
    itemName,
    event
  ) => {
    if (window.innerWidth < 768) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const cardWidth = 280;

    const leftPosition = Math.min(
      rect.right + 12,
      window.innerWidth -
        cardWidth -
        12
    );

    setHoveredSidebarItem(itemName);

    setHoverCardPosition({
      top:
        rect.top +
        rect.height / 2,

      left: Math.max(
        12,
        leftPosition
      ),
    });
  };

  // =========================================================
  // SIDEBAR HOVER LEAVE
  // =========================================================

  const handleSidebarLeave = () => {
    setHoveredSidebarItem(null);
  };

  // =========================================================
  // PROFILE DROPDOWN: CLICK OUTSIDE
  // =========================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    document.addEventListener(
      "touchstart",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "touchstart",
        handleClickOutside
      );
    };
  }, []);

  // =========================================================
  // ESCAPE KEY
  // =========================================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSidebar();

        setIsProfileOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // =========================================================
  // LOCK BACKGROUND SCROLL WHEN SIDEBAR IS OPEN
  // =========================================================

  useEffect(() => {
    const html =
      document.documentElement;

    const body =
      document.body;

    if (!isOpen) {
      return undefined;
    }

    const previousBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    const previousHtmlStyles = {
      overflow: html.style.overflow,
      overscrollBehavior:
        html.style.overscrollBehavior,
    };

    const savedScrollPosition =
      scrollPositionRef.current;

    body.style.position = "fixed";

    body.style.top =
      `-${savedScrollPosition}px`;

    body.style.left = "0";

    body.style.right = "0";

    body.style.width = "100%";

    body.style.overflow = "hidden";

    html.style.overflow = "hidden";

    html.style.overscrollBehavior = "none";

    return () => {
      body.style.position =
        previousBodyStyles.position;

      body.style.top =
        previousBodyStyles.top;

      body.style.left =
        previousBodyStyles.left;

      body.style.right =
        previousBodyStyles.right;

      body.style.width =
        previousBodyStyles.width;

      body.style.overflow =
        previousBodyStyles.overflow;

      html.style.overflow =
        previousHtmlStyles.overflow;

      html.style.overscrollBehavior =
        previousHtmlStyles.overscrollBehavior;

      window.scrollTo(
        0,
        savedScrollPosition
      );
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
  // ACTIVE ROUTE HELPERS
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

      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-4 md:px-6">

          {/* LEFT SIDE */}

          <div className="flex min-w-0 items-center gap-2 sm:gap-3">

            {/* HAMBURGER + OPEN SIDEBAR TOOLTIP */}

            <div className="group relative shrink-0">

              <button
                type="button"
                onClick={() => {
                  clearNavigationTimer();

                  scrollPositionRef.current =
                    window.scrollY;

                  setIsOpen(true);

                  setIsProfileOpen(false);
                }}
                className="rounded-lg p-2 transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 dark:hover:bg-gray-800"
                aria-label="Open tenant sidebar"
                aria-expanded={isOpen}
                
              >
                <Menu
                  size={24}
                  className="text-gray-700 dark:text-gray-200"
                />
              </button>

              <span className="pointer-events-none absolute left-[calc(50%+12px)] top-full z-[100] mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                Open Sidebar
              </span>

            </div>

            {/* LOGO */}

            <button
              type="button"
              onClick={() =>
                navigate("/tenant-dashboard")
              }
              className="flex min-w-0 items-center gap-2 sm:gap-3"
              aria-label="Go to tenant dashboard"
            >
              <div className="shrink-0 rounded-lg bg-green-50 p-2 dark:bg-green-900/30">

                <Home
                  size={22}
                  className="text-green-600 dark:text-green-400"
                />

              </div>

              <span className="truncate text-base font-bold text-green-600 dark:text-green-400 sm:text-xl">
                Tenant Portal
              </span>
            </button>

          </div>

          {/* DESKTOP NAVIGATION */}

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Tenant navigation"
          >

            <button
              type="button"
              onClick={() =>
                navigateFromNavbar(
                  "/tenant-dashboard"
                )
              }
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive("/tenant-dashboard")
                  ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={() =>
                navigateFromNavbar(
                  "/tenant-payments"
                )
              }
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive("/tenant-payments")
                  ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              Payments
            </button>

            <button
              type="button"
              onClick={() =>
                navigateFromNavbar(
                  "/tenant-documents"
                )
              }
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive("/tenant-documents")
                  ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              Documents
            </button>

            <button
              type="button"
              onClick={() =>
                navigateFromNavbar(
                  "/tenant-notices"
                )
              }
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive("/tenant-notices")
                  ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              Notices
            </button>

            <button
              type="button"
              onClick={() =>
                navigateFromNavbar(
                  "/tenant-maintenance"
                )
              }
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive("/tenant-maintenance")
                  ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              Maintenance
            </button>

          </nav>

          {/* RIGHT SIDE: THEME + PROFILE */}

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">

            {/* ================================================= */}
            {/* LIGHT / DARK MODE TOGGLE */}
            {/* ================================================= */}

            <div className="group relative">

              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-gray-200 dark:hover:bg-gray-800"
                aria-label={
                  isDarkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                title={
                  isDarkMode
                    ? "Light Mode"
                    : "Dark Mode"
                }
              >

                {isDarkMode ? (
                  <Sun
                    size={21}
                    className="text-yellow-400"
                  />
                ) : (
                  <Moon
                    size={21}
                    className="text-gray-700"
                  />
                )}

              </button>

              <span className="pointer-events-none absolute right-0 top-full z-[100] mt-2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                {isDarkMode
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"}
              </span>

            </div>

            {/* ================================================= */}
            {/* PROFILE DROPDOWN */}
            {/* ================================================= */}

            <div
              ref={profileRef}
              className="relative"
            >

              <button
                type="button"
                onClick={() =>
                  setIsProfileOpen(
                    (previous) => !previous
                  )
                }
                className={`flex items-center gap-2 rounded-lg px-2 py-2 transition sm:px-3 ${
                  isProfileOpen
                    ? "bg-green-50 text-green-600 dark:bg-gray-800 dark:text-green-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                }`}
                aria-label="Open tenant profile"
                aria-expanded={isProfileOpen}
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">

                  <User
                    size={20}
                    className="text-green-600 dark:text-green-400"
                  />

                </div>

                <div className="hidden min-w-0 text-left md:block">

                  <p className="max-w-32 truncate text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {tenant
                      ? tenant.name
                      : "Tenant"}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    My Account
                  </p>

                </div>

                <ChevronDown
                  size={17}
                  className={`hidden transition-transform sm:block ${
                    isProfileOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>

              {/* PROFILE MENU */}

              {isProfileOpen && (
                <div className="absolute right-0 z-50 mt-2 w-[min(16rem,calc(100vw-1.5rem))] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">

                  {/* PROFILE HEADER */}

                  <div className="border-b border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">

                        <User
                          size={22}
                          className="text-green-600 dark:text-green-400"
                        />

                      </div>

                      <div className="min-w-0">

                        <p className="truncate font-semibold text-gray-800 dark:text-gray-100">
                          {tenant
                            ? tenant.name
                            : "Tenant"}
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Tenant Account
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* MY DETAILS */}

                  <button
                    type="button"
                    onClick={handleMyDetails}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                      isDetailsActive()
                        ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
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
                    onClick={handleChangePassword}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                      isChangePasswordActive()
                        ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Settings size={18} />

                    <span className="text-sm font-medium">
                      Change Password
                    </span>
                  </button>

                  <div className="border-t border-gray-100 dark:border-gray-700" />

                  {/* LOGOUT */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
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
      {/* BACKGROUND OVERLAY */}
      {/* ===================================================== */}

      <div
        className={`fixed inset-0 z-40 touch-none bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* ===================================================== */}
      {/* TENANT SIDEBAR */}
      {/* ===================================================== */}

      <aside
        id="tenant-sidebar"
        className={`fixed left-0 top-0 z-50 flex h-[100dvh] w-[min(18rem,85vw)] flex-col border-r border-gray-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-900 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
        onMouseLeave={handleSidebarLeave}
        aria-label="Tenant navigation sidebar"
      >

        {/* SIDEBAR HEADER */}

        <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700 sm:px-5">

          <div className="flex min-w-0 items-center gap-3">

            <div className="shrink-0 rounded-lg bg-green-50 p-2 dark:bg-green-900/30">

              <Home
                size={22}
                className="text-green-600 dark:text-green-400"
              />

            </div>

            <div className="min-w-0">

              <h2 className="truncate text-lg font-bold text-green-600 dark:text-green-400 sm:text-xl">
                Tenant Portal
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tenant Panel
              </p>

            </div>

          </div>

          {/* CLOSE BUTTON + CLOSE TOOLTIP */}

          <div className="group relative shrink-0">

            <button
              type="button"
              onClick={closeSidebar}
              className="rounded-lg p-2 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:hover:bg-gray-800"
              aria-label="Close tenant sidebar"
              
            >
              <X
                size={22}
                className="text-gray-700 dark:text-gray-200"
              />
            </button>

            <span className="pointer-events-none absolute right-0 top-full z-[100] mt-2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
              Close Sidebar
            </span>

          </div>

        </div>
                {/* ================================================= */}
        {/* SIDEBAR MENU */}
        {/* ================================================= */}

        <div className="h-[calc(100%-5rem)] overflow-x-hidden overflow-y-auto overscroll-contain p-3">

          {/* DASHBOARD */}

          <button
            type="button"
            onMouseEnter={(event) =>
              handleSidebarHover("Dashboard", event)
            }
            onFocus={(event) =>
              handleSidebarHover("Dashboard", event)
            }
            onBlur={handleSidebarLeave}
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-dashboard"
              )
            }
            className={`mb-2 flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition focus:outline-none focus:ring-2 focus:ring-green-500 ${
              isActive("/tenant-dashboard")
                ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <Home size={22} />

            <span className="text-base font-medium">
              Dashboard
            </span>
          </button>

          {/* MY DETAILS */}

          <button
            type="button"
            onMouseEnter={(event) =>
              handleSidebarHover("My Details", event)
            }
            onFocus={(event) =>
              handleSidebarHover("My Details", event)
            }
            onBlur={handleSidebarLeave}
            onClick={handleMyDetails}
            className={`mb-2 flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition focus:outline-none focus:ring-2 focus:ring-green-500 ${
              isDetailsActive()
                ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <User size={22} />

            <span className="text-base font-medium">
              My Details
            </span>
          </button>

          {/* PAYMENTS */}

          <button
            type="button"
            onMouseEnter={(event) =>
              handleSidebarHover("Payments", event)
            }
            onFocus={(event) =>
              handleSidebarHover("Payments", event)
            }
            onBlur={handleSidebarLeave}
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-payments"
              )
            }
            className={`mb-2 flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition focus:outline-none focus:ring-2 focus:ring-green-500 ${
              isActive("/tenant-payments")
                ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <CreditCard size={22} />

            <span className="text-base font-medium">
              Payments
            </span>
          </button>

          {/* DOCUMENTS */}

          <button
            type="button"
            onMouseEnter={(event) =>
              handleSidebarHover("Documents", event)
            }
            onFocus={(event) =>
              handleSidebarHover("Documents", event)
            }
            onBlur={handleSidebarLeave}
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-documents"
              )
            }
            className={`mb-2 flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition focus:outline-none focus:ring-2 focus:ring-green-500 ${
              isActive("/tenant-documents")
                ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <FileText size={22} />

            <span className="text-base font-medium">
              Documents
            </span>
          </button>

          {/* NOTICES */}

          <button
            type="button"
            onMouseEnter={(event) =>
              handleSidebarHover("Notices", event)
            }
            onFocus={(event) =>
              handleSidebarHover("Notices", event)
            }
            onBlur={handleSidebarLeave}
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-notices"
              )
            }
            className={`mb-2 flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition focus:outline-none focus:ring-2 focus:ring-green-500 ${
              isActive("/tenant-notices")
                ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <Bell size={22} />

            <span className="text-base font-medium">
              Notices
            </span>
          </button>

          {/* MAINTENANCE & COMPLAINTS */}

          <button
            type="button"
            onMouseEnter={(event) =>
              handleSidebarHover(
                "Maintenance & Complaints",
                event
              )
            }
            onFocus={(event) =>
              handleSidebarHover(
                "Maintenance & Complaints",
                event
              )
            }
            onBlur={handleSidebarLeave}
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-maintenance"
              )
            }
            className={`mb-2 flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition focus:outline-none focus:ring-2 focus:ring-green-500 ${
              isActive("/tenant-maintenance")
                ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <Wrench size={22} />

            <span className="text-base font-medium">
              Maintenance &amp; Complaints
            </span>
          </button>

          {/* DIVIDER */}

          <div className="my-4 border-t border-gray-200 dark:border-gray-700" />

          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <LogOut size={22} />

            <span className="text-base font-medium">
              Logout
            </span>
          </button>

        </div>

      </aside>

      {/* ===================================================== */}
      {/* SIDEBAR HOVER INFORMATION CARD */}
      {/* ===================================================== */}

      {isOpen && currentHoverInfo && (
        <div
          className="pointer-events-none fixed z-[80] hidden -translate-y-1/2 md:block"
          style={{
            top: `${hoverCardPosition.top}px`,
            left: `${hoverCardPosition.left}px`,
          }}
        >

          <div className="relative w-[280px] rounded-xl border border-green-100 bg-white px-4 py-3 text-gray-700 shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">

            {/* CARD TITLE */}

            <p className="mb-2 text-sm font-semibold text-green-600 dark:text-green-400">
              {currentHoverInfo.title}
            </p>

            {/* DIVIDER */}

            <div className="mb-2 h-px bg-green-50 dark:bg-gray-700" />

            {/* INFORMATION ITEMS */}

            <div className="space-y-1.5">

              {currentHoverInfo.items.map(
                (text, index) => (
                  <div
                    key={`${currentHoverInfo.title}-${index}`}
                    className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />

                    <span>{text}</span>
                  </div>
                )
              )}

            </div>

            {/* CARD ARROW */}

            <span className="absolute right-full top-1/2 -translate-y-1/2 border-y-[7px] border-r-[7px] border-y-transparent border-r-white dark:border-r-gray-900" />

          </div>

        </div>
      )}

    </>
  );
}

export default TenantNavbar;