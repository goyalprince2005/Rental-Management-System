import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, CheckCircle2 } from "lucide-react";
import Navbar from "./Navbar";

function EditRoom() {
  const navigate = useNavigate();
  const { id } = useParams();

  // =========================================================
  // EXISTING ROOM DATA
  // =========================================================

  const rooms = {
    101: {
      roomNumber: "101",
      property: "Green View Apartments",
      location: "Bhopal",
      floor: "1",
      rent: "5000",
      tenant: "Rahul Sharma",
      status: "Occupied",
    },

    102: {
      roomNumber: "102",
      property: "Green View Apartments",
      location: "Bhopal",
      floor: "1",
      rent: "6000",
      tenant: "Aman Kumar",
      status: "Occupied",
    },

    203: {
      roomNumber: "203",
      property: "Shyam Residency",
      location: "Bhopal",
      floor: "2",
      rent: "5500",
      tenant: "Neha Sharma",
      status: "Due",
    },

    204: {
      roomNumber: "204",
      property: "Shyam Residency",
      location: "Bhopal",
      floor: "2",
      rent: "5500",
      tenant: "",
      status: "Available",
    },
  };

  // =========================================================
  // GET CURRENT ROOM
  // =========================================================

  const existingRoom = rooms[id];

  // =========================================================
  // ROOM FORM STATE
  // =========================================================

  const [roomData, setRoomData] = useState(
    existingRoom || {
      roomNumber: id || "",
      property: "",
      location: "",
      floor: "",
      rent: "",
      tenant: "",
      status: "Available",
    }
  );

  // =========================================================
  // ERROR & SUCCESS STATE
  // =========================================================

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRoomData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear previous messages when user edits the form
    setError("");
    setSuccess("");
  };

  // =========================================================
  // HANDLE SAVE
  // =========================================================

  const handleSave = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ---------------------------------------------------------
    // ROOM NUMBER VALIDATION
    // ---------------------------------------------------------

    if (!roomData.roomNumber.trim()) {
      setError("Please enter room number.");
      return;
    }

    // ---------------------------------------------------------
    // FLOOR VALIDATION
    // ---------------------------------------------------------

    if (!roomData.floor) {
      setError("Please enter floor number.");
      return;
    }

    if (Number(roomData.floor) < 0) {
      setError("Floor number cannot be negative.");
      return;
    }

    // ---------------------------------------------------------
    // RENT VALIDATION
    // ---------------------------------------------------------

    if (!roomData.rent || Number(roomData.rent) <= 0) {
      setError("Please enter a valid monthly rent.");
      return;
    }

    // ---------------------------------------------------------
    // TENANT VALIDATION
    // ---------------------------------------------------------

    if (
      roomData.status === "Occupied" &&
      !roomData.tenant.trim()
    ) {
      setError("Please enter tenant name for an occupied room.");
      return;
    }

    // ---------------------------------------------------------
    // AVAILABLE ROOM SHOULD NOT HAVE TENANT
    // ---------------------------------------------------------

    if (
      roomData.status === "Available" &&
      roomData.tenant.trim()
    ) {
      setError(
        "An available room cannot have an assigned tenant."
      );
      return;
    }

    // ---------------------------------------------------------
    // UPDATED ROOM OBJECT
    // ---------------------------------------------------------

    const updatedRoomData = {
      ...roomData,
      roomNumber: roomData.roomNumber.trim(),
      tenant: roomData.tenant.trim(),
      floor: Number(roomData.floor),
      rent: Number(roomData.rent),
    };

    // ---------------------------------------------------------
    // TEMPORARY FRONTEND SAVE
    // ---------------------------------------------------------

    console.log("Updated Room Data:", updatedRoomData);

    setSuccess("Room details updated successfully.");

    // ---------------------------------------------------------
    // NAVIGATE AFTER SHORT DELAY
    // ---------------------------------------------------------

    setTimeout(() => {
      navigate(`/room-details/${id}`);
    }, 800);
  };

  // =========================================================
  // HANDLE CANCEL
  // =========================================================

  const handleCancel = () => {
    navigate(`/room-details/${id}`);
  };

  // =========================================================
  // ROOM NOT FOUND
  // =========================================================

  if (!existingRoom) {
    return (
      <div className="h-screen bg-gray-100 overflow-hidden">

        {/* =================================================== */}
        {/* NAVBAR */}
        {/* =================================================== */}

        <Navbar />

        {/* =================================================== */}
        {/* CONTENT */}
        {/* =================================================== */}

        <div className="h-[calc(100vh-64px)] overflow-y-auto">

          <main className="p-4 md:p-6 max-w-3xl mx-auto">

            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">

              <AlertCircle
                size={42}
                className="mx-auto text-red-500 mb-4"
              />

              <h1 className="text-xl font-bold text-gray-800">
                Room Not Found
              </h1>

              <p className="text-gray-500 mt-2">
                The room with ID {id} does not exist.
              </p>

              <button
                onClick={() => navigate("/rooms")}
                className="mt-5 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                <ArrowLeft size={18} />
                Back to Rooms
              </button>

            </div>

          </main>

        </div>

      </div>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">

      {/* ===================================================== */}
      {/* NAVBAR */}
      {/* ===================================================== */}

      <Navbar />

      {/* ===================================================== */}
      {/* SCROLLABLE CONTENT AREA */}
      {/* ===================================================== */}

      <div className="h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden">

        <main className="p-4 md:p-6 max-w-3xl mx-auto">

          {/* ================================================= */}
          {/* PAGE HEADING */}
          {/* ================================================= */}

          <div className="mb-6">

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Edit Room {id}
            </h1>

            <p className="text-gray-500 mt-1">
              Update the information of this room.
            </p>

          </div>

          {/* ================================================= */}
          {/* FORM CARD */}
          {/* ================================================= */}

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

            {/* ================================================= */}
            {/* CARD HEADER */}
            {/* ================================================= */}

            <div className="p-5 border-b">

              <h2 className="text-lg font-bold text-gray-800">
                Room Information
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Update room details and tenant information.
              </p>

            </div>

            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <form
              onSubmit={handleSave}
              className="p-5 space-y-5"
            >

              {/* ================================================= */}
              {/* ERROR MESSAGE */}
              {/* ================================================= */}

              {error && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">

                  <AlertCircle
                    size={20}
                    className="mt-0.5 flex-shrink-0"
                  />

                  <p className="text-sm font-medium">
                    {error}
                  </p>

                </div>
              )}

              {/* ================================================= */}
              {/* SUCCESS MESSAGE */}
              {/* ================================================= */}

              {success && (
                <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-lg p-4">

                  <CheckCircle2
                    size={20}
                    className="mt-0.5 flex-shrink-0"
                  />

                  <p className="text-sm font-medium">
                    {success}
                  </p>

                </div>
              )}

              {/* ================================================= */}
              {/* ROOM NUMBER */}
              {/* ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Number
                </label>

                <input
                  type="text"
                  name="roomNumber"
                  value={roomData.roomNumber}
                  onChange={handleChange}
                  placeholder="Enter room number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>

              {/* ================================================= */}
              {/* PROPERTY */}
              {/* ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property
                </label>

                <input
                  type="text"
                  name="property"
                  value={roomData.property}
                  onChange={handleChange}
                  placeholder="Enter property name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>

              {/* ================================================= */}
              {/* LOCATION */}
              {/* ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={roomData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>

              {/* ================================================= */}
              {/* FLOOR */}
              {/* ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Floor
                </label>

                <input
                  type="number"
                  name="floor"
                  value={roomData.floor}
                  onChange={handleChange}
                  placeholder="Enter floor number"
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>

              {/* ================================================= */}
              {/* MONTHLY RENT */}
              {/* ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Rent
                </label>

                <input
                  type="number"
                  name="rent"
                  value={roomData.rent}
                  onChange={handleChange}
                  placeholder="Enter monthly rent"
                  min="1"
                  inputMode="numeric"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>

              {/* ================================================= */}
              {/* TENANT */}
              {/* ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenant
                </label>

                <input
                  type="text"
                  name="tenant"
                  value={roomData.tenant}
                  onChange={handleChange}
                  placeholder="Enter tenant name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Required when the room status is Occupied.
                </p>

              </div>

              {/* ================================================= */}
              {/* STATUS */}
              {/* ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={roomData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >

                  <option value="Occupied">
                    Occupied
                  </option>

                  <option value="Available">
                    Available
                  </option>

                  <option value="Due">
                    Due
                  </option>

                </select>

              </div>

              {/* ================================================= */}
              {/* BUTTONS */}
              {/* ================================================= */}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">

                {/* ================================================= */}
                {/* CANCEL */}
                {/* ================================================= */}

                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition"
                >

                  <ArrowLeft size={18} />

                  Cancel

                </button>

                {/* ================================================= */}
                {/* SAVE */}
                {/* ================================================= */}

                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
                >

                  <Save size={18} />

                  Save Changes

                </button>

              </div>

            </form>

          </div>

          {/* ================================================= */}
          {/* BOTTOM SPACING */}
          {/* ================================================= */}

          <div className="h-8" />

        </main>

      </div>

    </div>
  );
}

export default EditRoom;