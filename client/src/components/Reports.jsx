import React from "react";
import {
  BarChart3,
  IndianRupee,
  Building2,
  Users,
  DoorOpen,
  TrendingUp,
} from "lucide-react";

import Navbar from "./Navbar";

function Reports() {
  const reportData = {
    totalProperties: 2,
    totalRooms: 6,
    occupiedRooms: 3,
    totalTenants: 3,
    monthlyRent: 16500,
    collectedRent: 11000,
    pendingRent: 5500,
  };

  const occupancyRate =
    reportData.totalRooms > 0
      ? Math.round(
          (reportData.occupiedRooms / reportData.totalRooms) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= COMMON NAVBAR ================= */}

      <Navbar />


      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Rental Reports
          </h1>

          <p className="text-gray-500 mt-1">
            Overview of your properties, rooms, tenants and rental
            collection.
          </p>

        </div>


        {/* ================= STATISTICS CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Properties */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-blue-50 rounded-xl">

                <Building2
                  size={25}
                  className="text-blue-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Properties
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {reportData.totalProperties}
                </h3>

              </div>

            </div>

          </div>


          {/* Rooms */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-purple-50 rounded-xl">

                <DoorOpen
                  size={25}
                  className="text-purple-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Total Rooms
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {reportData.totalRooms}
                </h3>

              </div>

            </div>

          </div>


          {/* Tenants */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-green-50 rounded-xl">

                <Users
                  size={25}
                  className="text-green-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Tenants
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {reportData.totalTenants}
                </h3>

              </div>

            </div>

          </div>


          {/* Occupancy */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-yellow-50 rounded-xl">

                <TrendingUp
                  size={25}
                  className="text-yellow-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Occupancy
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {occupancyRate}%
                </h3>

              </div>

            </div>

          </div>

        </div>


        {/* ================= RENT COLLECTION REPORT ================= */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          <div className="p-5 border-b">

            <h3 className="text-lg font-bold text-gray-800">
              Rent Collection Report
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Current monthly rental collection overview.
            </p>

          </div>


          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Expected Rent */}

            <div className="bg-blue-50 rounded-xl p-5">

              <div className="flex items-center gap-3">

                <IndianRupee
                  size={24}
                  className="text-blue-600"
                />

                <div>

                  <p className="text-sm text-gray-500">
                    Expected Rent
                  </p>

                  <h3 className="text-2xl font-bold text-gray-800">
                    ₹{reportData.monthlyRent.toLocaleString("en-IN")}
                  </h3>

                </div>

              </div>

            </div>


            {/* Collected Rent */}

            <div className="bg-green-50 rounded-xl p-5">

              <div className="flex items-center gap-3">

                <IndianRupee
                  size={24}
                  className="text-green-600"
                />

                <div>

                  <p className="text-sm text-gray-500">
                    Collected Rent
                  </p>

                  <h3 className="text-2xl font-bold text-green-600">
                    ₹{reportData.collectedRent.toLocaleString("en-IN")}
                  </h3>

                </div>

              </div>

            </div>


            {/* Pending Rent */}

            <div className="bg-yellow-50 rounded-xl p-5">

              <div className="flex items-center gap-3">

                <IndianRupee
                  size={24}
                  className="text-yellow-600"
                />

                <div>

                  <p className="text-sm text-gray-500">
                    Pending Rent
                  </p>

                  <h3 className="text-2xl font-bold text-yellow-600">
                    ₹{reportData.pendingRent.toLocaleString("en-IN")}
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= ROOM OCCUPANCY ================= */}

        <div className="bg-white rounded-xl shadow-sm border mt-6 p-5">

          <div className="flex items-center gap-3 mb-5">

            <div className="p-3 bg-blue-50 rounded-xl">

              <BarChart3
                size={24}
                className="text-blue-600"
              />

            </div>

            <div>

              <h3 className="text-lg font-bold text-gray-800">
                Room Occupancy
              </h3>

              <p className="text-sm text-gray-500">
                Current room occupancy status.
              </p>

            </div>

          </div>


          {/* Occupancy Progress */}

          <div>

            <div className="flex justify-between mb-2">

              <span className="text-sm text-gray-600">
                Occupied Rooms
              </span>

              <span className="text-sm font-semibold text-gray-800">
                {reportData.occupiedRooms} / {reportData.totalRooms}
              </span>

            </div>


            <div className="w-full bg-gray-200 rounded-full h-3">

              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{
                  width: `${occupancyRate}%`,
                }}
              />

            </div>


            <p className="text-sm text-gray-500 mt-2">
              {occupancyRate}% of rooms are currently occupied.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Reports;