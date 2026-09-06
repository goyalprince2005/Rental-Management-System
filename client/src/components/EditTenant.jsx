import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Save, CalendarDays } from "lucide-react";
import Navbar from "./Navbar";
import TenantNavbar from "./TenantNavbar";

function EditTenant() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const isTenantView = searchParams.get("view") === "tenant";

  /*
   * ================================
   * MOCK TENANT DATA
   * ================================
   *
   * rentDueDay is tenant-specific.
   *
   * Example:
   * Rahul -> joining date 10 -> due day 10
   * Aman  -> joining date 5  -> due day 5
   * Neha  -> joining date 15 -> due day 15
   *
   * The owner can change the due day if required.
   */
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

  /*
   * Find the tenant being edited.
   */
  const existingTenant = tenants.find(
    (tenant) => tenant.id === id
  );

  /*
   * ================================
   * FORM STATE
   * ================================
   */
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

  /*
   * ================================
   * HANDLE INPUT CHANGES
   * ================================
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    /*
     * If joining date changes and there is currently
     * no manually selected due day, use the joining
     * date's day as the default due day.
     */
    if (name === "joiningDate") {
      const selectedDate = new Date(`${value}T00:00:00`);

      if (!Number.isNaN(selectedDate.getTime())) {
        const joiningDay = selectedDate.getDate();

        setTenantData((prev) => ({
          ...prev,
          joiningDate: value,
          rentDueDay: prev.rentDueDay || String(joiningDay),
        }));

        return;
      }
    }

    setTenantData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
   * ================================
   * HANDLE SAVE
   * ================================
   */
  const handleSave = () => {
    /*
     * Basic required-field validation.
     */
    if (!tenantData.name || !tenantData.phone) {
      alert("Please enter tenant name and phone number.");
      return;
    }

    /*
     * Owner-side validation.
     */
    if (!isTenantView) {
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

    /*
     * At this stage the application is using mock data.
     *
     * Later this object will be sent to the backend API
     * and saved in MongoDB.
     */
    console.log("Updated Tenant Data:", tenantData);

    alert("Tenant details updated successfully.");

    navigate(
      isTenantView
        ? `/tenant-details/${id}?view=tenant`
        : `/tenant-details/${id}`
    );
  };

  /*
   * ================================
   * CANCEL NAVIGATION
   * ================================
   */
  const handleCancel = () => {
    navigate(
      isTenantView
        ? `/tenant-details/${id}?view=tenant`
        : `/tenant-details/${id}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}

      {isTenantView ? <TenantNavbar /> : <Navbar />}


      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-3xl mx-auto">

        {/* ================= PAGE HEADING ================= */}

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


        {/* ================= FORM CARD ================= */}

        <div className="bg-white rounded-xl shadow-sm border p-6">

          <div className="space-y-5">

            {/* ================= NAME ================= */}

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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* ================= PHONE ================= */}

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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* ================= OWNER ONLY FIELDS ================= */}

            {!isTenantView && (
              <>

                {/* ================= PROPERTY ================= */}

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
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>


                {/* ================= ROOM ================= */}

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
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>


                {/* ================= MONTHLY RENT ================= */}

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
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>


                {/* ================= STATUS ================= */}

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


                {/* ================= JOINING DATE ================= */}

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
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>


                {/* ================= RENT DUE DAY ================= */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rent Due Day
                  </label>

                  <select
                    name="rentDueDay"
                    value={tenantData.rentDueDay}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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
                    By default, the joining date can be used as the
                    due day.
                  </p>

                </div>


                {/* ================= PAYMENT RULE NOTE ================= */}

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


            {/* ================= TENANT INFORMATION NOTE ================= */}

            {isTenantView && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">

                <p className="text-sm text-blue-700">
                  Property, room, rent, status, joining date, and
                  rent due day are managed by the owner.
                </p>

              </div>
            )}


            {/* ================= BUTTONS ================= */}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">

              {/* Cancel */}

              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition"
              >

                <ArrowLeft size={18} />

                Cancel

              </button>


              {/* Save */}

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