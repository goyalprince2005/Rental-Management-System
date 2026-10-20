import React, { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import RoomCard from "./RoomCard";
import Navbar from "./Navbar";

const STORAGE_KEY = "rentalManagementRooms";

// Default room data shown when no saved changes exist.
const defaultRooms = [
  {
    id: 101,
    roomNumber: "101",
    property: "Green View Apartments",
    location: "Bhopal",
    floor: 1,
    rent: 5000,
    tenant: "Rahul",
    status: "Occupied",
  },
  {
    id: 102,
    roomNumber: "102",
    property: "Green View Apartments",
    location: "Bhopal",
    floor: 1,
    rent: 6000,
    tenant: "Aman",
    status: "Occupied",
  },
  {
    id: 203,
    roomNumber: "203",
    property: "Shyam Residency",
    location: "Bhopal",
    floor: 2,
    rent: 5500,
    tenant: "Neha",
    status: "Due",
  },
  {
    id: 204,
    roomNumber: "204",
    property: "Shyam Residency",
    location: "Bhopal",
    floor: 2,
    rent: 5500,
    tenant: "",
    status: "Available",
  },
];

// Convert numeric or formatted rent into a number.
const parseRent = (rent) => {
  if (typeof rent === "number") {
    return Number.isFinite(rent) ? rent : 0;
  }

  const parsed = Number(
    String(rent ?? "").replace(/[₹,\s]/g, "")
  );

  return Number.isFinite(parsed) ? parsed : 0;
};

// Format rent for display on a room card.
const formatRent = (rent) =>
  `₹${parseRent(rent).toLocaleString("en-IN")}`;

// Read saved room records safely from localStorage.
const readSavedRooms = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

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
    console.error("Unable to read saved rooms:", error);
    return {};
  }
};

// Combine default rooms with saved changes.
// Saved values take priority over default values.
const loadRooms = () => {
  const savedRooms = readSavedRooms();

  const defaultRoomIds = new Set(
    defaultRooms.map((room) => String(room.id))
  );

  const mergedDefaultRooms = defaultRooms.map((room) => {
    const savedRoom = savedRooms[String(room.id)];

    if (!savedRoom || typeof savedRoom !== "object") {
      return {
        ...room,
        rent: formatRent(room.rent),
      };
    }

    return {
      ...room,
      ...savedRoom,
      id: room.id,
      rent: formatRent(
        savedRoom.rent ?? room.rent
      ),
    };
  });

  // Include rooms added after the original four defaults.
  const additionalRooms = Object.entries(savedRooms)
    .filter(([id, room]) => {
      return (
        !defaultRoomIds.has(String(id)) &&
        room &&
        typeof room === "object"
      );
    })
    .map(([id, room]) => ({
      ...room,
      id: room.id ?? Number(id),
      rent: formatRent(room.rent),
    }));

  return [...mergedDefaultRooms, ...additionalRooms];
};

// Convert display data into a consistent localStorage record.
const createStoredRoom = (room) => ({
  ...room,
  rent: parseRent(room.rent),
  floor: Number(room.floor),
  tenant:
    room.tenant === "None"
      ? ""
      : room.tenant ?? "",
});

