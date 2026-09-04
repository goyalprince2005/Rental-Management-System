import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function TenantLogin() {
  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  // ================= MOCK TENANT DATA =================

  const tenants = [
    {
      id: 1,
      mobileNumber: "9876543210",
      name: "Rahul Sharma",
    },
    {
      id: 2,
      mobileNumber: "9876543211",
      name: "Aman Kumar",
    },
    {
      id: 3,
      mobileNumber: "9876543212",
      name: "Neha Sharma",
    },
  ];

  // ================= LOGIN =================

  const handleLogin = () => {
    const enteredMobile = mobileNumber.trim();

    if (!enteredMobile || !password) {
      alert("Please enter mobile number and password.");
      return;
    }

    const tenant = tenants.find(
      (tenant) => tenant.mobileNumber === enteredMobile
    );

    if (!tenant) {
      alert("Tenant not found. Please enter a registered mobile number.");
      return;
    }

    // Store the logged-in tenant ID for the frontend mock flow.
    localStorage.setItem("tenantId", tenant.id.toString());

    // Actual authentication will be connected with the backend later.
    navigate("/tenant-dashboard");
  };

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

          {/* ================= MOBILE NUMBER ================= */}

          <div>

            <label className="block mb-2 font-medium">
              Mobile Number
            </label>

            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter your mobile number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>


          {/* ================= PASSWORD ================= */}

          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>


          {/* ================= LOGIN BUTTON ================= */}

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>

        </form>


        {/* ================= LINKS ================= */}

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