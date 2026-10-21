import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Navbar from "./Navbar";

const STORAGE_KEY = "rentalManagementRooms";
const PROPERTY_STORAGE_KEY = "rentalManagementProperties";

// =========================================================
// DEFAULT ROOM DATA
// =========================================================

const defaultRooms = {
  101: {
    roomNumber: "101",
    property: "Green View Apartments",
    propertyId: 1,
    location: "Bhopal",
    floor: 1,
    rent: 5000,
    tenant: "Rahul Sharma",
    status: "Occupied",
  },
  102: {
    roomNumber: "102",
    property: "Green View Apartments",
    propertyId: 1,
    location: "Bhopal",
    floor: 1,
    rent: 6000,
    tenant: "Aman Kumar",
    status: "Occupied",
  },
  203: {
    roomNumber: "203",
    property: "Shyam Residency",
    propertyId: 2,
    location: "Bhopal",
    floor: 2,
    rent: 5500,
    tenant: "Neha Sharma",
    status: "Due",
  },
  204: {
    roomNumber: "204",
    property: "Shyam Residency",
    propertyId: 2,
    location: "Bhopal",
    floor: 2,
    rent: 5500,
    tenant: "",
    status: "Available",
  },
};

// =========================================================
// READ SAVED ROOMS
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
// READ SAVED PROPERTIES
// =========================================================

