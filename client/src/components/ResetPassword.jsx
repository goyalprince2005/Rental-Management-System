import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mobileNumber = searchParams.get("mobile");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // ================= PASSWORD VALIDATION =================

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

  // ================= RESET PASSWORD =================

  const handleResetPassword = (e) => {
    e.preventDefault();

    setPasswordError("");
    setConfirmPasswordError("");

    // ================= MOBILE CHECK =================

    if (!mobileNumber) {
      setPasswordError(
        "Password reset session is invalid. Please request OTP again."
      );
      return;
    }

    // ================= PASSWORD CHECK =================

    if (!newPassword) {
      setPasswordError("Please enter a new password.");
      return;
    }

    const validationError = validatePassword(newPassword);

    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    // ================= CONFIRM PASSWORD CHECK =================

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    // ================= SUCCESS =================

    alert("Password reset successfully.");

    navigate("/tenant-login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Create a new password for your account.
        </p>


        {/* ================= FORM ================= */}

        <form
          onSubmit={handleResetPassword}
          className="space-y-5"
        >

          {/* ================= NEW PASSWORD ================= */}

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
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
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


          {/* ================= PASSWORD REQUIREMENTS ================= */}

          <div className="bg-gray-50 rounded-lg p-4">

            <p className="text-sm font-medium text-gray-700 mb-2">
              Password must contain:
            </p>

            <ul className="text-sm text-gray-500 space-y-1">

              <li>• At least 8 characters</li>

              <li>• At least one uppercase letter (A-Z)</li>

              <li>• At least one lowercase letter (a-z)</li>

              <li>• At least one number (0-9)</li>

              <li>• At least one special character</li>

            </ul>

          </div>


          {/* ================= CONFIRM PASSWORD ================= */}

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
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
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


          {/* ================= RESET BUTTON ================= */}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Reset Password
          </button>

        </form>


        {/* ================= BACK TO LOGIN ================= */}

        <div className="mt-6 text-center">

          <Link
            to="/tenant-login"
            className="text-blue-600 hover:underline"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;