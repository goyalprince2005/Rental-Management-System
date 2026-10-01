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

function PropertyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // =========================================================
  // PROPERTY DATA
  // =========================================================

  const properties = [
    {
      id: 1,
      name: "Green View Apartments",
      location: "Bhopal",
      address: "Bhopal, Madhya Pradesh",
      status: "Active",
      floors: 5,
      totalRooms: 13,
      availableRooms: 3,
      occupiedRooms: 10,
      monthlyRent: 65000,
    },
    {
      id: 2,
      name: "Shyam Residency",
      location: "Bhopal",
      address: "Bhopal, Madhya Pradesh",
      status: "Active",
      floors: 2,
      totalRooms: 6,
      availableRooms: 1,
      occupiedRooms: 5,
      monthlyRent: 32000,
    },
  ];

  // =========================================================
  // SELECT PROPERTY FROM URL
  // =========================================================

  const property = useMemo(() => {
    const propertyId = Number(id);

    return (
      properties.find(
        (item) => item.id === propertyId
      ) || null
    );
  }, [id]);

  // =========================================================
  // ROOM DATA
  // =========================================================

  const roomsByProperty = {
    1: [
      {
        id: 101,
        roomNumber: "101",
        floor: 1,
        tenant: "Rahul Sharma",
        rent: "₹5,000",
        status: "Occupied",
      },
      {
        id: 102,
        roomNumber: "102",
        floor: 1,
        tenant: "Aman Kumar",
        rent: "₹6,000",
        status: "Occupied",
      },
      {
        id: 103,
        roomNumber: "103",
        floor: 1,
        tenant: "None",
        rent: "₹5,500",
        status: "Available",
      },
      {
        id: 203,
        roomNumber: "203",
        floor: 2,
        tenant: "Neha Sharma",
        rent: "₹5,500",
        status: "Occupied",
      },
    ],

    2: [
      {
        id: 201,
        roomNumber: "201",
        floor: 1,
        tenant: "None",
        rent: "₹5,000",
        status: "Available",
      },
      {
        id: 202,
        roomNumber: "202",
        floor: 1,
        tenant: "Rahul Sharma",
        rent: "₹5,500",
        status: "Occupied",
      },
      {
        id: 203,
        roomNumber: "203",
        floor: 2,
        tenant: "Aman Kumar",
        rent: "₹5,500",
        status: "Occupied",
      },
      {
        id: 204,
        roomNumber: "204",
        floor: 2,
        tenant: "Neha Sharma",
        rent: "₹5,500",
        status: "Occupied",
      },
    ],
  };

  // =========================================================
  // GET ROOMS FOR SELECTED PROPERTY
  // =========================================================

  const rooms = property
    ? roomsByProperty[property.id] || []
    : [];

  // =========================================================
  // HANDLE EDIT PROPERTY
  // =========================================================

  const handleEditProperty = () => {
    navigate("/properties");
  };

  // =========================================================
  // HANDLE BACK
  // =========================================================

  const handleBack = () => {
    navigate("/properties");
  };

  // =========================================================
  // PROPERTY NOT FOUND
  // =========================================================

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-100">

        {/* =================================================
            COMMON NAVBAR
        ================================================= */}

        <Navbar />

        {/* =================================================
            NOT FOUND CONTENT
        ================================================= */}

        <main className="p-4 md:p-6 max-w-7xl mx-auto">

          <div className="min-h-[60vh] flex items-center justify-center">

            <div className="bg-white rounded-2xl shadow-sm border p-8 text-center max-w-md w-full">

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

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100">

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

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Property Details
            </h1>

            <p className="text-gray-500 mt-1">
              View and manage property information.
            </p>

          </div>

          {/* =================================================
              EDIT PROPERTY
          ================================================= */}

          <button
            type="button"
            onClick={handleEditProperty}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            <Pencil size={18} />

            <span>
              Edit Property
            </span>
          </button>

        </div>

        {/* =================================================
            PROPERTY HEADER
        ================================================= */}

        <div className="bg-white rounded-xl shadow-sm border p-5 md:p-6 mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            {/* PROPERTY INFORMATION */}

            <div className="flex items-start gap-4">

              <div className="p-4 bg-blue-50 rounded-xl shrink-0">

                <Building2
                  size={32}
                  className="text-blue-600"
                />

              </div>

              <div className="min-w-0">

                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 break-words">
                  {property.name}
                </h2>

                <div className="flex items-center gap-2 text-gray-500 mt-2">

                  <MapPin
                    size={18}
                    className="shrink-0"
                  />

                  <span>
                    {property.location}
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {property.address}
                </p>

              </div>

            </div>

            {/* STATUS */}

            <span
              className={`w-fit px-4 py-2 rounded-full text-sm font-medium ${
                property.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {property.status}
            </span>

          </div>

        </div>

        {/* =================================================
            PROPERTY STATISTICS
        ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

          {/* FLOORS */}

          <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">

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
                  {property.floors}
                </h3>

              </div>

            </div>

          </div>

          {/* TOTAL ROOMS */}

          <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">

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
                  {property.totalRooms}
                </h3>

              </div>

            </div>

          </div>

          {/* AVAILABLE ROOMS */}

          <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">

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
                  {property.availableRooms}
                </h3>

              </div>

            </div>

          </div>

          {/* OCCUPIED ROOMS */}

          <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">

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
                  {property.occupiedRooms}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            RENT INFORMATION
        ================================================= */}

        <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">

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
                Expected monthly rental income from this
                property.
              </p>

            </div>

          </div>

          <h2 className="text-3xl font-bold text-green-600">
            ₹{property.monthlyRent.toLocaleString("en-IN")}
          </h2>

        </div>

        {/* =================================================
            ROOM LIST
        ================================================= */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          {/* SECTION HEADER */}

          <div className="p-5 border-b">

            <h3 className="text-lg font-bold text-gray-800">
              Rooms in this Property
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              View rooms and their current occupancy status.
            </p>

          </div>

          {/* ROOM LIST */}

          {rooms.length > 0 ? (

            <div className="divide-y">

              {rooms.map((room) => (

                <div
                  key={room.id}
                  className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 hover:bg-gray-50 transition"
                >

                  {/* ROOM */}

                  <div className="flex items-center gap-4">

                    <div className="p-3 bg-blue-50 rounded-xl">

                      <DoorOpen
                        size={24}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <h4 className="font-bold text-gray-800">
                        Room {room.roomNumber}
                      </h4>

                      <p className="text-sm text-gray-500">
                        Floor {room.floor}
                      </p>

                    </div>

                  </div>

                  {/* TENANT */}

                  <div className="flex items-center gap-2 text-gray-600">

                    <Users size={18} />

                    <span className="text-sm">
                      {room.tenant}
                    </span>

                  </div>

                  {/* RENT */}

                  <div className="flex items-center gap-2">

                    <IndianRupee
                      size={18}
                      className="text-gray-500"
                    />

                    <span className="font-semibold text-gray-800">
                      {room.rent}
                    </span>

                    <span className="text-xs text-gray-400">
                      / month
                    </span>

                  </div>

                  {/* STATUS */}

                  <span
                    className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${
                      room.status === "Occupied"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {room.status}
                  </span>

                  {/* VIEW ROOM */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/room-details/${room.id}`
                      )
                    }
                    className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition"
                  >
                    <Eye size={18} />

                    <span>
                      View Room
                    </span>
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

            </div>

          )}

        </div>

        {/* =================================================
            BACK BUTTON
        ================================================= */}

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