import React, { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import RoomCard from "./RoomCard";
import Navbar from "./Navbar";

// =========================================================
// LOCAL STORAGE KEYS
// =========================================================

const STORAGE_KEY = "rentalManagementRooms";
const PROPERTY_STORAGE_KEY = "rentalManagementProperties";

// =========================================================
// DEFAULT PROPERTIES
// Used when no saved property list exists.
// Keep these IDs and names aligned with Properties.jsx.
// =========================================================

const defaultProperties = [
  {
    id: 1,
    name: "Green View Apartments",
    location: "Bhopal",
    address: "Bhopal, Madhya Pradesh",
    floors: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Shyam Residency",
    location: "Bhopal",
    address: "Bhopal, Madhya Pradesh",
    floors: 2,
    status: "Active",
  },
];

// =========================================================
// DEFAULT ROOM DATA
// Existing room IDs are preserved.
// =========================================================

const defaultRooms = [
  {
    id: 101,
    roomNumber: "101",
    property: "Green View Apartments",
    propertyId: 1,
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
    propertyId: 1,
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
    propertyId: 2,
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
    propertyId: 2,
    location: "Bhopal",
    floor: 2,
    rent: 5500,
    tenant: "",
    status: "Available",
  },
];

// =========================================================
// READ SAVED PROPERTIES
// =========================================================

const readSavedProperties = () => {
  try {
    const stored = localStorage.getItem(
      PROPERTY_STORAGE_KEY
    );

    if (stored === null) {
      return defaultProperties;
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed
      : defaultProperties;
  } catch (error) {
    console.error(
      "Unable to read saved properties:",
      error
    );

    return defaultProperties;
  }
};

// =========================================================
// READ SAVED ROOMS
// Room records are stored as an object keyed by room ID.
// =========================================================

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

// =========================================================
// RENT HELPERS
// =========================================================

const parseRent = (rent) => {
  if (typeof rent === "number") {
    return Number.isFinite(rent) ? rent : 0;
  }

  const parsed = Number(
    String(rent ?? "").replace(/[₹,\s]/g, "")
  );

  return Number.isFinite(parsed) ? parsed : 0;
};

const formatRent = (rent) =>
  `₹${parseRent(rent).toLocaleString("en-IN")}`;

// =========================================================
// FIND A PROPERTY BY ITS NAME
// Helps existing rooms without propertyId remain compatible.
// =========================================================

const findPropertyByName = (propertyName, properties) =>
  properties.find(
    (property) =>
      String(property.name || "").trim().toLowerCase() ===
      String(propertyName || "").trim().toLowerCase()
  );

// =========================================================
// LOAD ROOMS
// Merge defaults with saved data without changing existing IDs.
// Saved values take priority.
// =========================================================

const loadRooms = () => {
  const savedRooms = readSavedRooms();
  const properties = readSavedProperties();

  const defaultRoomIds = new Set(
    defaultRooms.map((room) => String(room.id))
  );

  const mergedDefaultRooms = defaultRooms.map((room) => {
    const savedRoom = savedRooms[String(room.id)];

    const property =
      properties.find(
        (item) =>
          String(item.id) === String(room.propertyId)
      ) ||
      findPropertyByName(room.property, properties);

    const mergedRoom =
      savedRoom && typeof savedRoom === "object"
        ? {
            ...room,
            ...savedRoom,
            id: room.id,
          }
        : { ...room };

    return {
      ...mergedRoom,
      propertyId:
        mergedRoom.propertyId ?? property?.id ?? room.propertyId,
      property:
        property?.name ?? mergedRoom.property ?? room.property,
      location:
        property?.location ??
        mergedRoom.location ??
        room.location,
      rent: formatRent(
        mergedRoom.rent ?? room.rent
      ),
    };
  });

  // Include rooms created after the default four.
  const additionalRooms = Object.entries(savedRooms)
    .filter(([id, room]) => {
      return (
        !defaultRoomIds.has(String(id)) &&
        room &&
        typeof room === "object"
      );
    })
    .map(([id, room]) => {
      const property =
        properties.find(
          (item) =>
            String(item.id) === String(room.propertyId)
        ) ||
        findPropertyByName(room.property, properties);

      return {
        ...room,
        id: room.id ?? Number(id),
        propertyId: room.propertyId ?? property?.id,
        property: property?.name ?? room.property ?? "",
        location:
          property?.location ?? room.location ?? "",
        rent: formatRent(room.rent),
      };
    });

  return [...mergedDefaultRooms, ...additionalRooms];
};

// =========================================================
// CONVERT ROOM TO LOCAL STORAGE FORMAT
// =========================================================

const createStoredRoom = (room) => ({
  ...room,
  rent: parseRent(room.rent),
  floor: Number(room.floor),
  tenant:
    room.tenant === "None"
      ? ""
      : room.tenant ?? "",
});

// =========================================================
// ROOMS COMPONENT
// =========================================================

function Rooms() {
  // =========================================================
  // PROPERTY DATA
  // Load properties created or edited in Properties.jsx.
  // =========================================================

  const [properties, setProperties] = useState(
    () => readSavedProperties()
  );

  // =========================================================
  // ROOM DATA
  // =========================================================

  const [rooms, setRooms] = useState(() => loadRooms());

  // =========================================================
  // ADD ROOM MODAL STATE
  // =========================================================

  const [showAddRoom, setShowAddRoom] = useState(false);

  // =========================================================
  // FORM DATA
  // propertyId connects the room to its selected property.
  // =========================================================

  const [formData, setFormData] = useState({
    roomNumber: "",
    propertyId: "",
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
  // REFRESH PROPERTY DATA WHEN THIS PAGE OPENS OR
  // WHEN THE SAME STORAGE KEY CHANGES IN ANOTHER TAB.
  // =========================================================

  useEffect(() => {
    const refreshProperties = () => {
      setProperties(readSavedProperties());
    };

    window.addEventListener("storage", refreshProperties);

    return () => {
      window.removeEventListener(
        "storage",
        refreshProperties
      );
    };
  }, []);

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
      const savedPosition = scrollPositionRef.current;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";

      window.scrollTo(0, savedPosition);
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
  // SELECTED PROPERTY
  // =========================================================

  const selectedProperty = properties.find(
    (property) =>
      String(property.id) === String(formData.propertyId)
  );

  // =========================================================
  // HANDLE FORM INPUT
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "propertyId" ? { floor: "" } : {}),
    }));

    setError("");
  };

  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    setFormData({
      roomNumber: "",
      propertyId: "",
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
    setProperties(readSavedProperties());
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
  // Validate, save, and update the UI.
  // =========================================================

  const handleAddRoom = (event) => {
    event.preventDefault();

    const roomNumber = formData.roomNumber.trim();
    const floor = Number(formData.floor);
    const rent = Number(formData.rent);

    // -------------------------------------------------------
    // REQUIRED FIELDS
    // -------------------------------------------------------

    if (
      !roomNumber ||
      !formData.propertyId ||
      formData.floor === "" ||
      formData.rent === ""
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // -------------------------------------------------------
    // VERIFY SELECTED PROPERTY STILL EXISTS
    // -------------------------------------------------------

    const property = properties.find(
      (item) =>
        String(item.id) === String(formData.propertyId)
    );

    if (!property) {
      setError(
        "Please select a valid property. If you recently added a property, reopen this form and try again."
      );
      return;
    }

    // -------------------------------------------------------
    // VERIFY PROPERTY IS ACTIVE
    // -------------------------------------------------------

    if (property.status === "Inactive") {
      setError(
        "You cannot add a room to an inactive property."
      );
      return;
    }

    // -------------------------------------------------------
    // VALIDATE FLOOR
    // -------------------------------------------------------

    if (
      !Number.isFinite(floor) ||
      !Number.isInteger(floor) ||
      floor < 0
    ) {
      setError("Floor must be a whole number of zero or greater.");
      return;
    }

    const propertyFloorCount = Number(property.floors);

    if (
      Number.isFinite(propertyFloorCount) &&
      propertyFloorCount >= 0 &&
      floor > propertyFloorCount
    ) {
      setError(
        `This property has ${propertyFloorCount} floor(s). Please enter a floor between 0 and ${propertyFloorCount}.`
      );
      return;
    }

    // -------------------------------------------------------
    // VALIDATE RENT
    // -------------------------------------------------------

    if (
      !Number.isFinite(rent) ||
      !Number.isInteger(rent) ||
      rent <= 0
    ) {
      setError("Monthly rent must be a positive whole number.");
      return;
    }

    // -------------------------------------------------------
    // PREVENT DUPLICATE ROOM NUMBER IN SAME PROPERTY
    // -------------------------------------------------------

    const roomAlreadyExists = rooms.some((room) => {
      const sameRoomNumber =
        String(room.roomNumber).trim().toLowerCase() ===
        roomNumber.toLowerCase();

      const sameProperty =
        String(room.propertyId ?? "") ===
          String(property.id) ||
        (
          !room.propertyId &&
          String(room.property || "").trim().toLowerCase() ===
            String(property.name || "").trim().toLowerCase()
        );

      return sameRoomNumber && sameProperty;
    });

    if (roomAlreadyExists) {
      setError(
        "This room number already exists in the selected property."
      );
      return;
    }

    // -------------------------------------------------------
    // GENERATE ROOM ID
    // -------------------------------------------------------

    const id = Date.now();

    // -------------------------------------------------------
    // CREATE ROOM RECORD
    // -------------------------------------------------------

    const newRoom = {
      id,
      roomNumber,
      propertyId: property.id,
      property: property.name,
      location: property.location || "",
      floor,
      rent,
      tenant: "",
      status: formData.status,
    };

    // -------------------------------------------------------
    // SAVE ROOM TO LOCAL STORAGE
    // -------------------------------------------------------

    try {
      const savedRooms = readSavedRooms();

      savedRooms[String(id)] = createStoredRoom(newRoom);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedRooms)
      );

      // Update the room cards after saving successfully.
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

        {rooms.length === 0 && (
          <div className="bg-white rounded-xl border shadow-sm p-10 text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              No rooms found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Add a room to get started.
            </p>
          </div>
        )}
      </main>

      {/* ADD ROOM MODAL */}
      {showAddRoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-room-title"
        >
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
                    htmlFor="propertyId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Property
                  </label>

                  <select
                    id="propertyId"
                    name="propertyId"
                    value={formData.propertyId}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Property</option>

                    {properties.map((property) => (
                      <option
                        key={property.id}
                        value={String(property.id)}
                        disabled={property.status === "Inactive"}
                      >
                        {property.name}
                        {property.status === "Inactive"
                          ? " (Inactive)"
                          : ""}
                      </option>
                    ))}
                  </select>

                  {properties.length === 0 && (
                    <p className="text-xs text-amber-700 mt-1">
                      No properties are available. Add a property first.
                    </p>
                  )}
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
                    placeholder={
                      selectedProperty
                        ? `Enter floor (0–${selectedProperty.floors})`
                        : "Select a property first"
                    }
                    min="0"
                    max={
                      selectedProperty?.floors != null
                        ? selectedProperty.floors
                        : undefined
                    }
                    step="1"
                    required
                    disabled={!selectedProperty}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />

                  {selectedProperty && (
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedProperty.name} has{" "}
                      {selectedProperty.floors} floor(s).
                    </p>
                  )}
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
                    disabled={properties.length === 0}
                    className="w-full sm:w-1/2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
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
