
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CreditCard,
  User,
  Building2,
  DoorOpen,
  IndianRupee,
  Eye,
  Search,
  X,
} from "lucide-react";

import Navbar from "./Navbar";

function Payments() {
  const navigate = useNavigate();

  // =========================================================
  // SEARCH AND FILTER STATES
  // =========================================================

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedMethod, setSelectedMethod] = useState("All Methods");

  // =========================================================
  // PAYMENT RECORDS (DEMO DATA)
  // =========================================================

  const payments = [
    {
      id: 1,
      tenant: "Rahul Sharma",
      property: "Green View Apartments",
      room: "101",
      amount: "₹5,000",
      date: "Aug 01, 2026",
      status: "Paid",
      method: "UPI",
    },
    {
      id: 2,
      tenant: "Aman Kumar",
      property: "Green View Apartments",
      room: "102",
      amount: "₹6,000",
      date: "Aug 02, 2026",
      status: "Paid",
      method: "Bank Transfer",
    },
    {
      id: 3,
      tenant: "Neha Sharma",
      property: "Shyam Residency",
      room: "203",
      amount: "₹5,500",
      date: "Aug 05, 2026",
      status: "Due",
      method: "-",
    },
  ];

  // =========================================================
  // HELPER: CONVERT CURRENCY STRING TO NUMBER
  // =========================================================

  const getAmountValue = (amount) => {
    return Number(amount.replace(/[₹,\s]/g, "")) || 0;
  };

  // =========================================================
  // PAYMENT SUMMARY
  // Always calculated from all payment records.
  // =========================================================

  const totalPayments = payments.reduce(
    (total, payment) => total + getAmountValue(payment.amount),
    0
  );

  const completedPayments = payments
    .filter((payment) => payment.status === "Paid")
    .reduce(
      (total, payment) => total + getAmountValue(payment.amount),
      0
    );

  const pendingPayments = payments
    .filter((payment) =>
      ["Due", "Pending"].includes(payment.status)
    )
    .reduce(
      (total, payment) => total + getAmountValue(payment.amount),
      0
    );

  // =========================================================
  // UNIQUE FILTER OPTIONS
  // =========================================================

  const paymentStatuses = [
    ...new Set(payments.map((payment) => payment.status)),
  ];

  const paymentMethods = [
    ...new Set(
      payments
        .map((payment) => payment.method)
        .filter((method) => method !== "-")
    ),
  ];

  // =========================================================
  // SMART SEARCH AND FILTER LOGIC
  // =========================================================

  const filteredPayments = useMemo(() => {
    const searchValue = searchTerm.trim().toLowerCase();

    return payments.filter((payment) => {

      // SEARCH MULTIPLE PAYMENT FIELDS

      const matchesSearch =
        !searchValue ||
        payment.id.toString().includes(searchValue) ||
        payment.tenant.toLowerCase().includes(searchValue) ||
        payment.property.toLowerCase().includes(searchValue) ||
        payment.room.toLowerCase().includes(searchValue) ||
        payment.amount.toLowerCase().includes(searchValue) ||
        payment.status.toLowerCase().includes(searchValue) ||
        payment.method.toLowerCase().includes(searchValue) ||
        payment.date.toLowerCase().includes(searchValue);

      // STATUS FILTER

      const matchesStatus =
        selectedStatus === "All Statuses" ||
        payment.status === selectedStatus;

      // PAYMENT METHOD FILTER

      const matchesMethod =
        selectedMethod === "All Methods" ||
        payment.method === selectedMethod;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payments, searchTerm, selectedStatus, selectedMethod]);

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("All Statuses");
    setSelectedMethod("All Methods");
  };

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedStatus !== "All Statuses" ||
    selectedMethod !== "All Methods";

  // =========================================================
  // COMPONENT UI
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* NAVBAR */}

      <Navbar />

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* PAGE HEADER */}

        <div className="mb-6">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Payment Management
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track completed and pending rental payments.
          </p>

        </div>

        {/* PAYMENT SUMMARY CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

          {/* TOTAL PAYMENTS */}

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 transition-colors duration-300">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">

                <IndianRupee
                  size={26}
                  className="text-blue-600 dark:text-blue-400"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Payments
                </p>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  ₹{totalPayments.toLocaleString("en-IN")}
                </h3>

              </div>

            </div>

          </div>

          {/* COMPLETED PAYMENTS */}

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 transition-colors duration-300">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl">

                <CreditCard
                  size={26}
                  className="text-green-600 dark:text-green-400"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completed
                </p>

                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ₹{completedPayments.toLocaleString("en-IN")}
                </h3>

              </div>

            </div>

          </div>

          {/* PENDING PAYMENTS */}

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 transition-colors duration-300">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl">

                <CreditCard
                  size={26}
                  className="text-yellow-600 dark:text-yellow-400"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Pending
                </p>

                <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  ₹{pendingPayments.toLocaleString("en-IN")}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* SEARCH AND FILTERS */}

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 mb-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

            <div>

              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Find Payments
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Search by tenant, property, room, amount or payment ID.
              </p>

            </div>

            {hasActiveFilters && (

              <button
                type="button"
                onClick={handleClearFilters}
                className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <X size={16} />
                Clear Filters
              </button>

            )}

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* SMART SEARCH */}

            <div>

              <label
                htmlFor="payment-search"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Search Payments
              </label>

              <div className="relative">

                <Search
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="payment-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tenant, property, room..."
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />

                {searchTerm && (

                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <X size={17} />
                  </button>

                )}

              </div>

            </div>

            {/* STATUS FILTER */}

            <div>

              <label
                htmlFor="payment-status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Payment Status
              </label>

              <select
                id="payment-status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="All Statuses">
                  All Statuses
                </option>

                {paymentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}

              </select>

            </div>

            {/* PAYMENT METHOD FILTER */}

            <div>

              <label
                htmlFor="payment-method"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Payment Method
              </label>

              <select
                id="payment-method"
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="All Methods">
                  All Methods
                </option>

                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}

              </select>

            </div>

          </div>

        </div>

        {/* PAYMENT RECORDS */}

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">

          {/* RECORDS HEADER */}

          <div className="p-5 border-b border-gray-200 dark:border-gray-700">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

              <div>

                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Payment Records
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Recent rental payment transactions.
                </p>

              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">

                Showing{" "}
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {filteredPayments.length}
                </span>
                {" "}of{" "}
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {payments.length}
                </span>
                {" "}payments

              </p>

            </div>

          </div>

          {/* PAYMENT LIST */}

          <div className="divide-y divide-gray-200 dark:divide-gray-700">

            {filteredPayments.length > 0 ? (

              filteredPayments.map((payment) => (

                <div
                  key={payment.id}
                  className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                >

                  {/* TENANT DETAILS */}

                  <div className="flex items-center gap-4">

                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">

                      <User
                        size={24}
                        className="text-blue-600 dark:text-blue-400"
                      />

                    </div>

                    <div>

                      <h4 className="font-bold text-gray-800 dark:text-gray-100">
                        {payment.tenant}
                      </h4>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Payment ID: {payment.id}
                      </p>

                    </div>

                  </div>

                  {/* PROPERTY DETAILS */}

                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">

                    <Building2 size={18} />

                    <span className="text-sm">
                      {payment.property}
                    </span>

                  </div>

                  {/* ROOM DETAILS */}

                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">

                    <DoorOpen size={18} />

                    <span className="text-sm">
                      Room {payment.room}
                    </span>

                  </div>

                  {/* PAYMENT AMOUNT */}

                  <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100">

                    <IndianRupee
                      size={18}
                      className="text-gray-500 dark:text-gray-400"
                    />

                    <span className="font-semibold">
                      {payment.amount}
                    </span>

                  </div>

                  {/* PAYMENT DATE */}

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {payment.date}
                  </div>

                  {/* PAYMENT METHOD */}

                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {payment.method}
                  </div>

                  {/* PAYMENT STATUS */}

                  <span
                    className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${
                      payment.status === "Paid"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        : payment.status === "Due" || payment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                    }`}
                  >
                    {payment.status}
                  </span>

                  {/* VIEW DETAILS BUTTON */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/tenant-details/${payment.id}`)
                    }
                    className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >

                    <Eye size={18} />

                    View Details

                  </button>

                </div>

              ))

            ) : (

              /* EMPTY SEARCH RESULT */

              <div className="p-10 text-center">

                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">

                  <Search
                    size={28}
                    className="text-gray-400 dark:text-gray-300"
                  />

                </div>

                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  No payments found
                </h4>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Try changing your search term or filters.
                </p>

                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Clear Filters
                </button>

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Payments;
