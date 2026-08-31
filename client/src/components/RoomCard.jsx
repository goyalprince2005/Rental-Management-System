import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DoorOpen,
  Building2,
  IndianRupee,
  Eye,
  Pencil,
  Layers,
} from "lucide-react";

function RoomCard({ room }) {
  const navigate = useNavigate();

  // ================= VIEW ROOM =================

  const handleView = () => {
    navigate(`/room-details/${room.id}`);
  };

  // ================= EDIT ROOM =================

  const handleEdit = () => {
    navigate(`/edit-room/${room.id}`);
  };

  // ================= STATUS STYLE =================

  const getStatusStyle = () => {
    if (room.status === "Occupied") {
      return "bg-red-100 text-red-700";
    }

    if (room.status === "Due") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (room.status === "Available") {
      return "bg-green-100 text-green-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">

      {/* ================= HEADER ================= */}

      <div className="flex items-start justify-between gap-3">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-blue-50 rounded-xl">

            <DoorOpen
              size={24}
              className="text-blue-600"
            />

          </div>

          <div>

            <h3 className="text-lg font-bold text-gray-800">
              Room {room.roomNumber}
            </h3>

            <p className="text-sm text-gray-500">
              Room ID: {room.id}
            </p>

          </div>

        </div>


        {/* ================= STATUS ================= */}

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle()}`}
        >
          {room.status}
        </span>

      </div>


      {/* ================= ROOM INFORMATION ================= */}

      <div className="mt-5 space-y-3">

        {/* ================= PROPERTY ================= */}

        <div className="flex items-center gap-3 text-gray-600">

          <Building2 size={18} />

          <span className="text-sm">
            {room.property}
          </span>

        </div>


        {/* ================= FLOOR ================= */}

        <div className="flex items-center gap-3 text-gray-600">

          <Layers size={18} />

          <span className="text-sm">
            Floor {room.floor}
          </span>

        </div>


        {/* ================= RENT ================= */}

        <div className="flex items-center gap-3 text-gray-600">

          <IndianRupee size={18} />

          <span className="text-sm font-medium">
            {room.rent}
          </span>

          <span className="text-xs text-gray-400">
            / month
          </span>

        </div>


        {/* ================= TENANT ================= */}

        <div className="text-sm text-gray-500">

          Tenant:{" "}

          <span className="font-medium text-gray-700">
            {room.tenant}
          </span>

        </div>

      </div>


      {/* ================= ACTION BUTTONS ================= */}

      <div className="mt-5 pt-4 border-t flex gap-3">

        {/* VIEW */}

        <button
          onClick={handleView}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
        >

          <Eye size={17} />

          View

        </button>


        {/* EDIT */}

        <button
          onClick={handleEdit}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >

          <Pencil size={17} />

          Edit

        </button>

      </div>

    </div>
  );
}

export default RoomCard;