
import React, { useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import {
  ArrowLeft,
  User,
  Building2,
  DoorOpen,
  IndianRupee,
  Phone,
  Calendar,
  Clock,
} from "lucide-react";

import Navbar from "./Navbar";
import TenantNavbar from "./TenantNavbar";

// =========================================================
// LOCAL STORAGE KEYS
// =========================================================

const TENANT_STORAGE_KEY = "rentalManagementTenants";
const ROOM_STORAGE_KEY = "rentalManagementRooms";
const PROPERTY_STORAGE_KEY = "rentalManagementProperties";

// =========================================================
// DEMO TENANT DATA
// Used only when tenant storage has not been created.
// =========================================================

const DEFAULT_TENANTS = [
  {
    id: 1,
    name: "Rahul Sharma",
    property: "Green View Apartments",
    propertyId: 1,
    location: "Bhopal",
    room: "101",
    roomId: 101,
    rent: 5000,
    rentDueDay: 10,
    status: "Active",
    phone: "9876543210",
    joiningDate: "January 10, 2026",
  },
  {
    id: 2,
    name: "Aman Kumar",
    property: "Green View Apartments",
    propertyId: 1,
    location: "Bhopal",
    room: "102",
    roomId: 102,
    rent: 6000,
    rentDueDay: 5,
    status: "Active",
    phone: "9876543211",
    joiningDate: "February 05, 2026",
  },
  {
    id: 3,
    name: "Neha Sharma",
    property: "Shyam Residency",
    propertyId: 2,
    location: "Bhopal",
    room: "203",
    roomId: 203,
    rent: 5500,
    rentDueDay: 15,
    status: "Due",
    phone: "9876543212",
    joiningDate: "March 15, 2026",
  },
];

// =========================================================
// SAFE STORAGE HELPERS
// =========================================================

function readStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
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
// NORMALIZE VALUES
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

function getAmount(value) {
  const amount =
    typeof value === "number"
      ? value
      : Number(String(value ?? "").replace(/[₹,\s]/g, ""));

  return Number.isFinite(amount) && amount >= 0 ? amount : 0;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(getAmount(value));
}

function getOrdinal(number) {
  const value = Number(number);

  if (value % 100 >= 11 && value % 100 <= 13) {
    return "th";
  }

  switch (value % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

// =========================================================
// LOAD TENANTS
// =========================================================

function loadTenants() {
  const stored = readStorage(TENANT_STORAGE_KEY, null);

  // Use demo tenants only when no tenant collection exists.
  if (stored === null) {
    return DEFAULT_TENANTS;
  }

  // An existing empty collection means there are no tenants.
  return toArray(stored).filter(Boolean);
}

// =========================================================
// LOAD ROOMS AND PROPERTIES
// =========================================================

function loadRooms() {
  const stored = readStorage(ROOM_STORAGE_KEY, null);

  if (stored === null) {
    return [];
  }

  return toArray(stored).filter(Boolean);
}

function loadProperties() {
  const stored = readStorage(PROPERTY_STORAGE_KEY, null);

  if (stored === null) {
    return [];
  }

  return toArray(stored).filter(Boolean);
}

// =========================================================
// MATCH TENANT TO ROOM
// =========================================================

function roomHasTenant(room) {
  const name = getTenantName(room?.tenant);

  return name !== "" && name.toLowerCase() !== "none";
}

function roomMatchesTenant(room, tenant) {
  const tenantId = getTenantId(tenant);
  const roomTenantId = room?.tenantId ?? room?.tenant_id;

  if (
    tenantId != null &&
    roomTenantId != null &&
    String(tenantId) === String(roomTenantId)
  ) {
    return true;
  }

  const roomTenantName = getTenantName(room?.tenant);
  const tenantName = getTenantName(tenant);

  return (
    roomTenantName !== "" &&
    tenantName !== "" &&
    roomTenantName.toLowerCase() === tenantName.toLowerCase()
  );
}

// =========================================================
// FIND TENANT FROM URL ID
// Supports tenant IDs, room IDs, and room-based record IDs.
// =========================================================

function findTenantByRouteId(routeId, tenants, rooms) {
  if (!routeId) {
    return null;
  }

  const normalizedRouteId = String(routeId);

  // First, search the actual tenant collection.
  const directTenant = tenants.find((tenant) => {
    const ids = [
      tenant?.id,
      tenant?.tenantId,
      tenant?.tenant_id,
      tenant?._id,
    ];

    return ids.some(
      (value) =>
        value != null &&
        String(value) === normalizedRouteId
    );
  });

  if (directTenant) {
    return directTenant;
  }

  // A rent record can use an ID like "room-101".
  // Resolve that room to its assigned tenant.
  let matchingRoom = null;

  if (normalizedRouteId.startsWith("room-")) {
    const roomReference = normalizedRouteId.slice(5);

    matchingRoom = rooms.find((room) => {
      const roomIds = [
        room?.id,
        room?._id,
        room?.roomId,
        room?.roomNumber,
      ];

      return roomIds.some(
        (value) =>
          value != null &&
          String(value) === roomReference
      );
    });
  }

  // Also support a route that directly contains a room ID.
  if (!matchingRoom) {
    matchingRoom = rooms.find((room) => {
      const roomIds = [
        room?.id,
        room?._id,
        room?.roomId,
        room?.roomNumber,
      ];

      return roomIds.some(
        (value) =>
          value != null &&
          String(value) === normalizedRouteId
      );
    });
  }

  if (matchingRoom && roomHasTenant(matchingRoom)) {
    // Prefer the actual tenant record matching the room assignment.
    const assignedTenant = tenants.find((tenant) =>
      roomMatchesTenant(matchingRoom, tenant)
    );

    if (assignedTenant) {
      return assignedTenant;
    }

    // If the room stores a tenant object directly, use that object.
    if (
      matchingRoom.tenant &&
      typeof matchingRoom.tenant === "object"
    ) {
      return {
        ...matchingRoom.tenant,
        roomId:
          matchingRoom.id ??
          matchingRoom.roomId ??
          matchingRoom._id,
        room: matchingRoom.roomNumber,
        property:
          matchingRoom.property ??
          matchingRoom.propertyName,
        propertyId: matchingRoom.propertyId,
        rent: matchingRoom.rent,
      };
    }

    // If the room stores only a tenant name, create a temporary
    // display record. Do not persist this as a real tenant.
    return {
      id:
        matchingRoom.tenantId ??
        matchingRoom.tenant_id ??
        normalizedRouteId,
      name: getTenantName(matchingRoom.tenant),
      roomId:
        matchingRoom.id ??
        matchingRoom.roomId ??
        matchingRoom._id,
      room: matchingRoom.roomNumber,
      property:
        matchingRoom.property ??
        matchingRoom.propertyName,
      propertyId: matchingRoom.propertyId,
      rent: matchingRoom.rent,
      phone: matchingRoom.phone ?? "",
      status: matchingRoom.status ?? "Active",
      rentDueDay: matchingRoom.rentDueDay ?? 1,
      joiningDate: matchingRoom.joiningDate ?? "",
    };
  }

  return null;
}

// =========================================================
// TENANT DETAILS COMPONENT
// =========================================================

function TenantDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const isTenantView = searchParams.get("view") === "tenant";

  // -------------------------------------------------------
  // LOAD DATA
  // -------------------------------------------------------

  const tenants = useMemo(() => loadTenants(), []);
  const rooms = useMemo(() => loadRooms(), []);
  const properties = useMemo(() => loadProperties(), []);

  // -------------------------------------------------------
  // FIND REQUESTED TENANT
  // -------------------------------------------------------

  const tenant = useMemo(
    () => findTenantByRouteId(id, tenants, rooms),
    [id, tenants, rooms]
  );

  // -------------------------------------------------------
  // RESOLVE PROPERTY AND ROOM DETAILS
  // -------------------------------------------------------

  const tenantDetails = useMemo(() => {
    if (!tenant) {
      return null;
    }

    const tenantId = getTenantId(tenant);

    const room =
      rooms.find((item) => {
        const roomId = item?.id ?? item?._id ?? item?.roomId;

        if (
          tenant.roomId != null &&
          roomId != null &&
          String(tenant.roomId) === String(roomId)
        ) {
          return true;
        }

        return roomMatchesTenant(item, tenant);
      }) || null;

    const propertyId = tenant.propertyId ?? room?.propertyId;

    const property =
      properties.find(
        (item) =>
          propertyId != null &&
          item?.id != null &&
          String(item.id) === String(propertyId)
      ) ||
      properties.find(
        (item) =>
          item?.name &&
          String(item.name).trim().toLowerCase() ===
            String(
              tenant.property ??
                room?.property ??
                room?.propertyName ??
                ""
            ).trim().toLowerCase()
      ) ||
      null;

    const propertyName =
      tenant.property ||
      tenant.propertyName ||
      room?.property ||
      room?.propertyName ||
      property?.name ||
      "Not specified";

    const roomNumber =
      tenant.room ??
      tenant.roomNumber ??
      room?.roomNumber ??
      room?.id ??
      "Not specified";

    const rent = getAmount(
      tenant.rent ?? tenant.monthlyRent ?? room?.rent
    );

    return {
      ...tenant,
      id: tenantId ?? tenant.id ?? id,
      name: getTenantName(tenant) || "Unknown Tenant",
      property: propertyName,
      location:
        tenant.location ||
        tenant.address ||
        property?.location ||
        property?.address ||
        "Not specified",
      room: String(roomNumber),
      rent,
      phone:
        tenant.phone ??
        tenant.mobile ??
        tenant.mobileNumber ??
        tenant.contactNumber ??
        "Not provided",
      rentDueDay: Number(tenant.rentDueDay ?? tenant.dueDay ?? 1),
      joiningDate:
        tenant.joiningDate ??
        tenant.moveInDate ??
        tenant.createdAt ??
        "",
      status: tenant.status || "Active",
    };
  }, [tenant, id, rooms, properties]);

  // -------------------------------------------------------
  // NAVIGATION HELPERS
  // -------------------------------------------------------

  const getBackPath = () =>
    isTenantView ? "/tenant-dashboard" : "/tenants";

  const getEditPath = () =>
    isTenantView
      ? `/edit-tenant/${tenantDetails?.id}?view=tenant`
      : `/edit-tenant/${tenantDetails?.id}`;

  // -------------------------------------------------------
  // STATUS STYLE
  // -------------------------------------------------------

  const getStatusStyle = () => {
    const status = String(tenantDetails?.status ?? "")
      .trim()
      .toLowerCase();

    if (status === "active" || status === "occupied") {
      return "bg-green-100 text-green-700";
    }

    if (
      status === "due" ||
      status === "pending" ||
      status === "overdue"
    ) {
      return "bg-yellow-100 text-yellow-700";
    }

    if (
      status === "inactive" ||
      status === "vacated"
    ) {
      return "bg-gray-100 text-gray-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  // =========================================================
  // TENANT NOT FOUND
  // =========================================================

  if (!tenantDetails) {
    return (
      <div className="min-h-screen bg-gray-100">
        {isTenantView ? <TenantNavbar /> : <Navbar />}

        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md w-full">
            <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <User size={30} className="text-red-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-5">
              Tenant Not Found
            </h2>

            <p className="text-gray-500 mt-2">
              No saved tenant or assigned room matches this record.
            </p>

            <button
              type="button"
              onClick={() => navigate(getBackPath())}
              className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
            >
              {isTenantView
                ? "Back to Dashboard"
                : "Back to Tenants"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}

      {isTenantView ? <TenantNavbar /> : <Navbar />}

      {/* MAIN CONTENT */}

      <main className="p-4 md:p-6 max-w-5xl mx-auto">
        {/* PAGE HEADER */}

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {isTenantView ? "My Details" : tenantDetails.name}
          </h1>

          <p className="text-gray-500 mt-1">
            {isTenantView
              ? "View your rental and personal information."
              : "Complete information about this tenant."}
          </p>
        </div>

        {/* TENANT CARD */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {/* HEADER */}

          <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <User size={32} className="text-blue-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {tenantDetails.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  Tenant ID: {tenantDetails.id}
                </p>
              </div>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle()}`}
            >
              {tenantDetails.status}
            </span>
          </div>

          {/* TENANT INFORMATION */}

          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Tenant Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* PHONE */}

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Phone size={18} />
                  <p className="text-sm">Phone</p>
                </div>

                <p className="font-bold mt-2 break-words">
                  {tenantDetails.phone}
                </p>
              </div>

              {/* PROPERTY */}

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Building2 size={18} />
                  <p className="text-sm">Property</p>
                </div>

                <p className="font-bold mt-2 break-words">
                  {tenantDetails.property}
                </p>
              </div>

              {/* ROOM */}

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <DoorOpen size={18} />
                  <p className="text-sm">Room</p>
                </div>

                <p className="font-bold mt-2">
                  Room {tenantDetails.room}
                </p>
              </div>

              {/* RENT */}

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <IndianRupee size={18} />
                  <p className="text-sm">Monthly Rent</p>
                </div>

                <p className="font-bold mt-2">
                  {formatCurrency(tenantDetails.rent)}
                </p>
              </div>

              {/* RENT DUE DAY */}

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={18} />
                  <p className="text-sm">Rent Due Day</p>
                </div>

                <p className="font-bold mt-2">
                  {tenantDetails.rentDueDay}
                  {getOrdinal(tenantDetails.rentDueDay)} of every month
                </p>
              </div>

              {/* JOINING DATE */}

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={18} />
                  <p className="text-sm">Joining Date</p>
                </div>

                <p className="font-bold mt-2 break-words">
                  {tenantDetails.joiningDate
                    ? String(tenantDetails.joiningDate).slice(0, 10)
                    : "Not specified"}
                </p>
              </div>

              {/* LOCATION */}

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Building2 size={18} />
                  <p className="text-sm">Location</p>
                </div>

                <p className="font-bold mt-2 break-words">
                  {tenantDetails.location}
                </p>
              </div>
            </div>

            {/* PROPERTY INFORMATION */}

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
                      {tenantDetails.property}
                    </h4>

                    <p className="text-sm text-gray-500">
                      📍 {tenantDetails.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={() => navigate(getBackPath())}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                <ArrowLeft size={18} />
                {isTenantView
                  ? "Back to Dashboard"
                  : "Back to Tenants"}
              </button>

              <button
                type="button"
                onClick={() => navigate(getEditPath())}
                className="flex-1 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {isTenantView
                  ? "Edit My Details"
                  : "Edit Tenant"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TenantDetails;
