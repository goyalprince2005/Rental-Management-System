
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import {
  BarChart3,
  IndianRupee,
  Building2,
  Users,
  DoorOpen,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

import Navbar from "./Navbar";

// =========================================================
// LOCAL STORAGE KEYS
// =========================================================

const PROPERTY_STORAGE_KEY = "rentalManagementProperties";
const ROOM_STORAGE_KEY = "rentalManagementRooms";
const TENANT_STORAGE_KEY = "rentalManagementTenants";
const RENT_STORAGE_KEY = "rentalManagementRentBills";

// =========================================================
// DEFAULT DEMO DATA
// Used only when the corresponding storage key is absent.
// =========================================================

const DEFAULT_PROPERTIES = [
  {
    id: 1,
    name: "Green View Apartments",
    location: "Bhopal",
    floors: 5,
  },
  {
    id: 2,
    name: "Shyam Residency",
    location: "Bhopal",
    floors: 2,
  },
];

const DEFAULT_ROOMS = [
  {
    id: 101,
    roomNumber: "101",
    property: "Green View Apartments",
    propertyId: 1,
    floor: 1,
    rent: 5000,
    tenant: "Rahul Sharma",
    status: "Occupied",
  },
  {
    id: 102,
    roomNumber: "102",
    property: "Green View Apartments",
    propertyId: 1,
    floor: 1,
    rent: 6000,
    tenant: "Aman Kumar",
    status: "Occupied",
  },
  {
    id: 203,
    roomNumber: "203",
    property: "Shyam Residency",
    propertyId: 2,
    floor: 2,
    rent: 5500,
    tenant: "Neha Sharma",
    status: "Occupied",
  },
  {
    id: 204,
    roomNumber: "204",
    property: "Shyam Residency",
    propertyId: 2,
    floor: 2,
    rent: 5500,
    tenant: "",
    status: "Available",
  },
];

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
// READ LOCAL STORAGE SAFELY
// =========================================================

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);

    if (stored === null) {
      return fallback;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error(`Unable to read ${key}:`, error);
    return fallback;
  }
}

// =========================================================
// NORMALIZE ARRAY OR OBJECT COLLECTIONS
// =========================================================

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
// TENANT NAME HELPER
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
        ""
    ).trim();
  }

  return "";
}

// =========================================================
// CHECK WHETHER A ROOM HAS A TENANT
// =========================================================

function hasTenant(room) {
  const tenantName = getTenantName(room?.tenant);

  return (
    tenantName !== "" &&
    tenantName.toLowerCase() !== "none"
  );
}

// =========================================================
// NORMALIZE CURRENCY VALUES
// =========================================================

function getAmount(value) {
  const amount =
    typeof value === "number"
      ? value
      : Number(
          String(value ?? "").replace(/[₹,\s]/g, "")
        );

  return Number.isFinite(amount) && amount >= 0
    ? amount
    : 0;
}

// =========================================================
// GET RENT AMOUNT FROM A BILL
// Supports either rent or amount fields.
// =========================================================

function getRentAmount(record) {
  return getAmount(record?.rent ?? record?.amount);
}

// =========================================================
// NORMALIZE RENT STATUS
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

function isPending(record) {
  const status = normalizeStatus(record?.status);

  return [
    "due",
    "pending",
    "overdue",
    "unpaid",
  ].includes(status);
}

// =========================================================
// FORMAT CURRENCY
// =========================================================

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(getAmount(amount));
}

// =========================================================
// READ PROPERTIES
// =========================================================

function loadProperties() {
  const stored = readStorage(PROPERTY_STORAGE_KEY, null);

  if (stored === null) {
    return DEFAULT_PROPERTIES;
  }

  return toArray(stored).filter(
    (property) =>
      property &&
      property.id !== undefined &&
      property.id !== null
  );
}

// =========================================================
// READ ROOMS
// Do not merge demo rooms into saved room data.
// =========================================================

function loadRooms() {
  const stored = readStorage(ROOM_STORAGE_KEY, null);

  if (stored === null) {
    return DEFAULT_ROOMS;
  }

  return toArray(stored).filter(
    (room) =>
      room &&
      room.id !== undefined &&
      room.id !== null
  );
}

// =========================================================
// READ TENANTS
// =========================================================

function loadTenants() {
  const stored = readStorage(TENANT_STORAGE_KEY, null);

  if (stored === null) {
    return [];
  }

  return toArray(stored).filter(Boolean);
}

// =========================================================
// READ RENT RECORDS
// =========================================================

function loadRentRecords() {
  const stored = readStorage(RENT_STORAGE_KEY, null);

  if (stored !== null) {
    return toArray(stored).filter(Boolean);
  }

  // Demo rent figures are used only when neither saved
  // rooms nor saved rent bills exist.
  const savedRooms = readStorage(ROOM_STORAGE_KEY, null);

  if (savedRooms === null) {
    return DEFAULT_RENT_RECORDS;
  }

  // Never invent collected rent for saved room data.
  return [];
}

