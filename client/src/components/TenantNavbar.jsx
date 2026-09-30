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
} from "lucide-react";

function TenantNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  /*
   * =========================================================
   * SIDEBAR HOVER INFORMATION
   * =========================================================
   *
   * Stores the sidebar item currently being hovered.
   *
   * This is informational only.
   *
   * It does NOT represent notifications,
   * pending tasks, or unread counts.
   */

  const [
    hoveredSidebarItem,
    setHoveredSidebarItem,
  ] = useState(null);

  /*
   * Position of the hover information card.
   */

  const [
    hoverCardPosition,
    setHoverCardPosition,
  ] = useState({
    top: 0,
    left: 0,
  });

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

  const tenantId =
    localStorage.getItem("tenantId");

  const tenant = tenants[tenantId];

  // =========================================================
  // SIDEBAR HOVER INFORMATION
  // =========================================================
  //
  // These descriptions represent the actual sections
  // already available in the Tenant Portal.
  //
  // They are NOT notification badges.
  // They do NOT represent pending actions.
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
      return;
    }

    /*
      Navigate first while sidebar + overlay
      remain visible.
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
      Keep sidebar/overlay visible during route change.
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
      clearTimeout(
        navigationTimerRef.current
      );

      navigationTimerRef.current = null;
    }
  };

  // =========================================================
  // SIDEBAR NAVIGATION
  // =========================================================

  const handleSidebarNavigation = (path) => {
    /*
      Navigate first while sidebar and overlay
      are still visible.
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
      Wait for route change to happen underneath
      the overlay before closing the sidebar.
    */

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
  // SIDEBAR HOVER HANDLER
  // =========================================================

  const handleSidebarHover = (
    itemName,
    event
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    /*
      Width of the information card.
    */

    const cardWidth = 280;

    /*
      Keep the information card inside
      the visible browser window.
    */

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

      left: leftPosition,
    });
  };

  // =========================================================
  // SIDEBAR HOVER LEAVE
  // =========================================================

  const handleSidebarLeave = () => {
    setHoveredSidebarItem(null);
  };

  // =========================================================
  // PROFILE DROPDOWN CLOSE
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
    const html =
      document.documentElement;

    const body =
      document.body;

    if (isOpen) {
      /*
        Save current scroll position only
        when sidebar opens.
      */

      scrollPositionRef.current =
        window.scrollY;

      /*
        Completely freeze background page.
      */

      body.style.position = "fixed";

      body.style.top =
        `-${scrollPositionRef.current}px`;

      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";

      /*
        Prevent horizontal movement.
      */

      html.style.overflow = "hidden";

      html.style.overscrollBehavior =
        "none";
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

      html.style.overscrollBehavior =
        "";

      /*
        Restore old scroll position only
        when sidebar was normally closed.
      */

      if (
        !navigationTimerRef.current
      ) {
        window.scrollTo(
          0,
          savedScrollPosition
        );
      }

      setHoveredSidebarItem(null);
    }

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";

      html.style.overflow = "";

      html.style.overscrollBehavior =
        "none";
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
    return (
      location.pathname === path
    );
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
      ? sidebarInfo[
          hoveredSidebarItem
        ]
      : null;

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

                setIsProfileOpen(
                  false
                );
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
                navigate(
                  "/tenant-dashboard"
                )
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
                isActive(
                  "/tenant-dashboard"
                )
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
                isActive(
                  "/tenant-payments"
                )
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
                isActive(
                  "/tenant-documents"
                )
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
                isActive(
                  "/tenant-notices"
                )
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
                isActive(
                  "/tenant-maintenance"
                )
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
                    onClick={
                      handleMyDetails
                    }
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
                    onClick={
                      handleLogout
                    }
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
  onMouseLeave={handleSidebarLeave}
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

          {/* ================================================= */}
          {/* CLOSE BUTTON + TOOLTIP */}
          {/* ================================================= */}

          <div className="relative group">

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

            {/* CLOSE SIDEBAR TOOLTIP */}

            <div className="pointer-events-none absolute right-0 top-full mt-2 z-[90] opacity-0 group-hover:opacity-100 transition-opacity duration-200">

              <div className="relative whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-lg">

                Close sidebar

                <span className="absolute -top-1 right-3 h-2 w-2 rotate-45 bg-gray-900" />

              </div>

            </div>

          </div>

        </div>

        {/* ================= SIDEBAR MENU ================= */}

        <div className="p-3 overflow-y-auto h-[calc(100vh-5rem)] overscroll-contain overflow-x-hidden">

          {/* ================================================= */}
          {/* DASHBOARD */}
          {/* ================================================= */}

          <button
            type="button"
            onMouseEnter={(event) =>
              handleSidebarHover(
                "Dashboard",
                event
              )
            }
            onFocus={(event) =>
              handleSidebarHover(
                "Dashboard",
                event
              )
            }
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-dashboard"
              )
            }
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition text-left mb-2 ${
              isActive(
                "/tenant-dashboard"
              )
                ? "bg-green-50 text-green-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Home size={22} />

            <span className="text-base font-medium">
              Dashboard
            </span>
          </button>

          {/* ================================================= */}
          {/* MY DETAILS */}
          {/* ================================================= */}

          <button
            type="button"
            onMouseEnter={(event) =>
              handleSidebarHover(
                "My Details",
                event
              )
            }
            onFocus={(event) =>
              handleSidebarHover(
                "My Details",
                event
              )
            }
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

          {/* ================================================= */}
          {/* PAYMENTS */}
          {/* ================================================= */}

          <button
            type="button"
            onMouseEnter={(event) =>
              handleSidebarHover(
                "Payments",
                event
              )
            }
            onFocus={(event) =>
              handleSidebarHover(
                "Payments",
                event
              )
            }
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-payments"
              )
            }
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition text-left mb-2 ${
              isActive(
                "/tenant-payments"
              )
                ? "bg-green-50 text-green-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <CreditCard size={22} />

            <span className="text-base font-medium">
              Payments
            </span>
          </button>

          {/* ================================================= */}
          {/* DOCUMENTS */}
          {/* ================================================= */}

          <button
            type="button"
            onMouseEnter={(event) =>
              handleSidebarHover(
                "Documents",
                event
              )
            }
            onFocus={(event) =>
              handleSidebarHover(
                "Documents",
                event
              )
            }
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-documents"
              )
            }
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition text-left mb-2 ${
              isActive(
                "/tenant-documents"
              )
                ? "bg-green-50 text-green-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FileText size={22} />

            <span className="text-base font-medium">
              Documents
            </span>
          </button>

          {/* ================================================= */}
          {/* NOTICES */}
          {/* ================================================= */}

          <button
            type="button"
            onMouseEnter={(event) =>
              handleSidebarHover(
                "Notices",
                event
              )
            }
            onFocus={(event) =>
              handleSidebarHover(
                "Notices",
                event
              )
            }
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-notices"
              )
            }
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition text-left mb-2 ${
              isActive(
                "/tenant-notices"
              )
                ? "bg-green-50 text-green-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Bell size={22} />

            <span className="text-base font-medium">
              Notices
            </span>
          </button>

          {/* ================================================= */}
          {/* MAINTENANCE */}
          {/* ================================================= */}

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
            onClick={() =>
              handleSidebarNavigation(
                "/tenant-maintenance"
              )
            }
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition text-left mb-2 ${
              isActive(
                "/tenant-maintenance"
              )
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

      {/* ===================================================== */}
      {/* FIXED TENANT SIDEBAR INFORMATION CARD */}
      {/* ===================================================== */}
      {/*
        The card is outside the sidebar so it cannot
        be clipped by overflow-x-hidden.
      */}

      {isOpen &&
        currentHoverInfo && (
          <div
            className="fixed z-[80] pointer-events-none"
            style={{
              top:
                `${hoverCardPosition.top}px`,

              left:
                `${hoverCardPosition.left}px`,

              transform:
                "translateY(-50%)",
            }}
          >

            {/* ================================================= */}
            {/* WHITE + GREEN INFORMATION CARD */}
            {/* ================================================= */}

            <div className="relative w-[280px] rounded-xl bg-white border border-green-100 px-4 py-3 text-gray-700 shadow-xl">

              {/* CARD TITLE */}

              <p className="text-sm font-semibold text-green-600 mb-2">
                {currentHoverInfo.title}
              </p>

              {/* DIVIDER */}

              <div className="h-px bg-green-50 mb-2" />

              {/* CARD INFORMATION */}

              <div className="space-y-1.5">

                {currentHoverInfo.items.map(
                  (text, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-xs text-gray-600"
                    >

                      {/* GREEN BULLET */}

                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />

                      <span>
                        {text}
                      </span>

                    </div>
                  )
                )}

              </div>

              {/* ================================================= */}
              {/* INFORMATION CARD ARROW */}
              {/* ================================================= */}

              <span className="absolute right-full top-1/2 -translate-y-1/2 border-y-[7px] border-r-[7px] border-y-transparent border-r-white" />

            </div>

          </div>
        )}

    </>
  );
}

export default TenantNavbar;