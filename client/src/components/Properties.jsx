import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Building2,
  MapPin,
  Plus,
  Eye,
  Pencil,
  X,
  Search,
  Home,
  DoorOpen,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

function Properties() {
  const navigate = useNavigate();

  // =========================================================
  // PROPERTY DATA
  // =========================================================

  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Green View Apartments",
      location: "Bhopal",
      address: "Bhopal, Madhya Pradesh",
      floors: 5,
      rooms: 13,
      available: 3,
      occupied: 10,
      status: "Active",
    },
    {
      id: 2,
      name: "Shyam Residency",
      location: "Bhopal",
      address: "Bhopal, Madhya Pradesh",
      floors: 2,
      rooms: 6,
      available: 1,
      occupied: 5,
      status: "Active",
    },
  ]);

  // =========================================================
  // SEARCH
  // =========================================================

  const [searchTerm, setSearchTerm] = useState("");

  // =========================================================
  // ADD PROPERTY MODAL
  // =========================================================

  const [showAddProperty, setShowAddProperty] =
    useState(false);

  // =========================================================
  // EDIT PROPERTY MODAL
  // =========================================================

  const [showEditProperty, setShowEditProperty] =
    useState(false);

  const [editingPropertyId, setEditingPropertyId] =
    useState(null);

  // =========================================================
  // FORM DATA
  // =========================================================

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    floors: "",
    status: "Active",
  });

  const [error, setError] = useState("");

  // =========================================================
  // SCROLL POSITION
  // =========================================================

  const scrollPositionRef = useRef(0);

  // =========================================================
  // LOCK BACKGROUND SCROLL WHEN ANY MODAL IS OPEN
  // =========================================================

  useEffect(() => {
    const modalOpen =
      showAddProperty || showEditProperty;

    if (modalOpen) {
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
      const savedScrollPosition =
        scrollPositionRef.current;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior =
        "";

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
      document.documentElement.style.overscrollBehavior =
        "";
    };
  }, [showAddProperty, showEditProperty]);

  // =========================================================
  // FILTERED PROPERTIES
  // =========================================================

  const filteredProperties = properties.filter(
    (property) => {
      const searchValue = searchTerm
        .trim()
        .toLowerCase();

      if (!searchValue) {
        return true;
      }

      return (
        property.name
          .toLowerCase()
          .includes(searchValue) ||
        property.location
          .toLowerCase()
          .includes(searchValue) ||
        property.address
          .toLowerCase()
          .includes(searchValue)
      );
    }
  );

  // =========================================================
  // PROPERTY SUMMARY
  // =========================================================

  const totalProperties = properties.length;

  const activeProperties = properties.filter(
    (property) => property.status === "Active"
  ).length;

  const totalRooms = properties.reduce(
    (total, property) =>
      total + Number(property.rooms || 0),
    0
  );

  const availableRooms = properties.reduce(
    (total, property) =>
      total + Number(property.available || 0),
    0
  );

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
  // OPEN ADD PROPERTY MODAL
  // =========================================================

  const handleOpenAddProperty = () => {
    setFormData({
      name: "",
      location: "",
      address: "",
      floors: "",
      status: "Active",
    });

    setError("");
    setShowAddProperty(true);
  };

  // =========================================================
  // CLOSE ADD PROPERTY MODAL
  // =========================================================

  const handleCloseAddProperty = () => {
    setShowAddProperty(false);
    setError("");
  };

  // =========================================================
  // ADD PROPERTY
  // =========================================================

  const handleAddProperty = (event) => {
    event.preventDefault();

    // ---------------- VALIDATION ----------------

    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      !formData.address.trim() ||
      !formData.floors
    ) {
      setError(
        "Please fill in all required fields."
      );
      return;
    }

    // ---------------- FLOOR VALIDATION ----------------

    if (Number(formData.floors) < 1) {
      setError(
        "Total floors must be at least 1."
      );
      return;
    }

    // ---------------- DUPLICATE PROPERTY CHECK ----------------

    const propertyAlreadyExists =
      properties.some(
        (property) =>
          property.name.toLowerCase() ===
          formData.name.trim().toLowerCase()
      );

    if (propertyAlreadyExists) {
      setError(
        "A property with this name already exists."
      );
      return;
    }

    // ---------------- CREATE NEW PROPERTY ----------------

    const newProperty = {
      id: Date.now(),
      name: formData.name.trim(),
      location: formData.location.trim(),
      address: formData.address.trim(),
      floors: Number(formData.floors),
      rooms: 0,
      available: 0,
      occupied: 0,
      status: formData.status,
    };

    // ---------------- UPDATE PROPERTY LIST ----------------

    setProperties((previousProperties) => [
      ...previousProperties,
      newProperty,
    ]);

    // ---------------- CLOSE MODAL ----------------

    setShowAddProperty(false);

    setFormData({
      name: "",
      location: "",
      address: "",
      floors: "",
      status: "Active",
    });

    setError("");
  };

  // =========================================================
  // OPEN EDIT PROPERTY MODAL
  // =========================================================

  const handleEditProperty = (property) => {
    setFormData({
      name: property.name,
      location: property.location,
      address: property.address,
      floors: String(property.floors),
      status: property.status,
    });

    setEditingPropertyId(property.id);
    setError("");
    setShowEditProperty(true);
  };

  // =========================================================
  // SAVE EDITED PROPERTY
  // =========================================================

  const handleSaveProperty = (event) => {
    event.preventDefault();

    // ---------------- VALIDATION ----------------

    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      !formData.address.trim() ||
      !formData.floors
    ) {
      setError(
        "Please fill in all required fields."
      );
      return;
    }

    // ---------------- FLOOR VALIDATION ----------------

    if (Number(formData.floors) < 1) {
      setError(
        "Total floors must be at least 1."
      );
      return;
    }

    // ---------------- DUPLICATE PROPERTY CHECK ----------------

    const duplicateProperty =
      properties.some(
        (property) =>
          property.id !== editingPropertyId &&
          property.name.toLowerCase() ===
            formData.name.trim().toLowerCase()
      );

    if (duplicateProperty) {
      setError(
        "A property with this name already exists."
      );
      return;
    }

    // ---------------- UPDATE PROPERTY ----------------

    setProperties((previousProperties) =>
      previousProperties.map((property) =>
        property.id === editingPropertyId
          ? {
              ...property,
              name: formData.name.trim(),
              location: formData.location.trim(),
              address: formData.address.trim(),
              floors: Number(formData.floors),
              status: formData.status,
            }
          : property
      )
    );

    // ---------------- CLOSE MODAL ----------------

    setShowEditProperty(false);
    setEditingPropertyId(null);
    setError("");

    setFormData({
      name: "",
      location: "",
      address: "",
      floors: "",
      status: "Active",
    });
  };

  // =========================================================
  // CLOSE EDIT PROPERTY MODAL
  // =========================================================

  const handleCloseEditProperty = () => {
    setShowEditProperty(false);
    setEditingPropertyId(null);
    setError("");

    setFormData({
      name: "",
      location: "",
      address: "",
      floors: "",
      status: "Active",
    });
  };

  // =========================================================
  // CLEAR SEARCH
  // =========================================================

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // =========================================================
  // VIEW PROPERTY DETAILS
  // =========================================================

  const handleViewProperty = (propertyId) => {
    navigate(`/property-details/${propertyId}`);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">

      {/* =====================================================
          COMMON NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              My Properties
            </h2>

            <p className="text-gray-500 mt-1">
              View and manage all your rental properties.
            </p>
          </div>

          {/* =================================================
              ADD PROPERTY BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={handleOpenAddProperty}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm shrink-0"
          >
            <Plus size={20} />

            <span>
              Add Property
            </span>
          </button>

        </div>

        {/* =====================================================
            PROPERTY SUMMARY CARDS
        ===================================================== */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {/* TOTAL PROPERTIES */}

          <div className="bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition">

            <div className="flex items-center justify-between gap-3">

              <div>
                <p className="text-sm text-gray-500">
                  Total Properties
                </p>

                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {totalProperties}
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <Building2
                  size={23}
                  className="text-blue-600"
                />
              </div>

            </div>

          </div>

          {/* ACTIVE PROPERTIES */}

          <div className="bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition">

            <div className="flex items-center justify-between gap-3">

              <div>
                <p className="text-sm text-gray-500">
                  Active Properties
                </p>

                <p className="text-2xl font-bold text-green-600 mt-1">
                  {activeProperties}
                </p>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle2
                  size={23}
                  className="text-green-600"
                />
              </div>

            </div>

          </div>

          {/* TOTAL ROOMS */}

          <div className="bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition">

            <div className="flex items-center justify-between gap-3">

              <div>
                <p className="text-sm text-gray-500">
                  Total Rooms
                </p>

                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {totalRooms}
                </p>
              </div>

              <div className="p-3 bg-indigo-50 rounded-lg">
                <Home
                  size={23}
                  className="text-indigo-600"
                />
              </div>

            </div>

          </div>

          {/* AVAILABLE ROOMS */}

          <div className="bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition">

            <div className="flex items-center justify-between gap-3">

              <div>
                <p className="text-sm text-gray-500">
                  Available Rooms
                </p>

                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {availableRooms}
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <DoorOpen
                  size={23}
                  className="text-blue-600"
                />
              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            SEARCH SECTION
        ===================================================== */}

        <div className="bg-white rounded-xl border shadow-sm p-4 mb-6">

          <div className="flex flex-col sm:flex-row gap-3">

            {/* SEARCH INPUT */}

            <div className="relative flex-1">

              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search property by name, location or address..."
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  aria-label="Clear property search"
                >
                  <X size={18} />
                </button>
              )}

            </div>

            {/* SEARCH RESULT COUNT */}

            <div className="flex items-center justify-center sm:justify-start px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 whitespace-nowrap">
              {filteredProperties.length}{" "}
              {filteredProperties.length === 1
                ? "property"
                : "properties"}
            </div>

          </div>

        </div>

        {/* =====================================================
            PROPERTY CARDS
        ===================================================== */}

        {filteredProperties.length > 0 ? (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {filteredProperties.map((property) => (

              <div
                key={property.id}
                className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >

                {/* =================================================
                    PROPERTY HEADER
                ================================================= */}

                <div className="p-5 border-b flex justify-between items-start gap-3">

                  <div className="flex items-start gap-3 min-w-0">

                    <div className="p-3 bg-blue-50 rounded-lg shrink-0">
                      <Building2
                        size={26}
                        className="text-blue-600"
                      />
                    </div>

                    <div className="min-w-0">

                      <h3 className="text-xl font-bold text-gray-800 truncate">
                        {property.name}
                      </h3>

                      <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">

                        <MapPin size={15} />

                        <span className="truncate">
                          {property.location}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      STATUS
                  ================================================= */}

                  <span
                    className={`px-3 py-1 rounded-full text-sm shrink-0 ${
                      property.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {property.status}
                  </span>

                </div>

                {/* =================================================
                    PROPERTY INFORMATION
                ================================================= */}

                <div className="p-5">

                  {/* ADDRESS */}

                  <div className="mb-4">

                    <p className="text-xs text-gray-500 mb-1">
                      Address
                    </p>

                    <p className="text-sm text-gray-700">
                      {property.address}
                    </p>

                  </div>

                  {/* PROPERTY STATS */}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">

                    {/* FLOORS */}

                    <div className="bg-gray-50 rounded-lg p-3">

                      <p className="text-xs text-gray-500">
                        Floors
                      </p>

                      <p className="text-xl font-bold mt-1 text-gray-800">
                        {property.floors}
                      </p>

                    </div>

                    {/* ROOMS */}

                    <div className="bg-gray-50 rounded-lg p-3">

                      <p className="text-xs text-gray-500">
                        Rooms
                      </p>

                      <p className="text-xl font-bold mt-1 text-gray-800">
                        {property.rooms}
                      </p>

                    </div>

                    {/* AVAILABLE */}

                    <div className="bg-green-50 rounded-lg p-3">

                      <p className="text-xs text-gray-500">
                        Available
                      </p>

                      <p className="text-xl font-bold text-green-600 mt-1">
                        {property.available}
                      </p>

                    </div>

                    {/* OCCUPIED */}

                    <div className="bg-blue-50 rounded-lg p-3">

                      <p className="text-xs text-gray-500">
                        Occupied
                      </p>

                      <p className="text-xl font-bold text-blue-600 mt-1">
                        {property.occupied}
                      </p>

                    </div>

                  </div>

                  {/* =================================================
                      ACTION BUTTONS
                  ================================================= */}

                  <div className="flex gap-3 mt-5">

                    {/* VIEW DETAILS */}

                    <button
                      type="button"
                      onClick={() =>
                        handleViewProperty(property.id)
                      }
                      className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition"
                    >

                      <Eye size={18} />

                      <span>
                        View Details
                      </span>

                    </button>

                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() =>
                        handleEditProperty(property)
                      }
                      className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition"
                    >

                      <Pencil size={18} />

                      <span className="hidden sm:block">
                        Edit
                      </span>

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* =====================================================
             NO SEARCH RESULTS
          ===================================================== */

          <div className="bg-white rounded-xl border shadow-sm p-10 text-center">

            <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">

              <Search
                size={28}
                className="text-blue-600"
              />

            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              No properties found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              No property matches your current search.
            </p>

            <button
              type="button"
              onClick={handleClearSearch}
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >

              <X size={17} />

              Clear Search

            </button>

          </div>

        )}

      </main>

      {/* =====================================================
          ADD PROPERTY MODAL
      ===================================================== */}

      {showAddProperty && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="flex items-center justify-between px-5 py-4 border-b">

              <div>

                <h3 className="text-xl font-bold text-gray-800">
                  Add New Property
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Add a new rental property to your account.
                </p>

              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={handleCloseAddProperty}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Close add property form"
              >

                <X
                  size={22}
                  className="text-gray-600"
                />

              </button>

            </div>

            {/* =================================================
                SCROLLABLE FORM CONTENT
            ================================================= */}

            <div className="max-h-[calc(90vh-85px)] overflow-y-auto">

              <form
                onSubmit={handleAddProperty}
                className="p-5 space-y-4"
              >

                {/* PROPERTY NAME */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Green View Apartments"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                </div>

                {/* LOCATION */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Bhopal"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                </div>

                {/* ADDRESS */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete property address"
                    rows="3"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                </div>

                {/* TOTAL FLOORS */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Floors
                  </label>

                  <input
                    type="number"
                    name="floors"
                    value={formData.floors}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    min="1"
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

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

                {/* ERROR */}

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                {/* BUTTONS */}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">

                  <button
                    type="button"
                    onClick={handleCloseAddProperty}
                    className="w-full sm:w-1/2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-1/2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Add Property
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          EDIT PROPERTY MODAL
      ===================================================== */}

      {showEditProperty && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">

            {/* =================================================
                EDIT MODAL HEADER
            ================================================= */}

            <div className="flex items-center justify-between px-5 py-4 border-b">

              <div>

                <h3 className="text-xl font-bold text-gray-800">
                  Edit Property
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Update your property information.
                </p>

              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={handleCloseEditProperty}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Close edit property form"
              >

                <X
                  size={22}
                  className="text-gray-600"
                />

              </button>

            </div>

            {/* =================================================
                SCROLLABLE EDIT FORM
            ================================================= */}

            <div className="max-h-[calc(90vh-85px)] overflow-y-auto">

              <form
                onSubmit={handleSaveProperty}
                className="p-5 space-y-4"
              >

                {/* PROPERTY NAME */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Green View Apartments"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                </div>

                {/* LOCATION */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Bhopal"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                </div>

                {/* ADDRESS */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete property address"
                    rows="3"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                </div>

                {/* TOTAL FLOORS */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Floors
                  </label>

                  <input
                    type="number"
                    name="floors"
                    value={formData.floors}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    min="1"
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

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

                {/* ERROR */}

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                {/* BUTTONS */}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">

                  <button
                    type="button"
                    onClick={handleCloseEditProperty}
                    className="w-full sm:w-1/2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-1/2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Save Changes
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

export default Properties;