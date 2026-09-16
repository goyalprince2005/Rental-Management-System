import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Footer from "./Footer";

function OwnerForgotPassword() {
  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState("");

  // =========================================================
  // MOCK OWNER DATA
  // =========================================================

  const owners = [
    {
      id: 1,
      mobileNumber: "9876543200",
      name: "Property Owner",
    },
  ];

  // =========================================================
  // SEND OTP
  // =========================================================

  const handleSendOTP = (e) => {
    e.preventDefault();

    const enteredMobile = mobileNumber.trim();

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
      setMobileError(
        "Please enter a valid 10-digit mobile number"
      );
      return;
    }

    // =======================================================
    // REGISTERED OWNER CHECK
    // =======================================================

    const owner = owners.find(
      (owner) => owner.mobileNumber === enteredMobile
    );

    if (!owner) {
      setMobileError(
        "Please enter correct registered owner mobile number"
      );
      return;
    }

    // =======================================================
    // STORE OWNER INFORMATION
    // =======================================================

    localStorage.setItem(
      "ownerId",
      owner.id.toString()
    );

    localStorage.setItem(
      "ownerMobile",
      enteredMobile
    );

    // =======================================================
    // REMOVE PREVIOUS OTP VERIFICATION
    // =======================================================

    localStorage.removeItem(
      "passwordResetVerification"
    );

    // =======================================================
    // GO TO SHARED OTP VERIFICATION
    // =======================================================

    navigate(
      `/otp-verification?mobile=${encodeURIComponent(
        enteredMobile
      )}&role=owner`
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

          <h1 className="text-3xl font-bold text-center text-gray-900">
            Owner Forgot Password
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-6">
            Enter your registered mobile number to receive
            an OTP.
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

              <label className="block mb-2 font-medium text-gray-800">
                Mobile Number
              </label>

              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow numbers only
                  if (!/^\d*$/.test(value)) {
                    return;
                  }

                  setMobileNumber(value);
                  setMobileError("");
                }}
                placeholder="Enter registered mobile number"
                maxLength={10}
                inputMode="numeric"
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
            {/* SEND OTP */}
            {/* ================================================= */}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send OTP
            </button>

          </form>

          {/* ================================================= */}
          {/* BACK TO OWNER LOGIN */}
          {/* ================================================= */}

          <div className="mt-6 text-center">

            <Link
              to="/owner-login"
              className="text-blue-600 hover:underline"
            >
              ← Back to Owner Login
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

export default OwnerForgotPassword;