import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  User,
  Building2,
  DoorOpen,
  IndianRupee,
  Eye,
} from "lucide-react";

function Payments() {
  const navigate = useNavigate();

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

  const totalPayments = 16500;
  const completedPayments = 11000;
  const pendingPayments = 5500;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TOP NAVBAR ================= */}

      <header className="bg-white shadow-sm h-16 flex items-center px-4 md:px-6">

        <button
          onClick={() => navigate("/owner-dashboard")}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="Back to Dashboard"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="ml-3">

          <h1 className="text-xl font-bold text-blue-600">
            Payments
          </h1>

          <p className="text-xs text-gray-500 hidden sm:block">
            View and manage rental payments
          </p>

        </div>

      </header>


      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Payment Management
          </h2>

          <p className="text-gray-500 mt-1">
            Track completed and pending rental payments.
          </p>

        </div>


        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

          {/* TOTAL PAYMENTS */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-blue-50 rounded-xl">

                <IndianRupee
                  size={26}
                  className="text-blue-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Total Payments
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  ₹{totalPayments.toLocaleString("en-IN")}
                </h3>

              </div>

            </div>

          </div>


          {/* COMPLETED */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-green-50 rounded-xl">

                <CreditCard
                  size={26}
                  className="text-green-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Completed
                </p>

                <h3 className="text-2xl font-bold text-green-600">
                  ₹{completedPayments.toLocaleString("en-IN")}
                </h3>

              </div>

            </div>

          </div>


          {/* PENDING */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-yellow-50 rounded-xl">

                <CreditCard
                  size={26}
                  className="text-yellow-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Pending
                </p>

                <h3 className="text-2xl font-bold text-yellow-600">
                  ₹{pendingPayments.toLocaleString("en-IN")}
                </h3>

              </div>

            </div>

          </div>

        </div>


        {/* ================= PAYMENT RECORDS ================= */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          {/* SECTION HEADER */}

          <div className="p-5 border-b">

            <h3 className="text-lg font-bold text-gray-800">
              Payment Records
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Recent rental payment transactions.
            </p>

          </div>


          {/* PAYMENT LIST */}

          <div className="divide-y">

            {payments.map((payment) => (

              <div
                key={payment.id}
                className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
              >

                {/* TENANT */}

                <div className="flex items-center gap-4">

                  <div className="p-3 bg-blue-50 rounded-xl">

                    <User
                      size={24}
                      className="text-blue-600"
                    />

                  </div>

                  <div>

                    <h4 className="font-bold text-gray-800">
                      {payment.tenant}
                    </h4>

                    <p className="text-sm text-gray-500">
                      Payment ID: {payment.id}
                    </p>

                  </div>

                </div>


                {/* PROPERTY */}

                <div className="flex items-center gap-3 text-gray-600">

                  <Building2 size={18} />

                  <span className="text-sm">
                    {payment.property}
                  </span>

                </div>


                {/* ROOM */}

                <div className="flex items-center gap-3 text-gray-600">

                  <DoorOpen size={18} />

                  <span className="text-sm">
                    Room {payment.room}
                  </span>

                </div>


                {/* AMOUNT */}

                <div className="flex items-center gap-2">

                  <IndianRupee
                    size={18}
                    className="text-gray-500"
                  />

                  <span className="font-semibold">
                    {payment.amount}
                  </span>

                </div>


                {/* DATE */}

                <div className="text-sm text-gray-500">
                  {payment.date}
                </div>


                {/* METHOD */}

                <div className="text-sm text-gray-600">
                  {payment.method}
                </div>


                {/* STATUS */}

                <span
                  className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${
                    payment.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {payment.status}
                </span>


                {/* ACTION */}

                <button
                  onClick={() =>
                    navigate(`/tenant-details/${payment.id}`)
                  }
                  className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
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