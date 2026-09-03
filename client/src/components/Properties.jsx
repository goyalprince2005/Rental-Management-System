import React from "react";
import {
  Building2,
  MapPin,
  Plus,
  Eye,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Properties() {
  const navigate = useNavigate();

  const handleAddProperty = () => {
    alert("Add Property feature will be connected with the backend later.");
  };

  const handleEditProperty = (propertyName) => {
    alert(`Edit Property: ${propertyName}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= COMMON NAVBAR ================= */}

      <Navbar />


      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* ================= PAGE HEADER ================= */}

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              My Properties
            </h2>

            <p className="text-gray-500 mt-1">
              View and manage all your rental properties.
            </p>

          </div>


          {/* ADD PROPERTY */}

          <button
            type="button"
            onClick={handleAddProperty}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >

            <Plus size={20} />

            <span>
              Add Property
            </span>

          </button>

        </div>


        {/* ================= PROPERTY CARDS ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* ================= PROPERTY 1 ================= */}

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

            {/* PROPERTY HEADER */}

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


              {/* STATUS */}

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Active
              </span>

            </div>


            {/* PROPERTY INFORMATION */}

            <div className="p-5">

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">

                {/* FLOORS */}

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Floors
                  </p>

                  <p className="text-xl font-bold mt-1">
                    5
                  </p>

                </div>


                {/* ROOMS */}

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Rooms
                  </p>

                  <p className="text-xl font-bold mt-1">
                    13
                  </p>

                </div>


                {/* AVAILABLE */}

                <div className="bg-green-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Available
                  </p>

                  <p className="text-xl font-bold text-green-600 mt-1">
                    3
                  </p>

                </div>


                {/* OCCUPIED */}

                <div className="bg-blue-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Occupied
                  </p>

                  <p className="text-xl font-bold text-blue-600 mt-1">
                    10
                  </p>

                </div>

              </div>


              {/* ACTION BUTTONS */}

              <div className="flex gap-3 mt-5">

                <button
                  type="button"
                  onClick={() => navigate("/property-details")}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >

                  <Eye size={18} />

                  View Details

                </button>


                <button
                  type="button"
                  onClick={() =>
                    handleEditProperty("Green View Apartments")
                  }
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

            {/* PROPERTY HEADER */}

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


              {/* STATUS */}

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Active
              </span>

            </div>


            {/* PROPERTY INFORMATION */}

            <div className="p-5">

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">

                {/* FLOORS */}

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Floors
                  </p>

                  <p className="text-xl font-bold mt-1">
                    2
                  </p>

                </div>


                {/* ROOMS */}

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Rooms
                  </p>

                  <p className="text-xl font-bold mt-1">
                    6
                  </p>

                </div>


                {/* AVAILABLE */}

                <div className="bg-green-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Available
                  </p>

                  <p className="text-xl font-bold text-green-600 mt-1">
                    1
                  </p>

                </div>


                {/* OCCUPIED */}

                <div className="bg-blue-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Occupied
                  </p>

                  <p className="text-xl font-bold text-blue-600 mt-1">
                    5
                  </p>

                </div>

              </div>


              {/* ACTION BUTTONS */}

              <div className="flex gap-3 mt-5">

                <button
                  type="button"
                  onClick={() => navigate("/property-details")}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >

                  <Eye size={18} />

                  View Details

                </button>


                <button
                  type="button"
                  onClick={() =>
                    handleEditProperty("Shyam Residency")
                  }
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