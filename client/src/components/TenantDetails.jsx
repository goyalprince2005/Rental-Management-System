import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import {
  ArrowLeft,
  User,
  Building2,
  DoorOpen,
  IndianRupee,
  Phone,
  Calendar,
  Clock,
} from "lucide-react";

import Navbar from "./Navbar";
import TenantNavbar from "./TenantNavbar";

function TenantDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  // =========================================================
  // CHECK TENANT VIEW
  // =========================================================

  const isTenantView = searchParams.get("view") === "tenant";

  // =========================================================
  // TENANT DATA
  // =========================================================

  const tenants = {
    1: {
      id: 1,
      name: "Rahul Sharma",
      property: "Green View Apartments",
      location: "Bhopal",
      room: "101",
      rent: "₹5,000",
      rentDueDay: 10,
      status: "Active",
      phone: "9876543210",
      joiningDate: "January 10, 2026",
    },

    2: {
      id: 2,
      name: "Aman Kumar",
      property: "Green View Apartments",
      location: "Bhopal",
      room: "102",
      rent: "₹6,000",
      rentDueDay: 5,
      status: "Active",
      phone: "9876543211",
      joiningDate: "February 05, 2026",
    },

    3: {
      id: 3,
      name: "Neha Sharma",
      property: "Shyam Residency",
      location: "Bhopal",
      room: "203",
      rent: "₹5,500",
      rentDueDay: 15,
      status: "Due",
      phone: "9876543212",
      joiningDate: "March 15, 2026",
    },
  };

  const tenant = tenants[id];

  // =========================================================
  // HELPER FUNCTIONS
  // =========================================================

  const getBackPath = () => {
    return isTenantView ? "/tenant-dashboard" : "/tenants";
  };

  const getEditPath = () => {
    return isTenantView
      ? `/edit-tenant/${id}?view=tenant`
      : `/edit-tenant/${id}`;
  };

  const getStatusStyle = () => {
    if (tenant.status === "Active") {
      return "bg-green-100 text-green-700";
    }

    if (tenant.status === "Due") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  const getOrdinal = (number) => {
    if (number === 1) return "st";
    if (number === 2) return "nd";
    if (number === 3) return "rd";

    return "th";
  };

  // =========================================================
  // TENANT NOT FOUND
  // =========================================================

  if (!tenant) {
    return (
      <div className="min-h-screen bg-gray-100">

        {isTenantView ? <TenantNavbar /> : <Navbar />}

        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">

          <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md w-full">

            <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
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
              onClick={() => navigate(getBackPath())}
              className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
            >
              {isTenantView
                ? "Back to Dashboard"
                : "Back to Tenants"}
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

      <main className="p-4 md:p-6 max-w-5xl mx-auto">

        {/* ================================================= */}
        {/* PAGE HEADER */}
        {/* ================================================= */}

        <div className="mb-6">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {isTenantView ? "My Details" : tenant.name}
          </h1>

          <p className="text-gray-500 mt-1">
            {isTenantView
              ? "View your rental and personal information."
              : "Complete information about this tenant."}
          </p>

        </div>

        {/* ================================================= */}
        {/* TENANT CARD */}
        {/* ================================================= */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex items-center gap-4">

              <div className="p-4 bg-blue-50 rounded-xl">

                <User
                  size={32}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  {tenant.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  Tenant ID: {tenant.id}
                </p>

              </div>

            </div>

            {/* STATUS */}

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle()}`}
            >
              {tenant.status}
            </span>

          </div>

          {/* ================================================= */}
          {/* INFORMATION */}
          {/* ================================================= */}

          <div className="p-6">

            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Tenant Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* PHONE */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">
                  <Phone size={18} />
                  <p className="text-sm">Phone</p>
                </div>

                <p className="font-bold mt-2">
                  {tenant.phone}
                </p>

              </div>

              {/* PROPERTY */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">
                  <Building2 size={18} />
                  <p className="text-sm">Property</p>
                </div>

                <p className="font-bold mt-2">
                  {tenant.property}
                </p>

              </div>

              {/* ROOM */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">
                  <DoorOpen size={18} />
                  <p className="text-sm">Room</p>
                </div>

                <p className="font-bold mt-2">
                  Room {tenant.room}
                </p>

              </div>

              {/* RENT */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">
                  <IndianRupee size={18} />
                  <p className="text-sm">Monthly Rent</p>
                </div>

                <p className="font-bold mt-2">
                  {tenant.rent}
                </p>

              </div>

              {/* RENT DUE DAY */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={18} />
                  <p className="text-sm">Rent Due Day</p>
                </div>

                <p className="font-bold mt-2">
                  {tenant.rentDueDay}
                  {getOrdinal(tenant.rentDueDay)} of every month
                </p>

              </div>

              {/* JOINING DATE */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={18} />
                  <p className="text-sm">Joining Date</p>
                </div>

                <p className="font-bold mt-2">
                  {tenant.joiningDate}
                </p>

              </div>

              {/* LOCATION */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 text-gray-500">
                  <Building2 size={18} />
                  <p className="text-sm">Location</p>
                </div>

                <p className="font-bold mt-2">
                  {tenant.location}
                </p>

              </div>

            </div>

            {/* ================================================= */}
            {/* PROPERTY INFORMATION */}
            {/* ================================================= */}

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

            {/* ================================================= */}
            {/* ACTION BUTTONS */}
            {/* ================================================= */}

            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              {/* BACK */}

              <button
                type="button"
                onClick={() => navigate(getBackPath())}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                <ArrowLeft size={18} />

                {isTenantView
                  ? "Back to Dashboard"
                  : "Back to Tenants"}
              </button>

              {/* EDIT */}

              <button
                type="button"
                onClick={() => navigate(getEditPath())}
                className="flex-1 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {isTenantView
                  ? "Edit My Details"
                  : "Edit Tenant"}
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default TenantDetails;