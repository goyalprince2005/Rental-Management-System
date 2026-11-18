
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Building2,
  DoorOpen,
  IndianRupee,
  Eye,
  Pencil,
  Phone,
  CalendarDays,
} from "lucide-react";

function TenantCard({ tenant }) {
  const navigate = useNavigate();

  // =========================================================
  // VIEW TENANT
  // =========================================================

  const handleView = () => {
    navigate(`/tenant-details/${tenant.id}`);
  };

  // =========================================================
  // EDIT TENANT
  // =========================================================

  const handleEdit = () => {
    navigate(`/edit-tenant/${tenant.id}`);
  };

  // =========================================================
  // STATUS STYLE
  // =========================================================

  const getStatusStyle = () => {
    if (tenant.status === "Active") {
      return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400";
    }

    if (tenant.status === "Due") {
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400";
    }

    if (tenant.status === "Inactive") {
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }

    return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md dark:hover:shadow-black/20 transition-all duration-300">

      {/* ===================================================== */}
      {/* CARD HEADER */}
      {/* ===================================================== */}

      <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-start justify-between gap-3">

        {/* TENANT PROFILE */}

        <div className="flex items-center gap-3 min-w-0">

          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl shrink-0">
            <User
              size={26}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>

          <div className="min-w-0">

            <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate">
              {tenant.name}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tenant
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* STATUS */}
        {/* ================================================= */}

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${getStatusStyle()}`}
        >
          {tenant.status}
        </span>

      </div>

      {/* ===================================================== */}
      {/* TENANT INFORMATION */}
      {/* ===================================================== */}

      <div className="p-5 space-y-3">

        {/* PROPERTY */}

        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">

          <Building2
            size={18}
            className="shrink-0 text-gray-500 dark:text-gray-400"
          />

          <span className="text-sm truncate">
            {tenant.property}
          </span>

        </div>

        {/* ROOM */}

        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">

          <DoorOpen
            size={18}
            className="shrink-0 text-gray-500 dark:text-gray-400"
          />

          <span className="text-sm">
            Room {tenant.room}
          </span>

        </div>

        {/* RENT */}

        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">

          <IndianRupee
            size={18}
            className="shrink-0 text-gray-500 dark:text-gray-400"
          />

          <span className="text-sm font-medium">
            {tenant.rent} / month
          </span>

        </div>

        {/* MOBILE */}

        {tenant.mobile && (
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">

            <Phone
              size={18}
              className="shrink-0 text-gray-500 dark:text-gray-400"
            />

            <span className="text-sm">
              {tenant.mobile}
            </span>

          </div>
        )}

        {/* JOINING DATE */}

        {tenant.joiningDate && (
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">

            <CalendarDays
              size={18}
              className="shrink-0 text-gray-500 dark:text-gray-400"
            />

            <span className="text-sm">
              Joined {tenant.joiningDate}
            </span>

          </div>
        )}

      </div>

      {/* ===================================================== */}
      {/* ACTION BUTTONS */}
      {/* ===================================================== */}

      <div className="p-5 border-t border-gray-200 dark:border-gray-800 flex gap-3">

        {/* VIEW DETAILS */}

        <button
          type="button"
          onClick={handleView}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 px-4 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <Eye size={18} />

          <span>
            View Details
          </span>
        </button>

        {/* EDIT */}

        <button
          type="button"
          onClick={handleEdit}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <Pencil size={18} />

          <span>
            Edit
          </span>
        </button>

      </div>

    </div>
  );
}

export default TenantCard;