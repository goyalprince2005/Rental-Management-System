import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Navbar from "./Navbar";

function EditRoom() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [roomData, setRoomData] = useState({
    roomNumber: id,
    floor: "",
    rent: "",
    tenant: "",
    status: "Occupied",
  });

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRoomData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // HANDLE SAVE
  // =========================================================

  const handleSave = (e) => {
    e.preventDefault();

    if (!roomData.roomNumber.trim()) {
      alert("Please enter room number.");
      return;
    }

    if (!roomData.floor) {
      alert("Please enter floor number.");
      return;
    }

    if (!roomData.rent || Number(roomData.rent) <= 0) {
      alert("Please enter a valid monthly rent.");
      return;
    }

    if (
      roomData.status === "Occupied" &&
      !roomData.tenant.trim()
    ) {
      alert("Please enter tenant name for an occupied room.");
      return;
    }

    console.log("Updated Room Data:", roomData);

    alert("Room details updated successfully.");

    navigate(`/room-details/${id}`);
  };

  // =========================================================
  // HANDLE CANCEL
  // =========================================================

  const handleCancel = () => {
    navigate(`/room-details/${id}`);
  };

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

                {/* CANCEL */}

                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition"
                >

                  <ArrowLeft size={18} />

                  Cancel

                </button>

                {/* SAVE */}

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

          {/* Extra bottom spacing so last button can scroll comfortably */}

          <div className="h-8" />

        </main>

      </div>

    </div>
  );
}

export default EditRoom;