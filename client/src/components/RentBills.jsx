
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Building2,
  DoorOpen,
  IndianRupee,
  Eye,
  Search,
  X,
  CheckCircle2,
  Clock3,
  Check,
  AlertCircle,
} from "lucide-react";

import Navbar from "./Navbar";

// =========================================================
// LOCAL STORAGE KEYS
// =========================================================

const RENT_STORAGE_KEY = "rentalManagementRentBills";
const ROOM_STORAGE_KEY = "rentalManagementRooms";
const PROPERTY_STORAGE_KEY = "rentalManagementProperties";
const TENANT_STORAGE_KEY = "rentalManagementTenants";

// =========================================================
// DEFAULT DEMO RECORDS
// Used only when neither bills nor rooms are saved.
// =========================================================

const DEFAULT_RENT_RECORDS = [
  {
    id: 1,
    tenant: "Rahul Sharma",
    property: "Green View Apartments",
    propertyId: 1,
    room: "101",
    roomId: 101,
    rent: 5000,
    status: "Paid",
  },
  {
    id: 2,
    tenant: "Aman Kumar",
    property: "Green View Apartments",
    propertyId: 1,
    room: "102",
    roomId: 102,
    rent: 6000,
    status: "Paid",
  },
  {
    id: 3,
    tenant: "Neha Sharma",
    property: "Shyam Residency",
    propertyId: 2,
    room: "203",
    roomId: 203,
    rent: 5500,
    status: "Due",
  },
];

// =========================================================
// SAFE STORAGE HELPERS
// =========================================================

function readStorage(key, fallback = null) {
  try {
    const stored = localStorage.getItem(key);

    return stored === null ? fallback : JSON.parse(stored);
  } catch (error) {
    console.error(`Unable to read ${key}:`, error);
    return fallback;
  }
}

function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && typeof value === "object") {
    return Object.values(value);
  }

  return [];
}

function getTenantName(tenant) {
  if (typeof tenant === "string") {
    return tenant.trim();
  }

  if (tenant && typeof tenant === "object") {
    return String(
      tenant.name ||
        tenant.fullName ||
        tenant.tenantName ||
        ""
    ).trim();
  }

  return "";
}

function getRentAmount(value) {
  const amount =
    typeof value === "number"
      ? value
      : Number(String(value ?? "").replace(/[₹,\s]/g, ""));

  return Number.isFinite(amount) && amount >= 0 ? amount : 0;
}

function getRecordAmount(record) {
  return getRentAmount(record?.rent ?? record?.amount);
}

