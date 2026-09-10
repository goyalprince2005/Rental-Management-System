import React, { useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Save,
  CalendarDays,
  User,
  Phone,
  Building2,
  DoorOpen,
  IndianRupee,
  Clock,
} from "lucide-react";

import Navbar from "./Navbar";
import TenantNavbar from "./TenantNavbar";

function EditTenant() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  // =========================================================
  // CHECK TENANT VIEW
  // =========================================================

  const isTenantView =
    searchParams.get("view") === "tenant";

  // =========================================================
  // MOCK TENANT DATA
  // =========================================================

  const tenants = [
    {
      id: "1",
      name: "Rahul Sharma",
      phone: "9876543210",
      property: "Green View Apartments",
      room: "101",
      rent: "5000",
      status: "Active",
      joiningDate: "2026-01-10",
      rentDueDay: "10",
    },

    {
      id: "2",
      name: "Aman Kumar",
      phone: "9876543211",
      property: "Green View Apartments",
      room: "102",
      rent: "6000",
      status: "Active",
      joiningDate: "2026-02-05",
      rentDueDay: "5",
    },

    {
      id: "3",
      name: "Neha Sharma",
      phone: "9876543212",
      property: "Shyam Residency",
      room: "203",
      rent: "5500",
      status: "Due",
      joiningDate: "2026-03-15",
      rentDueDay: "15",
    },
  ];

  // =========================================================
  // FIND TENANT
  // =========================================================

  const existingTenant = tenants.find(
    (tenant) => tenant.id === id
  );

  // =========================================================
  // FORM STATE
  // =========================================================

  const [tenantData, setTenantData] = useState(
    existingTenant || {
      id,
      name: "",
      phone: "",
      property: "",
      room: "",
      rent: "",
      status: "Active",
      joiningDate: "",
      rentDueDay: "",
    }
  );

  const [error, setError] = useState("");

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTenantData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // =========================================================
  // HANDLE JOINING DATE
  // =========================================================

  const handleJoiningDateChange = (event) => {
    const value = event.target.value;

    setTenantData((previous) => ({
      ...previous,
      joiningDate: value,
    }));

    setError("");
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    if (!tenantData.name.trim()) {
      return "Please enter tenant name.";
    }

    if (!tenantData.phone.trim()) {
      return "Please enter phone number.";
    }

    if (!/^\d{10}$/.test(tenantData.phone.trim())) {
      return "Phone number must contain exactly 10 digits.";
    }

    if (!isTenantView) {
      if (!tenantData.property.trim()) {
        return "Please enter property name.";
      }

      if (!tenantData.room.trim()) {
        return "Please enter room number.";
      }

      if (!tenantData.rent) {
        return "Please enter monthly rent.";
      }

      if (Number(tenantData.rent) <= 0) {
        return "Monthly rent must be greater than 0.";
      }

      if (!tenantData.joiningDate) {
        return "Please select joining date.";
      }

      if (!tenantData.rentDueDay) {
        return "Please select rent due day.";
      }

      if (
        Number(tenantData.rentDueDay) < 1 ||
        Number(tenantData.rentDueDay) > 31
      ) {
        return "Rent due day must be between 1 and 31.";
      }
    }

    return "";
  };

  // =========================================================
  // HANDLE SAVE
  // =========================================================

  const handleSave = () => {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    // =======================================================
    // MOCK SAVE
    // =======================================================

    console.log(
      "Updated Tenant Data:",
      tenantData
    );

    alert("Tenant details updated successfully.");

    navigate(
      isTenantView
        ? `/tenant-details/${id}?view=tenant`
        : `/tenant-details/${id}`
    );
  };

  // =========================================================
  // HANDLE CANCEL
  // =========================================================

  const handleCancel = () => {
    navigate(
      isTenantView
        ? `/tenant-details/${id}?view=tenant`
        : `/tenant-details/${id}`
    );
  };

  // =========================================================
  // TENANT NOT FOUND
  // =========================================================

  if (!existingTenant) {
    return (
      <div className="min-h-screen bg-gray-100">

        {isTenantView ? <TenantNavbar /> : <Navbar />}

        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">

          <div className="bg-white rounded-xl shadow-sm border p-8 text-center max-w-md w-full">

            <div className="w-16 h-16 mx-auto bg-red-50 rounded-full flex items-center justify-center">

              <User
                size={30}
                className="text-red-500"
              />

            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-5">
              Tenant Not Found
            </h2>

            <p className="text-gray-500 mt-2">
              The requested tenant does not exist.
            </p>

            <button
              type="button"
              onClick={handleCancel}
              className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
            >
              Go Back
            </button>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ===================================================== */}
      {/* NAVBAR */}
      {/* ===================================================== */}

      {isTenantView ? <TenantNavbar /> : <Navbar />}

      {/* ===================================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <main className="p-4 md:p-6 max-w-3xl mx-auto">

        {/* ================================================= */}
        {/* PAGE HEADER */}
        {/* ================================================= */}

        <div className="mb-6">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">

            {isTenantView
              ? "Edit My Details"
              : `Edit Tenant ${id}`}

          </h1>

          <p className="text-gray-500 mt-1">

            {isTenantView
              ? "Update your personal information."
              : "Update the information of this tenant."}

          </p>

        </div>

        {/* ================================================= */}
        {/* FORM CARD */}
        {/* ================================================= */}

        <div className="bg-white rounded-xl shadow-sm border p-6">

          <div className="space-y-5">

            {/* ================================================= */}
            {/* NAME */}
            {/* ================================================= */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tenant Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="name"
                  value={tenantData.name}
                  onChange={handleChange}
                  placeholder="Enter tenant name"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* ================================================= */}
            {/* PHONE */}
            {/* ================================================= */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={tenantData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10 digit phone number"
                  maxLength="10"
                  inputMode="numeric"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* ================================================= */}
            {/* OWNER ONLY FIELDS */}
            {/* ================================================= */}

            {!isTenantView && (
              <>

                {/* PROPERTY */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property
                  </label>

                  <div className="relative">

                    <Building2
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="property"
                      value={tenantData.property}
                      onChange={handleChange}
                      placeholder="Enter property name"
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>

                {/* ROOM */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room
                  </label>

                  <div className="relative">

                    <DoorOpen
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="room"
                      value={tenantData.room}
                      onChange={handleChange}
                      placeholder="Enter room number"
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>

                {/* RENT */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Rent
                  </label>

                  <div className="relative">

                    <IndianRupee
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="number"
                      name="rent"
                      value={tenantData.rent}
                      onChange={handleChange}
                      placeholder="Enter monthly rent"
                      min="1"
                      inputMode="numeric"
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>

                {/* STATUS */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={tenantData.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Due">
                      Due
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

                {/* JOINING DATE */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Joining Date
                  </label>

                  <div className="relative">

                    <CalendarDays
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="date"
                      name="joiningDate"
                      value={tenantData.joiningDate}
                      onChange={handleJoiningDateChange}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>

                {/* RENT DUE DAY */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rent Due Day
                  </label>

                  <div className="relative">

                    <Clock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <select
                      name="rentDueDay"
                      value={tenantData.rentDueDay}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >

                      <option value="">
                        Select due day
                      </option>

                      {Array.from(
                        { length: 31 },
                        (_, index) => index + 1
                      ).map((day) => (
                        <option
                          key={day}
                          value={day}
                        >
                          {day}
                        </option>
                      ))}

                    </select>

                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Rent will be due on this day every month.
                  </p>

                </div>

                {/* PAYMENT RULE */}

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">

                  <p className="text-sm font-semibold text-yellow-800">
                    Rent Payment Rule
                  </p>

                  <p className="text-sm text-yellow-700 mt-1">
                    A late penalty of ₹50 per day will be
                    applied after the rent due date.
                  </p>

                </div>

              </>
            )}

            {/* ================================================= */}
            {/* TENANT VIEW NOTE */}
            {/* ================================================= */}

            {isTenantView && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">

                <p className="text-sm text-blue-700">
                  Property, room, rent, status, joining date,
                  and rent due day are managed by the owner.
                </p>

              </div>
            )}

            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">

                <p className="text-sm text-red-600">
                  {error}
                </p>

              </div>
            )}

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
                type="button"
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
              >

                <Save size={18} />

                Save Changes

              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default EditTenant;