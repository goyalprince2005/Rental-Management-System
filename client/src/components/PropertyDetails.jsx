import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  MapPin,
  DoorOpen,
  Users,
  IndianRupee,
  Pencil,
  Eye,
} from "lucide-react";

import Navbar from "./Navbar";

// =========================================================
// LOCAL STORAGE KEYS
// =========================================================

const PROPERTY_STORAGE_KEY = "rentalManagementProperties";
const ROOM_STORAGE_KEY = "rentalManagementRooms";

// =========================================================
// DEFAULT PROPERTIES
// Used when property storage has not been created yet.
// =========================================================

const DEFAULT_PROPERTIES = [
  {
    id: 1,
    name: "Green View Apartments",
    location: "Bhopal",
    address: "Bhopal, Madhya Pradesh",
    status: "Active",
    floors: 5,
  },
  {
    id: 2,
    name: "Shyam Residency",
    location: "Bhopal",
    address: "Bhopal, Madhya Pradesh",
    status: "Active",
    floors: 2,
  },
];

// =========================================================
// DEFAULT ROOMS
// Saved room data overrides these defaults.
// =========================================================

const DEFAULT_ROOMS = {
  101: {
    id: 101,
    roomNumber: "101",
    property: "Green View Apartments",
    propertyId: 1,
    location: "Bhopal",
    floor: 1,
    tenant: "Rahul Sharma",
    rent: 5000,
    status: "Occupied",
  },

  102: {
    id: 102,
    roomNumber: "102",
    property: "Green View Apartments",
    propertyId: 1,
    location: "Bhopal",
    floor: 1,
    tenant: "Aman Kumar",
    rent: 6000,
    status: "Occupied",
  },

  203: {
    id: 203,
    roomNumber: "203",
    property: "Shyam Residency",
    propertyId: 2,
    location: "Bhopal",
    floor: 2,
    tenant: "Neha Sharma",
    rent: 5500,
    status: "Due",
  },

  204: {
    id: 204,
    roomNumber: "204",
    property: "Shyam Residency",
    propertyId: 2,
    location: "Bhopal",
    floor: 2,
    tenant: "",
    rent: 5500,
    status: "Available",
  },
};

// =========================================================
// READ PROPERTIES
// =========================================================

