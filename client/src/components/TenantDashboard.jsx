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
  LogOut,
} from "lucide-react";

function TenantDashboard() {
  const navigate = useNavigate();

  // ================= MOCK TENANT DATA =================

  const tenant = {
    name: "Rahul Sharma",
    property: "Green View Apartments",
    location: "Bhopal",
    room: "101",
    monthlyRent: "₹5,000",
    paymentStatus: "Paid",
    nextDueDate: "September 10, 2026",
  };

  const recentPayments = [
    {
      id: 1,
      month: "August 2026",
      amount: "₹5,000",
      date: "August 10, 2026",
      status: "Paid",
    },
    {
      id: 2,
      month: "July 2026",
      amount: "₹5,000",
      date: "July 10, 2026",
      status: "Paid",
    },
    {
      id: 3,
      month: "June 2026",
      amount: "₹5,000",
      date: "June 10, 2026",
      status: "Paid",
    },
  ];

  const handleLogout = () => {
    navigate("/tenant-login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}

      <header className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-green-600">
              Tenant Dashboard
            </h1>

          
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <LogOut size={18} />

            <span className="hidden sm:inline">
              Logout
            </span>
          </button>

        </div>

      </header>


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

            {/* Property */}

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


            {/* Room */}

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


            {/* Monthly Rent */}

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

            {/* Monthly Rent */}

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


            {/* Current Status */}

            <div className="bg-white rounded-xl shadow-sm border p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Current Status
                  </p>

                  <p className="text-2xl font-bold text-green-600 mt-2">
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


            {/* Next Due Date */}

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <button
              onClick={() => navigate("/payments")}
              className="flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              <CreditCard size={18} />

              View Payments
            </button>

            <button
              onClick={() => navigate("/tenant-details/1")}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
            >
              <User size={18} />

              View My Details
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