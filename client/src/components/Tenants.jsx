import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { Plus, X } from "lucide-react";

import Navbar from "./Navbar";
import TenantCard from "./TenantCard";

function Tenants() {
  // =========================================================
  // TENANT DATA
  // =========================================================

  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      mobile: "9876543210",
      property: "Green View Apartments",
      room: "101",
      rent: "₹5,000",
      joiningDate: "2026-01-10",
      rentDueDay: 10,
      status: "Active",
    },
    {
      id: 2,
      name: "Aman Kumar",
      mobile: "9876543211",
      property: "Green View Apartments",
      room: "102",
      rent: "₹6,000",
      joiningDate: "2026-02-05",
      rentDueDay: 5,
      status: "Active",
    },
    {
      id: 3,
      name: "Neha Sharma",
      mobile: "9876543212",
      property: "Shyam Residency",
      room: "203",
      rent: "₹5,500",
      joiningDate: "2026-03-15",
      rentDueDay: 15,
      status: "Due",
    },
  ]);

  // =========================================================
  // ADD TENANT MODAL
  // =========================================================

  const [showAddTenant, setShowAddTenant] =
    useState(false);

  // =========================================================
  // FORM DATA
  // =========================================================

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    property: "",
    room: "",
    rent: "",
    joiningDate: "",
    rentDueDay: "",
    status: "Active",
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
    if (showAddTenant) {
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
  }, [showAddTenant]);

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
  // OPEN ADD TENANT MODAL
  // =========================================================

  const handleOpenAddTenant = () => {
    setFormData({
      name: "",
      mobile: "",
      property: "",
      room: "",
      rent: "",
      joiningDate: "",
      rentDueDay: "",
      status: "Active",
    });

    setError("");
    setShowAddTenant(true);
  };

  // =========================================================
  // CLOSE ADD TENANT MODAL
  // =========================================================

  const handleCloseAddTenant = () => {
    setShowAddTenant(false);
    setError("");
  };

  // =========================================================
  // ADD TENANT
  // =========================================================

  const handleAddTenant = (event) => {
    event.preventDefault();

    // =====================================================
    // REQUIRED FIELD VALIDATION
    // =====================================================

    if (
      !formData.name.trim() ||
      !formData.mobile.trim() ||
      !formData.property ||
      !formData.room ||
      !formData.rent ||
      !formData.joiningDate ||
      !formData.rentDueDay
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // =====================================================
    // MOBILE NUMBER VALIDATION
    // =====================================================

    if (!/^\d{10}$/.test(formData.mobile.trim())) {
      setError(
        "Mobile number must contain exactly 10 digits."
      );
      return;
    }

    // =====================================================
    // RENT VALIDATION
    // =====================================================

    if (Number(formData.rent) <= 0) {
      setError("Monthly rent must be greater than 0.");
      return;
    }

    // =====================================================
    // RENT DUE DAY VALIDATION
    // =====================================================

    if (
      Number(formData.rentDueDay) < 1 ||
      Number(formData.rentDueDay) > 31
    ) {
      setError(
        "Rent due day must be between 1 and 31."
      );
      return;
    }

    // =====================================================
    // DUPLICATE MOBILE CHECK
    // =====================================================

    const mobileAlreadyExists = tenants.some(
      (tenant) =>
        tenant.mobile === formData.mobile.trim()
    );

    if (mobileAlreadyExists) {
      setError(
        "A tenant with this mobile number already exists."
      );
      return;
    }

    // =====================================================
    // DUPLICATE ROOM ASSIGNMENT CHECK
    // =====================================================

    const roomAlreadyAssigned = tenants.some(
      (tenant) =>
        tenant.property === formData.property &&
        tenant.room === formData.room &&
        tenant.status === "Active"
    );

    if (roomAlreadyAssigned) {
      setError(
        "This room is already assigned to an active tenant."
      );
      return;
    }

    // =====================================================
    // CREATE NEW TENANT
    // =====================================================

    const newTenant = {
      id: Date.now(),
      name: formData.name.trim(),
      mobile: formData.mobile.trim(),
      property: formData.property,
      room: formData.room,
      rent: `₹${Number(formData.rent).toLocaleString(
        "en-IN"
      )}`,
      joiningDate: formData.joiningDate,
      rentDueDay: Number(formData.rentDueDay),
      status: formData.status,
    };

    // =====================================================
    // UPDATE TENANT LIST
    // =====================================================

    setTenants((previousTenants) => [
      ...previousTenants,
      newTenant,
    ]);

    // =====================================================
    // CLOSE MODAL
    // =====================================================

    setShowAddTenant(false);

    setFormData({
      name: "",
      mobile: "",
      property: "",
      room: "",
      rent: "",
      joiningDate: "",
      rentDueDay: "",
      status: "Active",
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
        {/* PAGE HEADER */}
        {/* ================================================= */}

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              All Tenants
            </h2>

            <p className="text-gray-500 mt-1">
              View and manage tenants across your properties.
            </p>
          </div>

          {/* ================================================= */}
          {/* ADD TENANT BUTTON */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={handleOpenAddTenant}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm shrink-0"
          >
            <Plus size={20} />

            <span>
              Add Tenant
            </span>
          </button>

        </div>

        {/* ===================================================== */}
        {/* TENANT CARDS */}
        {/* ===================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {tenants.map((tenant) => (
            <TenantCard
              key={tenant.id}
              tenant={tenant}
            />
          ))}

        </div>

      </main>

      {/* ===================================================== */}
      {/* ADD TENANT MODAL */}
      {/* ===================================================== */}

      {showAddTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">

            {/* ================================================= */}
            {/* MODAL HEADER */}
            {/* ================================================= */}

            <div className="flex items-center justify-between px-5 py-4 border-b">

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Add New Tenant
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Add a tenant and assign a room.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseAddTenant}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Close add tenant form"
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
                onSubmit={handleAddTenant}
                className="p-5 space-y-4"
              >

                {/* ================================================= */}
                {/* TENANT NAME */}
                {/* ================================================= */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tenant Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* ================================================= */}
                {/* MOBILE NUMBER */}
                {/* ================================================= */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    maxLength="10"
                    inputMode="numeric"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* ================================================= */}
                {/* PROPERTY */}
                {/* ================================================= */}

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

                {/* ================================================= */}
                {/* ROOM */}
                {/* ================================================= */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room
                  </label>

                  <select
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">
                      Select Available Room
                    </option>

                    <option value="204">
                      Room 204 - Shyam Residency
                    </option>
                  </select>
                </div>

                {/* ================================================= */}
                {/* MONTHLY RENT */}
                {/* ================================================= */}

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
                    min="1"
                    inputMode="numeric"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* ================================================= */}
                {/* JOINING DATE */}
                {/* ================================================= */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Joining Date
                  </label>

                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* ================================================= */}
                {/* RENT DUE DAY */}
                {/* ================================================= */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rent Due Day
                  </label>

                  <input
                    type="number"
                    name="rentDueDay"
                    value={formData.rentDueDay}
                    onChange={handleChange}
                    placeholder="e.g. 10"
                    min="1"
                    max="31"
                    inputMode="numeric"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                  <p className="text-xs text-gray-500 mt-1">
                    Enter the day of the month when rent is due.
                  </p>
                </div>

                {/* ================================================= */}
                {/* STATUS */}
                {/* ================================================= */}

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

                    <option value="Due">
                      Due
                    </option>
                  </select>
                </div>

                {/* ================================================= */}
                {/* ERROR */}
                {/* ================================================= */}

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                {/* ================================================= */}
                {/* ACTION BUTTONS */}
                {/* ================================================= */}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">

                  <button
                    type="button"
                    onClick={handleCloseAddTenant}
                    className="w-full sm:w-1/2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-1/2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Add Tenant
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

export default Tenants;