// =========================================================
// REPORTS COMPONENT
// =========================================================

function Reports() {
  // -------------------------------------------------------
  // LOAD DATA
  // -------------------------------------------------------

  const properties = useMemo(() => loadProperties(), []);
  const rooms = useMemo(() => loadRooms(), []);
  const tenants = useMemo(() => loadTenants(), []);
  const rentRecords = useMemo(() => loadRentRecords(), []);

  // -------------------------------------------------------
  // CALCULATE REPORT STATISTICS
  // -------------------------------------------------------

  const reportData = useMemo(() => {
    const totalProperties = properties.length;
    const totalRooms = rooms.length;

    // Determine occupancy from tenant assignment.
    const occupiedRooms = rooms.filter(hasTenant).length;

    const vacantRooms = Math.max(
      0,
      totalRooms - occupiedRooms
    );

    // Prefer saved tenant records when available.
    // Otherwise, count distinct tenants assigned to rooms.
    const distinctRoomTenants = new Set(
      rooms
        .filter(hasTenant)
        .map((room) =>
          getTenantName(room.tenant).toLowerCase()
        )
    );

    const totalTenants =
      tenants.length > 0
        ? tenants.length
        : distinctRoomTenants.size;

    // Expected rent only includes rooms with assigned tenants.
    const monthlyRent = rooms
      .filter(hasTenant)
      .reduce(
        (total, room) => total + getAmount(room.rent),
        0
      );

    // Only bills explicitly marked Paid count as collected.
    const collectedRent = rentRecords
      .filter(isPaid)
      .reduce(
        (total, record) => total + getRentAmount(record),
        0
      );

    // Include common unpaid statuses in pending rent.
    const pendingRent = rentRecords
      .filter(isPending)
      .reduce(
        (total, record) => total + getRentAmount(record),
        0
      );

    return {
      totalProperties,
      totalRooms,
      occupiedRooms,
      vacantRooms,
      totalTenants,
      monthlyRent,
      collectedRent,
      pendingRent,
    };
  }, [properties, rooms, tenants, rentRecords]);

  // -------------------------------------------------------
  // CALCULATED PERCENTAGES
  // -------------------------------------------------------

  const occupancyRate =
    reportData.totalRooms > 0
      ? Math.round(
          (reportData.occupiedRooms /
            reportData.totalRooms) *
            100
        )
      : 0;

  const collectionRate =
    reportData.monthlyRent > 0
      ? Math.min(
          100,
          Math.round(
            (reportData.collectedRent /
              reportData.monthlyRent) *
              100
          )
        )
      : 0;

  // -------------------------------------------------------
  // QUICK ACCESS LINKS
  // -------------------------------------------------------

  const quickLinks = [
    {
      title: "Manage Properties",
      description: "View and update your properties.",
      path: "/properties",
      icon: Building2,
      color: "blue",
    },
    {
      title: "Manage Rooms",
      description: "Review room occupancy and availability.",
      path: "/rooms",
      icon: DoorOpen,
      color: "purple",
    },
    {
      title: "Manage Tenants",
      description: "View tenant details and rental information.",
      path: "/tenants",
      icon: Users,
      color: "green",
    },
    {
      title: "Rent & Bills",
      description: "Review collected and pending rent.",
      path: "/rent-bills",
      icon: IndianRupee,
      color: "yellow",
    },
  ];

  const colorStyles = {
    blue: {
      icon: "bg-blue-50 text-blue-600",
      arrow: "text-blue-600",
    },
    purple: {
      icon: "bg-purple-50 text-purple-600",
      arrow: "text-purple-600",
    },
    green: {
      icon: "bg-green-50 text-green-600",
      arrow: "text-green-600",
    },
    yellow: {
      icon: "bg-yellow-50 text-yellow-700",
      arrow: "text-yellow-700",
    },
  };

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {/* PAGE HEADING */}

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-50 rounded-xl">
              <BarChart3
                size={26}
                className="text-blue-600"
              />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Rental Reports
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                Overview of properties, occupancy, tenants,
                and rent collection.
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-3">
            Figures are calculated from saved property, room,
            tenant, and rent records.
          </p>
        </div>

        {/* STATISTICS CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {/* PROPERTIES */}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Building2
                  size={25}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Properties
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {reportData.totalProperties}
                </h3>
              </div>
            </div>

            <Link
              to="/properties"
              className="mt-4 flex items-center justify-between text-sm text-blue-600 hover:text-blue-800"
            >
              View properties
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* TOTAL ROOMS */}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-50 rounded-xl">
                <DoorOpen
                  size={25}
                  className="text-purple-600"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Total Rooms
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {reportData.totalRooms}
                </h3>
              </div>
            </div>

            <Link
              to="/rooms"
              className="mt-4 flex items-center justify-between text-sm text-purple-600 hover:text-purple-800"
            >
              View rooms
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* TENANTS */}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-xl">
                <Users
                  size={25}
                  className="text-green-600"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Tenants
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {reportData.totalTenants}
                </h3>
              </div>
            </div>

            <Link
              to="/tenants"
              className="mt-4 flex items-center justify-between text-sm text-green-600 hover:text-green-800"
            >
              View tenants
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* OCCUPANCY */}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-50 rounded-xl">
                <TrendingUp
                  size={25}
                  className="text-yellow-600"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Occupancy Rate
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {occupancyRate}%
                </h3>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              {reportData.occupiedRooms} occupied ·{" "}
              {reportData.vacantRooms} vacant
            </p>
          </div>
        </div>

        {/* RENT COLLECTION REPORT */}

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">
              Rent Collection Report
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Expected rent compared with recorded rent collection.
            </p>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* EXPECTED RENT */}

              <div className="bg-blue-50 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <IndianRupee
                      size={22}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">
                      Expected Rent
                    </p>

                    <h3 className="text-2xl font-bold text-gray-800">
                      {formatCurrency(reportData.monthlyRent)}
                    </h3>
                  </div>
                </div>
              </div>

              {/* COLLECTED RENT */}

              <div className="bg-green-50 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <CheckCircle2
                      size={22}
                      className="text-green-600"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">
                      Collected Rent
                    </p>

                    <h3 className="text-2xl font-bold text-green-700">
                      {formatCurrency(reportData.collectedRent)}
                    </h3>
                  </div>
                </div>
              </div>

              {/* PENDING RENT */}

              <div className="bg-yellow-50 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Clock
                      size={22}
                      className="text-yellow-700"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">
                      Pending Rent
                    </p>

                    <h3 className="text-2xl font-bold text-yellow-700">
                      {formatCurrency(reportData.pendingRent)}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* COLLECTION PROGRESS */}

            <div className="mt-7">
              <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Collection Progress
                  </h3>

                  <p className="text-sm text-gray-500">
                    Percentage of expected rent recorded as paid.
                  </p>
                </div>

                <span className="text-lg font-bold text-green-700">
                  {collectionRate}%
                </span>
              </div>

              <div
                className="w-full bg-gray-200 rounded-full h-3 overflow-hidden"
                role="progressbar"
                aria-label="Rent collection progress"
                aria-valuenow={collectionRate}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${collectionRate}%` }}
                />
              </div>

              <div className="flex justify-between gap-3 text-xs text-gray-500 mt-2">
                <span>
                  Collected:{" "}
                  {formatCurrency(reportData.collectedRent)}
                </span>

                <span>
                  Pending:{" "}
                  {formatCurrency(reportData.pendingRent)}
                </span>
              </div>

              {rentRecords.length === 0 && (
                <p className="text-xs text-gray-400 mt-3">
                  No saved rent bills were found. Collection
                  figures will update when rent records are available.
                </p>
              )}

              {reportData.monthlyRent === 0 &&
                reportData.totalRooms > 0 && (
                  <p className="text-xs text-gray-400 mt-2">
                    No expected rent was found for occupied rooms.
                    Check the room assignments and rent amounts.
                  </p>
                )}

              <Link
                to="/rent-bills"
                className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View rent and bills
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        {/* ROOM OCCUPANCY REPORT */}

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 rounded-xl">
              <BarChart3
                size={24}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Room Occupancy
              </h2>

              <p className="text-sm text-gray-500">
                Occupied and vacant room breakdown.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <p className="text-sm text-gray-600">
                Occupied Rooms
              </p>

              <p className="text-2xl font-bold text-green-700 mt-1">
                {reportData.occupiedRooms}
              </p>
            </div>

            <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
              <p className="text-sm text-gray-600">
                Vacant Rooms
              </p>

              <p className="text-2xl font-bold text-orange-700 mt-1">
                {reportData.vacantRooms}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center gap-3 mb-2">
            <span className="text-sm text-gray-600">
              Occupancy percentage
            </span>

            <span className="text-sm font-semibold text-gray-800">
              {occupancyRate}%
            </span>
          </div>

          <div
            className="w-full bg-gray-200 rounded-full h-3 overflow-hidden"
            role="progressbar"
            aria-label="Room occupancy"
            aria-valuenow={occupancyRate}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {reportData.occupiedRooms} of {reportData.totalRooms}{" "}
            rooms have assigned tenants.
          </p>

          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View room details
            <ArrowRight size={17} />
          </Link>
        </section>

        {/* QUICK NAVIGATION */}

        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Quick Access
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              const styles = colorStyles[item.color];

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md hover:border-gray-200 transition-all group"
                >
                  <div
                    className={`p-3 rounded-xl ${styles.icon}`}
                  >
                    <Icon size={23} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </p>
                  </div>

                  <ArrowRight
                    size={19}
                    className={`${styles.arrow} group-hover:translate-x-1 transition-transform`}
                  />
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Reports;
