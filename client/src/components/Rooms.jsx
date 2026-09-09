import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { Plus, X } from "lucide-react";

import RoomCard from "./RoomCard";
import Navbar from "./Navbar";

function Rooms() {
  // =========================================================
  // ROOM DATA
  // =========================================================

  const [rooms, setRooms] = useState([
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
  ]);

  // =========================================================
  // MODAL STATE
  // =========================================================

  const [showAddRoom, setShowAddRoom] = useState(false);

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    roomNumber: "",
    property: "",
    floor: "",
    rent: "",
    status: "Available",
  });

  const [error, setError] = useState("");

  // =========================================================
  // SCROLL POSITION
  // =========================================================

  const scrollPositionRef = useRef(0);

  // =========================================================
  // LOCK BACKGROUND SCROLL WHEN MODAL IS OPEN
  // =========================================================

  useEffect(() => {
    if (showAddRoom) {
      scrollPositionRef.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top =
        `-${scrollPositionRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehavior = "none";
    } else {
      const savedScrollPosition =
        scrollPositionRef.current;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";

      window.scrollTo(0, savedScrollPosition);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
    };
  }, [showAddRoom]);

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // =========================================================
  // OPEN ADD ROOM MODAL
  // =========================================================

  const handleOpenAddRoom = () => {
    setFormData({
      roomNumber: "",
      property: "",
      floor: "",
      rent: "",
      status: "Available",
    });

    setError("");
    setShowAddRoom(true);
  };

  // =========================================================
  // CLOSE ADD ROOM MODAL
  // =========================================================

  const handleCloseAddRoom = () => {
    setShowAddRoom(false);
    setError("");
  };

  // =========================================================
  // ADD ROOM
  // =========================================================

  const handleAddRoom = (event) => {
    event.preventDefault();

    // ---------------- VALIDATION ----------------

    if (
      !formData.roomNumber.trim() ||
      !formData.property.trim() ||
      !formData.floor ||
      !formData.rent
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // ---------------- DUPLICATE CHECK ----------------

    const roomAlreadyExists = rooms.some(
      (room) =>
        room.roomNumber === formData.roomNumber.trim() &&
        room.property.toLowerCase() ===
          formData.property.trim().toLowerCase()
    );

    if (roomAlreadyExists) {
      setError(
        "This room already exists in the selected property."
      );
      return;
    }

    // ---------------- CREATE NEW ROOM ----------------

    const newRoom = {
      id: Date.now(),
      roomNumber: formData.roomNumber.trim(),
      property: formData.property.trim(),
      floor: Number(formData.floor),
      rent: `₹${Number(formData.rent).toLocaleString(
        "en-IN"
      )}`,
      tenant: "None",
      status: formData.status,
    };

    // ---------------- UPDATE ROOM LIST ----------------

    setRooms((previousRooms) => [
      ...previousRooms,
      newRoom,
    ]);

    // ---------------- CLOSE MODAL ----------------

    setShowAddRoom(false);

    setFormData({
      roomNumber: "",
      property: "",
      floor: "",
      rent: "",
      status: "Available",
    });

    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">

      {/* ===================================================== */}
      {/* COMMON NAVBAR */}
      {/* ===================================================== */}

      <Navbar />

      {/* ===================================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* ================================================= */}
        {/* PAGE HEADING */}
        {/* ================================================= */}

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              All Rooms
            </h2>

            <p className="text-gray-500 mt-1">
              View and manage rooms across your properties.
            </p>
          </div>

          {/* ================================================= */}
          {/* ADD ROOM BUTTON */}
          {/* ================================================= */}

          <button
            onClick={handleOpenAddRoom}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm shrink-0"
          >
            <Plus size={19} />

            <span>
              Add Room
            </span>
          </button>

        </div>

        {/* ===================================================== */}
        {/* ROOM CARDS */}
        {/* ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
            />
          ))}

        </div>

      </main>

      {/* ===================================================== */}
      {/* ADD ROOM MODAL */}
      {/* ===================================================== */}

      {showAddRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">

            {/* ================================================= */}
            {/* MODAL HEADER */}
            {/* ================================================= */}

            <div className="flex items-center justify-between px-5 py-4 border-b">

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Add New Room
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Add a room to one of your properties.
                </p>
              </div>

              <button
                onClick={handleCloseAddRoom}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Close add room form"
              >
                <X
                  size={22}
                  className="text-gray-600"
                />
              </button>

            </div>

            {/* ================================================= */}
            {/* SCROLLABLE FORM CONTENT */}
            {/* ================================================= */}

            <div className="max-h-[calc(90vh-85px)] overflow-y-auto">

              <form
                onSubmit={handleAddRoom}
                className="p-5 space-y-4"
              >

                {/* ROOM NUMBER */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Number
                  </label>

                  <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    placeholder="e.g. 205"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* PROPERTY */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property
                  </label>

                  <select
                    name="property"
                    value={formData.property}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">
                      Select Property
                    </option>

                    <option value="Green View Apartments">
                      Green View Apartments
                    </option>

                    <option value="Shyam Residency">
                      Shyam Residency
                    </option>
                  </select>
                </div>

                {/* FLOOR */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floor
                  </label>

                  <input
                    type="number"
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    min="0"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* MONTHLY RENT */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Rent
                  </label>

                  <input
                    type="number"
                    name="rent"
                    value={formData.rent}
                    onChange={handleChange}
                    placeholder="e.g. 5500"
                    min="0"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* STATUS */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Available">
                      Available
                    </option>

                    <option value="Occupied">
                      Occupied
                    </option>

                    <option value="Due">
                      Due
                    </option>
                  </select>
                </div>

                {/* ERROR */}

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                {/* ================================================= */}
                {/* FORM BUTTONS */}
                {/* ================================================= */}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">

                  <button
                    type="button"
                    onClick={handleCloseAddRoom}
                    className="w-full sm:w-1/2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-1/2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Add Room
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Rooms;