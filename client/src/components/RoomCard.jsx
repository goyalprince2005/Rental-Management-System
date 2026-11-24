
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

// Format numeric or already-formatted rent consistently.
const formatRent = (rent) => {
  if (rent === null || rent === undefined || rent === "") {
    return "Not set";
  }

  const numericRent =
    typeof rent === "number"
      ? rent
      : Number(String(rent).replace(/[₹,\s]/g, ""));

  if (!Number.isFinite(numericRent)) {
    return String(rent);
  }

  return `₹${numericRent.toLocaleString("en-IN")}`;
};

function RoomCard({ room }) {
  const navigate = useNavigate();

  // VIEW ROOM
  const handleView = () => {
    navigate(`/room-details/${room.id}`);
  };

  // EDIT ROOM
  const handleEdit = () => {
    navigate(`/edit-room/${room.id}`);
  };

  // STATUS STYLE
  const getStatusStyle = () => {
    switch (room.status) {
      case "Occupied":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";

      case "Due":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";

      case "Available":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // TENANT DISPLAY
  const tenantValue =
    typeof room.tenant === "string" ? room.tenant.trim() : "";

  const tenantName =
    tenantValue && tenantValue.toLowerCase() !== "none"
      ? tenantValue
      : "No tenant assigned";

  // ROOM IDENTIFIERS
  const roomNumber = room.roomNumber ?? "Not specified";
  const internalId = room.id ?? "Not available";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow duration-200">

      {/* ROOM HEADER */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl shrink-0">
            <DoorOpen
              size={24}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate">
              Room {roomNumber}
            </h3>

            <div className="mt-1 space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Room Number:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {roomNumber}
                </span>
              </p>

              <p className="text-xs text-gray-400 dark:text-gray-500 break-all">
                Internal ID: {internalId}
              </p>
            </div>
          </div>
        </div>

        {/* STATUS */}
        <span
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle()}`}
        >
          {room.status || "Unknown"}
        </span>
      </div>

      {/* ROOM INFORMATION */}
      <div className="mt-5 space-y-3">

        {/* PROPERTY */}
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 min-w-0">
          <Building2
            size={18}
            className="shrink-0 text-gray-500 dark:text-gray-400"
          />

          <span className="text-sm truncate">
            {room.property || "Property not specified"}
          </span>
        </div>

        {/* FLOOR */}
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <Layers
            size={18}
            className="shrink-0 text-gray-500 dark:text-gray-400"
          />

          <span className="text-sm">
            Floor {room.floor ?? "Not specified"}
          </span>
        </div>

        {/* MONTHLY RENT */}
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <IndianRupee
            size={18}
            className="shrink-0 text-gray-500 dark:text-gray-400"
          />

          <span className="text-sm font-medium">
            {formatRent(room.rent)}
          </span>

          <span className="text-xs text-gray-400 dark:text-gray-500">
            / month
          </span>
        </div>

        {/* TENANT */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Tenant:{" "}
          <span
            className={`font-medium ${
              tenantName === "No tenant assigned"
                ? "text-gray-400 dark:text-gray-500"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            {tenantName}
          </span>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-row gap-3">

        {/* VIEW BUTTON */}
        <button
          type="button"
          onClick={handleView}
          className="flex-1 min-w-0 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-3 sm:px-4 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition"
        >
          <Eye size={17} />
          <span>View</span>
        </button>

        {/* EDIT BUTTON */}
        <button
          type="button"
          onClick={handleEdit}
          className="flex-1 min-w-0 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          <Pencil size={17} />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}

export default RoomCard;
