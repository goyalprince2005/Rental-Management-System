import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  CalendarDays,
} from "lucide-react";

import Navbar from "./Navbar";
import TenantNavbar from "./TenantNavbar";

function EditTenant() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const isTenantView = searchParams.get("view") === "tenant";

  // =========================================================
  // RESET PAGE SCROLL
  // =========================================================

  useEffect(() => {
    // Make sure no previous modal/page has locked body scrolling
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";

    document.documentElement.style.overflow = "";
    document.documentElement.style.overscrollBehavior = "";

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
  }, []);

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

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "joiningDate") {
      const selectedDate = new Date(`${value}T00:00:00`);

      if (!Number.isNaN(selectedDate.getTime())) {
        const joiningDay = selectedDate.getDate();

        setTenantData((previous) => ({
          ...previous,
          joiningDate: value,
          rentDueDay:
            previous.rentDueDay || String(joiningDay),
        }));

        return;
      }
    }

    setTenantData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // SAVE
  // =========================================================

  const handleSave = () => {
    if (
      !tenantData.name.trim() ||
      !tenantData.phone.trim()
    ) {
      alert("Please enter tenant name and phone number.");
      return;
    }

    if (!/^\d{10}$/.test(tenantData.phone.trim())) {
      alert("Phone number must contain exactly 10 digits.");
      return;
    }

    if (!isTenantView) {
      if (!tenantData.property) {
        alert("Please enter property.");
        return;
      }

      if (!tenantData.room) {
        alert("Please enter room number.");
        return;
      }

      if (!tenantData.rent || Number(tenantData.rent) <= 0) {
        alert("Please enter a valid monthly rent.");
        return;
      }

      if (!tenantData.joiningDate) {
        alert("Please select the tenant joining date.");
        return;
      }

      if (!tenantData.rentDueDay) {
        alert("Please select the rent due day.");
        return;
      }

      if (
        Number(tenantData.rentDueDay) < 1 ||
        Number(tenantData.rentDueDay) > 31
      ) {
        alert("Rent due day must be between 1 and 31.");
        return;
      }
    }

    console.log("Updated Tenant Data:", tenantData);

    alert("Tenant details updated successfully.");

    navigate(
      isTenantView
        ? `/tenant-details/${id}?view=tenant`
        : `/tenant-details/${id}`
    );
  };

  // =========================================================
  // CANCEL
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
      <div className="min-h-screen overflow-y-auto bg-gray-100">

        {isTenantView ? <TenantNavbar /> : <Navbar />}

        <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6">

          <div className="bg-white p-8 rounded-xl shadow-sm text-center">

            <h2 className="text-2xl font-bold text-gray-800">
              Tenant Not Found
            </h2>

            <p className="text-gray-500 mt-2">
              The requested tenant does not exist.
            </p>

            <button
              onClick={() =>
                navigate(
                  isTenantView
                    ? "/tenant-dashboard"
                    : "/tenants"
                )
              }
              className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {isTenantView
                ? "Back to Dashboard"
                : "Back to Tenants"}
            </button>

          </div>

        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 overflow-y-auto overflow-x-hidden">

      {/* ===================================================== */}
      {/* NAVBAR */}
      {/* ===================================================== */}

      {isTenantView ? <TenantNavbar /> : <Navbar />}

      {/* ===================================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <main className="w-full max-w-3xl mx-auto p-4 md:p-6 pb-12">

        {/* ================================================= */}
        {/* PAGE HEADING */}
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

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          {/* CARD HEADER */}

          <div className="p-5 md:p-6 border-b">

            <h2 className="text-lg font-bold text-gray-800">
              Tenant Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Update tenant details and rental information.
            </p>

          </div>

          {/* ================================================= */}
          {/* FORM */}
          {/* ================================================= */}

          <div className="p-5 md:p-6">

            <div className="space-y-5">

              {/* ================================================= */}
              {/* NAME */}
              {/* ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenant Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={tenantData.name}
                  onChange={handleChange}
                  placeholder="Enter tenant name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>

              {/* ================================================= */}
              {/* PHONE */}
              {/* ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={tenantData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  maxLength="10"
                  inputMode="numeric"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>

              {/* ================================================= */}
              {/* OWNER ONLY */}
              {/* ================================================= */}

              {!isTenantView && (
                <>

                  {/* PROPERTY */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property
                    </label>

                    <input
                      type="text"
                      name="property"
                      value={tenantData.property}
                      onChange={handleChange}
                      placeholder="Enter property name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                  </div>

                  {/* ROOM */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room
                    </label>

                    <input
                      type="text"
                      name="room"
                      value={tenantData.room}
                      onChange={handleChange}
                      placeholder="Enter room number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                  </div>

                  {/* RENT */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Rent
                    </label>

                    <input
                      type="number"
                      name="rent"
                      value={tenantData.rent}
                      onChange={handleChange}
                      placeholder="Enter monthly rent"
                      min="0"
                      inputMode="numeric"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

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
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />

                    </div>

                  </div>

                  {/* RENT DUE DAY */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rent Due Day
                    </label>

                    <select
                      name="rentDueDay"
                      value={tenantData.rentDueDay}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

                    <p className="text-xs text-gray-500 mt-2">
                      Rent will be due on this day of every month.
                    </p>

                  </div>

                  {/* PAYMENT RULE */}

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">

                    <p className="text-sm font-medium text-yellow-800">
                      Rent Payment Rule
                    </p>

                    <p className="text-sm text-yellow-700 mt-1">
                      A late penalty of ₹50 per day will be applied
                      after the rent due date.
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
              {/* BUTTONS */}
              {/* ================================================= */}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">

                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <ArrowLeft size={18} />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  <Save size={18} />
                  Save Changes
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default EditTenant;