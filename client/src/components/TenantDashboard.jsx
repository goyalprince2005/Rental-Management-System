import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Building2,
  DoorOpen,
  IndianRupee,
  Calendar,
  CreditCard,
  CheckCircle,
  Clock,
  FileText,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

import TenantNavbar from "./TenantNavbar";

const LATE_PENALTY_PER_DAY = 50;

// =========================================================
// TEMPORARY DEMO DATA
// Replace this with API data when backend is implemented.
// =========================================================

const DEMO_TENANTS = {
  "1": {
    id: "1",
    name: "Rahul Sharma",
    phone: "9876543210",
    property: "Green View Apartments",
    location: "Bhopal",
    room: "101",
    monthlyRent: 5000,
    paymentStatus: "Paid",
    joiningDate: "2026-01-10",
    rentDueDay: 10,
  },

  "2": {
    id: "2",
    name: "Aman Kumar",
    phone: "9876543211",
    property: "Green View Apartments",
    location: "Bhopal",
    room: "102",
    monthlyRent: 6000,
    paymentStatus: "Paid",
    joiningDate: "2026-02-05",
    rentDueDay: 5,
  },

  "3": {
    id: "3",
    name: "Neha Sharma",
    phone: "9876543212",
    property: "Shyam Residency",
    location: "Bhopal",
    room: "203",
    monthlyRent: 5500,
    paymentStatus: "Due",
    joiningDate: "2026-03-15",
    rentDueDay: 15,
  },
};

// =========================================================
// TEMPORARY DEMO PAYMENT HISTORY
// This is not actual payment information.
// =========================================================

const getDemoPayments = (monthlyRent, rentDueDay) => [
  {
    id: 1,
    month: "August 2026",
    amount: Number(monthlyRent),
    date: `August ${rentDueDay}, 2026`,
    status: "Paid",
  },
  {
    id: 2,
    month: "July 2026",
    amount: Number(monthlyRent),
    date: `July ${rentDueDay}, 2026`,
    status: "Paid",
  },
  {
    id: 3,
    month: "June 2026",
    amount: Number(monthlyRent),
    date: `June ${rentDueDay}, 2026`,
    status: "Paid",
  },
];

// =========================================================
// REUSABLE CURRENCY FORMATTER
// =========================================================

const formatCurrency = (amount) =>
  Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

// =========================================================
// TENANT DASHBOARD COMPONENT
// =========================================================

