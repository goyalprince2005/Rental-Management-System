import React from "react";
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
} from "lucide-react";
import TenantNavbar from "./TenantNavbar";

function TenantDashboard() {
  const navigate = useNavigate();

  // ================= MOCK TENANT DATA =================

  const tenants = {
    "1": {
      id: "1",
      name: "Rahul Sharma",
      phone: "9876543210",
      property: "Green View Apartments",
      location: "Bhopal",
      room: "101",
      monthlyRent: "₹5,000",
      paymentStatus: "Paid",
      nextDueDate: "September 10, 2026",
    },

    "2": {
      id: "2",
      name: "Aman Kumar",
      phone: "9876543211",
      property: "Green View Apartments",
      location: "Bhopal",
      room: "102",
      monthlyRent: "₹6,000",
      paymentStatus: "Paid",
      nextDueDate: "September 10, 2026",
    },

    "3": {
      id: "3",
      name: "Neha Sharma",
      phone: "9876543212",
      property: "Shyam Residency",
      location: "Bhopal",
      room: "203",
      monthlyRent: "₹5,500",
      paymentStatus: "Due",
      nextDueDate: "September 10, 2026",
    },
  };

  // ================= GET LOGGED-IN TENANT =================

  const tenantId = localStorage.getItem("tenantId");

  const tenant = tenants[tenantId];

  // ================= INVALID TENANT =================

  if (!tenant) {
    return (
      <div className="min-h-screen bg-gray-100">

        <TenantNavbar />

        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">

          <div className="bg-white p-8 rounded-xl shadow-sm text-center">

            <h2 className="text-2xl font-bold text-gray-800">
              Tenant Session Not Found
            </h2>

            <p className="text-gray-500 mt-2">
              Please login again to access your dashboard.
            </p>

            <button
              onClick={() => navigate("/tenant-login")}
              className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Go to Tenant Login
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ================= RECENT PAYMENTS =================

  const recentPayments = [
    {
      id: 1,
      month: "August 2026",
      amount: tenant.monthlyRent,
      date: "August 10, 2026",
      status: "Paid",
    },
    {
      id: 2,
      month: "July 2026",
      amount: tenant.monthlyRent,
      date: "July 10, 2026",
      status: "Paid",
    },
    {
      id: 3,
      month: "June 2026",
      amount: tenant.monthlyRent,
      date: "June 10, 2026",
      status: "Paid",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TENANT NAVBAR ================= */}

      <TenantNavbar />


      {/* ================= MAIN CONTENT ================= */}

      <main className="max-w-7xl mx-auto p-4 md:p-6">

        {/* ================= WELCOME SECTION ================= */}

        <div className="mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome, {tenant.name}
          </h2>

          <p className="text-gray-500 mt-1">
            Here is an overview of your rental information.
          </p>

        </div>


        {/* ================= TENANT INFORMATION ================= */}

        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">

          <div className="flex items-center gap-4">

            <div className="p-4 bg-green-50 rounded-xl">

              <User
                size={32}
                className="text-green-600"
              />

            </div>

            <div>

              <h3 className="text-xl font-bold text-gray-800">
                {tenant.name}
              </h3>

              <p className="text-gray-500">
                Tenant
              </p>

            </div>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

            {/* ================= PROPERTY ================= */}

            <div className="bg-gray-50 rounded-xl p-4">

              <div className="flex items-center gap-2 text-gray-500">

                <Building2 size={18} />

                <span className="text-sm">
                  Property
                </span>

              </div>

              <p className="font-bold mt-2 text-gray-800">
                {tenant.property}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {tenant.location}
              </p>

            </div>


            {/* ================= ROOM ================= */}

            <div className="bg-gray-50 rounded-xl p-4">

              <div className="flex items-center gap-2 text-gray-500">

                <DoorOpen size={18} />

                <span className="text-sm">
                  Room
                </span>

              </div>

              <p className="font-bold mt-2 text-gray-800">
                Room {tenant.room}
              </p>

            </div>


            {/* ================= MONTHLY RENT ================= */}

            <div className="bg-gray-50 rounded-xl p-4">

              <div className="flex items-center gap-2 text-gray-500">

                <IndianRupee size={18} />

                <span className="text-sm">
                  Monthly Rent
                </span>

              </div>

              <p className="font-bold mt-2 text-gray-800">
                {tenant.monthlyRent}
              </p>

            </div>

          </div>

        </div>


        {/* ================= RENT PAYMENT STATUS ================= */}

        <div className="mb-6">

          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Rent Payment Status
          </h3>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* ================= MONTHLY RENT ================= */}

            <div className="bg-white rounded-xl shadow-sm border p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Monthly Rent
                  </p>

                  <p className="text-2xl font-bold text-gray-800 mt-2">
                    {tenant.monthlyRent}
                  </p>

                </div>

                <div className="p-3 bg-blue-50 rounded-xl">

                  <IndianRupee
                    size={24}
                    className="text-blue-600"
                  />

                </div>

              </div>

            </div>


            {/* ================= CURRENT STATUS ================= */}

            <div className="bg-white rounded-xl shadow-sm border p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Current Status
                  </p>

                  <p
                    className={`text-2xl font-bold mt-2 ${
                      tenant.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {tenant.paymentStatus}
                  </p>

                </div>

                <div className="p-3 bg-green-50 rounded-xl">

                  <CheckCircle
                    size={24}
                    className="text-green-600"
                  />

                </div>

              </div>

            </div>


            {/* ================= NEXT DUE DATE ================= */}

            <div className="bg-white rounded-xl shadow-sm border p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Next Due Date
                  </p>

                  <p className="text-lg font-bold text-gray-800 mt-2">
                    {tenant.nextDueDate}
                  </p>

                </div>

                <div className="p-3 bg-yellow-50 rounded-xl">

                  <Calendar
                    size={24}
                    className="text-yellow-600"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= QUICK ACTIONS ================= */}

        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">

          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h3>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* ================= VIEW PAYMENTS ================= */}

            <button
              onClick={() => navigate("/tenant-payments")}
              className="flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition"
            >

              <CreditCard size={18} />

              View Payments

            </button>


            {/* ================= VIEW MY DETAILS ================= */}

            <button
              onClick={() =>
                navigate(
                  `/tenant-details/${tenant.id}?view=tenant`
                )
              }
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
            >

              <User size={18} />

              View My Details

            </button>


            {/* ================= MY DOCUMENTS ================= */}

            <button
              onClick={() => navigate("/tenant-documents")}
              className="flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition"
            >

              <FileText size={18} />

              My Documents

            </button>

          </div>

        </div>


        {/* ================= RECENT PAYMENTS ================= */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          <div className="p-6 border-b">

            <h3 className="text-xl font-bold text-gray-800">
              Recent Payments
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Your latest rental payment history.
            </p>

          </div>


          <div className="divide-y">

            {recentPayments.map((payment) => (

              <div
                key={payment.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >

                <div>

                  <p className="font-semibold text-gray-800">
                    {payment.month}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {payment.date}
                  </p>

                </div>


                <div className="flex items-center gap-4">

                  <p className="font-bold text-gray-800">
                    {payment.amount}
                  </p>

                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

                    <CheckCircle size={14} />

                    {payment.status}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ================= PAYMENT REMINDER ================= */}

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-5 flex items-start gap-3">

          <Clock
            size={22}
            className="text-yellow-600 mt-0.5"
          />

          <div>

            <h4 className="font-bold text-yellow-800">
              Payment Reminder
            </h4>

            <p className="text-sm text-yellow-700 mt-1">
              Your next rent payment of {tenant.monthlyRent} is due on{" "}
              {tenant.nextDueDate}.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default TenantDashboard;