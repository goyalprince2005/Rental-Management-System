import React, { useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Footer from "./Footer";

function OTPVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // =========================================================
  // GET DATA FROM URL
  // =========================================================

  const mobileNumber = searchParams.get("mobile");
  const role = searchParams.get("role");

  // =========================================================
  // OTP STATE
  // =========================================================

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [otpError, setOtpError] = useState("");

  const inputRefs = useRef([]);

  // =========================================================
  // MOCK OTP
  // =========================================================

  const MOCK_OTP = "123456";

  // =========================================================
  // ROLE THEME
  // =========================================================

  const isOwner = role === "owner";

  const buttonColor = isOwner
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-green-600 hover:bg-green-700";

  const focusColor = isOwner
    ? "focus:ring-blue-500"
    : "focus:ring-green-500";

  const accentColor = isOwner
    ? "text-blue-600"
    : "text-green-600";

  // =========================================================
  // OTP INPUT
  // =========================================================

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

  // =========================================================
  // BACKSPACE
  // =========================================================

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // =========================================================
  // VERIFY OTP
  // =========================================================

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join("");

    setOtpError("");

    // =======================================================
    // MOBILE CHECK
    // =======================================================

    if (!mobileNumber) {
      setOtpError(
        "Mobile number is missing. Please request OTP again."
      );
      return;
    }

    // =======================================================
    // ROLE CHECK
    // =======================================================

    if (role !== "owner" && role !== "tenant") {
      setOtpError(
        "Invalid password recovery request. Please try again."
      );
      return;
    }

    // =======================================================
    // OTP LENGTH CHECK
    // =======================================================

    if (enteredOTP.length !== 6) {
      setOtpError(
        "Please enter the complete 6-digit OTP."
      );
      return;
    }

    // =======================================================
    // OTP CHECK
    // =======================================================

    if (enteredOTP !== MOCK_OTP) {
      setOtpError(
        "Incorrect OTP. Please try again."
      );
      return;
    }

    // =======================================================
    // OTP VERIFIED SUCCESSFULLY
    // =======================================================

    const verificationData = {
      mobileNumber,
      role,
      verified: true,
    };

    localStorage.setItem(
      "passwordResetVerification",
      JSON.stringify(verificationData)
    );

    // =======================================================
    // GO TO CORRECT RESET PASSWORD PAGE
    // =======================================================

    if (role === "owner") {
      navigate(
        `/owner-reset-password?mobile=${encodeURIComponent(
          mobileNumber
        )}&role=owner`
      );
    } else {
      navigate(
        `/reset-password?mobile=${encodeURIComponent(
          mobileNumber
        )}&role=tenant`
      );
    }
  };

  // =========================================================
  // RESEND OTP
  // =========================================================

  const handleResendOTP = () => {
    setOtp([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    setOtpError("");

    // Remove previous verification
    localStorage.removeItem(
      "passwordResetVerification"
    );

    alert(
      "OTP has been resent. Demo OTP: 123456"
    );

    inputRefs.current[0]?.focus();
  };

  // =========================================================
  // BACK URL
  // =========================================================

  const backUrl =
    role === "owner"
      ? "/owner-forgot-password"
      : "/forgot-password";

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ===================================================== */}
      {/* OTP CONTENT */}
      {/* ===================================================== */}

      <main className="flex-1 flex items-center justify-center p-4">

        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

          {/* ================================================= */}
          {/* HEADING */}
          {/* ================================================= */}

          <h1 className="text-3xl font-bold text-center text-gray-800">
            Verify OTP
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-6">
            Enter the 6-digit OTP sent to your registered
            mobile number.
          </p>

          {/* ================================================= */}
          {/* MOBILE NUMBER */}
          {/* ================================================= */}

          {mobileNumber && (
            <p className="text-center text-sm text-gray-500 mb-5">
              OTP sent to{" "}
              <span className="font-medium text-gray-700">
                {mobileNumber}
              </span>
            </p>
          )}

          {/* ================================================= */}
          {/* OTP INPUTS */}
          {/* ================================================= */}

          <div className="flex justify-center gap-2 sm:gap-3 mb-4">

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
                  handleChange(
                    index,
                    e.target.value
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown(
                    index,
                    e
                  )
                }
                className={`w-11 h-12 sm:w-12 sm:h-12 border rounded-lg text-center text-xl focus:outline-none focus:ring-2 ${focusColor} ${
                  otpError
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            ))}

          </div>

          {/* ================================================= */}
          {/* OTP ERROR */}
          {/* ================================================= */}

          {otpError && (
            <p className="text-red-500 text-sm text-center mb-5">
              {otpError}
            </p>
          )}

          {/* ================================================= */}
          {/* VERIFY BUTTON */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={handleVerifyOTP}
            className={`w-full text-white py-3 rounded-lg transition ${buttonColor}`}
          >
            Verify OTP
          </button>

          {/* ================================================= */}
          {/* ACTION LINKS */}
          {/* ================================================= */}

          <div className="flex justify-between mt-6">

            <button
              type="button"
              onClick={handleResendOTP}
              className={`${accentColor} hover:underline`}
            >
              Resend OTP
            </button>

            <Link
              to={backUrl}
              className={`${accentColor} hover:underline`}
            >
              ← Back
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

export default OTPVerification;