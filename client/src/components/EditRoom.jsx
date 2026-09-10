import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  Save,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

function EditRoom() {
  const navigate = useNavigate();
  const { id } = useParams();

  // =========================================================
  // ROOM DATA
  // =========================================================

  const [roomData, setRoomData] = useState({
    roomNumber: id || "",
    floor: "",
    rent: "",
    tenant: "",
    status: "Occupied",
  });

  // =========================================================
  // FORM STATE
  // =========================================================

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // =========================================================
  // SCROLL POSITION
  // =========================================================

  const scrollPositionRef = useRef(0);

  // =========================================================
  // LOCK BACKGROUND SCROLL
  // =========================================================

  useEffect(() => {
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

    return () => {
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
    };
  }, []);

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
    setSuccess(false);
  };

  // =========================================================
  // SAVE ROOM
  // =========================================================

  const handleSave = (event) => {
    event.preventDefault();

    // ---------------- VALIDATION ----------------

    if (
      !roomData.roomNumber.trim() ||
      !roomData.floor ||
      !roomData.rent
    ) {
      setError(
        "Please fill in all required fields."
      );
      return;
    }

    // ---------------- FLOOR VALIDATION ----------------

    if (Number(roomData.floor) < 0) {
      setError(
        "Floor number cannot be negative."
      );
      return;
    }

    // ---------------- RENT VALIDATION ----------------

    if (Number(roomData.rent) <= 0) {
      setError(
        "Monthly rent must be greater than 0."
      );
      return;
    }

    // ---------------- TENANT VALIDATION ----------------

    if (
      roomData.status === "Occupied" &&
      !roomData.tenant.trim()
    ) {
      setError(
        "Please enter the tenant name for an occupied room."
      );
      return;
    }

    // ---------------- SUCCESS ----------------

    setError("");
    setSuccess(true);

    // ---------------------------------------------------------
    // NOTE:
    // Currently room data is stored only in component state.
    // Backend/database integration can be added later.
    // ---------------------------------------------------------

    setTimeout(() => {
      navigate(`/room-details/${id}`);
    }, 800);
  };

  // =========================================================
  // CANCEL EDIT
  // =========================================================

  const handleCancel = () => {
    navigate(`/room-details/${id}`);
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

        {/* ===================================================== */}
        {/* FORM CARD */}
        {/* ===================================================== */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          {/* ================================================= */}
          {/* CARD HEADER */}
          {/* ================================================= */}

          <div className="px-6 py-5 border-b">

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
            className="p-6 space-y-5"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            {/* ERROR MESSAGE */}
            {/* ================================================= */}

            {error && (
              <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-3">

                <AlertCircle
                  size={18}
                  className="shrink-0 mt-0.5"
                />

                <span>
                  {error}
                </span>

              </div>
            )}

            {/* ================================================= */}
            {/* SUCCESS MESSAGE */}
            {/* ================================================= */}

            {success && (
              <div className="flex items-start gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-3">

                <CheckCircle
                  size={18}
                  className="shrink-0 mt-0.5"
                />

                <span>
                  Room changes saved successfully.
                </span>

              </div>
            )}

            {/* ================================================= */}
            {/* ACTION BUTTONS */}
            {/* ================================================= */}

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">

              {/* CANCEL */}

              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-5 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
              >

                <ArrowLeft size={18} />

                Cancel

              </button>

              {/* SAVE */}

              <button
                type="submit"
                disabled={success}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition"
              >

                <Save size={18} />

                {success
                  ? "Saved"
                  : "Save Changes"}

              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default EditRoom;