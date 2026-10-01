import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  IndianRupee,
  Building2,
  Users,
  DoorOpen,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

import Navbar from "./Navbar";

function Reports() {
  // =========================================================
  // MOCK REPORT DATA
  // Replace this data with backend/API data in the future.
  // =========================================================

  const reportData = {
    totalProperties: 2,
    totalRooms: 6,
    occupiedRooms: 3,
    totalTenants: 3,
    monthlyRent: 16500,
    collectedRent: 11000,
  };

  // =========================================================
  // CALCULATED REPORT VALUES
  // =========================================================

  const vacantRooms = Math.max(
    0,
    reportData.totalRooms - reportData.occupiedRooms
  );

  const pendingRent = Math.max(
    0,
    reportData.monthlyRent - reportData.collectedRent
  );

  const occupancyRate =
    reportData.totalRooms > 0
      ? Math.round(
          (reportData.occupiedRooms / reportData.totalRooms) * 100
        )
      : 0;

  const collectionRate =
    reportData.monthlyRent > 0
      ? Math.min(
          100,
          Math.round(
            (reportData.collectedRent / reportData.monthlyRent) * 100
          )
        )
      : 0;

  const formatCurrency = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  // =========================================================
  // REUSABLE REPORT LINKS
  // =========================================================

  const quickLinks = [
    {
      title: "Manage Properties",
      description: "View and update your properties.",
      path: "/properties",
      icon: Building2,
      color: "blue",
    },
    {
      title: "Manage Rooms",
      description: "Review room occupancy and availability.",
      path: "/rooms",
      icon: DoorOpen,
      color: "purple",
    },
    {
      title: "Manage Tenants",
      description: "View tenant details and rental information.",
      path: "/tenants",
      icon: Users,
      color: "green",
    },
    {
      title: "Rent & Bills",
      description: "Review collected and pending rent.",
      path: "/rent-bills",
      icon: IndianRupee,
      color: "yellow",
    },
  ];

  const colorStyles = {
    blue: {
      icon: "bg-blue-50 text-blue-600",
      arrow: "text-blue-600",
    },
    purple: {
      icon: "bg-purple-50 text-purple-600",
      arrow: "text-purple-600",
    },
    green: {
      icon: "bg-green-50 text-green-600",
      arrow: "text-green-600",
    },
    yellow: {
      icon: "bg-yellow-50 text-yellow-700",
      arrow: "text-yellow-700",
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* COMMON NAVBAR */}
      <Navbar />

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {/* PAGE HEADING */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-50 rounded-xl">
              <BarChart3 size={26} className="text-blue-600" />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Rental Reports
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                Overview of properties, occupancy, tenants, and rent
                collection.
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-3">
            Demo report · Based on mock data
          </p>
        </div>

        {/* STATISTICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {/* PROPERTIES */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Building2 size={25} className="text-blue-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Properties</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {reportData.totalProperties}
                </h3>
              </div>
            </div>

            <Link
              to="/properties"
              className="mt-4 flex items-center justify-between text-sm text-blue-600 hover:text-blue-800"
            >
              View properties
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* TOTAL ROOMS */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-50 rounded-xl">
                <DoorOpen size={25} className="text-purple-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Rooms</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {reportData.totalRooms}
                </h3>
              </div>
            </div>

            <Link
              to="/rooms"
              className="mt-4 flex items-center justify-between text-sm text-purple-600 hover:text-purple-800"
            >
              View rooms
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* TENANTS */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-xl">
                <Users size={25} className="text-green-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Tenants</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {reportData.totalTenants}
                </h3>
              </div>
            </div>

            <Link
              to="/tenants"
              className="mt-4 flex items-center justify-between text-sm text-green-600 hover:text-green-800"
            >
              View tenants
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* OCCUPANCY */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-50 rounded-xl">
                <TrendingUp size={25} className="text-yellow-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Occupancy Rate</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {occupancyRate}%
                </h3>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              {reportData.occupiedRooms} occupied · {vacantRooms} vacant
            </p>
          </div>
        </div>

        {/* RENT COLLECTION REPORT */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">
              Rent Collection Report
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Monthly expected rent compared with collected rent.
            </p>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* EXPECTED RENT */}
              <div className="bg-blue-50 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <IndianRupee size={22} className="text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Expected Rent</p>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {formatCurrency(reportData.monthlyRent)}
                    </h3>
                  </div>
                </div>
              </div>

              {/* COLLECTED RENT */}
              <div className="bg-green-50 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <CheckCircle2
                      size={22}
                      className="text-green-600"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Collected Rent</p>
                    <h3 className="text-2xl font-bold text-green-700">
                      {formatCurrency(reportData.collectedRent)}
                    </h3>
                  </div>
                </div>
              </div>

              {/* PENDING RENT */}
              <div className="bg-yellow-50 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Clock size={22} className="text-yellow-700" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Pending Rent</p>
                    <h3 className="text-2xl font-bold text-yellow-700">
                      {formatCurrency(pendingRent)}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* COLLECTION PROGRESS */}
            <div className="mt-7">
              <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Collection Progress
                  </h3>
                  <p className="text-sm text-gray-500">
                    Percentage of expected rent collected.
                  </p>
                </div>

                <span className="text-lg font-bold text-green-700">
                  {collectionRate}%
                </span>
              </div>

              <div
                className="w-full bg-gray-200 rounded-full h-3 overflow-hidden"
                role="progressbar"
                aria-label="Rent collection progress"
                aria-valuenow={collectionRate}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${collectionRate}%` }}
                />
              </div>

              <div className="flex justify-between gap-3 text-xs text-gray-500 mt-2">
                <span>Collected: {formatCurrency(reportData.collectedRent)}</span>
                <span>Pending: {formatCurrency(pendingRent)}</span>
              </div>
            </div>

            <Link
              to="/rent-bills"
              className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View rent and bills
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        {/* ROOM OCCUPANCY REPORT */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 rounded-xl">
              <BarChart3 size={24} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Room Occupancy
              </h2>
              <p className="text-sm text-gray-500">
                Occupied and vacant room breakdown.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
              <p className="text-sm text-gray-600">Occupied Rooms</p>
              <p className="text-2xl font-bold text-green-700 mt-1">
                {reportData.occupiedRooms}
              </p>
            </div>

            <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
              <p className="text-sm text-gray-600">Vacant Rooms</p>
              <p className="text-2xl font-bold text-orange-700 mt-1">
                {vacantRooms}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center gap-3 mb-2">
            <span className="text-sm text-gray-600">
              Occupancy percentage
            </span>

            <span className="text-sm font-semibold text-gray-800">
              {occupancyRate}%
            </span>
          </div>

          <div
            className="w-full bg-gray-200 rounded-full h-3 overflow-hidden"
            role="progressbar"
            aria-label="Room occupancy"
            aria-valuenow={occupancyRate}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {reportData.occupiedRooms} of {reportData.totalRooms} rooms are
            occupied.
          </p>

          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View room details
            <ArrowRight size={17} />
          </Link>
        </section>

        {/* QUICK NAVIGATION */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Quick Access
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              const styles = colorStyles[item.color];

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md hover:border-gray-200 transition-all group"
                >
                  <div className={`p-3 rounded-xl ${styles.icon}`}>
                    <Icon size={23} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </p>
                  </div>

                  <ArrowRight
                    size={19}
                    className={`${styles.arrow} group-hover:translate-x-1 transition-transform`}
                  />
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Reports;