function getSavedProperties() {
  try {
    const stored = localStorage.getItem(
      PROPERTY_STORAGE_KEY
    );

    if (stored === null) {
      return DEFAULT_PROPERTIES;
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Unable to load properties:", error);
    return DEFAULT_PROPERTIES;
  }
}

// =========================================================
// READ ROOMS
// =========================================================

function getSavedRooms() {
  try {
    const stored = localStorage.getItem(ROOM_STORAGE_KEY);

    if (!stored) {
      return {};
    }

    const parsed = JSON.parse(stored);

    return parsed &&
      typeof parsed === "object" &&
      !Array.isArray(parsed)
      ? parsed
      : {};
  } catch (error) {
    console.error("Unable to load rooms:", error);
    return {};
  }
}

// =========================================================
// COMBINE DEFAULT AND SAVED ROOMS
// =========================================================

function getAllRooms() {
  const savedRooms = getSavedRooms();

  return Object.values({
    ...DEFAULT_ROOMS,
    ...savedRooms,
  }).filter(
    (room) =>
      room &&
      room.id !== undefined &&
      room.id !== null
  );
}

// =========================================================
// FIND PROPERTY FOR A ROOM
// propertyId is preferred; property name is the fallback.
// =========================================================

function belongsToProperty(room, property) {
  if (
    room.propertyId !== undefined &&
    room.propertyId !== null &&
    room.propertyId !== ""
  ) {
    return (
      String(room.propertyId) === String(property.id)
    );
  }

  return (
    String(room.property ?? "").trim().toLowerCase() ===
    String(property.name ?? "").trim().toLowerCase()
  );
}

// =========================================================
// FORMAT CURRENCY
// =========================================================

function formatCurrency(value) {
  const amount =
    typeof value === "number"
      ? value
      : Number(String(value ?? "").replace(/[₹,\s]/g, ""));

  if (
    value === "" ||
    value === null ||
    value === undefined ||
    !Number.isFinite(amount)
  ) {
    return "Not specified";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// =========================================================
// NORMALIZE TENANT NAME
// =========================================================

function getTenantName(tenant) {
  if (
    tenant === null ||
    tenant === undefined ||
    String(tenant).trim() === "" ||
    String(tenant).trim().toLowerCase() === "none"
  ) {
    return "None";
  }

  return String(tenant);
}

// =========================================================
// ROOM STATUS BADGE
// =========================================================

function getRoomStatusStyle(status) {
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

// =========================================================
// PROPERTY DETAILS COMPONENT
// =========================================================

function PropertyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // -------------------------------------------------------
  // LOAD PROPERTIES AND ROOMS
  // -------------------------------------------------------

  const properties = useMemo(
    () => getSavedProperties(),
    []
  );

  const allRooms = useMemo(
    () => getAllRooms(),
    []
  );

  // -------------------------------------------------------
  // FIND SELECTED PROPERTY
  // -------------------------------------------------------

  const property = useMemo(() => {
    return (
      properties.find(
        (item) => String(item.id) === String(id)
      ) || null
    );
  }, [properties, id]);

  // -------------------------------------------------------
  // GET ROOMS BELONGING TO SELECTED PROPERTY
  // -------------------------------------------------------

  const rooms = useMemo(() => {
    if (!property) {
      return [];
    }

    return allRooms
      .filter((room) =>
        belongsToProperty(room, property)
      )
      .sort((a, b) =>
        String(a.roomNumber ?? "").localeCompare(
          String(b.roomNumber ?? ""),
          undefined,
          { numeric: true }
        )
      );
  }, [allRooms, property]);

  // -------------------------------------------------------
  // CALCULATE PROPERTY STATISTICS
  // -------------------------------------------------------

  const statistics = useMemo(() => {
    const totalRooms = rooms.length;

    const availableRooms = rooms.filter(
      (room) => room.status === "Available"
    ).length;

    // "Due" rooms are not available. They remain part
    // of the occupied/non-available room count.
    const occupiedRooms = rooms.filter(
      (room) =>
        room.status === "Occupied" ||
        room.status === "Due"
    ).length;

    const monthlyRent = rooms.reduce((total, room) => {
      const rent =
        typeof room.rent === "number"
          ? room.rent
          : Number(
              String(room.rent ?? "").replace(/[₹,\s]/g, "")
            );

      return total + (
        Number.isFinite(rent) && rent > 0 ? rent : 0
      );
    }, 0);

    return {
      totalRooms,
      availableRooms,
      occupiedRooms,
      monthlyRent,
    };
  }, [rooms]);

  // -------------------------------------------------------
  // NAVIGATION HANDLERS
  // -------------------------------------------------------

  const handleEditProperty = () => {
    // Preserve the existing behavior.
    navigate("/properties");
  };

  const handleBack = () => {
    navigate("/properties");
  };

  // -------------------------------------------------------
  // PROPERTY NOT FOUND
  // -------------------------------------------------------

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center max-w-md w-full">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Building2
                  size={30}
                  className="text-blue-600"
                />
              </div>

              <h2 className="text-xl font-bold text-gray-800">
                Property Not Found
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                The property you are trying to view does not
                exist or is no longer available.
              </p>

              <button
                type="button"
                onClick={handleBack}
                className="mt-5 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
              >
                <ArrowLeft size={18} />
                Back to Properties
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // -------------------------------------------------------
  // PROPERTY DISPLAY VALUES
  // -------------------------------------------------------

  const propertyName = property.name || "Unnamed Property";
  const propertyLocation =
    property.location || "Not specified";

  const propertyAddress =
    property.address || propertyLocation;

  const propertyStatus = property.status || "Active";

  const floors = property.floors ?? "Not specified";

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* PAGE HEADING */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Property Details
            </h1>

            <p className="text-gray-500 mt-1">
              View and manage property information.
            </p>
          </div>

          {/* EDIT PROPERTY */}
          <button
            type="button"
            onClick={handleEditProperty}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            <Pencil size={18} />
            <span>Edit Property</span>
          </button>
        </div>

        {/* PROPERTY HEADER */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            {/* PROPERTY INFORMATION */}
            <div className="flex items-start gap-4 min-w-0">
              <div className="p-4 bg-blue-50 rounded-xl shrink-0">
                <Building2
                  size={32}
                  className="text-blue-600"
                />
              </div>

              <div className="min-w-0">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 break-words">
                  {propertyName}
                </h2>

                <div className="flex items-center gap-2 text-gray-500 mt-2">
                  <MapPin
                    size={18}
                    className="shrink-0"
                  />

                  <span>{propertyLocation}</span>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {propertyAddress}
                </p>

                <p className="text-xs text-gray-400 mt-2 break-all">
                  Property ID: {property.id}
                </p>
              </div>
            </div>

            {/* PROPERTY STATUS */}
            <span
              className={`w-fit px-4 py-2 rounded-full text-sm font-medium ${
                propertyStatus === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {propertyStatus}
            </span>
          </div>
        </div>

        {/* PROPERTY STATISTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {/* FLOORS */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Building2
                  size={24}
                  className="text-purple-600"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Floors
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {floors}
                </h3>
              </div>
            </div>
          </div>

          {/* TOTAL ROOMS */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <DoorOpen
                  size={24}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Total Rooms
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {statistics.totalRooms}
                </h3>
              </div>
            </div>
          </div>

          {/* AVAILABLE ROOMS */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-xl">
                <DoorOpen
                  size={24}
                  className="text-green-600"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Available
                </p>

                <h3 className="text-2xl font-bold text-green-600">
                  {statistics.availableRooms}
                </h3>
              </div>
            </div>
          </div>

          {/* OCCUPIED ROOMS */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Users
                  size={24}
                  className="text-yellow-600"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Occupied
                </p>

                <h3 className="text-2xl font-bold text-blue-600">
                  {statistics.occupiedRooms}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* MONTHLY RENT */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <IndianRupee
                size={24}
                className="text-green-600"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Monthly Rent
              </h3>

              <p className="text-sm text-gray-500">
                Total monthly rent from rooms in this property.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-green-600">
            {formatCurrency(statistics.monthlyRent)}
          </h2>
        </div>

        {/* ROOM LIST */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* SECTION HEADER */}
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">
              Rooms in this Property
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              View rooms and their current occupancy status.
            </p>
          </div>

          {/* ROOM LIST */}
          {rooms.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 hover:bg-gray-50 transition"
                >
                  {/* ROOM */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="p-3 bg-blue-50 rounded-xl shrink-0">
                      <DoorOpen
                        size={24}
                        className="text-blue-600"
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-800">
                        Room {room.roomNumber ?? "Not specified"}
                      </h4>

                      <p className="text-sm text-gray-500">
                        Floor {room.floor ?? "Not specified"}
                      </p>

                      <p className="text-xs text-gray-400 mt-1 break-all">
                        Internal ID: {room.id}
                      </p>
                    </div>
                  </div>

                  {/* TENANT */}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={18} className="shrink-0" />

                    <span className="text-sm break-words">
                      {getTenantName(room.tenant)}
                    </span>
                  </div>

                  {/* RENT */}
                  <div className="flex items-center gap-2">
                    <IndianRupee
                      size={18}
                      className="text-gray-500"
                    />

                    <span className="font-semibold text-gray-800">
                      {formatCurrency(room.rent)}
                    </span>

                    <span className="text-xs text-gray-400">
                      / month
                    </span>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${getRoomStatusStyle(
                      room.status
                    )}`}
                  >
                    {room.status || "Not specified"}
                  </span>

                  {/* VIEW ROOM */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/room-details/${room.id}`)
                    }
                    className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition"
                  >
                    <Eye size={18} />
                    <span>View Room</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="w-14 h-14 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <DoorOpen
                  size={26}
                  className="text-gray-400"
                />
              </div>

              <h4 className="font-semibold text-gray-800">
                No rooms available
              </h4>

              <p className="text-sm text-gray-500 mt-1">
                No room records are currently available for
                this property.
              </p>

              <button
                type="button"
                onClick={() => navigate("/rooms")}
                className="mt-4 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <DoorOpen size={18} />
                View Rooms
              </button>
            </div>
          )}
        </div>

        {/* BACK BUTTON */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 border border-gray-300 bg-white px-5 py-2.5 rounded-lg hover:bg-gray-50 transition"
          >
            <ArrowLeft size={18} />
            Back to Properties
          </button>
        </div>
      </main>
    </div>
  );
}

export default PropertyDetails;
