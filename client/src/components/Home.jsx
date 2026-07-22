import React from 'react'
function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <div className="bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-4xl font-bold">
          Rental Management System
        </h1>

        <p className="text-gray-600 text-lg">
          Manage your rooms and tenants easily.
        </p>

        <div className="flex gap-4 mt-6">

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Owner Login
          </button>

          <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">
            Tenant Login
          </button>

        </div>

      </div>
    </div>
  );
}

export default Home;