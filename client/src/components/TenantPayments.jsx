
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IndianRupee,
  CalendarDays,
  Clock,
  AlertCircle,
  CheckCircle2,
  QrCode,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import TenantNavbar from "./TenantNavbar";

/*
 * =========================================================
 * MOCK TENANT DATA
 * =========================================================
 */

const tenants = {
  1: {
    id: 1,
    name: "Rahul Sharma",
    mobile: "9876543210",
    property: "Green View Apartments",
    location: "Bhopal",
    room: "101",
    rent: 5000,
    status: "Active",
    joiningDate: "2026-01-10",
    rentDueDay: 10,
  },

  2: {
    id: 2,
    name: "Aman Kumar",
    mobile: "9876543211",
    property: "Green View Apartments",
    location: "Bhopal",
    room: "102",
    rent: 6000,
    status: "Active",
    joiningDate: "2026-02-05",
    rentDueDay: 5,
  },

  3: {
    id: 3,
    name: "Neha Sharma",
    mobile: "9876543212",
    property: "Shyam Residency",
    location: "Bhopal",
    room: "203",
    rent: 5500,
    status: "Due",
    joiningDate: "2026-03-15",
    rentDueDay: 15,
  },
};

/*
 * =========================================================
 * PAYMENT SETTINGS
 * =========================================================
 */

const LATE_PENALTY_PER_DAY = 50;
const UPI_ID = "rentalowner@upi";

/*
 * =========================================================
 * TENANT PAYMENTS COMPONENT
 * =========================================================
 */

