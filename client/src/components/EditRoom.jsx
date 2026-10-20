import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Navbar from "./Navbar";

function EditRoom() {
  const navigate = useNavigate();
  const { id } = useParams();

  // =========================================================
  // DEFAULT ROOM DATA
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

  const existingRoom = rooms[id];

  // =========================================================
  // LOAD SAVED DATA OR USE DEFAULT DATA
  // =========================================================

  const [roomData, setRoomData] = useState(() => {
    let savedRooms = {};

    try {
      savedRooms =
        JSON.parse(
          localStorage.getItem("rentalManagementRooms") || "{}"
        ) || {};
    } catch (error) {
      console.error("Unable to load saved rooms:", error);
    }

    const defaultRoom = existingRoom || {
      roomNumber: id || "",
      property: "",
      location: "",
      floor: "",
      rent: "",
      tenant: "",
      status: "Available",
    };

    const savedRoom = savedRooms[id] || {};

    return {
      ...defaultRoom,
      ...savedRoom,
      floor: String(savedRoom.floor ?? defaultRoom.floor ?? ""),
      rent: String(savedRoom.rent ?? defaultRoom.rent ?? ""),
    };
  });

  // =========================================================
  // ERROR, SUCCESS AND SAVING STATES
  // =========================================================

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRoomData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // =========================================================
  // HANDLE SAVE
  // =========================================================

  const handleSave = (e) => {
    e.preventDefault();

    if (isSaving) return;

    setError("");
    setSuccess("");

    // Room number validation
    if (!roomData.roomNumber.trim()) {
      setError("Please enter room number.");
      return;
    }

    // Property validation
    if (!roomData.property.trim()) {
      setError("Please enter property name.");
      return;
    }

    // Location validation
    if (!roomData.location.trim()) {
      setError("Please enter location.");
      return;
    }

    // Floor validation
    if (
      roomData.floor === "" ||
      !Number.isFinite(Number(roomData.floor)) ||
      Number(roomData.floor) < 0
    ) {
      setError("Please enter a valid floor number.");
      return;
    }

    // Rent validation
    if (
      roomData.rent === "" ||
      !Number.isFinite(Number(roomData.rent)) ||
      Number(roomData.rent) <= 0
    ) {
      setError("Please enter a valid monthly rent.");
      return;
    }

    // Tenant validation
    if (
      roomData.status === "Occupied" &&
      !roomData.tenant.trim()
    ) {
      setError("Please enter tenant name for an occupied room.");
      return;
    }

    // Available room should not have a tenant
    if (
      roomData.status === "Available" &&
      roomData.tenant.trim()
    ) {
      setError(
        "An available room cannot have an assigned tenant."
      );
      return;
    }

    // =======================================================
    // PREPARE UPDATED ROOM DATA
    // =======================================================

    const updatedRoomData = {
      ...roomData,
      roomNumber: roomData.roomNumber.trim(),
      property: roomData.property.trim(),
      location: roomData.location.trim(),
      floor: Number(roomData.floor),
      rent: Number(roomData.rent),
      tenant: roomData.tenant.trim(),
      status: roomData.status,
    };

    // =======================================================
    // SAVE TO LOCAL STORAGE
    // =======================================================

    try {
      const savedRooms =
        JSON.parse(
          localStorage.getItem("rentalManagementRooms") || "{}"
        ) || {};

      const updatedRooms = {
        ...savedRooms,
        [id]: updatedRoomData,
      };

      localStorage.setItem(
        "rentalManagementRooms",
        JSON.stringify(updatedRooms)
      );

      // Verify the saved data
      const verification = JSON.parse(
        localStorage.getItem("rentalManagementRooms") || "{}"
      );

      if (
        !verification[id] ||
        Number(verification[id].rent) !== updatedRoomData.rent
      ) {
        throw new Error("Unable to verify saved room data.");
      }

      console.log("Updated Room Data:", updatedRoomData);
      console.log("All Saved Rooms:", verification);

      setRoomData({
        ...updatedRoomData,
        floor: String(updatedRoomData.floor),
        rent: String(updatedRoomData.rent),
      });

      setSuccess("Room details updated successfully.");
      setIsSaving(true);

      // Navigate only after the save succeeds
      setTimeout(() => {
        navigate(`/room-details/${id}`);
      }, 800);
    } catch (saveError) {
      console.error("Unable to save room data:", saveError);
      setError("Unable to save room details. Please try again.");
      setIsSaving(false);
    }
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
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <main className="p-4 md:p-6 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
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
              type="button"
              onClick={() => navigate("/rooms")}
              className="mt-5 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <ArrowLeft size={18} />
              Back to Rooms
            </button>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* SCROLLABLE CONTENT */}
      <div className="h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden">
        <main className="p-4 md:p-6 max-w-3xl mx-auto">
          {/* PAGE HEADING */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Edit Room {id}
            </h1>

            <p className="text-gray-500 mt-1">
              Update the information of this room.
            </p>
          </div>

          {/* FORM CARD */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* CARD HEADER */}
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">
                Room Information
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Update room details and tenant information.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSave} className="p-5 space-y-5">
              {/* ERROR MESSAGE */}
              {error && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
                  <AlertCircle
                    size={20}
                    className="mt-0.5 flex-shrink-0"
                  />

                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {/* SUCCESS MESSAGE */}
              {success && (
                <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-lg p-4">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 flex-shrink-0"
                  />

                  <p className="text-sm font-medium">{success}</p>
                </div>
              )}

              {/* ROOM NUMBER */}
              <div>
                <label
                  htmlFor="roomNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Room Number
                </label>

                <input
                  id="roomNumber"
                  type="text"
                  name="roomNumber"
                  value={roomData.roomNumber}
                  onChange={handleChange}
                  placeholder="Enter room number"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* PROPERTY */}
              <div>
                <label
                  htmlFor="property"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Property
                </label>

                <input
                  id="property"
                  type="text"
                  name="property"
                  value={roomData.property}
                  onChange={handleChange}
                  placeholder="Enter property name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* LOCATION */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Location
                </label>

                <input
                  id="location"
                  type="text"
                  name="location"
                  value={roomData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* FLOOR */}
              <div>
                <label
                  htmlFor="floor"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Floor
                </label>

                <input
                  id="floor"
                  type="number"
                  name="floor"
                  value={roomData.floor}
                  onChange={handleChange}
                  placeholder="Enter floor number"
                  min="0"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* MONTHLY RENT */}
              <div>
                <label
                  htmlFor="rent"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Monthly Rent
                </label>

                <input
                  id="rent"
                  type="number"
                  name="rent"
                  value={roomData.rent}
                  onChange={handleChange}
                  placeholder="Enter monthly rent"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* TENANT */}
              <div>
                <label
                  htmlFor="tenant"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tenant
                </label>

                <input
                  id="tenant"
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

              {/* STATUS */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={roomData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Occupied">Occupied</option>
                  <option value="Available">Available</option>
                  <option value="Due">Due</option>
                </select>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {/* CANCEL */}
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                >
                  <ArrowLeft size={18} />
                  Cancel
                </button>

                {/* SAVE */}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
                >
                  <Save size={18} />
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>

          <div className="h-8" />
        </main>
      </div>
    </div>
  );
}

export default EditRoom;