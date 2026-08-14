import React from "react";
import {
  Building2,
  MapPin,
  DoorOpen,
  Users,
  Plus,
  Eye,
} from "lucide-react";

function Properties() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TOP NAVBAR ================= */}
      <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6">

        <div>
          <h1 className="text-xl font-bold text-blue-600">
            Rental Management
          </h1>

          <p className="text-xs text-gray-500">
            Properties
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add Property
        </button>

      </header>


      {/* ================= MAIN CONTENT ================= */}
      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* Page Heading */}
        <div className="mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            My Properties
          </h2>

          <p className="text-gray-500 mt-1">
            Manage your properties, floors and rooms.
          </p>

        </div>


        {/* ================= PROPERTY CARDS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* ================= PROPERTY 1 ================= */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

            {/* Property Header */}
            <div className="p-5 border-b flex justify-between items-start">

              <div className="flex items-start gap-3">

                <div className="p-3 bg-blue-50 rounded-lg">
                  <Building2
                    size={28}
                    className="text-blue-600"
                  />
                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-800">
                    Green View Apartments
                  </h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                    <MapPin size={15} />
                    Bhopal
                  </div>

                </div>

              </div>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Active
              </span>

            </div>


            {/* Property Statistics */}
            <div className="p-5">

              <div className="grid grid-cols-3 gap-3">


                {/* Floors */}
                <div className="bg-gray-50 rounded-lg p-3 text-center">

                  <p className="text-sm text-gray-500">
                    Floors
                  </p>

                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    5
                  </p>

                </div>


                {/* Rooms */}
                <div className="bg-gray-50 rounded-lg p-3 text-center">

                  <p className="text-sm text-gray-500">
                    Rooms
                  </p>

                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    13
                  </p>

                </div>


                {/* Available */}
                <div className="bg-green-50 rounded-lg p-3 text-center">

                  <p className="text-sm text-gray-500">
                    Available
                  </p>

                  <p className="text-2xl font-bold text-green-600 mt-1">
                    3
                  </p>

                </div>

              </div>


              {/* Occupancy */}
              <div className="mt-5">

                <div className="flex justify-between text-sm mb-2">

                  <span className="text-gray-500">
                    Occupancy
                  </span>

                  <span className="font-semibold">
                    77%
                  </span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">

                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "77%" }}
                  ></div>

                </div>

              </div>


              {/* View Details */}
              <button
                className="w-full mt-5 flex items-center justify-center gap-2 border border-blue-600 text-blue-600 py-2.5 rounded-lg hover:bg-blue-50 transition"
              >
                <Eye size={18} />
                View Property Details
              </button>

            </div>

          </div>



          {/* ================= PROPERTY 2 ================= */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

            {/* Property Header */}
            <div className="p-5 border-b flex justify-between items-start">

              <div className="flex items-start gap-3">

                <div className="p-3 bg-purple-50 rounded-lg">
                  <Building2
                    size={28}
                    className="text-purple-600"
                  />
                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-800">
                    Shyam Residency
                  </h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                    <MapPin size={15} />
                    Bhopal
                  </div>

                </div>

              </div>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Active
              </span>

            </div>


            {/* Property Statistics */}
            <div className="p-5">

              <div className="grid grid-cols-3 gap-3">


                {/* Floors */}
                <div className="bg-gray-50 rounded-lg p-3 text-center">

                  <p className="text-sm text-gray-500">
                    Floors
                  </p>

                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    2
                  </p>

                </div>


                {/* Rooms */}
                <div className="bg-gray-50 rounded-lg p-3 text-center">

                  <p className="text-sm text-gray-500">
                    Rooms
                  </p>

                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    6
                  </p>

                </div>


                {/* Available */}
                <div className="bg-green-50 rounded-lg p-3 text-center">

                  <p className="text-sm text-gray-500">
                    Available
                  </p>

                  <p className="text-2xl font-bold text-green-600 mt-1">
                    1
                  </p>

                </div>

              </div>


              {/* Occupancy */}
              <div className="mt-5">

                <div className="flex justify-between text-sm mb-2">

                  <span className="text-gray-500">
                    Occupancy
                  </span>

                  <span className="font-semibold">
                    83%
                  </span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">

                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: "83%" }}
                  ></div>

                </div>

              </div>


              {/* View Details */}
              <button
                className="w-full mt-5 flex items-center justify-center gap-2 border border-purple-600 text-purple-600 py-2.5 rounded-lg hover:bg-purple-50 transition"
              >
                <Eye size={18} />
                View Property Details
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Properties;