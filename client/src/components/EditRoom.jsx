import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

function EditRoom() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [roomData, setRoomData] = useState({
    roomNumber: id,
    floor: "",
    rent: "",
    tenant: "",
    status: "Occupied",
  });

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TOP NAVBAR ================= */}

      <header className="bg-white shadow-sm h-16 flex items-center px-4 md:px-6">

        <button
          onClick={() => navigate(`/room-details/${id}`)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="Back to Room Details"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="ml-3">
          <h1 className="text-xl font-bold text-blue-600">
            Edit Room
          </h1>

          <p className="text-xs text-gray-500 hidden sm:block">
            Update room information
          </p>
        </div>

      </header>


      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-3xl mx-auto">

        <div className="mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Edit Room {id}
          </h2>

          <p className="text-gray-500 mt-1">
            Update the information of this room.
          </p>

        </div>


        {/* ================= FORM CARD ================= */}

        <div className="bg-white rounded-xl shadow-sm border p-6">

          <div className="space-y-5">

            {/* Room Number */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Number
              </label>

              <input
                type="text"
                value={roomData.roomNumber}
                onChange={(e) =>
                  setRoomData({
                    ...roomData,
                    roomNumber: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Floor */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Floor
              </label>

              <input
                type="number"
                value={roomData.floor}
                onChange={(e) =>
                  setRoomData({
                    ...roomData,
                    floor: e.target.value,
                  })
                }
                placeholder="Enter floor number"
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
                value={roomData.rent}
                onChange={(e) =>
                  setRoomData({
                    ...roomData,
                    rent: e.target.value,
                  })
                }
                placeholder="Enter monthly rent"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Tenant */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tenant
              </label>

              <input
                type="text"
                value={roomData.tenant}
                onChange={(e) =>
                  setRoomData({
                    ...roomData,
                    tenant: e.target.value,
                  })
                }
                placeholder="Enter tenant name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Status */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>

              <select
                value={roomData.status}
                onChange={(e) =>
                  setRoomData({
                    ...roomData,
                    status: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="Occupied">
                  Occupied
                </option>

                <option value="Available">
                  Available
                </option>

                <option value="Due">
                  Due
                </option>

              </select>

            </div>


            {/* ================= BUTTONS ================= */}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">

              {/* Cancel */}

              <button
                type="button"
                onClick={() => navigate(`/room-details/${id}`)}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                <ArrowLeft size={18} />
                Cancel
              </button>


              {/* Save */}

              <button
                type="button"
                onClick={() => navigate(`/room-details/${id}`)}
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

export default EditRoom;