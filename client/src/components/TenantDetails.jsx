import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Building2,
  DoorOpen,
  IndianRupee,
  Phone,
  Calendar,
} from "lucide-react";
import Navbar from "./Navbar";

function TenantDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const tenants = {
    1: {
      name: "Rahul Sharma",
      property: "Green View Apartments",
      location: "Bhopal",
      room: "101",
      rent: "₹5,000",
      status: "Active",
      phone: "9876543210",
      joiningDate: "January 10, 2026",
    },

    2: {
      name: "Aman Kumar",
      property: "Green View Apartments",
      location: "Bhopal",
      room: "102",
      rent: "₹6,000",
      status: "Active",
      phone: "9876543211",
      joiningDate: "February 05, 2026",
    },

    3: {
      name: "Neha Sharma",
      property: "Shyam Residency",
      location: "Bhopal",
      room: "203",
      rent: "₹5,500",
      status: "Due",
      phone: "9876543212",
      joiningDate: "March 15, 2026",
    },
  };

  const tenant = tenants[id];

  if (!tenant) {
    return (
      <div className="min-h-screen bg-gray-100">

        <Navbar />

        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">

            <h2 className="text-2xl font-bold text-gray-800">
              Tenant Not Found
            </h2>

            <p className="text-gray-500 mt-2">
              The requested tenant does not exist.
            </p>

            <button
              onClick={() => navigate("/tenants")}
              className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Back to Tenants
            </button>

          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= COMMON NAVBAR ================= */}

      <Navbar />


      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-5xl mx-auto">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {tenant.name}
          </h2>

          <p className="text-gray-500 mt-1">
            Complete information about this tenant.
          </p>

        </div>


        {/* ================= TENANT CARD ================= */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          {/* ================= TENANT HEADER ================= */}

          <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex items-center gap-4">

              <div className="p-4 bg-blue-50 rounded-xl">

                <User
                  size={32}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h3 className="text-2xl font-bold text-gray-800">
                  {tenant.name}
                </h3>

                <p className="text-gray-500 mt-1">
                  Tenant ID: {id}
                </p>

              </div>

            </div>


            {/* ================= STATUS ================= */}

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                tenant.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {tenant.status}
            </span>

          </div>


          {/* ================= TENANT INFORMATION ================= */}

          <div className="p-6">

            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Tenant Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Phone */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">

                  <Phone size={18} />

                  <p className="text-sm">
                    Phone
                  </p>

                </div>

                <p className="font-bold mt-2">
                  {tenant.phone}
                </p>

              </div>


              {/* Property */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">

                  <Building2 size={18} />

                  <p className="text-sm">
                    Property
                  </p>

                </div>

                <p className="font-bold mt-2">
                  {tenant.property}
                </p>

              </div>


              {/* Room */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">

                  <DoorOpen size={18} />

                  <p className="text-sm">
                    Room
                  </p>

                </div>

                <p className="font-bold mt-2">
                  {tenant.room}
                </p>

              </div>


              {/* Rent */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">

                  <IndianRupee size={18} />

                  <p className="text-sm">
                    Monthly Rent
                  </p>

                </div>

                <p className="font-bold mt-2">
                  {tenant.rent}
                </p>

              </div>


              {/* Joining Date */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">

                  <Calendar size={18} />

                  <p className="text-sm">
                    Joining Date
                  </p>

                </div>

                <p className="font-bold mt-2">
                  {tenant.joiningDate}
                </p>

              </div>


              {/* Location */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">

                  <Building2 size={18} />

                  <p className="text-sm">
                    Location
                  </p>

                </div>

                <p className="font-bold mt-2">
                  {tenant.location}
                </p>

              </div>

            </div>


            {/* ================= PROPERTY INFORMATION ================= */}

            <div className="mt-8">

              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Property Information
              </h3>

              <div className="border rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <div className="p-3 bg-blue-50 rounded-lg">

                    <Building2
                      size={24}
                      className="text-blue-600"
                    />

                  </div>

                  <div>

                    <h4 className="font-bold text-lg">
                      {tenant.property}
                    </h4>

                    <p className="text-sm text-gray-500">
                      📍 {tenant.location}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* ================= ACTION BUTTONS ================= */}

            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              <button
                onClick={() => navigate("/tenants")}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition"
              >

                <ArrowLeft size={18} />

                Back to Tenants

              </button>


              <button
                onClick={() => navigate(`/edit-tenant/${id}`)}
                className="flex-1 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Edit Tenant
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default TenantDetails;