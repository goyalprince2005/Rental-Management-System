import React from "react";
import {
  DoorOpen,
  MapPin,
  Eye,
  Pencil,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Rooms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TOP NAVBAR ================= */}

      <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6">

        <div className="flex items-center gap-3">

          {/* Back Button */}

          <button
            onClick={() => navigate("/owner-dashboard")}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            title="Back to Dashboard"
          >
            <ArrowLeft size={22} />
          </button>

          <div>

            <h1 className="text-xl font-bold text-blue-600">
              Rooms
            </h1>

            <p className="text-xs text-gray-500 hidden sm:block">
              Manage your rental rooms
            </p>

          </div>

        </div>

      </header>


      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* Page Heading */}

        <div className="mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            All Rooms
          </h2>

          <p className="text-gray-500 mt-1">
            View and manage rooms across your properties.
          </p>

        </div>


        {/* ================= ROOM CARDS ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* ================= ROOM 101 ================= */}

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

            {/* Room Header */}

            <div className="p-5 border-b flex justify-between items-start">

              <div className="flex items-start gap-3">

                <div className="p-3 bg-blue-50 rounded-lg">

                  <DoorOpen
                    size={26}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-800">
                    Room 101
                  </h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">

                    <MapPin size={15} />

                    Green View Apartments

                  </div>

                </div>

              </div>


              {/* Status */}

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Occupied
              </span>

            </div>


            {/* Room Information */}

            <div className="p-5">

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">

                {/* Floor */}

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Floor
                  </p>

                  <p className="text-xl font-bold mt-1">
                    1
                  </p>

                </div>


                {/* Rent */}

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Rent
                  </p>

                  <p className="text-lg font-bold mt-1">
                    ₹5,000
                  </p>

                </div>


                {/* Tenant */}

                <div className="bg-blue-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Tenant
                  </p>

                  <p className="font-bold text-blue-600 mt-1">
                    Rahul
                  </p>

                </div>


                {/* Status */}

                <div className="bg-green-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Status
                  </p>

                  <p className="font-bold text-green-600 mt-1">
                    Occupied
                  </p>

                </div>

              </div>


              {/* Buttons */}

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => navigate("/room-details/101")}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >

                  <Eye size={18} />

                  View Details

                </button>


                <button
                  className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >

                  <Pencil size={18} />

                  <span className="hidden sm:block">
                    Edit
                  </span>

                </button>

              </div>

            </div>

          </div>


          {/* ================= ROOM 102 ================= */}

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

            {/* Room Header */}

            <div className="p-5 border-b flex justify-between items-start">

              <div className="flex items-start gap-3">

                <div className="p-3 bg-blue-50 rounded-lg">

                  <DoorOpen
                    size={26}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-800">
                    Room 102
                  </h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">

                    <MapPin size={15} />

                    Green View Apartments

                  </div>

                </div>

              </div>


              {/* Status */}

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Occupied
              </span>

            </div>


            {/* Room Information */}

            <div className="p-5">

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">

                {/* Floor */}

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Floor
                  </p>

                  <p className="text-xl font-bold mt-1">
                    1
                  </p>

                </div>


                {/* Rent */}

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Rent
                  </p>

                  <p className="text-lg font-bold mt-1">
                    ₹6,000
                  </p>

                </div>


                {/* Tenant */}

                <div className="bg-blue-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Tenant
                  </p>

                  <p className="font-bold text-blue-600 mt-1">
                    Aman
                  </p>

                </div>


                {/* Status */}

                <div className="bg-green-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Status
                  </p>

                  <p className="font-bold text-green-600 mt-1">
                    Occupied
                  </p>

                </div>

              </div>


              {/* Buttons */}

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => navigate("/room-details/102")}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >

                  <Eye size={18} />

                  View Details

                </button>


                <button
                  className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >

                  <Pencil size={18} />

                  <span className="hidden sm:block">
                    Edit
                  </span>

                </button>

              </div>

            </div>

          </div>


          {/* ================= ROOM 203 ================= */}

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

            <div className="p-5 border-b flex justify-between items-start">

              <div className="flex items-start gap-3">

                <div className="p-3 bg-blue-50 rounded-lg">

                  <DoorOpen
                    size={26}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-800">
                    Room 203
                  </h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">

                    <MapPin size={15} />

                    Shyam Residency

                  </div>

                </div>

              </div>


              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                Due
              </span>

            </div>


            <div className="p-5">

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Floor
                  </p>

                  <p className="text-xl font-bold mt-1">
                    2
                  </p>

                </div>


                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Rent
                  </p>

                  <p className="text-lg font-bold mt-1">
                    ₹5,500
                  </p>

                </div>


                <div className="bg-blue-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Tenant
                  </p>

                  <p className="font-bold text-blue-600 mt-1">
                    Neha
                  </p>

                </div>


                <div className="bg-yellow-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Status
                  </p>

                  <p className="font-bold text-yellow-600 mt-1">
                    Due
                  </p>

                </div>

              </div>


              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => navigate("/room-details/203")}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >

                  <Eye size={18} />

                  View Details

                </button>


                <button
                  className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >

                  <Pencil size={18} />

                  <span className="hidden sm:block">
                    Edit
                  </span>

                </button>

              </div>

            </div>

          </div>


          {/* ================= ROOM 204 ================= */}

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

            <div className="p-5 border-b flex justify-between items-start">

              <div className="flex items-start gap-3">

                <div className="p-3 bg-blue-50 rounded-lg">

                  <DoorOpen
                    size={26}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-800">
                    Room 204
                  </h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">

                    <MapPin size={15} />

                    Shyam Residency

                  </div>

                </div>

              </div>


              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Available
              </span>

            </div>


            <div className="p-5">

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Floor
                  </p>

                  <p className="text-xl font-bold mt-1">
                    2
                  </p>

                </div>


                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Rent
                  </p>

                  <p className="text-lg font-bold mt-1">
                    ₹5,500
                  </p>

                </div>


                <div className="bg-green-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Tenant
                  </p>

                  <p className="font-bold text-green-600 mt-1">
                    None
                  </p>

                </div>


                <div className="bg-green-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Status
                  </p>

                  <p className="font-bold text-green-600 mt-1">
                    Available
                  </p>

                </div>

              </div>


              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => navigate("/room-details/204")}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >

                  <Eye size={18} />

                  View Details

                </button>


                <button
                  className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >

                  <Pencil size={18} />

                  <span className="hidden sm:block">
                    Edit
                  </span>

                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Rooms;