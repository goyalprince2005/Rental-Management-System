import React, { useMemo } from "react";
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

    // Tenant-specific rent due day
    rentDueDay: 5,
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

    // Tenant-specific rent due day
    rentDueDay: 15,
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

    // Tenant-specific rent due day
    rentDueDay: 22,
  },
};

const recentPayments = [
  {
    id: 1,
    month: "August 2026",
    amount: 5000,
    date: "05 Aug 2026",
    status: "Paid",
  },
  {
    id: 2,
    month: "July 2026",
    amount: 5000,
    date: "05 Jul 2026",
    status: "Paid",
  },
  {
    id: 3,
    month: "June 2026",
    amount: 5000,
    date: "05 Jun 2026",
    status: "Paid",
  },
];

const LATE_PENALTY_PER_DAY = 50;
const UPI_ID = "rentalowner@upi";

const TenantPayments = () => {
  const navigate = useNavigate();

  // Get currently logged-in tenant
  const tenantId = localStorage.getItem("tenantId");

  const tenant = tenants[tenantId] || tenants[1];

  /*
   * Calculate current month's rent due date.
   *
   * The due day comes from the tenant.
   * It is NOT hard-coded to the 10th.
   */
  const paymentInfo = useMemo(() => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();

    const dueDay = tenant.rentDueDay;

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
     * Handle months where a date such as 31st does not exist.
     *
     * Example:
     * If due day = 31 and current month has only 30 days,
     * the due date becomes the last day of that month.
     */
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    const actualDueDay = Math.min(dueDay, lastDayOfMonth);

    const dueDate = new Date(year, month, actualDueDay);

    // Remove time portion for accurate day comparison
    const todayOnly = new Date(year, month, today.getDate());

    const differenceInMilliseconds =
      todayOnly.getTime() - dueDate.getTime();

    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    let status = "Upcoming";
    let statusLabel = "Rent Upcoming";
    let daysLate = 0;
    let penalty = 0;

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
      penalty = daysLate * LATE_PENALTY_PER_DAY;
    }

    const total = tenant.rent + penalty;

    return {
      status,
      statusLabel,
      daysLate,
      penalty,
      total,
      dueDate,
      dueDateText: dueDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  }, [tenant]);

  /*
   * UPI QR payment data.
   *
   * QR is generated using the current payable amount.
   */
  const upiPaymentUrl =
    paymentInfo.status === "Due Today" ||
    paymentInfo.status === "Overdue"
      ? `upi://pay?pa=${UPI_ID}&pn=Rental%20Management&am=${paymentInfo.total}&cu=INR`
      : "";

  const handlePayNow = () => {
    if (
      paymentInfo.status === "Due Today" ||
      paymentInfo.status === "Overdue"
    ) {
      document
        .getElementById("payment-qr-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getStatusStyles = () => {
    if (paymentInfo.status === "Overdue") {
      return {
        container: "bg-red-50 border-red-200",
        icon: "bg-red-100 text-red-600",
        text: "text-red-700",
        badge: "bg-red-100 text-red-700",
      };
    }

    if (paymentInfo.status === "Due Today") {
      return {
        container: "bg-yellow-50 border-yellow-200",
        icon: "bg-yellow-100 text-yellow-600",
        text: "text-yellow-700",
        badge: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      container: "bg-blue-50 border-blue-200",
      icon: "bg-blue-100 text-blue-600",
      text: "text-blue-700",
      badge: "bg-blue-100 text-blue-700",
    };
  };

  const statusStyles = getStatusStyles();

  return (
    <div className="min-h-screen bg-gray-50">
      <TenantNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/tenant-dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Payments
          </h1>

          <p className="text-gray-600 mt-2">
            View your rent, due date, late charges and payment details.
          </p>
        </div>

        {/* Tenant Information */}
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
              <span className="font-medium">Monthly Rent:</span>

              <span className="flex items-center font-semibold text-gray-900">
                <IndianRupee size={16} />
                {tenant.rent.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Rent Status */}
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
                    Please complete your rent payment today.
                  </p>
                )}

                {paymentInfo.status === "Overdue" && (
                  <p className="text-red-700 text-sm mt-1">
                    Your rent is {paymentInfo.daysLate}{" "}
                    {paymentInfo.daysLate === 1 ? "day" : "days"} overdue.
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

        {/* Payment Calculation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Monthly Rent */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500">Monthly Rent</p>

              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <IndianRupee size={20} />
              </div>
            </div>

            <p className="text-2xl font-bold text-gray-900">
              ₹{tenant.rent.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Late Penalty */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500">Late Penalty</p>

              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <AlertCircle size={20} />
              </div>
            </div>

            <p className="text-2xl font-bold text-gray-900">
              ₹{paymentInfo.penalty.toLocaleString("en-IN")}
            </p>

            {paymentInfo.daysLate > 0 && (
              <p className="text-sm text-red-600 mt-2">
                ₹{LATE_PENALTY_PER_DAY} × {paymentInfo.daysLate}{" "}
                {paymentInfo.daysLate === 1 ? "day" : "days"}
              </p>
            )}
          </div>

          {/* Total */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500">Total Payable</p>

              <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                <CreditCard size={20} />
              </div>
            </div>

            <p className="text-2xl font-bold text-gray-900">
              ₹{paymentInfo.total.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Pay Now */}
        {(paymentInfo.status === "Due Today" ||
          paymentInfo.status === "Overdue") && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Required
                </h2>

                <p className="text-gray-600 mt-1">
                  Your current payable amount is{" "}
                  <span className="font-semibold text-gray-900">
                    ₹{paymentInfo.total.toLocaleString("en-IN")}
                  </span>
                  .
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

        {/* QR Payment Section */}
        {(paymentInfo.status === "Due Today" ||
          paymentInfo.status === "Overdue") && (
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

              {/* QR Code */}
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

              {/* Amount */}
              <div className="mt-6">
                <p className="text-gray-500 text-sm">
                  Amount to Pay
                </p>

                <p className="text-3xl font-bold text-gray-900 mt-1">
                  ₹{paymentInfo.total.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Breakdown */}
              <div className="max-w-md mx-auto mt-6 bg-gray-50 rounded-xl p-4 text-left">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">
                    Monthly Rent
                  </span>

                  <span className="font-medium text-gray-900">
                    ₹{tenant.rent.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-gray-600">
                    Late Penalty
                  </span>

                  <span className="font-medium text-red-600">
                    ₹{paymentInfo.penalty.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="border-t border-gray-200 mt-2 pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">
                    Total
                  </span>

                  <span className="font-bold text-gray-900">
                    ₹{paymentInfo.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

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

        {/* Upcoming Payment Message */}
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
                The payment QR code will become available when your
                rent is due.
              </p>
            </div>
          </div>
        )}

        {/* Recent Payments */}
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
                    ₹{payment.amount.toLocaleString("en-IN")}
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
};

export default TenantPayments;