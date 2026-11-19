
import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  DoorOpen,
  Users,
  CreditCard,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

import Navbar from "./Navbar";

function Dashboard() {
  const navigate = useNavigate();

  // =========================================================
  // SUMMARY CARD NAVIGATION
  // =========================================================

  const handleSummaryNavigation = (path) => {
    navigate(path);
  };

  // =========================================================
  // ATTENTION ITEM NAVIGATION
  // =========================================================

  const handleAttentionNavigation = (path) => {
    navigate(path);
  };

  // =========================================================
  // TENANT DETAILS NAVIGATION
  // =========================================================

  const handleTenantNavigation = (tenantId) => {
    navigate(`/tenant-details/${tenantId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden transition-colors duration-200">

      {/* =====================================================
          OWNER NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          MAIN DASHBOARD
      ===================================================== */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* ===================================================
            WELCOME
        =================================================== */}

        <div className="mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Welcome back, Owner 👋
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's what's happening with your rental properties.
          </p>

        </div>

        {/* ===================================================
            SUMMARY CARDS
        =================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* =================================================
              TOTAL PROPERTIES
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              handleSummaryNavigation("/properties")
            }
            className="text-left bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5 border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700 hover:-translate-y-0.5 transition duration-200 cursor-pointer"
          >

            <div className="flex items-start justify-between">

              <Building2
                className="text-blue-600 dark:text-blue-400"
                size={28}
              />

              <ArrowRight
                size={28}
                strokeWidth={2}
                className="text-gray-400 dark:text-gray-500"
              />

            </div>

            <p className="text-gray-500 dark:text-gray-400 mt-4">
              Total Properties
            </p>

            <h3 className="text-3xl font-bold mt-1 text-gray-900 dark:text-gray-100">
              2
            </h3>

            <div className="flex items-center gap-1.5 mt-3">

              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                View properties
              </span>

              <ArrowRight
                size={18}
                strokeWidth={2}
                className="text-blue-600 dark:text-blue-400"
              />

            </div>

          </button>

          {/* =================================================
              TOTAL ROOMS
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              handleSummaryNavigation("/rooms")
            }
            className="text-left bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5 border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-green-200 dark:hover:border-green-700 hover:-translate-y-0.5 transition duration-200 cursor-pointer"
          >

            <div className="flex items-start justify-between">

              <DoorOpen
                className="text-green-600 dark:text-green-400"
                size={28}
              />

              <ArrowRight
                size={28}
                strokeWidth={2}
                className="text-gray-400 dark:text-gray-500"
              />

            </div>

            <p className="text-gray-500 dark:text-gray-400 mt-4">
              Total Rooms
            </p>

            <h3 className="text-3xl font-bold mt-1 text-gray-900 dark:text-gray-100">
              25
            </h3>

            <div className="flex items-center gap-1.5 mt-3">

              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                View rooms
              </span>

              <ArrowRight
                size={18}
                strokeWidth={2}
                className="text-green-600 dark:text-green-400"
              />

            </div>

          </button>

          {/* =================================================
              ACTIVE TENANTS
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              handleSummaryNavigation("/tenants")
            }
            className="text-left bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5 border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-purple-200 dark:hover:border-purple-700 hover:-translate-y-0.5 transition duration-200 cursor-pointer"
          >

            <div className="flex items-start justify-between">

              <Users
                className="text-purple-600 dark:text-purple-400"
                size={28}
              />

              <ArrowRight
                size={28}
                strokeWidth={2}
                className="text-gray-400 dark:text-gray-500"
              />

            </div>

            <p className="text-gray-500 dark:text-gray-400 mt-4">
              Active Tenants
            </p>

            <h3 className="text-3xl font-bold mt-1 text-gray-900 dark:text-gray-100">
              22
            </h3>

            <div className="flex items-center gap-1.5 mt-3">

              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                View tenants
              </span>

              <ArrowRight
                size={18}
                strokeWidth={2}
                className="text-purple-600 dark:text-purple-400"
              />

            </div>

          </button>

          {/* =================================================
              PENDING RENT
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              handleSummaryNavigation("/rent-bills")
            }
            className="text-left bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5 border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-orange-200 dark:hover:border-orange-700 hover:-translate-y-0.5 transition duration-200 cursor-pointer"
          >

            <div className="flex items-start justify-between">

              <CreditCard
                className="text-orange-500"
                size={28}
              />

              <ArrowRight
                size={28}
                strokeWidth={2}
                className="text-gray-400 dark:text-gray-500"
              />

            </div>

            <p className="text-gray-500 dark:text-gray-400 mt-4">
              Pending Rent
            </p>

            <h3 className="text-3xl font-bold mt-1 text-gray-900 dark:text-gray-100">
              ₹25,000
            </h3>

            <div className="flex items-center gap-1.5 mt-3">

              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                View rent & bills
              </span>

              <ArrowRight
                size={18}
                strokeWidth={2}
                className="text-orange-600 dark:text-orange-400"
              />

            </div>

          </button>

        </div>

        {/* ===================================================
            PROPERTY + ATTENTION
        =================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          {/* =================================================
              MY PROPERTIES
          ================================================= */}

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">

            <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">

              <div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  My Properties
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Property and room overview
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/properties")
                }
                className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
              >
                View All →
              </button>

            </div>

            <div className="p-5 space-y-4">

              {/* PROPERTY A */}

              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-sm hover:border-blue-200 dark:hover:border-blue-700 transition">

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                      Green View Apartments
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      📍 Bhopal
                    </p>

                  </div>

                  <Building2
                    size={24}
                    className="text-blue-600 dark:text-blue-400"
                  />

                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center">

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Floors
                    </p>

                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      5
                    </p>

                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Rooms
                    </p>

                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      13
                    </p>

                  </div>

                  <div className="bg-green-50 dark:bg-green-950/40 rounded-lg p-2">

                    <p className="text-xs text-green-700 dark:text-green-300">
                      Available
                    </p>

                    <p className="font-bold text-green-600 dark:text-green-400">
                      3
                    </p>

                  </div>

                </div>

              </div>

              {/* PROPERTY B */}

              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-sm hover:border-blue-200 dark:hover:border-blue-700 transition">

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                      Shyam Residency
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      📍 Bhopal
                    </p>

                  </div>

                  <Building2
                    size={24}
                    className="text-blue-600 dark:text-blue-400"
                  />

                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center">

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Floors
                    </p>

                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      2
                    </p>

                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Rooms
                    </p>

                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      6
                    </p>

                  </div>

                  <div className="bg-green-50 dark:bg-green-950/40 rounded-lg p-2">

                    <p className="text-xs text-green-700 dark:text-green-300">
                      Available
                    </p>

                    <p className="font-bold text-green-600 dark:text-green-400">
                      1
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              ATTENTION REQUIRED
          ================================================= */}

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">

            <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">

              <div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Attention Required
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Things that need your attention
                </p>

              </div>

              <AlertTriangle
                size={25}
                className="text-orange-500"
              />

            </div>

            <div className="p-5 space-y-4">

              {/* RENT PENDING */}

              <button
                type="button"
                onClick={() =>
                  handleAttentionNavigation(
                    "/rent-bills"
                  )
                }
                className="w-full flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-950/70 transition text-left cursor-pointer"
              >

                <div>

                  <p className="font-semibold text-red-700 dark:text-red-300">
                    Rent Pending
                  </p>

                  <p className="text-sm text-red-600 dark:text-red-400">
                    5 tenants have pending rent
                  </p>

                </div>

                <span className="font-bold text-red-700 dark:text-red-300">
                  5
                </span>

              </button>

              {/* VACANT ROOMS */}

              <button
                type="button"
                onClick={() =>
                  handleAttentionNavigation(
                    "/rooms"
                  )
                }
                className="w-full flex items-center justify-between p-4 rounded-xl bg-yellow-50 dark:bg-yellow-950/40 hover:bg-yellow-100 dark:hover:bg-yellow-950/70 transition text-left cursor-pointer"
              >

                <div>

                  <p className="font-semibold text-yellow-700 dark:text-yellow-300">
                    Vacant Rooms
                  </p>

                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    3 rooms are currently available
                  </p>

                </div>

                <span className="font-bold text-yellow-700 dark:text-yellow-300">
                  3
                </span>

              </button>

              {/* DOCUMENTS */}

              <button
                type="button"
                onClick={() =>
                  handleAttentionNavigation(
                    "/documents"
                  )
                }
                className="w-full flex items-center justify-between p-4 rounded-xl bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-100 dark:hover:bg-orange-950/70 transition text-left cursor-pointer"
              >

                <div>

                  <p className="font-semibold text-orange-700 dark:text-orange-300">
                    Documents Expiring
                  </p>

                  <p className="text-sm text-orange-700 dark:text-orange-400">
                    4 tenant documents need attention
                  </p>

                </div>

                <span className="font-bold text-orange-700 dark:text-orange-300">
                  4
                </span>

              </button>

            </div>

          </div>

        </div>

        {/* ===================================================
            RECENT TENANTS
        =================================================== */}

        <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">

          <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">

            <div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Recent Tenants
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Recently added or active tenants
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/tenants")
              }
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              View All →
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-50 dark:bg-gray-800">

                <tr>

                  <th className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Tenant
                  </th>

                  <th className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Property
                  </th>

                  <th className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Room
                  </th>

                  <th className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Rent
                  </th>

                  <th className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">

                {/* TENANT 1 */}

                <tr
                  onClick={() =>
                    handleTenantNavigation(1)
                  }
                  className="hover:bg-blue-50 dark:hover:bg-gray-800 transition cursor-pointer"
                >

                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-gray-100">
                    Rahul Sharma
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Green View Apartments
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    101
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    ₹5,000
                  </td>

                  <td className="px-5 py-4">

                    <span className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>

                  </td>

                </tr>

                {/* TENANT 2 */}

                <tr
                  onClick={() =>
                    handleTenantNavigation(2)
                  }
                  className="hover:bg-blue-50 dark:hover:bg-gray-800 transition cursor-pointer"
                >

                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-gray-100">
                    Aman Kumar
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Green View Apartments
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    102
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    ₹6,000
                  </td>

                  <td className="px-5 py-4">

                    <span className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>

                  </td>

                </tr>

                {/* TENANT 3 */}

                <tr
                  onClick={() =>
                    handleTenantNavigation(3)
                  }
                  className="hover:bg-blue-50 dark:hover:bg-gray-800 transition cursor-pointer"
                >

                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-gray-100">
                    Neha Sharma
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Shyam Residency
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    203
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    ₹5,500
                  </td>

                  <td className="px-5 py-4">

                    <span className="bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full text-sm">
                      Due
                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

        {/* ===================================================
            RECENT PAYMENTS
        =================================================== */}

        <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">

          <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">

            <div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Recent Payments
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Latest rent payment activity
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/payments")
              }
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              View All →
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-50 dark:bg-gray-800">

                <tr>

                  <th className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Tenant
                  </th>

                  <th className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Property
                  </th>

                  <th className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Room
                  </th>

                  <th className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Date
                  </th>

                  <th className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">

                {/* PAYMENT 1 */}

                <tr
                  onClick={() =>
                    navigate("/payments")
                  }
                  className="hover:bg-blue-50 dark:hover:bg-gray-800 transition cursor-pointer"
                >

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Rahul Sharma
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Green View Apartments
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    101
                  </td>

                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-gray-100">
                    ₹5,000
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Aug 01, 2026
                  </td>

                  <td className="px-5 py-4">

                    <span className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                      Paid
                    </span>

                  </td>

                </tr>

                {/* PAYMENT 2 */}

                <tr
                  onClick={() =>
                    navigate("/payments")
                  }
                  className="hover:bg-blue-50 dark:hover:bg-gray-800 transition cursor-pointer"
                >

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Aman Kumar
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Green View Apartments
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    102
                  </td>

                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-gray-100">
                    ₹6,000
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Aug 02, 2026
                  </td>

                  <td className="px-5 py-4">

                    <span className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                      Paid
                    </span>

                  </td>

                </tr>

                {/* PAYMENT 3 */}

                <tr
                  onClick={() =>
                    navigate("/payments")
                  }
                  className="hover:bg-blue-50 dark:hover:bg-gray-800 transition cursor-pointer"
                >

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Neha Sharma
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Shyam Residency
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    203
                  </td>

                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-gray-100">
                    ₹5,500
                  </td>

                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    Aug 05, 2026
                  </td>

                  <td className="px-5 py-4">

                    <span className="bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full text-sm">
                      Due
                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
