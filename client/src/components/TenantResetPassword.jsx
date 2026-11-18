
import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

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
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

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
    setSuccessMessage("");

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
    // SAVE TENANT PASSWORD
    // =======================================================

    localStorage.setItem(
      `tenantPassword_${mobileNumber}`,
      newPassword
    );

    // =======================================================
    // PASSWORD RESET SUCCESS
    // =======================================================

    setSuccessMessage(
      "Tenant password reset successfully. Redirecting to login..."
    );

    setNewPassword("");
    setConfirmPassword("");

    // =======================================================
    // REMOVE OTP VERIFICATION SESSION
    // =======================================================

    localStorage.removeItem(
      "passwordResetVerification"
    );

    // =======================================================
    // GO TO TENANT LOGIN
    // =======================================================

    setTimeout(() => {
      navigate("/tenant-login");
    }, 1500);
  };

  // =========================================================
  // BACK URL
  // =========================================================

  const backUrl = "/forgot-password";

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col transition-colors duration-300">

      {/* ===================================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <main className="flex-1 flex items-center justify-center p-4">

        <div className="bg-white dark:bg-gray-900
          text-gray-800 dark:text-gray-100
          w-full max-w-md p-8 rounded-xl shadow-lg
          border border-transparent dark:border-gray-800
          transition-colors duration-300">

          {/* ================================================= */}
          {/* HEADING */}
          {/* ================================================= */}

          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full
              bg-green-50 dark:bg-green-900/30">
              <Lock
                size={28}
                className="text-green-600 dark:text-green-400"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center
            text-gray-800 dark:text-gray-100">
            Tenant Reset Password
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-2 mb-6">
            Create a new password for your tenant account.
          </p>

          {/* ================================================= */}
          {/* SUCCESS MESSAGE */}
          {/* ================================================= */}

          {successMessage && (
            <div className="flex items-center gap-2 mb-5
              p-3 rounded-lg
              bg-green-50 dark:bg-green-900/20
              border border-green-200 dark:border-green-800
              text-green-700 dark:text-green-300">

              <CheckCircle size={19} />

              <p className="text-sm">
                {successMessage}
              </p>

            </div>
          )}

          {/* ================================================= */}
          {/* MOBILE NUMBER */}
          {/* ================================================= */}

          {mobileNumber && (
            <p className="text-center text-sm
              text-gray-500 dark:text-gray-400 mb-5">

              Resetting password for{" "}

              <span className="font-medium
                text-gray-700 dark:text-gray-200">
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
                className="block mb-2 font-medium
                  text-gray-700 dark:text-gray-300"
              >
                New Password
              </label>

              <div className="relative">

                <input
                  id="tenant-new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPasswordError("");
                  }}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  className={`w-full border rounded-lg px-4 py-2.5 pr-12
                    bg-white dark:bg-gray-800
                    text-gray-800 dark:text-gray-100
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-green-500
                    transition-colors duration-300
                    ${
                      passwordError
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword((previous) => !previous)
                  }
                  className="absolute right-3 top-1/2
                    -translate-y-1/2
                    text-gray-500 dark:text-gray-400
                    hover:text-gray-700 dark:hover:text-gray-200"
                  aria-label={
                    showNewPassword
                      ? "Hide new password"
                      : "Show new password"
                  }
                >
                  {showNewPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {passwordError && (
                <p className="flex items-center gap-1
                  text-red-500 dark:text-red-400 text-sm mt-2">
                  <AlertCircle size={14} />
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
                className="block mb-2 font-medium
                  text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>

              <div className="relative">

                <input
                  id="tenant-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError("");
                  }}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  className={`w-full border rounded-lg px-4 py-2.5 pr-12
                    bg-white dark:bg-gray-800
                    text-gray-800 dark:text-gray-100
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-green-500
                    transition-colors duration-300
                    ${
                      confirmPasswordError
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  className="absolute right-3 top-1/2
                    -translate-y-1/2
                    text-gray-500 dark:text-gray-400
                    hover:text-gray-700 dark:hover:text-gray-200"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {confirmPasswordError && (
                <p className="flex items-center gap-1
                  text-red-500 dark:text-red-400 text-sm mt-2">
                  <AlertCircle size={14} />
                  {confirmPasswordError}
                </p>
              )}

            </div>

            {/* ================================================= */}
            {/* RESET BUTTON */}
            {/* ================================================= */}

            <button
              type="submit"
              disabled={Boolean(successMessage)}
              className="w-full bg-green-600 text-white
                py-3 rounded-lg hover:bg-green-700
                transition disabled:opacity-60
                disabled:cursor-not-allowed"
            >
              {successMessage
                ? "Password Reset Successful"
                : "Reset Tenant Password"}
            </button>

          </form>

          {/* ================================================= */}
          {/* BACK LINK */}
          {/* ================================================= */}

          <div className="mt-6 text-center">

            <Link
              to={backUrl}
              className="text-green-600 dark:text-green-400
                hover:text-green-700 dark:hover:text-green-300
                hover:underline transition"
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
