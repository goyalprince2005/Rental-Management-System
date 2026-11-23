
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

// =========================================================
// TENANT HELPERS
// =========================================================

function getTenantName(tenant) {
  if (typeof tenant === "string") {
    return tenant.trim();
  }

  if (tenant && typeof tenant === "object") {
    return String(
      tenant.name ||
        tenant.fullName ||
        tenant.tenantName ||
        tenant.tenant ||
        ""
    ).trim();
  }

  return "";
}

function getTenantId(tenant) {
  return (
    tenant?.id ??
    tenant?.tenantId ??
    tenant?.tenant_id ??
    tenant?._id ??
    null
  );
}

function normalizeName(value) {
  return String(value ?? "").trim().toLowerCase();
}

// =========================================================
// RESOLVE TENANT FOR A RENT RECORD
// =========================================================

function resolveTenantForRecord(record, tenants, rooms) {
  const recordTenantName = normalizeName(
    getTenantName(record?.tenant)
  );

  if (!recordTenantName) {
    return null;
  }

  const recordProperty = normalizeName(record?.property);

  const recordRoom = String(
    record?.room ?? record?.roomId ?? ""
  ).trim();

  // Find the room connected to this rent record.
  const matchingRoom = rooms.find((room) => {
    const roomNumber = String(
      room?.roomNumber ?? room?.id ?? ""
    ).trim();

    const roomProperty = normalizeName(room?.property);

    const roomTenantName = normalizeName(
      getTenantName(room?.tenant)
    );

    const sameRoom =
      recordRoom !== "" && roomNumber === recordRoom;

    const sameProperty =
      !recordProperty ||
      !roomProperty ||
      recordProperty === roomProperty;

    const sameTenant =
      !roomTenantName ||
      roomTenantName === recordTenantName;

    return sameRoom && sameProperty && sameTenant;
  });

  const roomTenantId =
    matchingRoom?.tenantId ??
    matchingRoom?.tenant_id ??
    null;

  // First priority: match using the room's tenant ID.
  if (roomTenantId != null) {
    const tenantByRoomId = tenants.find(
      (tenant) =>
        String(getTenantId(tenant)) === String(roomTenantId)
    );

    if (tenantByRoomId) {
      return tenantByRoomId;
    }
  }

  // Second priority: match using tenant name,
  // property and room.
  const matchingTenants = tenants.filter((tenant) => {
    const tenantName = normalizeName(getTenantName(tenant));

    if (tenantName !== recordTenantName) {
      return false;
    }

    const tenantProperty = normalizeName(tenant?.property);

    const tenantRoom = String(
      tenant?.room ?? tenant?.roomNumber ?? ""
    ).trim();

    const propertyMatches =
      !recordProperty ||
      !tenantProperty ||
      recordProperty === tenantProperty;

    const roomMatches =
      !recordRoom ||
      !tenantRoom ||
      recordRoom === tenantRoom;

    return propertyMatches && roomMatches;
  });

  // Only accept a unique match.
  if (matchingTenants.length === 1) {
    return matchingTenants[0];
  }

  // Final fallback: exact tenant name, only if unique.
  const nameMatches = tenants.filter(
    (tenant) =>
      normalizeName(getTenantName(tenant)) === recordTenantName
  );

  return nameMatches.length === 1 ? nameMatches[0] : null;
}

// =========================================================
// ENRICH EXISTING RENT RECORDS
// Adds missing tenant IDs.
// =========================================================

function enrichRentRecords(records) {
  const tenants = toArray(
    readStorage(TENANT_STORAGE_KEY, [])
  );

  const rooms = toArray(
    readStorage(ROOM_STORAGE_KEY, [])
  );

  return records.map((record) => {
    // Preserve an existing tenant ID.
    if (
      record.tenantId !== undefined &&
      record.tenantId !== null &&
      record.tenantId !== ""
    ) {
      return record;
    }

    const tenant = resolveTenantForRecord(
      record,
      tenants,
      rooms
    );

    const tenantId = getTenantId(tenant);

    if (tenantId == null) {
      return record;
    }

    return {
      ...record,
      tenantId,
    };
  });
}

