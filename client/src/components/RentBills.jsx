import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Receipt,
  User,
  Building2,
  DoorOpen,
  IndianRupee,
  Eye,
} from "lucide-react";

function RentBills() {
  const navigate = useNavigate();

  const rentRecords = [
    {
      id: 1,
      tenant: "Rahul Sharma",
      property: "Green View Apartments",
      room: "101",
      rent: "₹5,000",
      status: "Paid",
    },
    {
      id: 2,
      tenant: "Aman Kumar",
      property: "Green View Apartments",
      room: "102",
      rent: "₹6,000",
      status: "Paid",
    },
    {
      id: 3,
      tenant: "Neha Sharma",
      property: "Shyam Residency",
      room: "203",
      rent: "₹5,500",
      status: "Due",
    },
  ];

  const totalRent = 16500;
  const paidRent = 11000;
  const dueRent = 5500;

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
            Rent & Bills
          </h1>

          <p className="text-xs text-gray-500 hidden sm:block">
            Manage monthly rent and bill information
          </p>

        </div>

      </header>


      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Rent & Bills
          </h2>

          <p className="text-gray-500 mt-1">
            Track monthly rent collection and pending payments.
          </p>

        </div>


        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

          {/* Total Rent */}

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
                  Total Rent
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  ₹{totalRent.toLocaleString("en-IN")}
                </h3>

              </div>

            </div>

          </div>


          {/* Paid Rent */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-green-50 rounded-xl">
                <Receipt
                  size={26}
                  className="text-green-600"
                />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Paid Rent
                </p>

                <h3 className="text-2xl font-bold text-green-600">
                  ₹{paidRent.toLocaleString("en-IN")}
                </h3>

              </div>

            </div>

          </div>


          {/* Due Rent */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-yellow-50 rounded-xl">
                <Receipt
                  size={26}
                  className="text-yellow-600"
                />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Due Rent
                </p>

                <h3 className="text-2xl font-bold text-yellow-600">
                  ₹{dueRent.toLocaleString("en-IN")}
                </h3>

              </div>

            </div>

          </div>

        </div>


        {/* ================= RENT RECORDS ================= */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          {/* Section Header */}

          <div className="p-5 border-b">

            <h3 className="text-lg font-bold text-gray-800">
              Monthly Rent Records
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Current rent collection information.
            </p>

          </div>


          {/* Records */}

          <div className="divide-y">

            {rentRecords.map((record) => (

              <div
                key={record.id}
                className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
              >

                {/* Tenant */}

                <div className="flex items-center gap-4">

                  <div className="p-3 bg-blue-50 rounded-xl">

                    <User
                      size={24}
                      className="text-blue-600"
                    />

                  </div>

                  <div>

                    <h4 className="font-bold text-gray-800">
                      {record.tenant}
                    </h4>

                    <p className="text-sm text-gray-500">
                      Tenant ID: {record.id}
                    </p>

                  </div>

                </div>


                {/* Property */}

                <div className="flex items-center gap-3 text-gray-600">

                  <Building2 size={18} />

                  <span className="text-sm">
                    {record.property}
                  </span>

                </div>


                {/* Room */}

                <div className="flex items-center gap-3 text-gray-600">

                  <DoorOpen size={18} />

                  <span className="text-sm">
                    Room {record.room}
                  </span>

                </div>


                {/* Rent */}

                <div className="flex items-center gap-3">

                  <IndianRupee
                    size={18}
                    className="text-gray-500"
                  />

                  <span className="font-semibold text-gray-800">
                    {record.rent}
                  </span>

                </div>


                {/* Status */}

                <span
                  className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${
                    record.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {record.status}
                </span>


                {/* Action */}

                <button
                  onClick={() =>
                    navigate(`/tenant-details/${record.id}`)
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

export default RentBills;