function TenantPayments() {
  const navigate = useNavigate();

  /*
   * =======================================================
   * LOGGED-IN TENANT
   * =======================================================
   */

  const tenantId = localStorage.getItem("tenantId");

  const tenant = tenants[tenantId] || tenants[1];

  /*
   * =======================================================
   * RECENT PAYMENTS
   * =======================================================
   */

  const recentPayments = [
    {
      id: 1,
      month: "August 2026",
      amount: Number(tenant.rent),
      date: `August ${tenant.rentDueDay}, 2026`,
      status: "Paid",
    },
    {
      id: 2,
      month: "July 2026",
      amount: Number(tenant.rent),
      date: `July ${tenant.rentDueDay}, 2026`,
      status: "Paid",
    },
    {
      id: 3,
      month: "June 2026",
      amount: Number(tenant.rent),
      date: `June ${tenant.rentDueDay}, 2026`,
      status: "Paid",
    },
  ];

  /*
   * =======================================================
   * CURRENT DATE STATE
   * =======================================================
   */

  const [currentDate, setCurrentDate] = useState(new Date());

  /*
   * =======================================================
   * AUTOMATIC DATE UPDATE
   * =======================================================
   */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  /*
   * =======================================================
   * PAYMENT INFORMATION CALCULATION
   * =======================================================
   */

  const paymentInfo = useMemo(() => {
    const today = new Date(currentDate);

    const year = today.getFullYear();
    const month = today.getMonth();
    const todayDate = today.getDate();

    const dueDay = Number(tenant.rentDueDay);

    if (!dueDay) {
      return {
        status: "Not Configured",
        statusLabel: "Due date not configured",
        daysLate: 0,
        penalty: 0,
        total: Number(tenant.rent),
        dueDate: null,
        dueDateText: "Not configured",
      };
    }

    /*
     * Last day of current month.
     */

    const lastDayOfMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    /*
     * Actual due day for current month.
     */

    const actualDueDay = Math.min(
      dueDay,
      lastDayOfMonth
    );

    /*
     * Current month's due date.
     */

    const dueDate = new Date(
      year,
      month,
      actualDueDay
    );

    /*
     * Compare dates without time.
     */

    const todayOnly = new Date(
      year,
      month,
      todayDate
    );

    const differenceInMilliseconds =
      todayOnly.getTime() -
      dueDate.getTime();

    const differenceInDays = Math.floor(
      differenceInMilliseconds /
        (1000 * 60 * 60 * 24)
    );

    /*
     * Default payment state.
     */

    let status = "Upcoming";
    let statusLabel = "Rent Upcoming";
    let daysLate = 0;
    let penalty = 0;

    /*
     * Determine payment status.
     */

    if (differenceInDays < 0) {
      status = "Upcoming";
      statusLabel = "Rent Upcoming";
    } else if (differenceInDays === 0) {
      status = "Due Today";
      statusLabel = "Rent Due Today";
    } else {
      status = "Overdue";
      statusLabel = "Rent Overdue";

      daysLate = differenceInDays;

      penalty =
        daysLate * LATE_PENALTY_PER_DAY;
    }

    /*
     * Total payable amount.
     */

    const total =
      Number(tenant.rent) + penalty;

    /*
     * Format due date.
     */

    const dueDateText =
      dueDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

    return {
      status,
      statusLabel,
      daysLate,
      penalty,
      total,
      dueDate,
      dueDateText,
    };
  }, [currentDate, tenant]);

  /*
   * =======================================================
   * QR VISIBILITY
   * =======================================================
   */

  const showQRCode =
    paymentInfo.status === "Due Today" ||
    paymentInfo.status === "Overdue";

  /*
   * =======================================================
   * UPI PAYMENT URL
   * =======================================================
   */

  const upiPaymentUrl = showQRCode
    ? `upi://pay?pa=${UPI_ID}&pn=Rental%20Management&am=${paymentInfo.total}&cu=INR`
    : "";

  /*
   * =======================================================
   * PAY NOW
   * =======================================================
   */

  const handlePayNow = () => {
    if (showQRCode) {
      document
        .getElementById("payment-qr-section")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }
  };

  /*
   * =======================================================
   * STATUS STYLES
   * =======================================================
   */

  const getStatusStyles = () => {
    if (paymentInfo.status === "Overdue") {
      return {
        container:
          "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900",

        icon:
          "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400",

        text:
          "text-red-700 dark:text-red-300",

        badge:
          "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
      };
    }

    if (paymentInfo.status === "Due Today") {
      return {
        container:
          "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-900",

        icon:
          "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400",

        text:
          "text-yellow-700 dark:text-yellow-300",

        badge:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400",
      };
    }

    return {
      container:
        "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900",

      icon:
        "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",

      text:
        "text-blue-700 dark:text-blue-300",

      badge:
        "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
    };
  };

  const statusStyles = getStatusStyles();

  /*
   * =======================================================
   * PAGE UI
   * =======================================================
   */

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100">

      {/* TENANT NAVBAR */}

      <TenantNavbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate("/tenant-dashboard")}
          className="mb-6 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* PAGE HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Payments
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View your rent, due date, late charges and payment details.
          </p>

        </div>

        {/* TENANT INFORMATION */}

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {tenant.name}
              </h2>

              <p className="mt-1 text-gray-500 dark:text-gray-400">
                {tenant.property} • Room {tenant.room}
              </p>

            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">

              <span className="font-medium">
                Monthly Rent:
              </span>

              <span className="flex items-center font-semibold text-gray-900 dark:text-white">

                <IndianRupee size={16} />

                {Number(tenant.rent).toLocaleString("en-IN")}

              </span>

            </div>

          </div>

        </div>

        {/* RENT STATUS */}

        <div
          className={`mb-6 rounded-2xl border p-6 transition-colors duration-200 ${statusStyles.container}`}
        >

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${statusStyles.icon}`}
              >

                {paymentInfo.status === "Overdue" ? (
                  <AlertCircle size={25} />
                ) : paymentInfo.status === "Due Today" ? (
                  <Clock size={25} />
                ) : (
                  <CalendarDays size={25} />
                )}

              </div>

              <div>

                <p
                  className={`text-lg font-semibold ${statusStyles.text}`}
                >
                  {paymentInfo.statusLabel}
                </p>

                <p className="mt-1 text-gray-600 dark:text-gray-300">

                  Due date:{" "}

                  <span className="font-medium">
                    {paymentInfo.dueDateText}
                  </span>

                </p>

                {paymentInfo.status === "Upcoming" && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Your rent will be payable on your scheduled due date.
                  </p>
                )}

                {paymentInfo.status === "Due Today" && (
                  <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                    Your rent is due today. The payment QR code is now available.
                  </p>
                )}

                {paymentInfo.status === "Overdue" && (
                  <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                    Your rent is{" "}
                    {paymentInfo.daysLate}{" "}
                    {paymentInfo.daysLate === 1
                      ? "day"
                      : "days"}{" "}
                    overdue.
                  </p>
                )}

              </div>

            </div>

            <div>

              <span
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${statusStyles.badge}`}
              >
                {paymentInfo.status}
              </span>

            </div>

          </div>

        </div>

        {/* PAYMENT CALCULATION */}

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* MONTHLY RENT */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

            <div className="mb-4 flex items-center justify-between">

              <p className="text-gray-500 dark:text-gray-400">
                Monthly Rent
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">

                <IndianRupee size={20} />

              </div>

            </div>

            <p className="text-2xl font-bold text-gray-900 dark:text-white">

              ₹
              {Number(tenant.rent).toLocaleString("en-IN")}

            </p>

          </div>

          {/* LATE PENALTY */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

            <div className="mb-4 flex items-center justify-between">

              <p className="text-gray-500 dark:text-gray-400">
                Late Penalty
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-900/40 dark:text-red-400">

                <AlertCircle size={20} />

              </div>

            </div>

            <p className="text-2xl font-bold text-gray-900 dark:text-white">

              ₹
              {paymentInfo.penalty.toLocaleString("en-IN")}

            </p>

            {paymentInfo.daysLate > 0 && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">

                ₹{LATE_PENALTY_PER_DAY} ×{" "}
                {paymentInfo.daysLate}{" "}
                {paymentInfo.daysLate === 1
                  ? "day"
                  : "days"}

              </p>
            )}

          </div>

          {/* TOTAL */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

            <div className="mb-4 flex items-center justify-between">

              <p className="text-gray-500 dark:text-gray-400">
                Total Payable
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-900/40 dark:text-green-400">

                <CreditCard size={20} />

              </div>

            </div>

            <p className="text-2xl font-bold text-gray-900 dark:text-white">

              ₹
              {paymentInfo.total.toLocaleString("en-IN")}

            </p>

          </div>

        </div>

        {/* PAYMENT REQUIRED */}

        {showQRCode && (
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Payment Required
                </h2>

                <p className="mt-1 text-gray-600 dark:text-gray-400">

                  Current payable amount:

                  <span className="ml-1 font-semibold text-gray-900 dark:text-white">

                    ₹
                    {paymentInfo.total.toLocaleString("en-IN")}

                  </span>

                </p>

              </div>

              <button
                onClick={handlePayNow}
                className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-white transition hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-500"
              >

                <CreditCard size={18} />

                Pay Now

              </button>

            </div>

          </div>
        )}

        {/* QR PAYMENT SECTION */}

        {showQRCode && (
          <div
            id="payment-qr-section"
            className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800"
          >

            <div className="text-center">

              <div className="mb-4 flex justify-center">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">

                  <QrCode size={26} />

                </div>

              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Scan & Pay
              </h2>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Scan this QR code using your UPI app to pay your current rent.
              </p>

              {/* QR CODE */}

              <div className="mt-6 flex justify-center">

                {/* Keep QR background white for scanning readability. */}

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                  <QRCodeSVG
                    value={upiPaymentUrl}
                    size={220}
                    level="H"
                    includeMargin={true}
                  />

                </div>

              </div>

              {/* AMOUNT */}

              <div className="mt-6">

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Amount to Pay
                </p>

                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">

                  ₹
                  {paymentInfo.total.toLocaleString("en-IN")}

                </p>

              </div>

              {/* PAYMENT BREAKDOWN */}

              <div className="mx-auto mt-6 max-w-md rounded-xl bg-gray-50 p-4 text-left dark:bg-gray-700/60">

                <div className="flex justify-between py-2">

                  <span className="text-gray-600 dark:text-gray-300">
                    Monthly Rent
                  </span>

                  <span className="font-medium text-gray-900 dark:text-white">

                    ₹
                    {Number(tenant.rent).toLocaleString("en-IN")}

                  </span>

                </div>

                <div className="flex justify-between py-2">

                  <span className="text-gray-600 dark:text-gray-300">
                    Late Penalty
                  </span>

                  <span className="font-medium text-red-600 dark:text-red-400">

                    ₹
                    {paymentInfo.penalty.toLocaleString("en-IN")}

                  </span>

                </div>

                <div className="mt-2 flex justify-between border-t border-gray-200 pt-3 dark:border-gray-600">

                  <span className="font-semibold text-gray-900 dark:text-white">
                    Total
                  </span>

                  <span className="font-bold text-gray-900 dark:text-white">

                    ₹
                    {paymentInfo.total.toLocaleString("en-IN")}

                  </span>

                </div>

              </div>

              {/* UPI ID */}

              <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
                UPI ID: {UPI_ID}
              </p>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400">

                <CheckCircle2 size={16} />

                Secure UPI payment

              </div>

            </div>

          </div>
        )}

        {/* UPCOMING PAYMENT */}

        {paymentInfo.status === "Upcoming" && (
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

            <div className="text-center">

              <CalendarDays
                size={40}
                className="mx-auto mb-4 text-blue-500 dark:text-blue-400"
              />

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Payment Not Due Yet
              </h2>

              <p className="mt-2 text-gray-600 dark:text-gray-400">

                Your rent is due on{" "}

                <span className="font-semibold text-gray-900 dark:text-white">
                  {paymentInfo.dueDateText}
                </span>

                .

              </p>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                The payment QR code will automatically become available when your rent is due.
              </p>

            </div>

          </div>
        )}

        {/* RECENT PAYMENTS */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

          <div className="border-b border-gray-200 p-6 dark:border-gray-700">

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Payments
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your recent rent payment history.
            </p>

          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700">

            {recentPayments.map((payment) => (

              <div
                key={payment.id}
                className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
              >

                <div>

                  <p className="font-semibold text-gray-900 dark:text-white">
                    {payment.month}
                  </p>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Paid on {payment.date}
                  </p>

                </div>

                <div className="flex items-center gap-5">

                  <p className="font-semibold text-gray-900 dark:text-white">

                    ₹
                    {payment.amount.toLocaleString("en-IN")}

                  </p>

                  <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/40 dark:text-green-400">

                    <CheckCircle2 size={14} />

                    {payment.status}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}

export default TenantPayments;