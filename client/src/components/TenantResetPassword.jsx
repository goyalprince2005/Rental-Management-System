import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Footer from "./Footer";

function ResetPassword() {
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
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState("");

  // =========================================================
  // ROLE THEME
  // =========================================================

  const isOwner = role === "owner";

  const focusColor = isOwner
    ? "focus:ring-blue-500"
    : "focus:ring-green-500";

  const buttonColor = isOwner
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-green-600 hover:bg-green-700";

  const accentColor = isOwner
    ? "text-blue-600"
    : "text-green-600";

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

    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~;'+=]/.test(password)) {
      return "Password must contain at least one special character.";
    }

    return "";
  };

  // =========================================================
  // RESET PASSWORD
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

    if (role !== "owner" && role !== "tenant") {
      setPasswordError(
        "Invalid password reset request. Please try again."
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

    const validationError = validatePassword(newPassword);

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
    // SUCCESS
    // =======================================================

    alert("Password reset successfully.");

    // =======================================================
    // GO TO CORRECT LOGIN PAGE
    // =======================================================

    navigate(
      role === "owner"
        ? "/owner-login"
        : "/tenant-login"
    );
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
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <main className="flex-1 flex items-center justify-center p-4">

        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

          {/* ================================================= */}
          {/* HEADING */}
          {/* ================================================= */}

          <h1 className="text-3xl font-bold text-center">
            Reset Password
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-6">
            Create a new password for your account.
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

              <label className="block mb-2 font-medium">
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="Enter new password"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${focusColor} ${
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
            {/* PASSWORD REQUIREMENTS */}
            {/* ================================================= */}

            <div className="bg-gray-50 rounded-lg p-4">

              <p className="text-sm font-medium text-gray-700 mb-2">
                Password must contain:
              </p>

              <ul className="text-sm text-gray-500 space-y-1">

                <li>• At least 8 characters</li>

                <li>
                  • At least one uppercase letter (A-Z)
                </li>

                <li>
                  • At least one lowercase letter (a-z)
                </li>

                <li>
                  • At least one number (0-9)
                </li>

                <li>
                  • At least one special character
                </li>

              </ul>

            </div>

            {/* ================================================= */}
            {/* CONFIRM PASSWORD */}
            {/* ================================================= */}

            <div>

              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
                placeholder="Confirm password"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${focusColor} ${
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
              className={`w-full text-white py-3 rounded-lg transition ${buttonColor}`}
            >
              Reset Password
            </button>

          </form>

          {/* ================================================= */}
          {/* BACK LINK */}
          {/* ================================================= */}

          <div className="mt-6 text-center">

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

export default ResetPassword;