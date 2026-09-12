import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

function TenantLogin() {
  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ================= MOCK TENANT DATA =================

  const tenants = [
    {
      id: 1,
      mobileNumber: "9876543210",
      name: "Rahul Sharma",
      password: "Rahul@123",
    },
    {
      id: 2,
      mobileNumber: "9876543211",
      name: "Aman Kumar",
      password: "Aman@123",
    },
    {
      id: 3,
      mobileNumber: "9876543212",
      name: "Neha Sharma",
      password: "Neha@123",
    },
  ];

  // ================= LOGIN =================

  const handleLogin = (e) => {
    e.preventDefault();

    const enteredMobile = mobileNumber.trim();

    // Clear previous errors
    setMobileError("");
    setPasswordError("");

    // ================= BASIC VALIDATION =================

    if (!enteredMobile) {
      setMobileError("Please enter your mobile number");
    }

    if (!password) {
      setPasswordError("Please enter your password");
    }

    if (!enteredMobile || !password) {
      return;
    }

    // ================= FIND TENANT =================

    const tenant = tenants.find(
      (tenant) => tenant.mobileNumber === enteredMobile
    );

    // ================= MOBILE CHECK =================

    if (!tenant) {
      setMobileError("Please enter correct mobile number");
      setPasswordError("Incorrect password");
      return;
    }

    // ================= PASSWORD CHECK =================

    if (tenant.password !== password) {
      setPasswordError("Incorrect password");
      return;
    }

    // ================= LOGIN SUCCESS =================

    // Store logged-in tenant ID for frontend mock flow.
    localStorage.setItem("tenantId", tenant.id.toString());

    // Actual authentication will be connected with backend later.
    navigate("/tenant-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ================= LOGIN CONTENT ================= */}

      <main className="flex-1 flex items-center justify-center p-4">

        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

          <h1 className="text-3xl font-bold text-center">
            Tenant Login
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-6">
            Login to view your room details and payments.
          </p>

          {/* ================= LOGIN FORM ================= */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* ================= MOBILE NUMBER ================= */}

            <div>

              <label className="block mb-2 font-medium">
                Mobile Number
              </label>

              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                  setMobileError("");
                }}
                placeholder="Enter your mobile number"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  mobileError
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              {mobileError && (
                <p className="text-red-500 text-sm mt-2">
                  {mobileError}
                </p>
              )}

            </div>

            {/* ================= PASSWORD ================= */}

            <div>

              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="Enter your password"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  passwordError
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              {passwordError && (
                <p className="text-red-500 text-sm mt-2">
                  {passwordError}
                </p>
              )}

            </div>

            {/* ================= LOGIN BUTTON ================= */}

            <button
              type="submit"
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

      </main>

      {/* ================= FOOTER ================= */}

      <Footer />

    </div>
  );
}

export default TenantLogin;