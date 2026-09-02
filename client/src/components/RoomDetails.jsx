import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  DoorOpen,
  MapPin,
  User,
  IndianRupee,
  Building2,
} from "lucide-react";
import Navbar from "./Navbar";

function RoomDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const rooms = {
    101: {
      roomNumber: "101",
      property: "Green View Apartments",
      location: "Bhopal",
      floor: 1,
      rent: "₹5,000",
      tenant: "Rahul Sharma",
      status: "Occupied",
    },

    102: {
      roomNumber: "102",
      property: "Green View Apartments",
      location: "Bhopal",
      floor: 1,
      rent: "₹6,000",
      tenant: "Aman Kumar",
      status: "Occupied",
    },

    203: {
      roomNumber: "203",
      property: "Shyam Residency",
      location: "Bhopal",
      floor: 2,
      rent: "₹5,500",
      tenant: "Neha Sharma",
      status: "Due",
    },

    204: {
      roomNumber: "204",
      property: "Shyam Residency",
      location: "Bhopal",
      floor: 2,
      rent: "₹5,500",
      tenant: "None",
      status: "Available",
    },
  };

  const room = rooms[id];

  // ================= ROOM NOT FOUND =================

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Room Not Found
            </h2>

            <p className="text-gray-500 mt-2">
              The requested room does not exist.
            </p>

            <button
              onClick={() => navigate("/rooms")}
              className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Back to Rooms
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= COMMON NAVBAR ================= */}

      <Navbar />

      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-5xl mx-auto">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Room Details
          </h1>

          <p className="text-gray-500 mt-1">
            View complete information about this room.
          </p>
        </div>

        {/* ================= ROOM CARD ================= */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          {/* ================= ROOM HEADER ================= */}

          <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex items-center gap-4">

              <div className="p-4 bg-blue-50 rounded-xl">
                <DoorOpen
                  size={32}
                  className="text-blue-600"
                />
              </div>

              <div>

                <h3 className="text-2xl font-bold text-gray-800">
                  Room {room.roomNumber}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <Building2 size={16} />
                  {room.property}
                </div>

                <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <MapPin size={16} />
                  {room.location}
                </div>

              </div>

            </div>

            {/* ================= STATUS ================= */}

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                room.status === "Occupied"
                  ? "bg-green-100 text-green-700"
                  : room.status === "Due"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {room.status}
            </span>

          </div>

          {/* ================= ROOM INFORMATION ================= */}

          <div className="p-6">

            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Room Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* Floor */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">
                  <DoorOpen size={18} />

                  <p className="text-sm">
                    Floor
                  </p>
                </div>

                <p className="text-2xl font-bold mt-2">
                  {room.floor}
                </p>

              </div>

              {/* Rent */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">
                  <IndianRupee size={18} />

                  <p className="text-sm">
                    Monthly Rent
                  </p>
                </div>

                <p className="text-2xl font-bold mt-2">
                  {room.rent}
                </p>

              </div>

              {/* Tenant */}

              <div className="bg-blue-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-blue-600">
                  <User size={18} />

                  <p className="text-sm">
                    Tenant
                  </p>
                </div>

                <p className="text-xl font-bold text-blue-600 mt-2">
                  {room.tenant}
                </p>

              </div>

              {/* Status */}

              <div className="bg-green-50 rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Current Status
                </p>

                <p className="text-xl font-bold text-green-600 mt-2">
                  {room.status}
                </p>

              </div>

            </div>

            {/* ================= PROPERTY INFORMATION ================= */}

            <div className="mt-8">

              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Property Information
              </h3>

              <div className="border rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <div className="p-3 bg-blue-50 rounded-lg">

                    <Building2
                      size={24}
                      className="text-blue-600"
                    />

                  </div>

                  <div>

                    <h4 className="font-bold text-lg">
                      {room.property}
                    </h4>

                    <p className="text-sm text-gray-500">
                      📍 {room.location}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= ACTION BUTTONS ================= */}

            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              {/* Back Button */}

              <button
                onClick={() => navigate("/rooms")}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                <ArrowLeft size={18} />
                Back to Rooms
              </button>

              {/* Edit Room Button */}

              <button
                onClick={() => navigate(`/edit-room/${id}`)}
                className="flex-1 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Edit Room
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default RoomDetails;