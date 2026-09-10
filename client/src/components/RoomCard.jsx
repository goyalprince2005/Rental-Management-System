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

  // =========================================================
  // VIEW ROOM
  // =========================================================

  const handleView = () => {
    navigate(`/room-details/${room.id}`);
  };

  // =========================================================
  // EDIT ROOM
  // =========================================================

  const handleEdit = () => {
    navigate(`/edit-room/${room.id}`);
  };

  // =========================================================
  // STATUS STYLE
  // =========================================================

  const getStatusStyle = () => {
    switch (room.status) {
      case "Occupied":
        return "bg-red-100 text-red-700";

      case "Due":
        return "bg-yellow-100 text-yellow-700";

      case "Available":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">

      {/* ===================================================== */}
      {/* ROOM HEADER */}
      {/* ===================================================== */}

      <div className="flex items-start justify-between gap-3">

        {/* ROOM INFORMATION */}

        <div className="flex items-center gap-3 min-w-0">

          {/* ROOM ICON */}

          <div className="p-3 bg-blue-50 rounded-xl shrink-0">
            <DoorOpen
              size={24}
              className="text-blue-600"
            />
          </div>

          {/* ROOM TITLE */}

          <div className="min-w-0">

            <h3 className="text-lg font-bold text-gray-800 truncate">
              Room {room.roomNumber}
            </h3>

            <p className="text-sm text-gray-500 mt-0.5">
              Room ID: {room.id}
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* STATUS */}
        {/* ================================================= */}

        <span
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle()}`}
        >
          {room.status}
        </span>

      </div>


      {/* ===================================================== */}
      {/* ROOM INFORMATION */}
      {/* ===================================================== */}

      <div className="mt-5 space-y-3">

        {/* ================================================= */}
        {/* PROPERTY */}
        {/* ================================================= */}

        <div className="flex items-center gap-3 text-gray-600 min-w-0">

          <Building2
            size={18}
            className="shrink-0 text-gray-500"
          />

          <span className="text-sm truncate">
            {room.property}
          </span>

        </div>


        {/* ================================================= */}
        {/* FLOOR */}
        {/* ================================================= */}

        <div className="flex items-center gap-3 text-gray-600">

          <Layers
            size={18}
            className="shrink-0 text-gray-500"
          />

          <span className="text-sm">
            Floor {room.floor}
          </span>

        </div>


        {/* ================================================= */}
        {/* MONTHLY RENT */}
        {/* ================================================= */}

        <div className="flex items-center gap-3 text-gray-600">

          <IndianRupee
            size={18}
            className="shrink-0 text-gray-500"
          />

          <span className="text-sm font-medium">
            {room.rent}
          </span>

          <span className="text-xs text-gray-400">
            / month
          </span>

        </div>


        {/* ================================================= */}
        {/* TENANT */}
        {/* ================================================= */}

        <div className="text-sm text-gray-500">

          Tenant:{" "}

          <span className="font-medium text-gray-700">
            {room.tenant}
          </span>

        </div>

      </div>


      {/* ===================================================== */}
      {/* ACTION BUTTONS */}
      {/* ===================================================== */}

      <div className="mt-5 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">

        {/* ================================================= */}
        {/* VIEW BUTTON */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={handleView}
          className="w-full sm:flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition"
        >

          <Eye size={17} />

          <span>
            View
          </span>

        </button>


        {/* ================================================= */}
        {/* EDIT BUTTON */}
        {/* ================================================= */}

        <button
          type="button"
          onClick={handleEdit}
          className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm"
        >

          <Pencil size={17} />

          <span>
            Edit
          </span>

        </button>

      </div>

    </div>
  );
}

export default RoomCard;