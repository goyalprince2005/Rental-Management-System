import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Footer from "./Footer";

function TenantResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // =========================================================
  // GET DATA FROM URL
  // =========================================================

  const mobileNumber = searchParams.get("mobile");
  const role = searchParams.get("role");

  // =========================================================
  // PASSWORD STATE
  // =========================================================

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const [confirmPasswordError, setConfirmPasswordError] =
    useState("");

  // =========================================================
  // TENANT SESSION VALIDATION
  // =========================================================

  const getVerificationData = () => {
    try {
      const storedData = localStorage.getItem(
        "passwordResetVerification"
      );

      if (!storedData) {
        return null;
      }

      return JSON.parse(storedData);
    } catch {
      return null;
    }
  };

  // =========================================================
  // PASSWORD VALIDATION
  // =========================================================

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }

    if (
      !/[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~;'+=]/.test(
        password
      )
    ) {
      return "Password must contain at least one special character.";
    }

    return "";
  };

  // =========================================================
  // RESET TENANT PASSWORD
  // =========================================================

  const handleResetPassword = (e) => {
    e.preventDefault();

    setPasswordError("");
    setConfirmPasswordError("");

    // =======================================================
    // MOBILE CHECK
    // =======================================================

    if (!mobileNumber) {
      setPasswordError(
        "Password reset session is invalid. Please request OTP again."
      );
      return;
    }

    // =======================================================
    // ROLE CHECK
    // =======================================================

    if (role !== "tenant") {
      setPasswordError(
        "Invalid tenant password reset request. Please try again."
      );
      return;
    }

    // =======================================================
    // OTP VERIFICATION CHECK
    // =======================================================

    const verificationData = getVerificationData();

    if (
      !verificationData ||
      verificationData.verified !== true ||
      verificationData.role !== "tenant" ||
      verificationData.mobileNumber !== mobileNumber
    ) {
      setPasswordError(
        "OTP verification is required. Please request OTP again."
      );
      return;
    }

    // =======================================================
    // NEW PASSWORD CHECK
    // =======================================================

    if (!newPassword) {
      setPasswordError("Please enter a new password.");
      return;
    }

    const validationError =
      validatePassword(newPassword);

    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    // =======================================================
    // CONFIRM PASSWORD CHECK
    // =======================================================

    if (!confirmPassword) {
      setConfirmPasswordError(
        "Please confirm your password."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(
        "Passwords do not match."
      );
      return;
    }

    // =======================================================
    // SAVE TENANT PASSWORD
    // =======================================================

    localStorage.setItem(
      `tenantPassword_${mobileNumber}`,
      newPassword
    );

    // =======================================================
    // PASSWORD RESET SUCCESS
    // =======================================================

    alert("Tenant password reset successfully.");

    // =======================================================
    // REMOVE OTP VERIFICATION SESSION
    // =======================================================

    localStorage.removeItem(
      "passwordResetVerification"
    );

    // =======================================================
    // GO TO TENANT LOGIN
    // =======================================================

    navigate("/tenant-login");
  };

  // =========================================================
  // BACK URL
  // =========================================================

  const backUrl = "/forgot-password";

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

          <h1 className="text-3xl font-bold text-center text-gray-800">
            Tenant Reset Password
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-6">
            Create a new password for your tenant account.
          </p>

          {/* ================================================= */}
          {/* MOBILE NUMBER */}
          {/* ================================================= */}

          {mobileNumber && (
            <p className="text-center text-sm text-gray-500 mb-5">
              Resetting password for{" "}

              <span className="font-medium text-gray-700">
                {mobileNumber}
              </span>
            </p>
          )}

          {/* ================================================= */}
          {/* FORM */}
          {/* ================================================= */}

          <form
            onSubmit={handleResetPassword}
            className="space-y-5"
          >

            {/* ================================================= */}
            {/* NEW PASSWORD */}
            {/* ================================================= */}

            <div>

              <label
                htmlFor="tenant-new-password"
                className="block mb-2 font-medium text-gray-700"
              >
                New Password
              </label>

              <input
                id="tenant-new-password"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="Enter new password"
                autoComplete="new-password"
                className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 ${
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

            {/* ================================================= */}
            {/* CONFIRM PASSWORD */}
            {/* ================================================= */}

            <div>

              <label
                htmlFor="tenant-confirm-password"
                className="block mb-2 font-medium text-gray-700"
              >
                Confirm Password
              </label>

              <input
                id="tenant-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
                placeholder="Confirm new password"
                autoComplete="new-password"
                className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  confirmPasswordError
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              {confirmPasswordError && (
                <p className="text-red-500 text-sm mt-2">
                  {confirmPasswordError}
                </p>
              )}

            </div>

            {/* ================================================= */}
            {/* RESET BUTTON */}
            {/* ================================================= */}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Reset Tenant Password
            </button>

          </form>

          {/* ================================================= */}
          {/* BACK LINK */}
          {/* ================================================= */}

          <div className="mt-6 text-center">

            <Link
              to={backUrl}
              className="text-green-600 hover:underline"
            >
              ← Back to Forgot Password
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

export default TenantResetPassword;