import React, { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Receipt,
  User,
  Building2,
  DoorOpen,
  IndianRupee,
  Eye,
  Search,
  X,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import Navbar from "./Navbar";

function RentBills() {
  const navigate = useNavigate();

  // =========================================================
  // RENT RECORDS
  // =========================================================

  const rentRecords = [
    {
      id: 1,
      tenant: "Rahul Sharma",
      property: "Green View Apartments",
      room: "101",
      rent: 5000,
      status: "Paid",
    },
    {
      id: 2,
      tenant: "Aman Kumar",
      property: "Green View Apartments",
      room: "102",
      rent: 6000,
      status: "Paid",
    },
    {
      id: 3,
      tenant: "Neha Sharma",
      property: "Shyam Residency",
      room: "203",
      rent: 5500,
      status: "Due",
    },
  ];

  // =========================================================
  // SEARCH & FILTER
  // =========================================================

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  // =========================================================
  // FILTER RENT RECORDS
  // =========================================================

  const filteredRentRecords = useMemo(() => {
    const searchValue = searchTerm
      .trim()
      .toLowerCase();

    return rentRecords.filter((record) => {
      const matchesSearch =
        !searchValue ||
        record.tenant
          .toLowerCase()
          .includes(searchValue) ||
        record.property
          .toLowerCase()
          .includes(searchValue) ||
        record.room
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // =========================================================
  // RENT SUMMARY
  // =========================================================

  const totalRent = rentRecords.reduce(
    (total, record) =>
      total + Number(record.rent || 0),
    0
  );

  const paidRent = rentRecords
    .filter((record) => record.status === "Paid")
    .reduce(
      (total, record) =>
        total + Number(record.rent || 0),
      0
    );

  const dueRent = rentRecords
    .filter((record) => record.status === "Due")
    .reduce(
      (total, record) =>
        total + Number(record.rent || 0),
      0
    );

  const paidCount = rentRecords.filter(
    (record) => record.status === "Paid"
  ).length;

  const dueCount = rentRecords.filter(
    (record) => record.status === "Due"
  ).length;

  // =========================================================
  // CLEAR SEARCH
  // =========================================================

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // =========================================================
  // VIEW TENANT DETAILS
  // =========================================================

  const handleViewTenant = (tenantId) => {
    navigate(`/tenant-details/${tenantId}`);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">

      {/* =====================================================
          COMMON NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* =================================================
            PAGE HEADING
        ================================================= */}

        <div className="mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Rent & Bills
          </h2>

          <p className="text-gray-500 mt-1">
            Track monthly rent collection and pending payments.
          </p>

        </div>

        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

          {/* =================================================
              TOTAL RENT
          ================================================= */}

          <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-sm text-gray-500">
                  Total Rent
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  ₹{totalRent.toLocaleString("en-IN")}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {rentRecords.length} rent records
                </p>

              </div>

              <div className="p-3 bg-blue-50 rounded-xl shrink-0">

                <IndianRupee
                  size={26}
                  className="text-blue-600"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              PAID RENT
          ================================================= */}

          <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-sm text-gray-500">
                  Paid Rent
                </p>

                <h3 className="text-2xl font-bold text-green-600 mt-1">
                  ₹{paidRent.toLocaleString("en-IN")}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {paidCount} paid{" "}
                  {paidCount === 1
                    ? "record"
                    : "records"}
                </p>

              </div>

              <div className="p-3 bg-green-50 rounded-xl shrink-0">

                <CheckCircle2
                  size={26}
                  className="text-green-600"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              DUE RENT
          ================================================= */}

          <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-sm text-gray-500">
                  Due Rent
                </p>

                <h3 className="text-2xl font-bold text-yellow-600 mt-1">
                  ₹{dueRent.toLocaleString("en-IN")}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {dueCount} due{" "}
                  {dueCount === 1
                    ? "record"
                    : "records"}
                </p>

              </div>

              <div className="p-3 bg-yellow-50 rounded-xl shrink-0">

                <Clock3
                  size={26}
                  className="text-yellow-600"
                />

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            SEARCH & FILTER
        ===================================================== */}

        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">

          <div className="flex flex-col lg:flex-row gap-3">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search tenant, property or room..."
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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

            {/* STATUS FILTER */}

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="w-full lg:w-44 px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              aria-label="Filter rent records by status"
            >

              <option value="All">
                All Status
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Due">
                Due
              </option>

            </select>

            {/* RESULT COUNT */}

            <div className="flex items-center justify-center px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 whitespace-nowrap">

              {filteredRentRecords.length}{" "}
              {filteredRentRecords.length === 1
                ? "record"
                : "records"}

            </div>

          </div>

        </div>

        {/* =====================================================
            RENT RECORDS
        ===================================================== */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          {/* SECTION HEADER */}

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

          {/* =================================================
              RECORDS
          ================================================= */}

          {filteredRentRecords.length > 0 ? (

            <div className="divide-y">

              {filteredRentRecords.map((record) => (

                <div
                  key={record.id}
                  className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 hover:bg-gray-50 transition"
                >

                  {/* =================================================
                      TENANT
                  ================================================= */}

                  <div className="flex items-center gap-4 min-w-0">

                    <div className="p-3 bg-blue-50 rounded-xl shrink-0">

                      <User
                        size={24}
                        className="text-blue-600"
                      />

                    </div>

                    <div className="min-w-0">

                      <h4 className="font-bold text-gray-800 truncate">
                        {record.tenant}
                      </h4>

                      <p className="text-sm text-gray-500">
                        Tenant ID: {record.id}
                      </p>

                    </div>

                  </div>

                  {/* =================================================
                      PROPERTY
                  ================================================= */}

                  <div className="flex items-center gap-3 text-gray-600 min-w-0">

                    <Building2
                      size={18}
                      className="shrink-0"
                    />

                    <span className="text-sm truncate">
                      {record.property}
                    </span>

                  </div>

                  {/* =================================================
                      ROOM
                  ================================================= */}

                  <div className="flex items-center gap-3 text-gray-600">

                    <DoorOpen
                      size={18}
                      className="shrink-0"
                    />

                    <span className="text-sm">
                      Room {record.room}
                    </span>

                  </div>

                  {/* =================================================
                      RENT
                  ================================================= */}

                  <div className="flex items-center gap-3">

                    <IndianRupee
                      size={18}
                      className="text-gray-500 shrink-0"
                    />

                    <span className="font-semibold text-gray-800">
                      ₹{Number(record.rent).toLocaleString("en-IN")}
                    </span>

                  </div>

                  {/* =================================================
                      STATUS
                  ================================================= */}

                  <span
                    className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${
                      record.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {record.status}
                  </span>

                  {/* =================================================
                      ACTION
                  ================================================= */}

                  <button
                    type="button"
                    onClick={() =>
                      handleViewTenant(record.id)
                    }
                    className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition shrink-0"
                  >

                    <Eye size={18} />

                    View Details

                  </button>

                </div>

              ))}

            </div>

          ) : (

            /* =================================================
               NO RESULTS
            ================================================= */

            <div className="p-10 text-center">

              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">

                <Search
                  size={28}
                  className="text-blue-600"
                />

              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                No rent records found
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                No rent record matches your current search
                or status filter.
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

      </main>

    </div>
  );
}

export default RentBills;