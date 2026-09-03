import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState("");

  const handleSendOTP = () => {
    navigate("/otp-verification");
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

        <form className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Mobile Number
            </label>

            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter registered mobile number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="button"
            onClick={handleSendOTP}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Send OTP
          </button>

        </form>

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