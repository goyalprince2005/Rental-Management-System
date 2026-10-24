import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import Footer from "./Footer";

function OwnerResetPassword() {
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
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================================================
  // OWNER SESSION VALIDATION
  // =========================================================

  const getVerificationData = () => {
    try {
      const storedData = localStorage.getItem(
        "passwordResetVerification"
      );

      return storedData ? JSON.parse(storedData) : null;
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

    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~;'+=]/.test(password)) {
      return "Password must contain at least one special character.";
    }

    return "";
  };

  // =========================================================
  // RESET OWNER PASSWORD
  // =========================================================

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setPasswordError("");
    setConfirmPasswordError("");

    // Validate URL information.

    if (!mobileNumber) {
      setPasswordError(
        "Password reset session is invalid. Please request OTP again."
      );
      return;
    }

    if (role !== "owner") {
      setPasswordError(
        "Invalid owner password reset request. Please try again."
      );
      return;
    }

    // Validate OTP verification.

    const verificationData = getVerificationData();

    if (
      !verificationData ||
      verificationData.verified !== true ||
      verificationData.role !== "owner" ||
      verificationData.mobileNumber !== mobileNumber
    ) {
      setPasswordError(
        "OTP verification is required. Please request OTP again."
      );
      return;
    }

    // Validate the new password.

    if (!newPassword) {
      setPasswordError("Please enter a new password.");
      return;
    }

    const validationError = validatePassword(newPassword);

    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    // Validate the confirmation password.

    if (!confirmPassword) {
      setConfirmPasswordError(
        "Please confirm your password."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    // =======================================================
    // SAVE PASSWORD — LOCAL DEMO ONLY
    // =======================================================

    try {
      setIsSubmitting(true);

      localStorage.setItem(
        `ownerPassword_${mobileNumber}`,
        newPassword
      );

      // Remove the verification session after success.

      localStorage.removeItem("passwordResetVerification");

      alert("Owner password reset successfully.");

      navigate("/owner-login", { replace: true });
    } catch {
      setPasswordError(
        "Unable to reset your password. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  // =========================================================
  // BACK URL
  // =========================================================

  const backUrl = "/owner-forgot-password";

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

          {/* HEADING */}

          <h1 className="text-center text-3xl font-bold text-gray-800">
            Owner Reset Password
          </h1>

          <p className="mb-6 mt-2 text-center text-gray-500">
            Create a new password for your owner account.
          </p>

          {/* MOBILE NUMBER */}

          {mobileNumber && (
            <p className="mb-5 text-center text-sm text-gray-500">
              Resetting password for{" "}
              <span className="font-medium text-gray-700">
                {mobileNumber}
              </span>
            </p>
          )}

          {/* FORM */}

          <form
            onSubmit={handleResetPassword}
            className="space-y-5"
            noValidate
          >
            {/* NEW PASSWORD */}

            <div>
              <label
                htmlFor="owner-new-password"
                className="mb-2 block font-medium text-gray-700"
              >
                New Password
              </label>

              <div className="relative">
                <input
                  id="owner-new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPasswordError("");
                  }}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  aria-invalid={Boolean(passwordError)}
                  aria-describedby={
                    passwordError
                      ? "owner-password-error"
                      : undefined
                  }
                  className={`w-full rounded-lg border px-4 py-2.5 pr-12
                    focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      passwordError
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword((previous) => !previous)
                  }
                  aria-label={
                    showNewPassword
                      ? "Hide new password"
                      : "Show new password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2
                    text-gray-500 hover:text-blue-600"
                >
                  {showNewPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {passwordError && (
                <p
                  id="owner-password-error"
                  role="alert"
                  className="mt-2 text-sm text-red-500"
                >
                  {passwordError}
                </p>
              )}

              <p className="mt-2 text-xs text-gray-500">
                Use at least 8 characters with uppercase,
                lowercase, a number, and a special character.
              </p>
            </div>

            {/* CONFIRM PASSWORD */}

            <div>
              <label
                htmlFor="owner-confirm-password"
                className="mb-2 block font-medium text-gray-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="owner-confirm-password"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError("");
                  }}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  aria-invalid={Boolean(confirmPasswordError)}
                  aria-describedby={
                    confirmPasswordError
                      ? "owner-confirm-password-error"
                      : undefined
                  }
                  className={`w-full rounded-lg border px-4 py-2.5 pr-12
                    focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      confirmPasswordError
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirmation password"
                      : "Show confirmation password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2
                    text-gray-500 hover:text-blue-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {confirmPasswordError && (
                <p
                  id="owner-confirm-password-error"
                  role="alert"
                  className="mt-2 text-sm text-red-500"
                >
                  {confirmPasswordError}
                </p>
              )}
            </div>

            {/* RESET BUTTON */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 py-3 text-white
                transition hover:bg-blue-700 disabled:cursor-not-allowed
                disabled:opacity-60"
            >
              {isSubmitting
                ? "Resetting Password..."
                : "Reset Owner Password"}
            </button>
          </form>

          {/* BACK LINK */}

          <div className="mt-6 text-center">
            <Link
              to={backUrl}
              className="text-blue-600 hover:underline"
            >
              ← Back to Owner Forgot Password
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}

      <Footer />
    </div>
  );
}

export default OwnerResetPassword;
