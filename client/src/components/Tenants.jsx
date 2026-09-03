import React from "react";
import Navbar from "./Navbar";
import TenantCard from "./TenantCard";

function Tenants() {

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
            <TenantCard
              key={tenant.id}
              tenant={tenant}
            />
          ))}

        </div>

      </main>

    </div>
  );
}

export default Tenants;