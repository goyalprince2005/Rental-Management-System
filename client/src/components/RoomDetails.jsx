import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  DoorOpen,
  MapPin,
  User,
  IndianRupee,
  Building2,
  Layers,
  Pencil,
} from "lucide-react";

import Navbar from "./Navbar";

const DEFAULT_ROOMS = {
  101: {
    roomNumber: "101",
    property: "Green View Apartments",
    location: "Bhopal",
    floor: 1,
    rent: 5000,
    tenant: "Rahul Sharma",
    status: "Occupied",
  },

  102: {
    roomNumber: "102",
    property: "Green View Apartments",
    location: "Bhopal",
    floor: 1,
    rent: 6000,
    tenant: "Aman Kumar",
    status: "Occupied",
  },

  203: {
    roomNumber: "203",
    property: "Shyam Residency",
    location: "Bhopal",
    floor: 2,
    rent: 5500,
    tenant: "Neha Sharma",
    status: "Due",
  },

  204: {
    roomNumber: "204",
    property: "Shyam Residency",
    location: "Bhopal",
    floor: 2,
    rent: 5500,
    tenant: "None",
    status: "Available",
  },
};

function getSavedRooms() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("rentalManagementRooms") || "{}"
    );

    return saved && typeof saved === "object" && !Array.isArray(saved)
      ? saved
      : {};
  } catch (error) {
    console.error("Unable to load saved room data:", error);
    return {};
  }
}

function getRoomById(id) {
  const savedRooms = getSavedRooms();
  const defaultRoom = DEFAULT_ROOMS[id];
  const savedRoom = savedRooms[id];

  // Accept either a default room or a room saved dynamically.
  if (!defaultRoom && !savedRoom) {
    return null;
  }

  return {
    ...(defaultRoom || {}),
    ...(savedRoom || {}),
    id: savedRoom?.id ?? defaultRoom?.id ?? Number(id),
  };
}

function formatCurrency(value) {
  const amount =
    typeof value === "number"
      ? value
      : Number(String(value ?? "").replace(/[₹,\s]/g, ""));

  if (value === "" || value == null || !Number.isFinite(amount)) {
    return "Not specified";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getStatusStyle(status) {
  switch (status) {
    case "Occupied":
      return "bg-red-100 text-red-700";

    case "Due":
      return "bg-yellow-100 text-yellow-700";

    case "Available":
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function RoomDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const room = getRoomById(id);

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-100 overflow-x-hidden">
        <Navbar />

        <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="mx-auto w-fit p-4 bg-gray-100 rounded-full">
              <DoorOpen size={32} className="text-gray-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-5">
              Room Not Found
            </h2>

            <p className="text-gray-500 mt-2">
              The requested room does not exist.
            </p>

            <button
              type="button"
              onClick={() => navigate("/rooms")}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              <ArrowLeft size={18} />
              Back to Rooms
            </button>
          </div>
        </main>
      </div>
    );
  }

  const tenantName =
    room.tenant && String(room.tenant).trim() !== ""
      ? room.tenant
      : "None";

  const statusBackground =
    room.status === "Occupied"
      ? "bg-red-50"
      : room.status === "Due"
      ? "bg-yellow-50"
      : room.status === "Available"
      ? "bg-green-50"
      : "bg-gray-50";

  const statusText =
    room.status === "Occupied"
      ? "text-red-600"
      : room.status === "Due"
      ? "text-yellow-600"
      : room.status === "Available"
      ? "text-green-600"
      : "text-gray-600";

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <Navbar />

      <main className="p-4 md:p-6 max-w-5xl mx-auto">
        {/* PAGE HEADING */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Room Details
          </h1>

          <p className="text-gray-500 mt-1">
            View complete information about this room.
          </p>
        </div>

        {/* ROOM DETAILS CARD */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* ROOM HEADER */}
          <div className="p-5 md:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-4 bg-blue-50 rounded-xl shrink-0">
                <DoorOpen size={32} className="text-blue-600" />
              </div>

              <div className="min-w-0">
                <h3 className="text-2xl font-bold text-gray-800">
                  Room {room.roomNumber}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <Building2 size={16} className="shrink-0" />
                  <span className="truncate">{room.property || "Not specified"}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <MapPin size={16} className="shrink-0" />
                  <span>{room.location || "Not specified"}</span>
                </div>
              </div>
            </div>

            <span
              className={`self-start sm:self-center shrink-0 px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(room.status)}`}
            >
              {room.status || "Not specified"}
            </span>
          </div>

          {/* ROOM INFORMATION */}
          <div className="p-5 md:p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Room Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* FLOOR */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Layers size={18} />
                  <p className="text-sm">Floor</p>
                </div>

                <p className="text-2xl font-bold text-gray-800 mt-2">
                  {room.floor ?? "Not specified"}
                </p>
              </div>

              {/* MONTHLY RENT */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <IndianRupee size={18} />
                  <p className="text-sm">Monthly Rent</p>
                </div>

                <p className="text-2xl font-bold text-gray-800 mt-2">
                  {formatCurrency(room.rent)}
                </p>
              </div>

              {/* TENANT */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <User size={18} />
                  <p className="text-sm">Tenant</p>
                </div>

                <p className="text-xl font-bold text-blue-600 mt-2 break-words">
                  {tenantName}
                </p>
              </div>

              {/* CURRENT STATUS */}
              <div className={`rounded-xl p-4 ${statusBackground}`}>
                <p className="text-sm text-gray-500">Current Status</p>

                <p className={`text-xl font-bold mt-2 ${statusText}`}>
                  {room.status || "Not specified"}
                </p>
              </div>
            </div>

            {/* PROPERTY INFORMATION */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Property Information
              </h3>

              <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-3 bg-blue-50 rounded-lg shrink-0">
                    <Building2 size={24} className="text-blue-600" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-bold text-lg text-gray-800 truncate">
                      {room.property || "Not specified"}
                    </h4>

                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                      <MapPin size={15} />
                      <span>{room.location || "Not specified"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={() => navigate("/rooms")}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition"
              >
                <ArrowLeft size={18} />
                Back to Rooms
              </button>

              <button
                type="button"
                onClick={() => navigate(`/edit-room/${id}`)}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm"
              >
                <Pencil size={18} />
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
