
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

    // ================= CLEAR PREVIOUS ERRORS =================

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

    const storedPassword = localStorage.getItem(
      `tenantPassword_${tenant.mobileNumber}`
    );

    const validPassword = storedPassword || tenant.password;

    if (validPassword !== password) {
      setPasswordError("Incorrect password");
      return;
    }

    // ================= LOGIN SUCCESS =================

    localStorage.setItem("tenantId", tenant.id.toString());
    localStorage.setItem("tenantMobile", tenant.mobileNumber);

    // ================= NAVIGATE =================

    navigate("/tenant-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col transition-colors duration-300">

      {/* ================= LOGIN CONTENT ================= */}

      <main className="flex-1 flex items-center justify-center p-4">

        <div className="bg-white dark:bg-gray-900 w-full max-w-md p-8 rounded-xl shadow-lg transition-colors duration-300">

          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Tenant Login
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-2 mb-6">
            Login to view your room details and payments.
          </p>

          {/* ================= LOGIN FORM ================= */}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* ================= MOBILE NUMBER ================= */}

            <div>

              <label
                htmlFor="tenant-mobile"
                className="block mb-2 font-medium text-gray-800 dark:text-gray-200"
              >
                Mobile Number
              </label>

              <input
                id="tenant-mobile"
                type="tel"
                name="mobile"
                autoComplete="username"
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                  setMobileError("");
                }}
                placeholder="Enter your mobile number"
                className={`w-full border rounded-lg px-4 py-2 
                  bg-white dark:bg-gray-800
                  text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-green-500
                  transition-colors duration-300
                  ${
                    mobileError
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
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

              <label
                htmlFor="tenant-password"
                className="block mb-2 font-medium text-gray-800 dark:text-gray-200"
              >
                Password
              </label>

              <input
                id="tenant-password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="Enter your password"
                className={`w-full border rounded-lg px-4 py-2
                  bg-white dark:bg-gray-800
                  text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-green-500
                  transition-colors duration-300
                  ${
                    passwordError
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
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
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back
            </Link>

            <Link
              to="/forgot-password"
              className="text-red-500 dark:text-red-400 hover:underline"
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
