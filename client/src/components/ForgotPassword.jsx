import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState("");

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

  // ================= SEND OTP =================

  const handleSendOTP = (e) => {
    e.preventDefault();

    const enteredMobile = mobileNumber.trim();

    // Clear previous error
    setMobileError("");

    // ================= EMPTY VALIDATION =================

    if (!enteredMobile) {
      setMobileError("Please enter your mobile number");
      return;
    }

    // ================= MOBILE NUMBER FORMAT =================

    if (!/^\d{10}$/.test(enteredMobile)) {
      setMobileError("Please enter a valid 10-digit mobile number");
      return;
    }

    // ================= REGISTERED MOBILE CHECK =================

    const tenant = tenants.find(
      (tenant) => tenant.mobileNumber === enteredMobile
    );

    if (!tenant) {
      setMobileError("Please enter correct registered mobile number");
      return;
    }

    // ================= OTP PAGE =================

    navigate(
      `/otp-verification?mobile=${enteredMobile}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Enter your registered mobile number to receive an OTP.
        </p>


        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSendOTP}
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
              placeholder="Enter registered mobile number"
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


          {/* ================= SEND OTP BUTTON ================= */}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Send OTP
          </button>

        </form>


        {/* ================= BACK LINK ================= */}

        <div className="mt-6 text-center">

          <Link
            to="/tenant-login"
            className="text-blue-600 hover:underline"
          >
            ← Back to Tenant Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;