const readSavedProperties = () => {
  try {
    const stored = localStorage.getItem(
      PROPERTY_STORAGE_KEY
    );

    if (stored === null) {
      return [
        {
          id: 1,
          name: "Green View Apartments",
          location: "Bhopal",
          floors: 5,
          status: "Active",
        },
        {
          id: 2,
          name: "Shyam Residency",
          location: "Bhopal",
          floors: 2,
          status: "Active",
        },
      ];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(
      "Unable to read saved properties:",
      error
    );

    return [];
  }
};

// =========================================================
// FIND PROPERTY
// Match by ID first, then by name for legacy room records.
// =========================================================

const findPropertyForRoom = (room, properties) => {
  if (room.propertyId !== null && room.propertyId !== undefined) {
    const propertyById = properties.find(
      (property) =>
        String(property.id) === String(room.propertyId)
    );

    if (propertyById) {
      return propertyById;
    }
  }

  return properties.find(
    (property) =>
      String(property.name || "").trim().toLowerCase() ===
      String(room.property || "").trim().toLowerCase()
  );
};

// =========================================================
// GET ROOM BY ID
// Supports default and dynamically added rooms.
// =========================================================

const getRoomById = (id) => {
  const savedRooms = readSavedRooms();
  const defaultRoom = defaultRooms[String(id)];
  const savedRoom = savedRooms[String(id)];

  if (!defaultRoom && !savedRoom) {
    return null;
  }

  const room = {
    ...(defaultRoom || {}),
    ...(savedRoom || {}),
    id: savedRoom?.id ?? Number(id),
  };

  const properties = readSavedProperties();
  const property = findPropertyForRoom(room, properties);

  return {
    ...room,
    propertyId: room.propertyId ?? property?.id,
    property: property?.name ?? room.property ?? "",
    location: property?.location ?? room.location ?? "",
  };
};

// =========================================================
// NORMALIZE RENT
// =========================================================

const normalizeRent = (rent) => {
  if (rent === null || rent === undefined || rent === "") {
    return "";
  }

  if (typeof rent === "number") {
    return String(rent);
  }

  return String(rent).replace(/[₹,\s]/g, "");
};

// =========================================================
// NORMALIZE ROOM FOR FORM
// =========================================================

const normalizeRoomForForm = (room, id) => ({
  ...room,
  id: room.id ?? Number(id),
  roomNumber: String(room.roomNumber ?? ""),
  property: String(room.property ?? ""),
  propertyId: room.propertyId ?? "",
  location: String(room.location ?? ""),
  floor: String(room.floor ?? ""),
  rent: normalizeRent(room.rent),
  tenant:
    room.tenant === "None"
      ? ""
      : String(room.tenant ?? ""),
  status: room.status ?? "Available",
});

// =========================================================
// EDIT ROOM COMPONENT
// =========================================================

function EditRoom() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [roomData, setRoomData] = useState(() => {
    const room = getRoomById(id);

    return room
      ? normalizeRoomForForm(room, id)
      : {
          id: Number(id),
          roomNumber: "",
          property: "",
          propertyId: "",
          location: "",
          floor: "",
          rent: "",
          tenant: "",
          status: "Available",
        };
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // =========================================================
  // LOAD ROOM WHEN ROUTE ID CHANGES
  // =========================================================

  useEffect(() => {
    const room = getRoomById(id);

    setError("");
    setSuccess("");
    setIsSaving(false);

    if (!room) {
      setRoomData({
        id: Number(id),
        roomNumber: "",
        property: "",
        propertyId: "",
        location: "",
        floor: "",
        rent: "",
        tenant: "",
        status: "Available",
      });

      return;
    }

    setRoomData(normalizeRoomForForm(room, id));
  }, [id]);

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

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

  const handleSave = (event) => {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setError("");
    setSuccess("");

    // -------------------------------------------------------
    // ROOM NUMBER VALIDATION
    // -------------------------------------------------------

    const roomNumber = roomData.roomNumber.trim();

    if (!roomNumber) {
      setError("Please enter room number.");
      return;
    }

    // -------------------------------------------------------
    // PROPERTY VALIDATION
    // -------------------------------------------------------

    const propertyName = roomData.property.trim();

    if (!propertyName) {
      setError("Please enter property name.");
      return;
    }

    // -------------------------------------------------------
    // LOCATION VALIDATION
    // -------------------------------------------------------

    const location = roomData.location.trim();

    if (!location) {
      setError("Please enter location.");
      return;
    }

    // -------------------------------------------------------
    // FLOOR VALIDATION
    // -------------------------------------------------------

    const floor = Number(roomData.floor);

    if (
      roomData.floor === "" ||
      !Number.isFinite(floor) ||
      !Number.isInteger(floor) ||
      floor < 0
    ) {
      setError(
        "Please enter a valid whole-number floor."
      );
      return;
    }

    // -------------------------------------------------------
    // RENT VALIDATION
    // -------------------------------------------------------

    const rent = Number(roomData.rent);

    if (
      roomData.rent === "" ||
      !Number.isFinite(rent) ||
      !Number.isInteger(rent) ||
      rent <= 0
    ) {
      setError(
        "Please enter a positive whole-number monthly rent."
      );
      return;
    }

    // -------------------------------------------------------
    // TENANT VALIDATION
    // -------------------------------------------------------

    const tenant = roomData.tenant.trim();

    if (
      roomData.status === "Occupied" &&
      !tenant
    ) {
      setError(
        "Please enter tenant name for an occupied room."
      );
      return;
    }

    if (
      roomData.status === "Available" &&
      tenant
    ) {
      setError(
        "An available room cannot have an assigned tenant."
      );
      return;
    }

    // -------------------------------------------------------
    // LOAD CURRENT ROOM AND PROPERTY RECORDS
    // -------------------------------------------------------

    const savedRooms = readSavedRooms();
    const properties = readSavedProperties();

    const currentRoom =
      getRoomById(id) || roomData;

    const selectedProperty = findPropertyForRoom(
      {
        ...currentRoom,
        property: propertyName,
        propertyId: roomData.propertyId,
      },
      properties
    );

    // Preserve the room's existing property relationship.
    // If it is a legacy room, match the property by name.
    const propertyId =
      selectedProperty?.id ??
      roomData.propertyId ??
      currentRoom.propertyId;

    // -------------------------------------------------------
    // CHECK DUPLICATE ROOM NUMBER
    // -------------------------------------------------------

    const duplicateRoom = Object.entries(savedRooms).some(
      ([savedId, savedRoom]) => {
        if (
          String(savedId) === String(id) ||
          !savedRoom ||
          typeof savedRoom !== "object"
        ) {
          return false;
        }

        const sameRoomNumber =
          String(savedRoom.roomNumber || "")
            .trim()
            .toLowerCase() === roomNumber.toLowerCase();

        const savedProperty = findPropertyForRoom(
          savedRoom,
          properties
        );

        const sameProperty =
          propertyId !== null &&
          propertyId !== undefined &&
          savedRoom.propertyId !== null &&
          savedRoom.propertyId !== undefined
            ? String(savedRoom.propertyId) ===
              String(propertyId)
            : String(
                savedProperty?.name ?? savedRoom.property ?? ""
              ).trim().toLowerCase() ===
              String(
                selectedProperty?.name ?? propertyName
              ).trim().toLowerCase();

        return sameRoomNumber && sameProperty;
      }
    );

    // Also check other default rooms that may not have been
    // saved to localStorage yet.
    const duplicateDefaultRoom = Object.entries(defaultRooms).some(
      ([defaultId, defaultRoom]) => {
        if (String(defaultId) === String(id)) {
          return false;
        }

        const savedVersion = savedRooms[String(defaultId)];
        const otherRoom = {
          ...defaultRoom,
          ...(savedVersion || {}),
        };

        const sameRoomNumber =
          String(otherRoom.roomNumber || "")
            .trim()
            .toLowerCase() === roomNumber.toLowerCase();

        const otherProperty = findPropertyForRoom(
          otherRoom,
          properties
        );

        const sameProperty =
          propertyId !== null &&
          propertyId !== undefined &&
          otherRoom.propertyId !== null &&
          otherRoom.propertyId !== undefined
            ? String(otherRoom.propertyId) ===
              String(propertyId)
            : String(
                otherProperty?.name ?? otherRoom.property ?? ""
              ).trim().toLowerCase() ===
              String(
                selectedProperty?.name ?? propertyName
              ).trim().toLowerCase();

        return sameRoomNumber && sameProperty;
      }
    );

    if (duplicateRoom || duplicateDefaultRoom) {
      setError(
        "This room number already exists in the selected property."
      );
      return;
    }

    // -------------------------------------------------------
    // VALIDATE PROPERTY FLOOR COUNT WHEN AVAILABLE
    // -------------------------------------------------------

    if (selectedProperty?.floors !== undefined) {
      const maximumFloor = Number(selectedProperty.floors);

      if (
        Number.isFinite(maximumFloor) &&
        floor > maximumFloor
      ) {
        setError(
          `The selected property has ${maximumFloor} floor(s). Please enter a valid floor.`
        );
        return;
      }
    }

    // -------------------------------------------------------
    // PREPARE UPDATED ROOM
    // -------------------------------------------------------

    const updatedRoomData = {
      ...currentRoom,
      ...roomData,
      id: currentRoom.id ?? Number(id),
      roomNumber,
      property: selectedProperty?.name ?? propertyName,
      propertyId,
      location: selectedProperty?.location ?? location,
      floor,
      rent,
      tenant,
      status: roomData.status,
    };

    // -------------------------------------------------------
    // SAVE TO LOCAL STORAGE
    // -------------------------------------------------------

    setIsSaving(true);

    try {
      const updatedRooms = {
        ...savedRooms,
        [String(id)]: updatedRoomData,
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedRooms)
      );

      // Verify that the room was saved correctly.
      const verification = readSavedRooms();
      const verifiedRoom = verification[String(id)];

      if (
        !verifiedRoom ||
        Number(verifiedRoom.rent) !== rent ||
        String(verifiedRoom.roomNumber) !== roomNumber
      ) {
        throw new Error(
          "Unable to verify saved room data."
        );
      }

      setRoomData(
        normalizeRoomForForm(verifiedRoom, id)
      );

      setSuccess("Room details updated successfully.");

      navigate(`/room-details/${id}`, {
        state: {
          roomUpdated: true,
        },
      });
    } catch (saveError) {
      console.error(
        "Unable to save room data:",
        saveError
      );

      setError(
        "Unable to save room details. Please try again."
      );

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

  const roomExists = Boolean(getRoomById(id));

  if (!roomExists) {
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
      <Navbar />

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
            <form
              onSubmit={handleSave}
              className="p-5 space-y-5"
            >
              {/* ERROR MESSAGE */}
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

              {/* SUCCESS MESSAGE */}
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
                  disabled={isSaving}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
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
                  disabled={isSaving}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
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
                  disabled={isSaving}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
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
                  step="1"
                  required
                  disabled={isSaving}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>

              {/* MONTHLY RENT */}
              <div>
                <label
                  htmlFor="rent"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Monthly Rent (₹)
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
                  disabled={isSaving}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
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
                  disabled={isSaving}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
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
                  disabled={isSaving}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="Occupied">Occupied</option>
                  <option value="Available">Available</option>
                  <option value="Due">Due</option>
                </select>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                >
                  <ArrowLeft size={18} />
                  Cancel
                </button>

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
