import React from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Building2,
  DoorOpen,
  IndianRupee,
  Eye,
  Pencil,
} from "lucide-react";
import Navbar from "./Navbar";

function Tenants() {
  const navigate = useNavigate();

  // ================= TENANT DATA =================

  const tenants = [
    {
      id: 1,
      name: "Rahul Sharma",
      property: "Green View Apartments",
      room: "101",
      rent: "₹5,000",
      status: "Active",
    },
    {
      id: 2,
      name: "Aman Kumar",
      property: "Green View Apartments",
      room: "102",
      rent: "₹6,000",
      status: "Active",
    },
    {
      id: 3,
      name: "Neha Sharma",
      property: "Shyam Residency",
      room: "203",
      rent: "₹5,500",
      status: "Due",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= COMMON NAVBAR ================= */}

      <Navbar />


      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            All Tenants
          </h2>

          <p className="text-gray-500 mt-1">
            View and manage tenants across your properties.
          </p>

        </div>


        {/* ================= TENANT CARDS ================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {tenants.map((tenant) => (

            <div
              key={tenant.id}
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
            >

              {/* ================= CARD HEADER ================= */}

              <div className="p-5 border-b flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="p-3 bg-blue-50 rounded-xl">

                    <User
                      size={26}
                      className="text-blue-600"
                    />

                  </div>

                  <div>

                    <h3 className="font-bold text-lg text-gray-800">
                      {tenant.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Tenant
                    </p>

                  </div>

                </div>


                {/* ================= STATUS ================= */}

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    tenant.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {tenant.status}
                </span>

              </div>


              {/* ================= TENANT INFORMATION ================= */}

              <div className="p-5 space-y-3">

                {/* PROPERTY */}

                <div className="flex items-center gap-3 text-gray-600">

                  <Building2 size={18} />

                  <span className="text-sm">
                    {tenant.property}
                  </span>

                </div>


                {/* ROOM */}

                <div className="flex items-center gap-3 text-gray-600">

                  <DoorOpen size={18} />

                  <span className="text-sm">
                    Room {tenant.room}
                  </span>

                </div>


                {/* RENT */}

                <div className="flex items-center gap-3 text-gray-600">

                  <IndianRupee size={18} />

                  <span className="text-sm font-medium">
                    {tenant.rent} / month
                  </span>

                </div>

              </div>


              {/* ================= ACTION BUTTONS ================= */}

              <div className="p-5 border-t flex gap-3">

                {/* VIEW DETAILS */}

                <button
                  onClick={() =>
                    navigate(`/tenant-details/${tenant.id}`)
                  }
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition"
                >

                  <Eye size={18} />

                  View Details

                </button>


                {/* EDIT */}

                <button
                  onClick={() =>
                    navigate(`/edit-tenant/${tenant.id}`)
                  }
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition"
                >

                  <Pencil size={18} />

                  Edit

                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Tenants;