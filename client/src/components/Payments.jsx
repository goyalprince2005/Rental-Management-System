
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  User,
  Building2,
  DoorOpen,
  IndianRupee,
  Eye,
} from "lucide-react";

import Navbar from "./Navbar";

function Payments() {
  const navigate = useNavigate();

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
  // PAYMENT SUMMARY
  // =========================================================

  const totalPayments = 16500;
  const completedPayments = 11000;
  const pendingPayments = 5500;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">

      {/* NAVBAR */}
      <Navbar />

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Payment Management
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track completed and pending rental payments.
          </p>
        </div>

        {/* =====================================================
            PAYMENT SUMMARY CARDS
        ===================================================== */}

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

        {/* =====================================================
            PAYMENT RECORDS
        ===================================================== */}

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">

          {/* RECORDS HEADER */}

          <div className="p-5 border-b border-gray-200 dark:border-gray-700">

            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Payment Records
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Recent rental payment transactions.
            </p>

          </div>

          {/* PAYMENT LIST */}

          <div className="divide-y divide-gray-200 dark:divide-gray-700">

            {payments.map((payment) => (

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
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                  }`}
                >
                  {payment.status}
                </span>

                {/* VIEW DETAILS BUTTON */}

                <button
                  onClick={() =>
                    navigate(`/tenant-details/${payment.id}`)
                  }
                  className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Eye size={18} />

                  View Details
                </button>

              </div>

            ))}

          </div>
        </div>

      </main>
    </div>
  );
}

export default Payments;
