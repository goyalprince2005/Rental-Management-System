
import React, {
  useEffect,
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

// =========================================================
// LOCAL STORAGE CONFIGURATION
// =========================================================

const PROPERTY_STORAGE_KEY = "rentalManagementProperties";

const DEFAULT_PROPERTIES = [
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
];

// =========================================================
// VALIDATE AND NORMALIZE PROPERTY DATA
// =========================================================

const normalizeProperty = (property) => {
  if (
    !property ||
    typeof property !== "object" ||
    Array.isArray(property) ||
    property.id === undefined ||
    property.id === null ||
    typeof property.name !== "string"
  ) {
    return null;
  }

  const getNumber = (value) => {
    const number = Number(value);
    return Number.isFinite(number) && number >= 0
      ? number
      : 0;
  };

  return {
    ...property,
    name: property.name,
    location: String(property.location ?? ""),
    address: String(property.address ?? ""),
    floors: getNumber(property.floors),
    rooms: getNumber(property.rooms),
    available: getNumber(property.available),
    occupied: getNumber(property.occupied),
    status:
      property.status === "Inactive"
        ? "Inactive"
        : "Active",
  };
};

// =========================================================
// LOAD PROPERTIES FROM LOCAL STORAGE
// =========================================================

const loadProperties = () => {
  try {
    const savedProperties = localStorage.getItem(
      PROPERTY_STORAGE_KEY
    );

    if (savedProperties === null) {
      return DEFAULT_PROPERTIES;
    }

    const parsedProperties = JSON.parse(savedProperties);

    if (!Array.isArray(parsedProperties)) {
      return DEFAULT_PROPERTIES;
    }

    return parsedProperties
      .map(normalizeProperty)
      .filter(Boolean);

  } catch (error) {
    console.error("Failed to load properties:", error);
    return DEFAULT_PROPERTIES;
  }
};

function Properties() {
  const navigate = useNavigate();

  // =========================================================
  // PROPERTY DATA
  // =========================================================

  const [properties, setProperties] = useState(
    () => loadProperties()
  );

  // =========================================================
  // SAVE PROPERTIES TO LOCAL STORAGE
  // =========================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        PROPERTY_STORAGE_KEY,
        JSON.stringify(properties)
      );
    } catch (error) {
      console.error("Failed to save properties:", error);
    }
  }, [properties]);

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
  // LOCK BACKGROUND SCROLL WHEN MODAL IS OPEN
  // Restore previous styles and scroll position on cleanup.
  // =========================================================

  useEffect(() => {
    const modalOpen =
      showAddProperty || showEditProperty;

    if (!modalOpen) {
      return;
    }

    const savedScrollPosition = window.scrollY;

    const previousBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };

    const previousHtmlStyles = {
      overflow: document.documentElement.style.overflow,
      overscrollBehavior:
        document.documentElement.style.overscrollBehavior,
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollPosition}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior =
      "none";

    return () => {
      document.body.style.position =
        previousBodyStyles.position;
      document.body.style.top =
        previousBodyStyles.top;
      document.body.style.left =
        previousBodyStyles.left;
      document.body.style.right =
        previousBodyStyles.right;
      document.body.style.width =
        previousBodyStyles.width;
      document.body.style.overflow =
        previousBodyStyles.overflow;

      document.documentElement.style.overflow =
        previousHtmlStyles.overflow;

      document.documentElement.style.overscrollBehavior =
        previousHtmlStyles.overscrollBehavior;

      window.scrollTo(0, savedScrollPosition);
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
        String(property.name || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(property.location || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(property.address || "")
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
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      address: "",
      floors: "",
      status: "Active",
    });
  };

  // =========================================================
  // OPEN ADD PROPERTY MODAL
  // =========================================================

  const handleOpenAddProperty = () => {
    resetForm();
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
  // VALIDATE PROPERTY FORM
  // =========================================================

  const validatePropertyForm = () => {
    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      !formData.address.trim() ||
      !formData.floors
    ) {
      setError("Please fill in all required fields.");
      return false;
    }

    const floorCount = Number(formData.floors);

    if (
      !Number.isFinite(floorCount) ||
      !Number.isInteger(floorCount) ||
      floorCount < 1
    ) {
      setError(
        "Total floors must be a whole number of at least 1."
      );
      return false;
    }

    return true;
  };

  // =========================================================
  // CHECK DUPLICATE PROPERTY NAME
  // =========================================================

  const propertyNameExists = (
    name,
    excludedId = null
  ) => {
    const normalizedName = name.trim().toLowerCase();

    return properties.some(
      (property) =>
        property.id !== excludedId &&
        String(property.name || "")
          .trim()
          .toLowerCase() === normalizedName
    );
  };

  // =========================================================
  // ADD PROPERTY
  // =========================================================

  const handleAddProperty = (event) => {
    event.preventDefault();

    if (!validatePropertyForm()) {
      return;
    }

    if (propertyNameExists(formData.name)) {
      setError(
        "A property with this name already exists."
      );
      return;
    }

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

    setProperties((previousProperties) => [
      ...previousProperties,
      newProperty,
    ]);

    setShowAddProperty(false);
    resetForm();
    setError("");
  };

  // =========================================================
  // OPEN EDIT PROPERTY MODAL
  // =========================================================

  const handleEditProperty = (property) => {
    setFormData({
      name: property.name || "",
      location: property.location || "",
      address: property.address || "",
      floors: String(property.floors ?? ""),
      status: property.status || "Active",
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

    if (!validatePropertyForm()) {
      return;
    }

    if (
      propertyNameExists(
        formData.name,
        editingPropertyId
      )
    ) {
      setError(
        "A property with this name already exists."
      );
      return;
    }

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

    setShowEditProperty(false);
    setEditingPropertyId(null);
    resetForm();
    setError("");
  };

  // =========================================================
  // CLOSE EDIT PROPERTY MODAL
  // =========================================================

  const handleCloseEditProperty = () => {
    setShowEditProperty(false);
    setEditingPropertyId(null);
    setError("");
    resetForm();
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
  // REUSABLE FORM CONTENT
  // =========================================================

  const renderPropertyForm = (
    handleSubmit,
    handleCancel,
    submitLabel,
    formId
  ) => (
    <form
      onSubmit={handleSubmit}
      className="p-5 space-y-4"
    >
      {/* PROPERTY NAME */}

      <div>
        <label
          htmlFor={`${formId}-name`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Property Name
        </label>

        <input
          id={`${formId}-name`}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Green View Apartments"
          required
          className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* LOCATION */}

      <div>
        <label
          htmlFor={`${formId}-location`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Location
        </label>

        <input
          id={`${formId}-location`}
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Bhopal"
          required
          className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* ADDRESS */}

      <div>
        <label
          htmlFor={`${formId}-address`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Address
        </label>

        <textarea
          id={`${formId}-address`}
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter complete property address"
          rows="3"
          required
          className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* TOTAL FLOORS */}

      <div>
        <label
          htmlFor={`${formId}-floors`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Total Floors
        </label>

        <input
          id={`${formId}-floors`}
          type="number"
          name="floors"
          value={formData.floors}
          onChange={handleChange}
          placeholder="e.g. 5"
          min="1"
          step="1"
          required
          className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* STATUS */}

      <div>
        <label
          htmlFor={`${formId}-status`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Status
        </label>

        <select
          id={`${formId}-status`}
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* ERROR */}

      {error && (
        <p
          role="alert"
          className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2"
        >
          {error}
        </p>
      )}

      {/* BUTTONS */}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={handleCancel}
          className="w-full sm:w-1/2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="w-full sm:w-1/2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden transition-colors duration-300">

      {/* COMMON NAVBAR */}

      <Navbar />

      {/* MAIN CONTENT */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* PAGE HEADER */}

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              My Properties
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-1">
              View and manage all your rental properties.
            </p>
          </div>

          {/* ADD PROPERTY BUTTON */}

          <button
            type="button"
            onClick={handleOpenAddProperty}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm shrink-0"
          >
            <Plus size={20} />
            <span>Add Property</span>
          </button>
        </div>

        {/* PROPERTY SUMMARY CARDS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {/* TOTAL PROPERTIES */}

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Properties
                </p>

                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
                  {totalProperties}
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <Building2
                  size={23}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>
          </div>

          {/* ACTIVE PROPERTIES */}

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Active Properties
                </p>

                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {activeProperties}
                </p>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <CheckCircle2
                  size={23}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
            </div>
          </div>

          {/* TOTAL ROOMS */}

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Rooms
                </p>

                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
                  {totalRooms}
                </p>
              </div>

              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <Home
                  size={23}
                  className="text-indigo-600 dark:text-indigo-400"
                />
              </div>
            </div>
          </div>

          {/* AVAILABLE ROOMS */}

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Available Rooms
                </p>

                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                  {availableRooms}
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <DoorOpen
                  size={23}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>
          </div>

        </div>

        {/* SEARCH SECTION */}

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 mb-6">
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
                aria-label="Search properties"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                  aria-label="Clear property search"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* SEARCH RESULT COUNT */}

            <div className="flex items-center justify-center sm:justify-start px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
              {filteredProperties.length}{" "}
              {filteredProperties.length === 1
                ? "property"
                : "properties"}
            </div>

          </div>
        </div>

        {/* PROPERTY CARDS */}

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {filteredProperties.map((property) => (

              <div
                key={property.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >

                {/* PROPERTY HEADER */}

                <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start gap-3">

                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg shrink-0">
                      <Building2
                        size={26}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 truncate">
                        {property.name}
                      </h3>

                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mt-1">
                        <MapPin size={15} />

                        <span className="truncate">
                          {property.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* STATUS */}

                  <span
                    className={`px-3 py-1 rounded-full text-sm shrink-0 ${
                      property.status === "Active"
                        ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {property.status}
                  </span>

                </div>

                {/* PROPERTY INFORMATION */}

                <div className="p-5">

                  {/* ADDRESS */}

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Address
                    </p>

                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {property.address}
                    </p>
                  </div>

                  {/* PROPERTY STATS */}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">

                    {/* FLOORS */}

                    <div className="bg-gray-50 dark:bg-gray-700/60 rounded-lg p-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Floors
                      </p>

                      <p className="text-xl font-bold mt-1 text-gray-800 dark:text-gray-100">
                        {property.floors}
                      </p>
                    </div>

                    {/* ROOMS */}

                    <div className="bg-gray-50 dark:bg-gray-700/60 rounded-lg p-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Rooms
                      </p>

                      <p className="text-xl font-bold mt-1 text-gray-800 dark:text-gray-100">
                        {property.rooms}
                      </p>
                    </div>

                    {/* AVAILABLE */}

                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Available
                      </p>

                      <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
                        {property.available}
                      </p>
                    </div>

                    {/* OCCUPIED */}

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Occupied
                      </p>

                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                        {property.occupied}
                      </p>
                    </div>

                  </div>

                  {/* ACTION BUTTONS */}

                  <div className="flex gap-3 mt-5">

                    {/* VIEW DETAILS */}

                    <button
                      type="button"
                      onClick={() =>
                        handleViewProperty(property.id)
                      }
                      className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      <Eye size={18} />
                      <span>View Details</span>
                    </button>

                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() =>
                        handleEditProperty(property)
                      }
                      className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
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

          /* NO SEARCH RESULTS */

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-10 text-center">

            <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <Search
                size={28}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              No properties found
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseAddProperty();
            }
          }}
        >

          <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">

              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Add New Property
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Add a new rental property to your account.
                </p>
              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={handleCloseAddProperty}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                aria-label="Close add property form"
              >
                <X
                  size={22}
                  className="text-gray-600 dark:text-gray-300"
                />
              </button>

            </div>

            {/* SCROLLABLE FORM CONTENT */}

            <div className="max-h-[calc(90vh-85px)] overflow-y-auto">

              {renderPropertyForm(
                handleAddProperty,
                handleCloseAddProperty,
                "Add Property",
                "add-property"
              )}

            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          EDIT PROPERTY MODAL
      ===================================================== */}

      {showEditProperty && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseEditProperty();
            }
          }}
        >

          <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">

            {/* EDIT MODAL HEADER */}

            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">

              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Edit Property
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Update your property information.
                </p>
              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={handleCloseEditProperty}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                aria-label="Close edit property form"
              >
                <X
                  size={22}
                  className="text-gray-600 dark:text-gray-300"
                />
              </button>

            </div>

            {/* SCROLLABLE EDIT FORM */}

            <div className="max-h-[calc(90vh-85px)] overflow-y-auto">

              {renderPropertyForm(
                handleSaveProperty,
                handleCloseEditProperty,
                "Save Changes",
                "edit-property"
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Properties;