function normalizeStatus(status) {
  return String(status ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
}

function isPaid(record) {
  return normalizeStatus(record?.status) === "paid";
}

function isDue(record) {
  return [
    "due",
    "pending",
    "overdue",
    "unpaid",
  ].includes(normalizeStatus(record?.status));
}

function getStatusLabel(status) {
  const normalized = normalizeStatus(status);

  if (normalized === "paid") return "Paid";
  if (normalized === "due") return "Due";
  if (normalized === "pending") return "Pending";
  if (normalized === "overdue") return "Overdue";
  if (normalized === "unpaid") return "Unpaid";

  return status || "Not specified";
}

function getStatusStyle(status) {
  if (isPaid({ status })) {
    return "bg-green-100 text-green-700";
  }

  if (normalizeStatus(status) === "overdue") {
    return "bg-red-100 text-red-700";
  }

  if (isDue({ status })) {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-gray-100 text-gray-700";
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(getRentAmount(value));
}

// =========================================================
// GENERATE INITIAL BILLS FROM SAVED ROOMS
// Does not overwrite existing bills.
// =========================================================

function generateRentRecords() {
  const savedRooms = readStorage(ROOM_STORAGE_KEY, null);
  const savedProperties = toArray(
    readStorage(PROPERTY_STORAGE_KEY, [])
  );
  const savedTenants = toArray(
    readStorage(TENANT_STORAGE_KEY, [])
  );

  const rooms = toArray(savedRooms);

  return rooms
    .filter((room) => {
      const tenantName = getTenantName(room?.tenant);

      return (
        room &&
        tenantName !== "" &&
        tenantName.toLowerCase() !== "none"
      );
    })
    .map((room) => {
      const roomTenantName = getTenantName(room.tenant);
      const roomTenantId = room.tenantId ?? room.tenant_id;

      const tenant = savedTenants.find((item) => {
        const tenantName = getTenantName(item);
        const tenantId =
          item?.id ?? item?.tenantId ?? item?.tenant_id;

        return (
          (tenantName &&
            tenantName.toLowerCase() ===
              roomTenantName.toLowerCase()) ||
          (roomTenantId != null &&
            tenantId != null &&
            String(roomTenantId) === String(tenantId))
        );
      });

      const property = savedProperties.find((item) => {
        if (
          room.propertyId != null &&
          item?.id != null &&
          String(item.id) === String(room.propertyId)
        ) {
          return true;
        }

        return (
          room.property &&
          item?.name &&
          String(item.name).trim().toLowerCase() ===
            String(room.property).trim().toLowerCase()
        );
      });

      return {
        id: `room-${room.id}`,
        tenant: getTenantName(tenant) || roomTenantName,
        tenantId:
          tenant?.id ??
          tenant?.tenantId ??
          roomTenantId ??
          null,
        property:
          property?.name || room.property || "Not specified",
        propertyId: property?.id ?? room.propertyId ?? null,
        room: String(room.roomNumber ?? room.id),
        roomId: room.id,
        rent: getRecordAmount(room),
        status: "Due",
      };
    });
}

// =========================================================
// LOAD RENT RECORDS
// Priority:
// 1. Existing saved bills
// 2. Bills generated from saved rooms
// 3. Demo records only if no saved data exists
// =========================================================

function loadRentRecords() {
  const savedRecords = readStorage(RENT_STORAGE_KEY, null);

  if (savedRecords !== null) {
    return toArray(savedRecords);
  }

  const savedRooms = readStorage(ROOM_STORAGE_KEY, null);

  if (savedRooms !== null) {
    const generatedRecords = generateRentRecords();

    // Persist generated bills so later visits use the same records.
    try {
      localStorage.setItem(
        RENT_STORAGE_KEY,
        JSON.stringify(generatedRecords)
      );
    } catch (error) {
      console.error("Unable to save generated rent bills:", error);
    }

    return generatedRecords;
  }

  return DEFAULT_RENT_RECORDS;
}

// =========================================================
// RENT BILLS COMPONENT
// =========================================================

function RentBills() {
  const navigate = useNavigate();

  // -------------------------------------------------------
  // RENT RECORDS
  // -------------------------------------------------------

  const [rentRecords, setRentRecords] = useState(
    () => loadRentRecords()
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // -------------------------------------------------------
  // FILTER RECORDS
  // -------------------------------------------------------

  const filteredRentRecords = useMemo(() => {
    const searchValue = searchTerm.trim().toLowerCase();

    return rentRecords.filter((record) => {
      const tenant = getTenantName(record.tenant).toLowerCase();
      const property = String(record.property ?? "").toLowerCase();
      const room = String(record.room ?? "").toLowerCase();

      const matchesSearch =
        !searchValue ||
        tenant.includes(searchValue) ||
        property.includes(searchValue) ||
        room.includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Paid" && isPaid(record)) ||
        (statusFilter === "Due" && isDue(record));

      return matchesSearch && matchesStatus;
    });
  }, [rentRecords, searchTerm, statusFilter]);

  // -------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------

  const totalRent = rentRecords.reduce(
    (total, record) => total + getRecordAmount(record),
    0
  );

  const paidRecords = rentRecords.filter(isPaid);
  const dueRecords = rentRecords.filter(isDue);

  const paidRent = paidRecords.reduce(
    (total, record) => total + getRecordAmount(record),
    0
  );

  const dueRent = dueRecords.reduce(
    (total, record) => total + getRecordAmount(record),
    0
  );

  // -------------------------------------------------------
  // UPDATE PAYMENT STATUS
  // -------------------------------------------------------

  const handleMarkAsPaid = (record) => {
    if (isPaid(record)) {
      return;
    }

    setMessage("");
    setErrorMessage("");
    setUpdatingId(record.id);

    const updatedRecords = rentRecords.map((item) =>
      item.id === record.id
        ? {
            ...item,
            status: "Paid",
            paidAt: new Date().toISOString(),
          }
        : item
    );

    try {
      localStorage.setItem(
        RENT_STORAGE_KEY,
        JSON.stringify(updatedRecords)
      );

      setRentRecords(updatedRecords);
      setMessage(
        `Rent marked as paid for ${getTenantName(record.tenant) || "this tenant"}.`
      );
    } catch (error) {
      console.error("Unable to update rent status:", error);

      setErrorMessage(
        "Unable to save the payment status. Please check browser storage and try again."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // -------------------------------------------------------
  // CLEAR SEARCH
  // -------------------------------------------------------

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // -------------------------------------------------------
  // VIEW TENANT DETAILS
  // -------------------------------------------------------

  const handleViewTenant = (record) => {
    const tenantId = record.tenantId ?? record.id;

    navigate(`/tenant-details/${tenantId}`);
  };

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <Navbar />

      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* PAGE HEADING */}

        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Rent & Bills
          </h2>

          <p className="text-gray-500 mt-1">
            Track monthly rent collection and pending payments.
          </p>
        </div>

        {/* FEEDBACK MESSAGES */}

        {message && (
          <div
            role="status"
            className="mb-5 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          >
            <CheckCircle2 size={19} className="shrink-0 mt-0.5" />
            <span>{message}</span>
          </div>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <AlertCircle size={19} className="shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* SUMMARY CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {/* TOTAL RENT */}

          <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Rent</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {formatCurrency(totalRent)}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {rentRecords.length} rent records
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl shrink-0">
                <IndianRupee size={26} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* PAID RENT */}

          <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Paid Rent</p>
                <h3 className="text-2xl font-bold text-green-600 mt-1">
                  {formatCurrency(paidRent)}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {paidRecords.length}{" "}
                  {paidRecords.length === 1 ? "paid record" : "paid records"}
                </p>
              </div>

              <div className="p-3 bg-green-50 rounded-xl shrink-0">
                <CheckCircle2 size={26} className="text-green-600" />
              </div>
            </div>
          </div>

          {/* DUE RENT */}

          <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Due Rent</p>
                <h3 className="text-2xl font-bold text-yellow-600 mt-1">
                  {formatCurrency(dueRent)}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {dueRecords.length}{" "}
                  {dueRecords.length === 1 ? "due record" : "due records"}
                </p>
              </div>

              <div className="p-3 bg-yellow-50 rounded-xl shrink-0">
                <Clock3 size={26} className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH AND FILTER */}

        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search tenant, property or room..."
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                aria-label="Search rent records"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  aria-label="Clear rent search"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full lg:w-44 px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              aria-label="Filter rent records by status"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Due">Due / Pending</option>
            </select>

            <div className="flex items-center justify-center px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 whitespace-nowrap">
              {filteredRentRecords.length}{" "}
              {filteredRentRecords.length === 1 ? "record" : "records"}
            </div>
          </div>
        </div>

        {/* RENT RECORDS */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-5 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Monthly Rent Records
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Current rent collection information.
                </p>
              </div>

              <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {filteredRentRecords.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                  {rentRecords.length}
                </span>
              </div>
            </div>
          </div>

          {filteredRentRecords.length > 0 ? (
            <div className="divide-y">
              {filteredRentRecords.map((record) => (
                <div
                  key={record.id}
                  className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 hover:bg-gray-50 transition"
                >
                  {/* TENANT */}

                  <div className="flex items-center gap-4 min-w-0">
                    <div className="p-3 bg-blue-50 rounded-xl shrink-0">
                      <User size={24} className="text-blue-600" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-800 break-words">
                        {getTenantName(record.tenant) || "Unknown Tenant"}
                      </h4>

                      <p className="text-sm text-gray-500">
                        {record.tenantId != null
                          ? `Tenant ID: ${record.tenantId}`
                          : `Rent Record ID: ${record.id}`}
                      </p>
                    </div>
                  </div>

                  {/* PROPERTY */}

                  <div className="flex items-center gap-3 text-gray-600 min-w-0">
                    <Building2 size={18} className="shrink-0" />
                    <span className="text-sm break-words">
                      {record.property || "Not specified"}
                    </span>
                  </div>

                  {/* ROOM */}

                  <div className="flex items-center gap-3 text-gray-600">
                    <DoorOpen size={18} className="shrink-0" />
                    <span className="text-sm">
                      Room {record.room ?? "Not specified"}
                    </span>
                  </div>

                  {/* RENT */}

                  <div className="flex items-center gap-3">
                    <IndianRupee size={18} className="text-gray-500 shrink-0" />
                    <span className="font-semibold text-gray-800">
                      {formatCurrency(getRecordAmount(record))}
                    </span>
                    <span className="text-xs text-gray-400">/ month</span>
                  </div>

                  {/* STATUS */}

                  <span
                    className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(record.status)}`}
                  >
                    {getStatusLabel(record.status)}
                  </span>

                  {/* ACTIONS */}

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {!isPaid(record) && isDue(record) && (
                      <button
                        type="button"
                        onClick={() => handleMarkAsPaid(record)}
                        disabled={updatingId === record.id}
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <Check size={17} />
                        {updatingId === record.id
                          ? "Saving..."
                          : "Mark as Paid"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleViewTenant(record)}
                      className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition"
                    >
                      <Eye size={18} />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Search size={28} className="text-blue-600" />
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                No rent records found
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                No rent record matches your current search or status filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
                className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <X size={17} />
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* DEMO DATA NOTE */}

        {rentRecords.some((record) =>
          String(record.id).startsWith("room-")
        ) && (
          <p className="text-xs text-gray-400 mt-4">
            Rent bills were initialized from assigned rooms. Review the
            amounts and payment status before using them as actual records.
          </p>
        )}
      </main>
    </div>
  );
}

export default RentBills;
