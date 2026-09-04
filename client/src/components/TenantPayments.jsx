import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  CheckCircle,
  Clock,
  IndianRupee,
} from "lucide-react";
import TenantNavbar from "./TenantNavbar";

function TenantPayments() {
  const navigate = useNavigate();

  const tenantId = localStorage.getItem("tenantId");

  const tenants = {
    "1": {
      name: "Rahul Sharma",
      monthlyRent: "₹5,000",
    },

    "2": {
      name: "Aman Kumar",
      monthlyRent: "₹6,000",
    },

    "3": {
      name: "Neha Sharma",
      monthlyRent: "₹5,500",
    },
  };

  const tenant = tenants[tenantId];

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
              Please login again to view your payments.
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

  const payments = [
    {
      id: 1,
      month: "August 2026",
      amount: tenant.monthlyRent,
      date: "August 10, 2026",
      status: "Paid",
      method: "UPI",
    },
    {
      id: 2,
      month: "July 2026",
      amount: tenant.monthlyRent,
      date: "July 10, 2026",
      status: "Paid",
      method: "UPI",
    },
    {
      id: 3,
      month: "June 2026",
      amount: tenant.monthlyRent,
      date: "June 10, 2026",
      status: "Paid",
      method: "Bank Transfer",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TENANT NAVBAR ================= */}

      <TenantNavbar />


      {/* ================= MAIN CONTENT ================= */}

      <main className="max-w-7xl mx-auto p-4 md:p-6">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            My Payments
          </h1>

          <p className="text-gray-500 mt-1">
            View your rental payment history.
          </p>

        </div>


        {/* ================= PAYMENT SUMMARY ================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

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


          {/* Paid Payments */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Paid Payments
                </p>

                <p className="text-2xl font-bold text-green-600 mt-2">
                  {payments.filter(
                    (payment) => payment.status === "Paid"
                  ).length}
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


          {/* Pending Payments */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Pending Payments
                </p>

                <p className="text-2xl font-bold text-yellow-600 mt-2">
                  0
                </p>

              </div>

              <div className="p-3 bg-yellow-50 rounded-xl">

                <Clock
                  size={24}
                  className="text-yellow-600"
                />

              </div>

            </div>

          </div>

        </div>


        {/* ================= PAYMENT HISTORY ================= */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          <div className="p-6 border-b">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-green-50 rounded-xl">

                <CreditCard
                  size={24}
                  className="text-green-600"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-800">
                  Payment History
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Payment records for {tenant.name}.
                </p>

              </div>

            </div>

          </div>


          {/* ================= PAYMENT RECORDS ================= */}

          <div className="divide-y">

            {payments.map((payment) => (

              <div
                key={payment.id}
                className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

                <div>

                  <p className="font-semibold text-gray-800">
                    {payment.month}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Payment Date: {payment.date}
                  </p>

                </div>


                <div className="flex flex-wrap items-center gap-4">

                  <div className="flex items-center gap-1">

                    <IndianRupee
                      size={18}
                      className="text-gray-500"
                    />

                    <span className="font-bold text-gray-800">
                      {payment.amount}
                    </span>

                  </div>


                  <span className="text-sm text-gray-500">
                    {payment.method}
                  </span>


                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

                    <CheckCircle size={14} />

                    {payment.status}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ================= BACK TO DASHBOARD ================= */}

        <button
          onClick={() => navigate("/tenant-dashboard")}
          className="mt-6 px-5 py-3 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition"
        >
          ← Back to Dashboard
        </button>

      </main>

    </div>
  );
}

export default TenantPayments;