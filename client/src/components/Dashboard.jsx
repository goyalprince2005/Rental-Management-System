import { useEffect, useRef, useState } from "react";
import {
  Menu,
  Home,
  Building2,
  DoorOpen,
  Users,
  FileText,
  CreditCard,
  BarChart3,
  UserCircle,
  Bell,
  LogOut,
  Printer,
  ChevronDown,
  Circle,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const menuRef = useRef(null);

  /*
   * ==========================================
   * MENU DATA
   * ==========================================
   */

  const menuItems = {
    properties: {
      label: "Properties",
      icon: Building2,
      items: [
        "All Properties",
        "Add Property",
        "Property Details",
        "Property Documents",
      ],
    },

    rooms: {
      label: "Rooms",
      icon: DoorOpen,
      items: [
        "All Rooms",
        "Add Room",
        "Available Rooms",
        "Occupied Rooms",
      ],
    },

    tenants: {
      label: "Tenants",
      icon: Users,
      items: [
        "All Tenants",
        "Add Tenant",
        "Active Tenants",
        "Vacated Tenants",
        "Tenant Documents",
      ],
    },

    bills: {
      label: "Bills",
      icon: FileText,
      items: [
        "All Bills",
        "Generate Bill",
        "Pending Bills",
        "Paid Bills",
      ],
    },

    payments: {
      label: "Payments",
      icon: CreditCard,
      items: [
        "All Payments",
        "Record Payment",
        "Pending Payments",
        "Payment History",
      ],
    },

    reports: {
      label: "Reports",
      icon: BarChart3,
      items: [
        "Rent Report",
        "Payment Report",
        "Tenant Report",
        "Room Report",
      ],
    },

    profile: {
      label: "Profile",
      icon: UserCircle,
      items: [
        "My Profile",
        "Account Settings",
        "Change Password",
      ],
    },
  };

  /*
   * ==========================================
   * OUTSIDE CLICK
   * ==========================================
   */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        setOpenSubmenu(null);
        setHoveredMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  /*
   * ==========================================
   * FUNCTIONS
   * ==========================================
   */

  const toggleSubmenu = (name) => {
    setOpenSubmenu(
      openSubmenu === name ? null : name
    );
  };

  const handleHome = () => {
    setMenuOpen(false);
    setOpenSubmenu(null);
    navigate("/");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    setMenuOpen(false);
    setOpenSubmenu(null);
    navigate("/");
  };

  /*
   * ==========================================
   * COLLAPSED SIDEBAR ITEM
   * ==========================================
   */

  const handleSidebarHover = (name) => {
    setHoveredMenu(name);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ==================================================
          TOP NAVBAR
      ================================================== */}

      <header className="no-print fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md">

        <div className="h-full flex items-center justify-between px-4">

          {/* LEFT */}

          <div className="flex items-center gap-3">

            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setHoveredMenu(null);

                if (menuOpen) {
                  setOpenSubmenu(null);
                }
              }}
              className="p-2 rounded-lg hover:bg-white/10 transition"
              aria-label="Rental Menu"
            >
              <Menu size={26} />
            </button>

            <div className="flex items-center gap-2">

              <Building2 size={24} />

              <div>

                <h1 className="text-lg font-semibold leading-none">
                  Rental Management
                </h1>

                <p className="text-xs text-blue-100">
                  Owner Panel
                </p>

              </div>

            </div>

          </div>


          {/* RIGHT */}

          <div className="flex items-center gap-1">

            <button
              onClick={handleHome}
              className="p-2 rounded-lg hover:bg-white/10 transition"
              title="Home"
            >
              <Home size={21} />
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-lg hover:bg-white/10 transition"
              title="Print"
            >
              <Printer size={21} />
            </button>

            <button
              className="relative p-2 rounded-lg hover:bg-white/10 transition"
              title="Notifications"
            >
              <Bell size={21} />

              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>

            <button
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition"
              title="Owner Profile"
            >
              <UserCircle size={24} />

              <span className="hidden md:block text-sm">
                Owner
              </span>
            </button>

          </div>

        </div>

      </header>


      {/* ==================================================
          COLLAPSED SIDEBAR
      ================================================== */}

      {!menuOpen && (

        <aside className="no-print fixed left-0 top-16 bottom-0 w-16 bg-white border-r shadow-sm z-30">

          <nav className="py-4 flex flex-col items-center gap-2">


            {/* DASHBOARD */}

            <button
              onClick={() =>
                navigate("/owner-dashboard")
              }
              onMouseEnter={() =>
                setHoveredMenu(null)
              }
              className="w-11 h-11 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <Home size={21} />
            </button>


            {/* ==========================================
                ALL MENU ITEMS
            ========================================== */}

            {Object.entries(menuItems).map(
              ([key, menu]) => {

                const Icon = menu.icon;

                return (

                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() =>
                      handleSidebarHover(key)
                    }
                    onMouseLeave={() =>
                      setHoveredMenu(null)
                    }
                  >

                    {/* ICON */}

                    <button
                      className={`w-11 h-11 flex items-center justify-center rounded-lg transition ${
                        hoveredMenu === key
                          ? "bg-blue-50 text-blue-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={21} />
                    </button>


                    {/* ==================================
                        HOVER FLYOUT
                    ================================== */}

                    {hoveredMenu === key && (

                      <div
                        className="absolute left-14 top-0 w-64 bg-white rounded-lg shadow-xl border z-50 overflow-hidden"
                        onMouseEnter={() =>
                          setHoveredMenu(key)
                        }
                        onMouseLeave={() =>
                          setHoveredMenu(null)
                        }
                      >

                        {/* TITLE */}

                        <div className="bg-gray-50 border-b px-4 py-3">

                          <div className="flex items-center gap-2">

                            <Icon size={19} />

                            <span className="font-semibold">
                              {menu.label}
                            </span>

                          </div>

                        </div>


                        {/* SUBMENU */}

                        <div className="py-2">

                          {menu.items.map(
                            (item) => (

                              <button
                                key={item}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-blue-50 hover:text-blue-700 transition"
                                onClick={() => {
                                  setHoveredMenu(null);
                                }}
                              >

                                <Circle
                                  size={9}
                                />

                                <span>
                                  {item}
                                </span>

                              </button>

                            )
                          )}

                        </div>

                      </div>

                    )}

                  </div>

                );
              }
            )}


            {/* DIVIDER */}

            <div className="w-10 border-t my-2" />


            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              onMouseEnter={() =>
                setHoveredMenu(null)
              }
              className="w-11 h-11 flex items-center justify-center rounded-lg text-red-600 hover:bg-red-50 transition"
              title="Logout"
            >
              <LogOut size={21} />
            </button>

          </nav>

        </aside>

      )}


      {/* ==================================================
          FULL RENTAL MENU
      ================================================== */}

      {menuOpen && (

        <>

          {/* BACKDROP */}

          <div className="no-print fixed inset-0 top-16 bg-black/20 z-30" />


          {/* MENU */}

          <aside
            ref={menuRef}
            className="no-print fixed left-0 top-16 bottom-0 w-80 bg-white shadow-2xl z-40 overflow-y-auto"
          >

            {/* MENU HEADER */}

            <div className="sticky top-0 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-5 py-4 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold">
                  Rental Menu
                </h2>

                <p className="text-xs text-blue-100 mt-1">
                  Rental Management System
                </p>

              </div>

              {/* Always hamburger — NO X */}

              <Menu size={24} />

            </div>


            {/* MENU */}

            <nav className="p-3">


              {/* DASHBOARD */}

              <button
                onClick={() => {
                  navigate("/owner-dashboard");
                  setMenuOpen(false);
                  setOpenSubmenu(null);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition mb-1"
              >

                <Home size={20} />

                <span className="font-medium">
                  Dashboard
                </span>

              </button>


              {/* ==========================================
                  FULL MENU SUBMENUS
              ========================================== */}

              {Object.entries(menuItems).map(
                ([key, menu]) => {

                  const Icon = menu.icon;

                  return (

                    <div key={key}>

                      <button
                        onClick={() =>
                          toggleSubmenu(key)
                        }
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                          openSubmenu === key
                            ? "bg-blue-50 text-blue-700"
                            : "hover:bg-gray-100"
                        }`}
                      >

                        <div className="flex items-center gap-3">

                          <Icon size={20} />

                          <span className="font-medium">
                            {menu.label}
                          </span>

                        </div>

                        <ChevronDown
                          size={18}
                          className={`transition-transform ${
                            openSubmenu === key
                              ? "rotate-180"
                              : ""
                          }`}
                        />

                      </button>


                      {/* SUBMENU */}

                      {openSubmenu === key && (

                        <div className="ml-7 mt-1 mb-2 border-l-2 border-blue-100">

                          {menu.items.map(
                            (item) => (

                              <button
                                key={item}
                                className="w-full flex items-center gap-3 text-left px-4 py-2.5 text-sm hover:bg-gray-50"
                              >

                                <Circle
                                  size={9}
                                />

                                {item}

                              </button>

                            )
                          )}

                        </div>

                      )}

                    </div>

                  );
                }
              )}


              {/* LOGOUT */}

              <div className="border-t mt-3 pt-3">

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
                >

                  <LogOut size={20} />

                  <span className="font-medium">
                    Logout
                  </span>

                </button>

              </div>

            </nav>

          </aside>

        </>

      )}


      {/* ==================================================
          MAIN DASHBOARD
      ================================================== */}

      <main className="pt-16 min-h-screen ml-16">

        <section className="p-6">


          {/* HEADER */}

          <div className="mb-6">

            <h2 className="text-3xl font-bold text-gray-800">
              Dashboard
            </h2>

            <p className="text-gray-500 mt-1">
              Welcome back, Owner. Here's your rental overview.
            </p>

          </div>


          {/* SUMMARY CARDS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">


            {/* PROPERTIES */}

            <div className="bg-white rounded-xl shadow-sm p-6 border">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Properties
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    2
                  </h3>

                </div>

                <Building2
                  size={32}
                  className="text-blue-600"
                />

              </div>

            </div>


            {/* ROOMS */}

            <div className="bg-white rounded-xl shadow-sm p-6 border">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Rooms
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    25
                  </h3>

                </div>

                <DoorOpen
                  size={32}
                  className="text-green-600"
                />

              </div>

            </div>


            {/* TENANTS */}

            <div className="bg-white rounded-xl shadow-sm p-6 border">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Tenants
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    22
                  </h3>

                </div>

                <Users
                  size={32}
                  className="text-purple-600"
                />

              </div>

            </div>


            {/* RENT */}

            <div className="bg-white rounded-xl shadow-sm p-6 border">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Pending Rent
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    ₹25,000
                  </h3>

                </div>

                <CreditCard
                  size={32}
                  className="text-orange-500"
                />

              </div>

            </div>

          </div>


          {/* QUICK ACTIONS */}

          <div className="mt-8">

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <button className="flex items-center justify-center gap-2 bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition">

                <Plus size={20} />

                Add Property

              </button>


              <button className="flex items-center justify-center gap-2 bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 transition">

                <Plus size={20} />

                Add Room

              </button>


              <button className="flex items-center justify-center gap-2 bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition">

                <Plus size={20} />

                Add Tenant

              </button>


              <button className="flex items-center justify-center gap-2 bg-orange-500 text-white p-4 rounded-xl hover:bg-orange-600 transition">

                <Plus size={20} />

                Add Bill

              </button>

            </div>

          </div>


          {/* RECENT TENANTS */}

          <div className="mt-8 bg-white rounded-xl shadow-sm border overflow-hidden">

            <div className="p-6 border-b">

              <h2 className="text-xl font-bold text-gray-800">
                Recent Tenants
              </h2>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="px-6 py-4">
                      Tenant
                    </th>

                    <th className="px-6 py-4">
                      Room
                    </th>

                    <th className="px-6 py-4">
                      Monthly Rent
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-t">

                    <td className="px-6 py-4">
                      Rahul Sharma
                    </td>

                    <td className="px-6 py-4">
                      101
                    </td>

                    <td className="px-6 py-4">
                      ₹5,000
                    </td>

                    <td className="px-6 py-4">

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>

                    </td>

                  </tr>


                  <tr className="border-t">

                    <td className="px-6 py-4">
                      Aman Kumar
                    </td>

                    <td className="px-6 py-4">
                      102
                    </td>

                    <td className="px-6 py-4">
                      ₹6,000
                    </td>

                    <td className="px-6 py-4">

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>

                    </td>

                  </tr>


                  <tr className="border-t">

                    <td className="px-6 py-4">
                      Neha Sharma
                    </td>

                    <td className="px-6 py-4">
                      103
                    </td>

                    <td className="px-6 py-4">
                      ₹5,500
                    </td>

                    <td className="px-6 py-4">

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        Pending
                      </span>

                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </main>


      {/* ==================================================
          PRINT
      ================================================== */}

      <style>
        {`
          @media print {

            .no-print {
              display: none !important;
            }

            main {
              margin-left: 0 !important;
              padding-top: 0 !important;
            }

            body {
              background: white !important;
            }

          }
        `}
      </style>

    </div>
  );
}

export default Dashboard;