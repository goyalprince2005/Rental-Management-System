import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Navbar from "./Navbar";

function EditTenant() {
  const navigate = useNavigate();
  const { id } = useParams();

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
    },
  ];

  const existingTenant = tenants.find(
    (tenant) => tenant.id === id
  );

  const [tenantData, setTenantData] = useState(
    existingTenant || {
      name: "",
      phone: "",
      property: "",
      room: "",
      rent: "",
      status: "Active",
      joiningDate: "",
    }
  );

  const handleChange = (e) => {
    setTenantData({
      ...tenantData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    navigate(`/tenant-details/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= COMMON NAVBAR ================= */}

      <Navbar />

      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-3xl mx-auto">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Edit Tenant {id}
          </h1>

          <p className="text-gray-500 mt-1">
            Update the information of this tenant.
          </p>

        </div>

        {/* ================= FORM CARD ================= */}

        <div className="bg-white rounded-xl shadow-sm border p-6">

          <div className="space-y-5">

            {/* Name */}

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

            {/* Phone */}

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

            {/* Property */}

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

            {/* Room */}

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

            {/* Monthly Rent */}

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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status */}

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
                <option value="Active">Active</option>
                <option value="Due">Due</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Joining Date */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Joining Date
              </label>

              <input
                type="date"
                name="joiningDate"
                value={tenantData.joiningDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ================= BUTTONS ================= */}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">

              {/* Cancel */}

              <button
                type="button"
                onClick={() =>
                  navigate(`/tenant-details/${id}`)
                }
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