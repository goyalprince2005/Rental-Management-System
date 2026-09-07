import React, { useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function OTPVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mobileNumber = searchParams.get("mobile");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");

  const inputRefs = useRef([]);

  // ================= MOCK OTP =================

  const MOCK_OTP = "123456";

  // ================= OTP INPUT =================

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) {
      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    setOtp(updatedOtp);
    setOtpError("");

    // Move to next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ================= BACKSPACE =================

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ================= VERIFY OTP =================

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join("");

    setOtpError("");

    // ================= MOBILE CHECK =================

    if (!mobileNumber) {
      setOtpError(
        "Mobile number is missing. Please request OTP again."
      );
      return;
    }

    // ================= OTP LENGTH CHECK =================

    if (enteredOTP.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP.");
      return;
    }

    // ================= OTP CHECK =================

    if (enteredOTP !== MOCK_OTP) {
      setOtpError("Incorrect OTP. Please try again.");
      return;
    }

    // ================= SUCCESS =================

    navigate(
      `/reset-password?mobile=${mobileNumber}`
    );
  };

  // ================= RESEND OTP =================

  const handleResendOTP = () => {
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");

    alert("OTP has been resent. Demo OTP: 123456");

    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Enter the 6-digit OTP sent to your registered mobile number.
        </p>


        {/* ================= OTP INPUTS ================= */}

        <div className="flex justify-center gap-3 mb-4">

          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(index, e.target.value)
              }
              onKeyDown={(e) =>
                handleKeyDown(index, e)
              }
              className={`w-12 h-12 border rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                otpError
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          ))}

        </div>


        {/* ================= OTP ERROR ================= */}

        {otpError && (
          <p className="text-red-500 text-sm text-center mb-5">
            {otpError}
          </p>
        )}


        {/* ================= VERIFY BUTTON ================= */}

        <button
          type="button"
          onClick={handleVerifyOTP}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Verify OTP
        </button>


        {/* ================= ACTION LINKS ================= */}

        <div className="flex justify-between mt-6">

          <button
            type="button"
            onClick={handleResendOTP}
            className="text-green-600 hover:underline"
          >
            Resend OTP
          </button>

          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            ← Back
          </Link>

        </div>

      </div>

    </div>
  );
}

export default OTPVerification;