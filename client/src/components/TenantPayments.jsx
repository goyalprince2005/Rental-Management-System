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
 *
 * rentDueDay is tenant-specific.
 *
 * Rahul -> 10th
 * Aman  -> 5th
 * Neha  -> 15th
 *
 * Later this information will come from MongoDB through
 * the backend API.
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
 * RECENT PAYMENTS
 * =========================================================
 *
 * This is currently mock data.
 * Later this will come from the backend/database.
 */

const recentPayments = [
  {
    id: 1,
    month: "August 2026",
    amount: 5000,
    date: "10 Aug 2026",
    status: "Paid",
  },

  {
    id: 2,
    month: "July 2026",
    amount: 5000,
    date: "10 Jul 2026",
    status: "Paid",
  },

  {
    id: 3,
    month: "June 2026",
    amount: 5000,
    date: "10 Jun 2026",
    status: "Paid",
  },
];


/*
 * =========================================================
 * PAYMENT SETTINGS
 * =========================================================
 */

const LATE_PENALTY_PER_DAY = 50;

const UPI_ID = "rentalowner@upi";


function TenantPayments() {
  const navigate = useNavigate();


  /*
   * =======================================================
   * LOGGED-IN TENANT
   * =======================================================
   *
   * TenantLogin stores tenantId in localStorage.
   */

  const tenantId = localStorage.getItem("tenantId");

  const tenant = tenants[tenantId] || tenants[1];


  /*
   * =======================================================
   * CURRENT DATE STATE
   * =======================================================
   *
   * This allows the page to automatically recalculate
   * the payment status while the page is open.
   *
   * Without this, the component would only calculate
   * the date when the page initially loads.
   */

  const [currentDate, setCurrentDate] = useState(new Date());


  /*
   * =======================================================
   * AUTOMATIC DATE UPDATE
   * =======================================================
   *
   * Check the current date every minute.
   *
   * This means if the due date arrives while the tenant
   * keeps this page open, the payment status and QR
   * can update automatically.
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

    /*
     * Tenant-specific due day.
     */

    const dueDay = Number(tenant.rentDueDay);


    /*
     * If due day is not configured.
     */

    if (!dueDay) {
      return {
        status: "Not Configured",
        statusLabel: "Due date not configured",
        daysLate: 0,
        penalty: 0,
        total: tenant.rent,
        dueDate: null,
        dueDateText: "Not configured",
      };
    }


    /*
     * =====================================================
     * LAST DAY OF CURRENT MONTH
     * =====================================================
     *
     * Example:
     * If due day = 31
     * February does not have 31 days.
     *
     * Therefore we use the last available day.
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
     * Create date containing only year/month/day.
     *
     * This prevents time differences from affecting
     * the number of late days.
     */

    const todayOnly = new Date(
      year,
      month,
      todayDate
    );


    /*
     * Difference between today and due date.
     */

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
     * =====================================================
     * PAYMENT STATUS
     * =====================================================
     *
     * Before due date:
     *     Upcoming
     *
     * On due date:
     *     Due Today
     *
     * After due date:
     *     Overdue
     */

    if (differenceInDays < 0) {
      status = "Upcoming";

      statusLabel = "Rent Upcoming";
    }

    else if (differenceInDays === 0) {
      status = "Due Today";

      statusLabel = "Rent Due Today";
    }

    else {
      status = "Overdue";

      statusLabel = "Rent Overdue";

      daysLate = differenceInDays;

      penalty =
        daysLate *
        LATE_PENALTY_PER_DAY;
    }


    /*
     * =====================================================
     * TOTAL PAYABLE
     * =====================================================
     */

    const total =
      Number(tenant.rent) +
      penalty;


    /*
     * Format due date for UI.
     */

    const dueDateText =
      dueDate.toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );


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
   *
   * QR appears only when:
   *
   * Due Today
   * OR
   * Overdue
   */

  const showQRCode =
    paymentInfo.status === "Due Today" ||
    paymentInfo.status === "Overdue";


  /*
   * =======================================================
   * UPI PAYMENT URL
   * =======================================================
   *
   * The amount automatically changes according to:
   *
   * Rent + Late Penalty
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
          "bg-red-50 border-red-200",

        icon:
          "bg-red-100 text-red-600",

        text:
          "text-red-700",

        badge:
          "bg-red-100 text-red-700",
      };
    }


    if (paymentInfo.status === "Due Today") {
      return {
        container:
          "bg-yellow-50 border-yellow-200",

        icon:
          "bg-yellow-100 text-yellow-600",

        text:
          "text-yellow-700",

        badge:
          "bg-yellow-100 text-yellow-700",
      };
    }


    return {
      container:
        "bg-blue-50 border-blue-200",

      icon:
        "bg-blue-100 text-blue-600",

      text:
        "text-blue-700",

      badge:
        "bg-blue-100 text-blue-700",
    };
  };


  const statusStyles =
    getStatusStyles();


  return (
    <div className="min-h-screen bg-gray-50">

      {/* =================================================
          TENANT NAVBAR
      ================================================= */}

      <TenantNavbar />


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          onClick={() =>
            navigate("/tenant-dashboard")
          }
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={18} />

          Back to Dashboard
        </button>


        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            My Payments
          </h1>

          <p className="text-gray-600 mt-2">
            View your rent, due date, late charges and payment details.
          </p>

        </div>


        {/* =================================================
            TENANT INFORMATION
        ================================================= */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <h2 className="text-xl font-semibold text-gray-900">
                {tenant.name}
              </h2>

              <p className="text-gray-500 mt-1">
                {tenant.property} • Room {tenant.room}
              </p>

            </div>


            <div className="flex items-center gap-2 text-sm text-gray-600">

              <span className="font-medium">
                Monthly Rent:
              </span>

              <span className="flex items-center font-semibold text-gray-900">

                <IndianRupee size={16} />

                {Number(tenant.rent).toLocaleString("en-IN")}

              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            RENT STATUS
        ================================================= */}

        <div
          className={`border rounded-2xl p-6 mb-6 ${statusStyles.container}`}
        >

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div className="flex items-start gap-4">

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${statusStyles.icon}`}
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
                  className={`font-semibold text-lg ${statusStyles.text}`}
                >
                  {paymentInfo.statusLabel}
                </p>


                <p className="text-gray-600 mt-1">

                  Due date:{" "}

                  <span className="font-medium">
                    {paymentInfo.dueDateText}
                  </span>

                </p>


                {paymentInfo.status === "Upcoming" && (
                  <p className="text-gray-500 text-sm mt-1">
                    Your rent will be payable on your scheduled due date.
                  </p>
                )}


                {paymentInfo.status === "Due Today" && (
                  <p className="text-yellow-700 text-sm mt-1">
                    Your rent is due today. The payment QR code is now available.
                  </p>
                )}


                {paymentInfo.status === "Overdue" && (
                  <p className="text-red-700 text-sm mt-1">
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
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${statusStyles.badge}`}
              >
                {paymentInfo.status}
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            PAYMENT CALCULATION
        ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* MONTHLY RENT */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

            <div className="flex items-center justify-between mb-4">

              <p className="text-gray-500">
                Monthly Rent
              </p>

              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">

                <IndianRupee size={20} />

              </div>

            </div>


            <p className="text-2xl font-bold text-gray-900">

              ₹
              {Number(tenant.rent).toLocaleString("en-IN")}

            </p>

          </div>


          {/* LATE PENALTY */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

            <div className="flex items-center justify-between mb-4">

              <p className="text-gray-500">
                Late Penalty
              </p>

              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">

                <AlertCircle size={20} />

              </div>

            </div>


            <p className="text-2xl font-bold text-gray-900">

              ₹
              {paymentInfo.penalty.toLocaleString("en-IN")}

            </p>


            {paymentInfo.daysLate > 0 && (
              <p className="text-sm text-red-600 mt-2">

                ₹{LATE_PENALTY_PER_DAY} ×{" "}
                {paymentInfo.daysLate}{" "}
                {paymentInfo.daysLate === 1
                  ? "day"
                  : "days"}

              </p>
            )}

          </div>


          {/* TOTAL */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

            <div className="flex items-center justify-between mb-4">

              <p className="text-gray-500">
                Total Payable
              </p>

              <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">

                <CreditCard size={20} />

              </div>

            </div>


            <p className="text-2xl font-bold text-gray-900">

              ₹
              {paymentInfo.total.toLocaleString("en-IN")}

            </p>

          </div>

        </div>


        {/* =================================================
            PAYMENT REQUIRED
        ================================================= */}

        {showQRCode && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>

                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Required
                </h2>

                <p className="text-gray-600 mt-1">

                  Current payable amount:

                  <span className="font-semibold text-gray-900 ml-1">

                    ₹
                    {paymentInfo.total.toLocaleString("en-IN")}

                  </span>

                </p>

              </div>


              <button
                onClick={handlePayNow}
                className="flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
              >

                <CreditCard size={18} />

                Pay Now

              </button>

            </div>

          </div>
        )}


        {/* =================================================
            QR PAYMENT SECTION
        ================================================= */}

        {showQRCode && (
          <div
            id="payment-qr-section"
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8"
          >

            <div className="text-center">

              <div className="flex justify-center mb-4">

                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700">

                  <QrCode size={26} />

                </div>

              </div>


              <h2 className="text-2xl font-bold text-gray-900">
                Scan & Pay
              </h2>


              <p className="text-gray-600 mt-2">
                Scan this QR code using your UPI app to pay your current rent.
              </p>


              {/* QR CODE */}

              <div className="flex justify-center mt-6">

                <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm">

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

                <p className="text-gray-500 text-sm">
                  Amount to Pay
                </p>

                <p className="text-3xl font-bold text-gray-900 mt-1">

                  ₹
                  {paymentInfo.total.toLocaleString("en-IN")}

                </p>

              </div>


              {/* PAYMENT BREAKDOWN */}

              <div className="max-w-md mx-auto mt-6 bg-gray-50 rounded-xl p-4 text-left">

                <div className="flex justify-between py-2">

                  <span className="text-gray-600">
                    Monthly Rent
                  </span>

                  <span className="font-medium text-gray-900">

                    ₹
                    {Number(tenant.rent).toLocaleString("en-IN")}

                  </span>

                </div>


                <div className="flex justify-between py-2">

                  <span className="text-gray-600">
                    Late Penalty
                  </span>

                  <span className="font-medium text-red-600">

                    ₹
                    {paymentInfo.penalty.toLocaleString("en-IN")}

                  </span>

                </div>


                <div className="border-t border-gray-200 mt-2 pt-3 flex justify-between">

                  <span className="font-semibold text-gray-900">
                    Total
                  </span>

                  <span className="font-bold text-gray-900">

                    ₹
                    {paymentInfo.total.toLocaleString("en-IN")}

                  </span>

                </div>

              </div>


              {/* UPI ID */}

              <p className="text-sm text-gray-500 mt-5">
                UPI ID: {UPI_ID}
              </p>


              <div className="flex justify-center items-center gap-2 text-green-600 text-sm mt-4">

                <CheckCircle2 size={16} />

                Secure UPI payment

              </div>

            </div>

          </div>
        )}


        {/* =================================================
            UPCOMING PAYMENT
        ================================================= */}

        {paymentInfo.status === "Upcoming" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">

            <div className="text-center">

              <CalendarDays
                size={40}
                className="mx-auto text-blue-500 mb-4"
              />


              <h2 className="text-xl font-semibold text-gray-900">
                Payment Not Due Yet
              </h2>


              <p className="text-gray-600 mt-2">

                Your rent is due on{" "}

                <span className="font-semibold text-gray-900">
                  {paymentInfo.dueDateText}
                </span>

                .

              </p>


              <p className="text-gray-500 text-sm mt-2">
                The payment QR code will automatically become available when your rent is due.
              </p>

            </div>

          </div>
        )}


        {/* =================================================
            RECENT PAYMENTS
        ================================================= */}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="p-6 border-b border-gray-200">

            <h2 className="text-xl font-semibold text-gray-900">
              Recent Payments
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Your recent rent payment history.
            </p>

          </div>


          <div className="divide-y divide-gray-100">

            {recentPayments.map((payment) => (

              <div
                key={payment.id}
                className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >

                <div>

                  <p className="font-semibold text-gray-900">
                    {payment.month}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Paid on {payment.date}
                  </p>

                </div>


                <div className="flex items-center gap-5">

                  <p className="font-semibold text-gray-900">

                    ₹
                    {payment.amount.toLocaleString("en-IN")}

                  </p>


                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">

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