function Rooms() {
  // =========================================================
  // ROOM DATA
  // Load saved room details when this page opens.
  // =========================================================

  const [rooms, setRooms] = useState(() => loadRooms());

  // =========================================================
  // ADD ROOM MODAL STATE
  // =========================================================

  const [showAddRoom, setShowAddRoom] = useState(false);

  // =========================================================
  // FORM DATA
  // =========================================================

  const [formData, setFormData] = useState({
    roomNumber: "",
    property: "",
    floor: "",
    rent: "",
    status: "Available",
  });

  // =========================================================
  // FORM ERROR
  // =========================================================

  const [error, setError] = useState("");

  // =========================================================
  // SCROLL POSITION
  // =========================================================

  const scrollPositionRef = useRef(0);

  // =========================================================
  // LOCK BACKGROUND SCROLL WHILE MODAL IS OPEN
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
      document.documentElement.style.overscrollBehavior =
        "none";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";

      window.scrollTo(0, scrollPositionRef.current);
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
  // HANDLE FORM INPUT
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
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    setFormData({
      roomNumber: "",
      property: "",
      floor: "",
      rent: "",
      status: "Available",
    });

    setError("");
  };

  // =========================================================
  // OPEN ADD ROOM MODAL
  // =========================================================

  const handleOpenAddRoom = () => {
    resetForm();
    setShowAddRoom(true);
  };

  // =========================================================
  // CLOSE ADD ROOM MODAL
  // =========================================================

  const handleCloseAddRoom = () => {
    setShowAddRoom(false);
    resetForm();
  };

  // =========================================================
  // ADD ROOM
  // Validate, save to localStorage, and update the UI.
  // =========================================================

  const handleAddRoom = (event) => {
    event.preventDefault();

    const roomNumber = formData.roomNumber.trim();
    const property = formData.property.trim();
    const floor = Number(formData.floor);
    const rent = Number(formData.rent);

    // Required fields
    if (
      !roomNumber ||
      !property ||
      formData.floor === "" ||
      formData.rent === ""
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Validate numeric inputs
    if (!Number.isFinite(floor) || floor < 0) {
      setError("Floor cannot be negative.");
      return;
    }

    if (!Number.isFinite(rent) || rent <= 0) {
      setError("Monthly rent must be greater than zero.");
      return;
    }

    // Prevent duplicate room numbers within the same property.
    const roomAlreadyExists = rooms.some(
      (room) =>
        String(room.roomNumber).toLowerCase() ===
          roomNumber.toLowerCase() &&
        String(room.property).toLowerCase() ===
          property.toLowerCase()
    );

    if (roomAlreadyExists) {
      setError(
        "This room already exists in the selected property."
      );
      return;
    }

    // Generate a unique ID for this new room.
    const id = Date.now();

    // Store rent numerically so EditRoom and RoomDetails
    // can read the same data format.
    const newRoom = {
      id,
      roomNumber,
      property,
      location: "Bhopal",
      floor,
      rent,
      tenant: "",
      status: formData.status,
    };

    try {
      const savedRooms = readSavedRooms();

      savedRooms[String(id)] = createStoredRoom(newRoom);

      // Save before updating the UI.
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedRooms)
      );

      setRooms((previousRooms) => [
        ...previousRooms,
        {
          ...newRoom,
          rent: formatRent(rent),
        },
      ]);

      setShowAddRoom(false);
      resetForm();
    } catch (saveError) {
      console.error("Unable to save new room:", saveError);

      setError(
        "Unable to save this room. Please check your browser storage and try again."
      );
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      {/* COMMON NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              All Rooms
            </h2>

            <p className="text-gray-500 mt-1">
              View and manage rooms across your properties.
            </p>
          </div>

          {/* ADD ROOM BUTTON */}
          <button
            type="button"
            onClick={handleOpenAddRoom}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm shrink-0"
          >
            <Plus size={19} />
            <span>Add Room</span>
          </button>
        </div>

        {/* ROOM CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </main>

      {/* ADD ROOM MODAL */}
      {showAddRoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-room-title"
        >
          {/* MODAL */}
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div>
                <h3
                  id="add-room-title"
                  className="text-xl font-bold text-gray-800"
                >
                  Add New Room
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Add a room to one of your properties.
                </p>
              </div>

              {/* CLOSE BUTTON */}
              <button
                type="button"
                onClick={handleCloseAddRoom}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Close add room form"
              >
                <X size={22} className="text-gray-600" />
              </button>
            </div>

            {/* SCROLLABLE FORM */}
            <div className="max-h-[calc(90vh-85px)] overflow-y-auto overscroll-contain">
              <form
                onSubmit={handleAddRoom}
                className="p-5 space-y-4"
              >
                {/* ROOM NUMBER */}
                <div>
                  <label
                    htmlFor="roomNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Room Number
                  </label>

                  <input
                    id="roomNumber"
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    placeholder="e.g. 205"
                    autoComplete="off"
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* PROPERTY */}
                <div>
                  <label
                    htmlFor="property"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Property
                  </label>

                  <select
                    id="property"
                    name="property"
                    value={formData.property}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Property</option>
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
                  <label
                    htmlFor="floor"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Floor
                  </label>

                  <input
                    id="floor"
                    type="number"
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    min="0"
                    step="1"
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* MONTHLY RENT */}
                <div>
                  <label
                    htmlFor="rent"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Monthly Rent (₹)
                  </label>

                  <input
                    id="rent"
                    type="number"
                    name="rent"
                    value={formData.rent}
                    onChange={handleChange}
                    placeholder="e.g. 5500"
                    min="1"
                    step="1"
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* STATUS */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Status
                  </label>

                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Due">Due</option>
                  </select>
                </div>

                {/* ERROR */}
                {error && (
                  <p
                    className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                    role="alert"
                  >
                    {error}
                  </p>
                )}

                {/* BUTTONS */}
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
