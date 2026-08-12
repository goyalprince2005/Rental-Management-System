import React from "react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:block">

        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">
            Rental Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Owner Panel
          </p>
        </div>

        <nav className="p-4 space-y-2">

          <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-600 text-white">
            Dashboard
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
            Properties
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
            Rooms
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
            Tenants
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
            Bills
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
            Payments
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
            Reports
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
            Profile
          </button>

          <div className="pt-4 border-t mt-4">

            <button className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50">
              Logout
            </button>

          </div>

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1">

        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Dashboard
            </h2>

            <p className="text-gray-500">
              Welcome back, Owner
            </p>
          </div>

          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
            Profile
          </button>

        </header>

        {/* Dashboard Content */}
        <section className="p-6">

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">
                Total Properties
              </p>

              <h3 className="text-3xl font-bold mt-2">
                2
              </h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">
                Total Rooms
              </p>

              <h3 className="text-3xl font-bold mt-2">
                25
              </h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">
                Total Tenants
              </p>

              <h3 className="text-3xl font-bold mt-2">
                22
              </h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500">
                Pending Rent
              </p>

              <h3 className="text-3xl font-bold mt-2">
                ₹25,000
              </h3>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="mt-8">

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

              <button className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition">
                + Add Property
              </button>

              <button className="bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 transition">
                + Add Room
              </button>

              <button className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition">
                + Add Tenant
              </button>

              <button className="bg-orange-500 text-white p-4 rounded-xl hover:bg-orange-600 transition">
                + Add Bill
              </button>

              <button className="bg-gray-800 text-white p-4 rounded-xl hover:bg-gray-900 transition">
                + Payment
              </button>

            </div>

          </div>

          {/* Recent Tenants */}
          <div className="mt-8 bg-white rounded-xl shadow overflow-hidden">

            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">
                Recent Tenants
              </h2>
            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="bg-gray-50">

                  <tr>
                    <th className="px-6 py-4">
                      Tenant
                    </th>

                    <th className="px-6 py-4">
                      Room
                    </th>

                    <th className="px-6 py-4">
                      Monthly Rent
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>
                  </tr>

                </thead>

                <tbody>

                  <tr className="border-t">

                    <td className="px-6 py-4">
                      Rahul Sharma
                    </td>

                    <td className="px-6 py-4">
                      101
                    </td>

                    <td className="px-6 py-4">
                      ₹5,000
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>
                    </td>

                  </tr>

                  <tr className="border-t">

                    <td className="px-6 py-4">
                      Aman Kumar
                    </td>

                    <td className="px-6 py-4">
                      102
                    </td>

                    <td className="px-6 py-4">
                      ₹6,000
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>
                    </td>

                  </tr>

                  <tr className="border-t">

                    <td className="px-6 py-4">
                      Neha Sharma
                    </td>

                    <td className="px-6 py-4">
                      103
                    </td>

                    <td className="px-6 py-4">
                      ₹5,500
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        Pending
                      </span>
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;