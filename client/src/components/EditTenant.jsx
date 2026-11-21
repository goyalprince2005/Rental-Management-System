
import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowLeft,
  Save,
  CalendarDays,
} from "lucide-react";

import Navbar from "./Navbar";
import TenantNavbar from "./TenantNavbar";

// =========================================================
// STORAGE
// =========================================================

const TENANTS_STORAGE_KEY = "rentalManagementTenants";

const defaultTenants = [
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

const getStoredTenants = () => {
  try {
    const storedTenants = localStorage.getItem(
      TENANTS_STORAGE_KEY
    );

    if (storedTenants) {
      const parsedTenants = JSON.parse(storedTenants);

      if (Array.isArray(parsedTenants)) {
        return parsedTenants;
      }
    }
  } catch (error) {
    console.error("Unable to read tenant data:", error);
  }

  return defaultTenants;
};

function EditTenant() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const isTenantView = searchParams.get("view") === "tenant";

  // =========================================================
  // TENANT DATA
  // =========================================================

  const [tenantList, setTenantList] = useState(getStoredTenants);

  const existingTenant = tenantList.find(
    (tenant) => String(tenant.id) === String(id)
  );

  // =========================================================
  // FORM STATE
  // =========================================================

  const [tenantData, setTenantData] = useState(() => {
    const tenants = getStoredTenants();

    const tenant = tenants.find(
      (item) => String(item.id) === String(id)
    );

    return tenant
      ? { ...tenant }
      : {
          name: "",
          phone: "",
          property: "",
          room: "",
          rent: "",
          status: "Active",
          joiningDate: "",
          rentDueDay: "",
        };
  });

  // =========================================================
  // RESET PAGE SCROLL
  // =========================================================

  useEffect(() => {
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
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    if (!tenantData.name.trim()) {
      alert("Please enter tenant name.");
      return false;
    }

    if (!tenantData.phone.trim()) {
      alert("Please enter phone number.");
      return false;
    }

    if (!/^\d{10}$/.test(tenantData.phone.trim())) {
      alert("Phone number must contain exactly 10 digits.");
      return false;
    }

    // Tenant view: only personal details can be edited.
    if (isTenantView) {
      return true;
    }

    if (!tenantData.property.trim()) {
      alert("Please enter property.");
      return false;
    }

    if (!tenantData.room.trim()) {
      alert("Please enter room number.");
      return false;
    }

    if (
      tenantData.rent === "" ||
      !Number.isFinite(Number(tenantData.rent)) ||
      Number(tenantData.rent) <= 0
    ) {
      alert("Please enter a valid monthly rent.");
      return false;
    }

    if (!tenantData.joiningDate) {
      alert("Please select the tenant joining date.");
      return false;
    }

    const dueDay = Number(tenantData.rentDueDay);

    if (
      !tenantData.rentDueDay ||
      !Number.isInteger(dueDay) ||
      dueDay < 1 ||
      dueDay > 31
    ) {
      alert("Rent due day must be between 1 and 31.");
      return false;
    }

    return true;
  };

  // =========================================================
  // SAVE TENANT
  // =========================================================

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const updatedTenant = {
      ...tenantData,
      id: String(id),
      name: tenantData.name.trim(),
      phone: tenantData.phone.trim(),
    };

    const updatedTenants = tenantList.map((tenant) =>
      String(tenant.id) === String(id)
        ? {
            ...tenant,
            ...updatedTenant,
          }
        : tenant
    );

    try {
      localStorage.setItem(
        TENANTS_STORAGE_KEY,
        JSON.stringify(updatedTenants)
      );

      setTenantList(updatedTenants);

      alert("Tenant details updated successfully.");

      navigate(
        isTenantView
          ? `/tenant-details/${id}?view=tenant`
          : `/tenant-details/${id}`
      );
    } catch (error) {
      console.error("Unable to save tenant details:", error);
      alert("Unable to save tenant details. Please try again.");
    }
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
      <div className="min-h-screen overflow-y-auto bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
        {isTenantView ? <TenantNavbar /> : <Navbar />}

        <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-xl shadow-sm text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Tenant Not Found
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              The requested tenant does not exist.
            </p>

            <button
              type="button"
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

  // =========================================================
  // REUSABLE INPUT CLASS
  // =========================================================

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-100 overflow-y-auto overflow-x-hidden">
      {/* NAVBAR */}

      {isTenantView ? <TenantNavbar /> : <Navbar />}

      {/* MAIN CONTENT */}

      <main className="w-full max-w-3xl mx-auto p-4 md:p-6 pb-12">
        {/* PAGE HEADING */}

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            {isTenantView
              ? "Edit My Details"
              : `Edit Tenant ${id}`}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {isTenantView
              ? "Update your personal information."
              : "Update the information of this tenant."}
          </p>
        </div>

        {/* FORM CARD */}

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* CARD HEADER */}

          <div className="p-5 md:p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              Tenant Information
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Update tenant details and rental information.
            </p>
          </div>

          {/* FORM */}

          <div className="p-5 md:p-6">
            <div className="space-y-5">
              {/* NAME */}

              <div>
                <label className={labelClass}>
                  Tenant Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={tenantData.name}
                  onChange={handleChange}
                  placeholder="Enter tenant name"
                  className={inputClass}
                />
              </div>

              {/* PHONE */}

              <div>
                <label className={labelClass}>
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={tenantData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  maxLength={10}
                  inputMode="numeric"
                  className={inputClass}
                />
              </div>

              {/* OWNER ONLY FIELDS */}

              {!isTenantView && (
                <>
                  {/* PROPERTY */}

                  <div>
                    <label className={labelClass}>
                      Property
                    </label>

                    <input
                      type="text"
                      name="property"
                      value={tenantData.property}
                      onChange={handleChange}
                      placeholder="Enter property name"
                      className={inputClass}
                    />
                  </div>

                  {/* ROOM */}

                  <div>
                    <label className={labelClass}>
                      Room
                    </label>

                    <input
                      type="text"
                      name="room"
                      value={tenantData.room}
                      onChange={handleChange}
                      placeholder="Enter room number"
                      className={inputClass}
                    />
                  </div>

                  {/* RENT */}

                  <div>
                    <label className={labelClass}>
                      Monthly Rent
                    </label>

                    <input
                      type="number"
                      name="rent"
                      value={tenantData.rent}
                      onChange={handleChange}
                      placeholder="Enter monthly rent"
                      min="1"
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </div>

                  {/* STATUS */}

                  <div>
                    <label className={labelClass}>
                      Status
                    </label>

                    <select
                      name="status"
                      value={tenantData.status}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="Active">Active</option>
                      <option value="Due">Due</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* JOINING DATE */}

                  <div>
                    <label className={labelClass}>
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
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>

                  {/* RENT DUE DAY */}

                  <div>
                    <label className={labelClass}>
                      Rent Due Day
                    </label>

                    <select
                      name="rentDueDay"
                      value={tenantData.rentDueDay}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select due day</option>

                      {Array.from(
                        { length: 31 },
                        (_, index) => index + 1
                      ).map((day) => (
                        <option key={day} value={String(day)}>
                          {day}
                        </option>
                      ))}
                    </select>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Rent will be due on this day of every month.
                    </p>
                  </div>

                  {/* PAYMENT RULE */}

                  <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                      Rent Payment Rule
                    </p>

                    <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                      A late penalty of ₹50 per day will be applied
                      after the rent due date.
                    </p>
                  </div>
                </>
              )}

              {/* TENANT VIEW NOTE */}

              {isTenantView && (
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Property, room, rent, status, joining date,
                    and rent due day are managed by the owner.
                  </p>
                </div>
              )}

              {/* BUTTONS */}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-5 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
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
