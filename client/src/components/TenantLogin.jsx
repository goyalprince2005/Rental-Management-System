import React from 'react'

import { Link } from "react-router-dom";

function TenantLogin() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center">
          Tenant Login
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Login to view your room details and payments.
        </p>

        <form className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Mobile Number
            </label>

            <input
              type="tel"
              placeholder="Enter your mobile number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="button"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>

        </form>

        <div className="flex justify-between mt-6">

          <Link
            to="/"
            className="text-blue-600 hover:underline"
          >
            ← Back
          </Link>

          <Link
            to="/forgot-password"
            className="text-red-500 hover:underline"
          >
            Forgot Password?
          </Link>

        </div>

      </div>

    </div>
  );
}

export default TenantLogin;