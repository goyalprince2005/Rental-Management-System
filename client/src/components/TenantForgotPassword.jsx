import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Footer from "./Footer";

function TenantForgotPassword() {
  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState("");

  // =========================================================
  // MOCK TENANT DATA
  // =========================================================

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

  // =========================================================
  // SEND OTP
  // =========================================================

  const handleSendOTP = (e) => {
    e.preventDefault();

    const enteredMobile = mobileNumber.trim();

    // Clear previous error
    setMobileError("");

    // =======================================================
    // EMPTY VALIDATION
    // =======================================================

    if (!enteredMobile) {
      setMobileError("Please enter your mobile number");
      return;
    }

    // =======================================================
    // MOBILE NUMBER FORMAT
    // =======================================================

    if (!/^\d{10}$/.test(enteredMobile)) {
      setMobileError("Please enter a valid 10-digit mobile number");
      return;
    }

    // =======================================================
    // REGISTERED TENANT CHECK
    // =======================================================

    const tenant = tenants.find(
      (tenant) => tenant.mobileNumber === enteredMobile
    );

    if (!tenant) {
      setMobileError("Please enter correct registered mobile number");
      return;
    }

    // =======================================================
    // STORE TENANT INFORMATION
    // =======================================================

    localStorage.setItem("tenantId", tenant.id.toString());
    localStorage.setItem("tenantMobile", enteredMobile);

    // =======================================================
    // GO TO SHARED OTP VERIFICATION
    // =======================================================

    navigate(
      `/otp-verification?mobile=${encodeURIComponent(
        enteredMobile
      )}&role=tenant`
    );
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ===================================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <main className="flex-1 flex items-center justify-center p-4">

        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

          {/* ================================================= */}
          {/* HEADING */}
          {/* ================================================= */}

          <h1 className="text-3xl font-bold text-center">
            Forgot Password
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-6">
            Enter your registered mobile number to receive an OTP.
          </p>

          {/* ================================================= */}
          {/* FORM */}
          {/* ================================================= */}

          <form
            onSubmit={handleSendOTP}
            className="space-y-5"
          >

            {/* ================================================= */}
            {/* MOBILE NUMBER */}
            {/* ================================================= */}

            <div>

              <label
                htmlFor="tenant-forgot-mobile"
                className="block mb-2 font-medium"
              >
                Mobile Number
              </label>

              <input
                id="tenant-forgot-mobile"
                type="tel"
                value={mobileNumber}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only numbers
                  if (!/^\d*$/.test(value)) {
                    return;
                  }

                  setMobileNumber(value);
                  setMobileError("");
                }}
                placeholder="Enter registered mobile number"
                maxLength={10}
                inputMode="numeric"
                autoComplete="tel"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  mobileError
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              {/* ERROR */}

              {mobileError && (
                <p className="text-red-500 text-sm mt-2">
                  {mobileError}
                </p>
              )}

            </div>

            {/* ================================================= */}
            {/* SEND OTP BUTTON */}
            {/* ================================================= */}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Send OTP
            </button>

          </form>

          {/* ================================================= */}
          {/* BACK TO TENANT LOGIN */}
          {/* ================================================= */}

          <div className="mt-6 text-center">

            <Link
              to="/tenant-login"
              className="text-green-600 hover:underline"
            >
              ← Back to Tenant Login
            </Link>

          </div>

        </div>

      </main>

      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <Footer />

    </div>
  );
}

export default TenantForgotPassword;