// =========================================================
// RENT AMOUNT HELPERS
// =========================================================

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

// =========================================================
// STATUS HELPERS
// =========================================================

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
    return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
  }

  if (normalizeStatus(status) === "overdue") {
    return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
  }

  if (isDue({ status })) {
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";
  }

  return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
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

      const roomTenantId =
        room.tenantId ?? room.tenant_id;

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
          getTenantId(tenant) ??
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
// =========================================================

function loadRentRecords() {
  const savedRecords = readStorage(RENT_STORAGE_KEY, null);

  if (savedRecords !== null) {
    const records = toArray(savedRecords);

    const enrichedRecords = enrichRentRecords(records);

    const hasChanges = enrichedRecords.some(
      (record, index) =>
        record.tenantId !== records[index]?.tenantId
    );

    if (hasChanges) {
      try {
        localStorage.setItem(
          RENT_STORAGE_KEY,
          JSON.stringify(enrichedRecords)
        );
      } catch (error) {
        console.error(
          "Unable to save updated rent records:",
          error
        );
      }
    }

    return enrichedRecords;
  }

  const savedRooms = readStorage(ROOM_STORAGE_KEY, null);

  if (savedRooms !== null) {
    const generatedRecords = enrichRentRecords(
      generateRentRecords()
    );

    try {
      localStorage.setItem(
        RENT_STORAGE_KEY,
        JSON.stringify(generatedRecords)
      );
    } catch (error) {
      console.error(
        "Unable to save generated rent bills:",
        error
      );
    }

    return generatedRecords;
  }

  return enrichRentRecords(DEFAULT_RENT_RECORDS);
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

      const property = String(
        record.property ?? ""
      ).toLowerCase();

      const room = String(
        record.room ?? ""
      ).toLowerCase();

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
        `Rent marked as paid for ${
          getTenantName(record.tenant) || "this tenant"
        }.`
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
    setMessage("");
    setErrorMessage("");

    let tenantId = record.tenantId;

    // Resolve missing tenant ID from saved data.
    if (
      tenantId === undefined ||
      tenantId === null ||
      tenantId === ""
    ) {
      const tenants = toArray(
        readStorage(TENANT_STORAGE_KEY, [])
      );

      const rooms = toArray(
        readStorage(ROOM_STORAGE_KEY, [])
      );

      const tenant = resolveTenantForRecord(
        record,
        tenants,
        rooms
      );

      tenantId = getTenantId(tenant);
    }

    if (
      tenantId === undefined ||
      tenantId === null ||
      tenantId === ""
    ) {
      setErrorMessage(
        `Unable to find a unique tenant record for ${
          getTenantName(record.tenant) || "this rent record"
        }. Please verify the tenant's property and room assignment.`
      );

      return;
    }

    navigate(`/tenant-details/${tenantId}`);
  };

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100 text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
      <Navbar />

      <main className="mx-auto max-w-7xl p-4 md:p-6">

        {/* PAGE HEADING */}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">
            Rent & Bills
          </h2>

          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Track monthly rent collection and pending payments.
          </p>
        </div>

        {/* FEEDBACK MESSAGES */}

        {message && (
          <div
            role="status"
            className="mb-5 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300"
          >
            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
          >
            <AlertCircle size={19} className="mt-0.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* SUMMARY CARDS */}

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* TOTAL RENT */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Rent
                </p>

                <h3 className="mt-1 text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {formatCurrency(totalRent)}
                </h3>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {rentRecords.length} rent records
                </p>
              </div>

              <div className="shrink-0 rounded-xl bg-blue-50 p-3 dark:bg-blue-950/50">
                <IndianRupee
                  size={26}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>
          </div>

          {/* PAID RENT */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Paid Rent
                </p>

                <h3 className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(paidRent)}
                </h3>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {paidRecords.length}{" "}
                  {paidRecords.length === 1 ? "paid record" : "paid records"}
                </p>
              </div>

              <div className="shrink-0 rounded-xl bg-green-50 p-3 dark:bg-green-950/50">
                <CheckCircle2
                  size={26}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
            </div>
          </div>

          {/* DUE RENT */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Due Rent
                </p>

                <h3 className="mt-1 text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {formatCurrency(dueRent)}
                </h3>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {dueRecords.length}{" "}
                  {dueRecords.length === 1 ? "due record" : "due records"}
                </p>
              </div>

              <div className="shrink-0 rounded-xl bg-yellow-50 p-3 dark:bg-yellow-950/50">
                <Clock3
                  size={26}
                  className="text-yellow-600 dark:text-yellow-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH AND FILTER */}

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="flex flex-col gap-3 lg:flex-row">

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
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
                aria-label="Search rent records"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
                  aria-label="Clear rent search"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 lg:w-44"
              aria-label="Filter rent records by status"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Due">Due / Pending</option>
            </select>

            <div className="flex items-center justify-center whitespace-nowrap rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {filteredRentRecords.length}{" "}
              {filteredRentRecords.length === 1 ? "record" : "records"}
            </div>
          </div>
        </div>

        {/* RENT RECORDS */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

          <div className="border-b border-gray-200 p-5 dark:border-gray-700">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Monthly Rent Records
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Current rent collection information.
                </p>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {filteredRentRecords.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {rentRecords.length}
                </span>
              </div>
            </div>
          </div>

          {filteredRentRecords.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">

              {filteredRentRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex flex-col gap-5 p-5 transition hover:bg-gray-50 dark:hover:bg-gray-800/70 lg:flex-row lg:items-center lg:justify-between"
                >

                  {/* TENANT */}

                  <div className="flex min-w-0 items-center gap-4">
                    <div className="shrink-0 rounded-xl bg-blue-50 p-3 dark:bg-blue-950/50">
                      <User
                        size={24}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className="break-words font-bold text-gray-800 dark:text-gray-100">
                        {getTenantName(record.tenant) || "Unknown Tenant"}
                      </h4>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {record.tenantId != null
                          ? `Tenant ID: ${record.tenantId}`
                          : `Rent Record ID: ${record.id}`}
                      </p>
                    </div>
                  </div>

                  {/* PROPERTY */}

                  <div className="flex min-w-0 items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Building2 size={18} className="shrink-0" />

                    <span className="break-words text-sm">
                      {record.property || "Not specified"}
                    </span>
                  </div>

                  {/* ROOM */}

                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <DoorOpen size={18} className="shrink-0" />

                    <span className="text-sm">
                      Room {record.room ?? "Not specified"}
                    </span>
                  </div>

                  {/* RENT */}

                  <div className="flex items-center gap-3">
                    <IndianRupee
                      size={18}
                      className="shrink-0 text-gray-500 dark:text-gray-400"
                    />

                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      {formatCurrency(getRecordAmount(record))}
                    </span>

                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      / month
                    </span>
                  </div>

                  {/* STATUS */}

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(
                      record.status
                    )}`}
                  >
                    {getStatusLabel(record.status)}
                  </span>

                  {/* ACTIONS */}

                  <div className="flex shrink-0 flex-wrap items-center gap-2">

                    {!isPaid(record) && isDue(record) && (
                      <button
                        type="button"
                        onClick={() => handleMarkAsPaid(record)}
                        disabled={updatingId === record.id}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
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
                      className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-600 dark:text-gray-200 dark:hover:border-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
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
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50">
                <Search
                  size={28}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                No rent records found
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                No rent record matches your current search or status filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
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
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            Rent bills were initialized from assigned rooms. Review the
            amounts and payment status before using them as actual records.
          </p>
        )}

      </main>
    </div>
  );
}

export default RentBills;
