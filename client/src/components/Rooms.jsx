import React from "react";
import RoomCard from "./RoomCard";
import Navbar from "./Navbar";

function Rooms() {
  // ================= ROOM DATA =================

  const rooms = [
    {
      id: 101,
      roomNumber: "101",
      property: "Green View Apartments",
      floor: 1,
      rent: "₹5,000",
      tenant: "Rahul",
      status: "Occupied",
    },
    {
      id: 102,
      roomNumber: "102",
      property: "Green View Apartments",
      floor: 1,
      rent: "₹6,000",
      tenant: "Aman",
      status: "Occupied",
    },
    {
      id: 203,
      roomNumber: "203",
      property: "Shyam Residency",
      floor: 2,
      rent: "₹5,500",
      tenant: "Neha",
      status: "Due",
    },
    {
      id: 204,
      roomNumber: "204",
      property: "Shyam Residency",
      floor: 2,
      rent: "₹5,500",
      tenant: "None",
      status: "Available",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= COMMON NAVBAR ================= */}

      <Navbar />

      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            All Rooms
          </h2>

          <p className="text-gray-500 mt-1">
            View and manage rooms across your properties.
          </p>

        </div>

        {/* ================= ROOM CARDS ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
            />
          ))}

        </div>

      </main>

    </div>
  );
}

export default Rooms;