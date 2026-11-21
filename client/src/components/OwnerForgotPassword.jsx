
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

    // EMPTY VALIDATION

    if (!enteredMobile) {
      setMobileError("Please enter your mobile number");
      return;
    }

    // MOBILE NUMBER FORMAT

    if (!/^\d{10}$/.test(enteredMobile)) {
      setMobileError(
        "Please enter a valid 10-digit mobile number"
      );
      return;
    }

    // REGISTERED OWNER CHECK

    const owner = owners.find(
      (owner) => owner.mobileNumber === enteredMobile
    );

    if (!owner) {
      setMobileError(
        "Please enter correct registered owner mobile number"
      );
      return;
    }

    // STORE OWNER INFORMATION

    localStorage.setItem(
      "ownerId",
      owner.id.toString()
    );

    localStorage.setItem(
      "ownerMobile",
      enteredMobile
    );

    // REMOVE PREVIOUS OTP VERIFICATION

    localStorage.removeItem(
      "passwordResetVerification"
    );

    // GO TO SHARED OTP VERIFICATION

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col transition-colors duration-300">

      {/* MAIN CONTENT */}

      <main className="flex-1 flex items-center justify-center p-4">

        <div className="bg-white dark:bg-gray-900 w-full max-w-md p-8 rounded-xl shadow-lg border border-transparent dark:border-gray-800 transition-colors duration-300">

          {/* HEADING */}

          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
            Owner Forgot Password
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-2 mb-6">
            Enter your registered mobile number to receive
            an OTP.
          </p>

          {/* FORM */}

          <form
            onSubmit={handleSendOTP}
            className="space-y-5"
          >

            {/* MOBILE NUMBER */}

            <div>

              <label
                htmlFor="owner-forgot-mobile"
                className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
              >
                Mobile Number
              </label>

              <input
                id="owner-forgot-mobile"
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
                autoComplete="tel"
                aria-invalid={Boolean(mobileError)}
                aria-describedby={
                  mobileError
                    ? "owner-mobile-error"
                    : undefined
                }
                className={`w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  mobileError
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              />

              {/* ERROR */}

              {mobileError && (
                <p
                  id="owner-mobile-error"
                  className="text-red-500 dark:text-red-400 text-sm mt-2"
                  role="alert"
                >
                  {mobileError}
                </p>
              )}

            </div>

            {/* SEND OTP */}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send OTP
            </button>

          </form>

          {/* BACK TO OWNER LOGIN */}

          <div className="mt-6 text-center">

            <Link
              to="/owner-login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to Owner Login
            </Link>

          </div>

        </div>

      </main>

      {/* FOOTER */}

      <Footer />

    </div>
  );
}

export default OwnerForgotPassword;
