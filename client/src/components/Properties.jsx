import React from "react";
import {
  Building2,
  MapPin,
  Plus,
  Eye,
  Pencil,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Properties() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TOP NAVBAR ================= */}

      <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6">

        <div className="flex items-center gap-3">

          <button
            onClick={() => navigate("/owner-dashboard")}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            title="Back to Dashboard"
          >
            <ArrowLeft size={22} />
          </button>

          <div>

            <h1 className="text-xl font-bold text-blue-600">
              Properties
            </h1>

            <p className="text-xs text-gray-500 hidden sm:block">
              Manage your rental properties
            </p>

          </div>

        </div>


        {/* Add Property Button */}

        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />

          <span className="hidden sm:block">
            Add Property
          </span>
        </button>

      </header>


      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* Page Heading */}

        <div className="mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            My Properties
          </h2>

          <p className="text-gray-500 mt-1">
            View and manage all your rental properties.
          </p>

        </div>


        {/* ================= PROPERTY CARDS ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* ================= PROPERTY 1 ================= */}

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

            {/* Property Header */}

            <div className="p-5 border-b flex justify-between items-start">

              <div className="flex items-start gap-3">

                <div className="p-3 bg-blue-50 rounded-lg">

                  <Building2
                    size={26}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-800">
                    Green View Apartments
                  </h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">

                    <MapPin size={15} />

                    Bhopal

                  </div>

                </div>

              </div>


              {/* Status */}

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Active
              </span>

            </div>


            {/* Property Information */}

            <div className="p-5">

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">


                {/* Floors */}

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Floors
                  </p>

                  <p className="text-xl font-bold mt-1">
                    5
                  </p>

                </div>


                {/* Rooms */}

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Rooms
                  </p>

                  <p className="text-xl font-bold mt-1">
                    13
                  </p>

                </div>


                {/* Available */}

                <div className="bg-green-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Available
                  </p>

                  <p className="text-xl font-bold text-green-600 mt-1">
                    3
                  </p>

                </div>


                {/* Occupied */}

                <div className="bg-blue-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Occupied
                  </p>

                  <p className="text-xl font-bold text-blue-600 mt-1">
                    10
                  </p>

                </div>

              </div>


              {/* Buttons */}

              <div className="flex gap-3 mt-5">

                <button
                onClick={() => navigate("/property-details")}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >
          
               <Eye size={18} />
                View Details
                </button>


                <button
                  className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >

                  <Pencil size={18} />

                  <span className="hidden sm:block">
                    Edit
                  </span>

                </button>

              </div>

            </div>

          </div>


          {/* ================= PROPERTY 2 ================= */}

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

            {/* Property Header */}

            <div className="p-5 border-b flex justify-between items-start">

              <div className="flex items-start gap-3">

                <div className="p-3 bg-blue-50 rounded-lg">

                  <Building2
                    size={26}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-800">
                    Shyam Residency
                  </h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">

                    <MapPin size={15} />

                    Bhopal

                  </div>

                </div>

              </div>


              {/* Status */}

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Active
              </span>

            </div>


            {/* Property Information */}

            <div className="p-5">

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">


                {/* Floors */}

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Floors
                  </p>

                  <p className="text-xl font-bold mt-1">
                    2
                  </p>

                </div>


                {/* Rooms */}

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Rooms
                  </p>

                  <p className="text-xl font-bold mt-1">
                    6
                  </p>

                </div>


                {/* Available */}

                <div className="bg-green-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Available
                  </p>

                  <p className="text-xl font-bold text-green-600 mt-1">
                    1
                  </p>

                </div>


                {/* Occupied */}

                <div className="bg-blue-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Occupied
                  </p>

                  <p className="text-xl font-bold text-blue-600 mt-1">
                    5
                  </p>

                </div>

              </div>


              {/* Buttons */}

              <div className="flex gap-3 mt-5">

                <button
                onClick={() => navigate("/property-details")}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                <Eye size={18} />
                View Details
                </button>


                <button
                  className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >

                  <Pencil size={18} />

                  <span className="hidden sm:block">
                    Edit
                  </span>

                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Properties;