function TenantDashboard() {
  const navigate = useNavigate();

  // =======================================================
  // GET LOGGED-IN TENANT SESSION
  // =======================================================

  const tenantId = localStorage.getItem("tenantId");

  // The tenant records remain temporary demo data until
  // the backend and database are connected.
  const tenant = tenantId ? DEMO_TENANTS[tenantId] : null;

  // =======================================================
  // RENT PAYMENT CALCULATION
  // =======================================================

  const paymentInfo = useMemo(() => {
    if (!tenant) {
      return null;
    }

    const monthlyRent = Number(tenant.monthlyRent);
    const dueDay = Number(tenant.rentDueDay);

    if (!Number.isFinite(monthlyRent) || monthlyRent < 0) {
      return {
        status: "Unavailable",
        daysUntilDue: 0,
        daysLate: 0,
        penalty: 0,
        total: 0,
        dueDate: null,
        dueDateText: "Unavailable",
      };
    }

    if (
      !Number.isInteger(dueDay) ||
      dueDay < 1 ||
      dueDay > 31
    ) {
      return {
        status: "Not Configured",
        daysUntilDue: 0,
        daysLate: 0,
        penalty: 0,
        total: monthlyRent,
        dueDate: null,
        dueDateText: "Not configured",
      };
    }

    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();
    const todayDate = today.getDate();

    const lastDayOfMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const actualDueDay = Math.min(
      dueDay,
      lastDayOfMonth
    );

    const dueDate = new Date(
      year,
      month,
      actualDueDay
    );

    const todayOnly = new Date(
      year,
      month,
      todayDate
    );

    const differenceInMilliseconds =
      todayOnly.getTime() - dueDate.getTime();

    const differenceInDays = Math.round(
      differenceInMilliseconds /
        (1000 * 60 * 60 * 24)
    );

    let status = "Upcoming";
    let daysUntilDue = 0;
    let daysLate = 0;
    let penalty = 0;

    if (differenceInDays < 0) {
      status = "Upcoming";
      daysUntilDue = Math.abs(differenceInDays);
    } else if (differenceInDays === 0) {
      status = "Due Today";
    } else {
      status = "Overdue";
      daysLate = differenceInDays;
      penalty =
        daysLate * LATE_PENALTY_PER_DAY;
    }

    const total = monthlyRent + penalty;

    const dueDateText = dueDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    return {
      status,
      daysUntilDue,
      daysLate,
      penalty,
      total,
      dueDate,
      dueDateText,
    };
  }, [tenant]);

  // =======================================================
  // RECENT PAYMENTS
  // =======================================================

  const recentPayments = useMemo(() => {
    if (!tenant) {
      return [];
    }

    return getDemoPayments(
      tenant.monthlyRent,
      tenant.rentDueDay
    );
  }, [tenant]);

  // =======================================================
  // STATUS STYLING
  // =======================================================

  const getStatusColor = () => {
    if (paymentInfo?.status === "Overdue") {
      return "text-red-600 dark:text-red-400";
    }

    if (paymentInfo?.status === "Due Today") {
      return "text-yellow-600 dark:text-yellow-400";
    }

    if (paymentInfo?.status === "Not Configured") {
      return "text-gray-600 dark:text-gray-300";
    }

    return "text-green-600 dark:text-green-400";
  };

  const getStatusIconBackground = () => {
    if (paymentInfo?.status === "Overdue") {
      return "bg-red-50 dark:bg-red-950/40";
    }

    if (paymentInfo?.status === "Due Today") {
      return "bg-yellow-50 dark:bg-yellow-950/40";
    }

    return "bg-green-50 dark:bg-green-950/40";
  };

  // =======================================================
  // INVALID TENANT SESSION
  // =======================================================

  if (!tenant) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <TenantNavbar />

        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40">
              <AlertCircle
                size={30}
                className="text-red-600 dark:text-red-400"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
              Tenant Session Not Found
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Your tenant session is missing or invalid.
              Please log in again to access your dashboard.
            </p>

            <button
              type="button"
              onClick={() => navigate("/tenant-login")}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 sm:w-auto"
            >
              Go to Tenant Login
              <ArrowRight size={17} />
            </button>
          </div>
        </main>
      </div>
    );
  }

  // =======================================================
  // COMMON CARD STYLES
  // =======================================================

  const cardClass =
    "min-w-0 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900";

  const mutedText =
    "text-gray-500 dark:text-gray-400";

  const headingText =
    "font-bold text-gray-900 dark:text-white";

  // =======================================================
  // DASHBOARD UI
  // =======================================================

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">

      <TenantNavbar />

      <main className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-6 lg:px-6">

        {/* WELCOME SECTION */}

        <section className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Welcome, {tenant.name}
          </h1>

          <p className={`mt-2 text-sm sm:text-base ${mutedText}`}>
            Here is an overview of your rental information.
          </p>
        </section>
              {/* ===================================================
            RENT DUE ALERT
        =================================================== */}

        {paymentInfo.status === "Upcoming" && (
          <section className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div className="shrink-0 rounded-lg bg-blue-100 p-3 dark:bg-blue-900/50">
                  <Calendar
                    size={22}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-blue-800 dark:text-blue-300">
                    Rent Due in {paymentInfo.daysUntilDue}{" "}
                    {paymentInfo.daysUntilDue === 1 ? "day" : "days"}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-blue-700 dark:text-blue-200">
                    Your rent of ₹{formatCurrency(tenant.monthlyRent)} is
                    due on {paymentInfo.dueDateText}.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/tenant-payments")}
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-blue-300 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/40 sm:w-auto"
              >
                View Payment
                <ArrowRight size={17} />
              </button>
            </div>
          </section>
        )}

        {/* ===================================================
            DUE TODAY ALERT
        =================================================== */}

        {paymentInfo.status === "Due Today" && (
          <section className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950/30 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div className="shrink-0 rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/50">
                  <Clock
                    size={22}
                    className="text-yellow-600 dark:text-yellow-400"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-yellow-800 dark:text-yellow-300">
                    Rent Due Today
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-yellow-700 dark:text-yellow-200">
                    Your rent of ₹{formatCurrency(tenant.monthlyRent)} is
                    due today.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/tenant-payments")}
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-yellow-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-yellow-700 sm:w-auto"
              >
                Pay Now
                <ArrowRight size={17} />
              </button>
            </div>
          </section>
        )}

        {/* ===================================================
            OVERDUE ALERT
        =================================================== */}

        {paymentInfo.status === "Overdue" && (
          <section className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div className="shrink-0 rounded-lg bg-red-100 p-3 dark:bg-red-900/50">
                  <AlertCircle
                    size={22}
                    className="text-red-600 dark:text-red-400"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-red-800 dark:text-red-300">
                    Rent Overdue by {paymentInfo.daysLate}{" "}
                    {paymentInfo.daysLate === 1 ? "day" : "days"}
                  </h3>

                  <p className="mt-1 text-sm text-red-700 dark:text-red-200">
                    Late penalty: ₹{formatCurrency(paymentInfo.penalty)}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-red-700 dark:text-red-200">
                    Total payable: ₹{formatCurrency(paymentInfo.total)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/tenant-payments")}
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 sm:w-auto"
              >
                Pay Now
                <ArrowRight size={17} />
              </button>
            </div>
          </section>
        )}

        {/* ===================================================
            TENANT INFORMATION
        =================================================== */}

        <section className={`${cardClass} mb-6 p-4 sm:p-6`}>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="shrink-0 rounded-xl bg-green-50 p-3 dark:bg-green-950/40 sm:p-4">
              <User
                size={30}
                className="text-green-600 dark:text-green-400"
              />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                {tenant.name}
              </h2>

              <p className={`mt-1 text-sm ${mutedText}`}>
                Tenant
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {/* PROPERTY */}

            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/70">
              <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
                <Building2 size={18} />
                Property
              </div>

              <p className="mt-2 break-words font-bold text-gray-900 dark:text-white">
                {tenant.property}
              </p>

              <p className={`mt-1 text-sm ${mutedText}`}>
                {tenant.location}
              </p>
            </div>

            {/* ROOM */}

            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/70">
              <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
                <DoorOpen size={18} />
                Room
              </div>

              <p className="mt-2 font-bold text-gray-900 dark:text-white">
                Room {tenant.room}
              </p>
            </div>

            {/* MONTHLY RENT */}

            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/70">
              <div className={`flex items-center gap-2 text-sm ${mutedText}`}>
                <IndianRupee size={18} />
                Monthly Rent
              </div>

              <p className="mt-2 font-bold text-gray-900 dark:text-white">
                ₹{formatCurrency(tenant.monthlyRent)}
              </p>
            </div>

          </div>
        </section>

        {/* ===================================================
            RENT PAYMENT STATUS
        =================================================== */}

        <section className="mb-6">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
            Rent Payment Status
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* MONTHLY RENT */}

            <div className={`${cardClass} p-5`}>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className={`text-sm ${mutedText}`}>
                    Monthly Rent
                  </p>

                  <p className="mt-2 break-words text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{formatCurrency(tenant.monthlyRent)}
                  </p>
                </div>

                <div className="shrink-0 rounded-xl bg-blue-50 p-3 dark:bg-blue-950/40">
                  <IndianRupee
                    size={24}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
              </div>
            </div>

            {/* CURRENT STATUS */}

            <div className={`${cardClass} p-5`}>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className={`text-sm ${mutedText}`}>
                    Current Status
                  </p>

                  <p className={`mt-2 break-words text-xl font-bold sm:text-2xl ${getStatusColor()}`}>
                    {paymentInfo.status}
                  </p>
                </div>

                <div className={`shrink-0 rounded-xl p-3 ${getStatusIconBackground()}`}>
                  {paymentInfo.status === "Overdue" ? (
                    <AlertCircle
                      size={24}
                      className="text-red-600 dark:text-red-400"
                    />
                  ) : paymentInfo.status === "Due Today" ? (
                    <Clock
                      size={24}
                      className="text-yellow-600 dark:text-yellow-400"
                    />
                  ) : (
                    <CheckCircle
                      size={24}
                      className="text-green-600 dark:text-green-400"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* RENT DUE DATE */}

            <div className={`${cardClass} p-5`}>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className={`text-sm ${mutedText}`}>
                    Rent Due Date
                  </p>

                  <p className="mt-2 break-words text-lg font-bold text-gray-900 dark:text-white">
                    {paymentInfo.dueDateText}
                  </p>
                </div>

                <div className="shrink-0 rounded-xl bg-yellow-50 p-3 dark:bg-yellow-950/40">
                  <Calendar
                    size={24}
                    className="text-yellow-600 dark:text-yellow-400"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ===================================================
            OVERDUE PAYMENT SUMMARY
        =================================================== */}

        {paymentInfo.status === "Overdue" && (
          <section className={`${cardClass} mb-6 p-5 sm:p-6`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Overdue Payment
                </h2>

                <p className={`mt-2 max-w-2xl text-sm leading-6 ${mutedText}`}>
                  Your estimated late payment penalty is increasing by
                  ₹{LATE_PENALTY_PER_DAY} for every additional overdue day.
                </p>
              </div>

              <div className="shrink-0 sm:text-right">
                <p className={`text-sm ${mutedText}`}>
                  Estimated Total Payable
                </p>

                <p className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400 sm:text-3xl">
                  ₹{formatCurrency(paymentInfo.total)}
                </p>
              </div>
            </div>
          </section>
        )}  
                {/* ===================================================
            QUICK ACTIONS
        =================================================== */}

        <section className={`${cardClass} mb-6 p-4 sm:p-6`}>
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {/* VIEW PAYMENTS */}

            <button
              type="button"
              onClick={() => navigate("/tenant-payments")}
              className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <CreditCard size={18} />
              View Payments
            </button>

            {/* VIEW TENANT DETAILS */}

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/tenant-details/${tenant.id}?view=tenant`
                )
              }
              className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <User size={18} />
              View My Details
            </button>

            {/* VIEW DOCUMENTS */}

            <button
              type="button"
              onClick={() => navigate("/tenant-documents")}
              className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <FileText size={18} />
              My Documents
            </button>

          </div>
        </section>

        {/* ===================================================
            RECENT PAYMENTS
        =================================================== */}

        <section className={`${cardClass} mb-6 overflow-hidden`}>
          <div className="border-b border-gray-200 p-4 dark:border-gray-800 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
              Recent Payments
            </h2>

            <p className={`mt-1 text-sm ${mutedText}`}>
              Your latest rental payment history.
            </p>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">

            {recentPayments.length > 0 ? (
              recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex flex-col gap-3 p-4 transition hover:bg-gray-50 dark:hover:bg-gray-800/50 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {payment.month}
                    </p>

                    <p className={`mt-1 text-sm ${mutedText}`}>
                      {payment.date}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-5">
                    <p className="font-bold text-gray-900 dark:text-white">
                      ₹{formatCurrency(payment.amount)}
                    </p>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold sm:text-sm ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400"
                      }`}
                    >
                      {payment.status === "Paid" ? (
                        <CheckCircle size={14} />
                      ) : (
                        <Clock size={14} />
                      )}

                      {payment.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <CreditCard
                  size={30}
                  className="mx-auto text-gray-400"
                />

                <p className="mt-3 font-semibold text-gray-700 dark:text-gray-200">
                  No payment records available
                </p>

                <p className={`mt-1 text-sm ${mutedText}`}>
                  Your payment history will appear here.
                </p>
              </div>
            )}

          </div>
        </section>

        {/* ===================================================
            PAYMENT REMINDER
        =================================================== */}

        <section className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950/30 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="shrink-0 rounded-lg bg-yellow-100 p-2.5 dark:bg-yellow-900/50">
              <Clock
                size={22}
                className="text-yellow-600 dark:text-yellow-400"
              />
            </div>

            <div className="min-w-0">
              <h2 className="font-bold text-yellow-800 dark:text-yellow-300">
                Payment Reminder
              </h2>

              {paymentInfo.status === "Upcoming" && (
                <p className="mt-1 text-sm leading-6 text-yellow-700 dark:text-yellow-200">
                  Your next rent payment of ₹
                  {formatCurrency(tenant.monthlyRent)} is due on{" "}
                  {paymentInfo.dueDateText}.
                </p>
              )}

              {paymentInfo.status === "Due Today" && (
                <p className="mt-1 text-sm leading-6 text-yellow-700 dark:text-yellow-200">
                  Your rent payment of ₹
                  {formatCurrency(tenant.monthlyRent)} is due today.
                  Please make your payment.
                </p>
              )}

              {paymentInfo.status === "Overdue" && (
                <p className="mt-1 text-sm leading-6 text-red-700 dark:text-red-300">
                  Your rent is overdue by {paymentInfo.daysLate}{" "}
                  {paymentInfo.daysLate === 1 ? "day" : "days"}.
                  The estimated late penalty is ₹
                  {formatCurrency(paymentInfo.penalty)}.
                </p>
              )}

              {paymentInfo.status === "Not Configured" && (
                <p className="mt-1 text-sm leading-6 text-yellow-700 dark:text-yellow-200">
                  Your rent due date has not been configured.
                  Please contact the property owner.
                </p>
              )}

              {paymentInfo.status === "Unavailable" && (
                <p className="mt-1 text-sm leading-6 text-yellow-700 dark:text-yellow-200">
                  Rent information is currently unavailable.
                  Please contact the property owner.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ===================================================
            DEMO DATA NOTICE
        =================================================== */}

        <p className="pb-3 text-center text-xs text-gray-400 dark:text-gray-500">
          Dashboard information currently uses temporary demo data.
          Live rental and payment records will be connected through
          the backend.
        </p>

      </main>
    </div>
  );
}

export default TenantDashboard;