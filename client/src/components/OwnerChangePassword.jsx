import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

import Navbar from "./Navbar";

function OwnerChangePassword() {
  const navigate = useNavigate();

  // =========================================================
  // OWNER MOCK ACCOUNT
  // =========================================================

  const OWNER_MOBILE = "9876543200";
  const DEFAULT_OWNER_PASSWORD = "Owner@123";

  // =========================================================
  // PASSWORD STATE
  // =========================================================

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  // =========================================================
  // VISIBILITY STATE
  // =========================================================

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // =========================================================
  // ERROR / SUCCESS STATE
  // =========================================================

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: [],
    confirmPassword: "",
    general: "",
  });

  const [successMessage, setSuccessMessage] =
    useState("");

  // =========================================================
  // PASSWORD VALIDATION
  // =========================================================

  const validatePassword = (password) => {
    const validationErrors = [];

    if (password.length < 8) {
      validationErrors.push(
        "Password must be at least 8 characters long."
      );
    }

    if (!/[A-Z]/.test(password)) {
      validationErrors.push(
        "Password must contain at least one uppercase letter."
      );
    }

    if (!/[a-z]/.test(password)) {
      validationErrors.push(
        "Password must contain at least one lowercase letter."
      );
    }

    if (!/[0-9]/.test(password)) {
      validationErrors.push(
        "Password must contain at least one number."
      );
    }

    if (
      !/[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~;'+=]/.test(
        password
      )
    ) {
      validationErrors.push(
        "Password must contain at least one special character."
      );
    }

    return validationErrors;
  };

  // =========================================================
  // NEW PASSWORD CHANGE
  // =========================================================

  const handleNewPasswordChange = (value) => {
    setNewPassword(value);

    const validationErrors =
      validatePassword(value);

    setErrors((prev) => ({
      ...prev,
      newPassword:
        value.length > 0 ? validationErrors : [],
    }));

    if (
      confirmPassword &&
      value !== confirmPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          "Passwords do not match.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "",
      }));
    }
  };

  // =========================================================
  // CONFIRM PASSWORD CHANGE
  // =========================================================

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);

    setErrors((prev) => ({
      ...prev,
      confirmPassword:
        value && newPassword !== value
          ? "Passwords do not match."
          : "",
    }));
  };

  // =========================================================
  // CHANGE PASSWORD
  // =========================================================

  const handleChangePassword = (e) => {
    e.preventDefault();

    // =======================================================
    // CLEAR PREVIOUS MESSAGES
    // =======================================================

    setErrors({
      currentPassword: "",
      newPassword: [],
      confirmPassword: "",
      general: "",
    });

    setSuccessMessage("");

    // =======================================================
    // OWNER SESSION CHECK
    // =======================================================

    const ownerId =
      localStorage.getItem("ownerId");

    if (!ownerId) {
      setErrors((prev) => ({
        ...prev,
        general:
          "Owner session not found. Please login again.",
      }));
      return;
    }

    // =======================================================
    // CURRENT PASSWORD CHECK
    // =======================================================

    if (!currentPassword) {
      setErrors((prev) => ({
        ...prev,
        currentPassword:
          "Please enter your current password.",
      }));
      return;
    }

    // =======================================================
    // GET CURRENT STORED PASSWORD
    // =======================================================

    const storedPassword =
      localStorage.getItem(
        `ownerPassword_${OWNER_MOBILE}`
      );

    const currentStoredPassword =
      storedPassword || DEFAULT_OWNER_PASSWORD;

    // =======================================================
    // VERIFY CURRENT PASSWORD
    // =======================================================

    if (
      currentPassword !==
      currentStoredPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        currentPassword:
          "Current password is incorrect.",
      }));
      return;
    }

    // =======================================================
    // NEW PASSWORD CHECK
    // =======================================================

    if (!newPassword) {
      setErrors((prev) => ({
        ...prev,
        newPassword: [
          "Please enter a new password.",
        ],
      }));
      return;
    }

    const passwordValidationErrors =
      validatePassword(newPassword);

    if (passwordValidationErrors.length > 0) {
      setErrors((prev) => ({
        ...prev,
        newPassword:
          passwordValidationErrors,
      }));
      return;
    }

    // =======================================================
    // CONFIRM PASSWORD CHECK
    // =======================================================

    if (!confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          "Please confirm your new password.",
      }));
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          "Passwords do not match.",
      }));
      return;
    }

    // =======================================================
    // SAME PASSWORD CHECK
    // =======================================================

    if (
      currentPassword === newPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        newPassword: [
          "New password must be different from your current password.",
        ],
      }));
      return;
    }

    // =======================================================
    // SAVE NEW OWNER PASSWORD
    // =======================================================

    localStorage.setItem(
      `ownerPassword_${OWNER_MOBILE}`,
      newPassword
    );

    // =======================================================
    // SUCCESS
    // =======================================================

    setSuccessMessage(
      "Password changed successfully."
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    // =======================================================
    // LOGOUT OWNER AFTER PASSWORD CHANGE
    // =======================================================

    setTimeout(() => {
      localStorage.removeItem("ownerId");
      localStorage.removeItem("ownerMobile");

      navigate("/owner-login");
    }, 1500);
  };

  // =========================================================
  // PASSWORD INPUT COMPONENT
  // =========================================================

  const renderPasswordInput = ({
    label,
    value,
    setValue,
    showPassword,
    setShowPassword,
    placeholder,
    error,
    isNewPassword = false,
  }) => {
    return (
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          {label}
        </label>

        <div className="relative">

          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={value}
            onChange={(e) => {
              if (isNewPassword) {
                handleNewPasswordChange(
                  e.target.value
                );
              } else {
                setValue(e.target.value);

                if (label === "Confirm New Password") {
                  handleConfirmPasswordChange(
                    e.target.value
                  );
                }
              }
            }}
            placeholder={placeholder}
            className={`w-full border rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error &&
              (Array.isArray(error)
                ? error.length > 0
                : true)
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (prev) => !prev
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={
              showPassword
                ? `Hide ${label}`
                : `Show ${label}`
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

        {/* ================================================= */}
        {/* ERROR MESSAGE */}
        {/* ================================================= */}

        {Array.isArray(error) ? (
          error.length > 0 && (
            <div className="mt-2 space-y-1">
              {error.map(
                (message, index) => (
                  <p
                    key={index}
                    className="text-red-500 text-sm"
                  >
                    {message}
                  </p>
                )
              )}
            </div>
          )
        ) : (
          error && (
            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )
        )}
      </div>
    );
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ===================================================== */}
      {/* NAVBAR */}
      {/* ===================================================== */}

      <Navbar />

      {/* ===================================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <main className="flex justify-center px-4 py-8">

        <div className="w-full max-w-lg">

          {/* ================================================= */}
          {/* PAGE HEADER */}
          {/* ================================================= */}

          <div className="mb-6">

            <button
              type="button"
              onClick={() =>
                navigate("/owner-dashboard")
              }
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4"
            >
              <ArrowLeft size={18} />

              <span>
                Back to Dashboard
              </span>
            </button>

            <div className="flex items-center gap-3">

              <div className="p-3 bg-blue-50 rounded-xl">

                <Lock
                  size={26}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h1 className="text-2xl font-bold text-gray-800">
                  Change Password
                </h1>

                <p className="text-sm text-gray-500">
                  Update your owner account password.
                </p>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* PASSWORD CARD */}
          {/* ================================================= */}

          <div className="bg-white rounded-xl shadow-sm border p-6">

            {/* ================================================= */}
            {/* SUCCESS MESSAGE */}
            {/* ================================================= */}

            {successMessage && (
              <div className="mb-5 flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">

                <CheckCircle
                  size={20}
                  className="text-green-600 mt-0.5 shrink-0"
                />

                <p className="text-sm text-green-700">
                  {successMessage}
                </p>

              </div>
            )}

            {/* ================================================= */}
            {/* GENERAL ERROR */}
            {/* ================================================= */}

            {errors.general && (
              <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">

                <AlertCircle
                  size={20}
                  className="text-red-600 mt-0.5 shrink-0"
                />

                <p className="text-sm text-red-700">
                  {errors.general}
                </p>

              </div>
            )}

            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <form
              onSubmit={handleChangePassword}
              className="space-y-5"
            >

              {/* CURRENT PASSWORD */}

              {renderPasswordInput({
                label: "Current Password",
                value: currentPassword,
                setValue: setCurrentPassword,
                showPassword:
                  showCurrentPassword,
                setShowPassword:
                  setShowCurrentPassword,
                placeholder:
                  "Enter current password",
                error:
                  errors.currentPassword,
              })}

              {/* NEW PASSWORD */}

              {renderPasswordInput({
                label: "New Password",
                value: newPassword,
                setValue: setNewPassword,
                showPassword:
                  showNewPassword,
                setShowPassword:
                  setShowNewPassword,
                placeholder:
                  "Enter new password",
                error:
                  errors.newPassword,
                isNewPassword: true,
              })}

              {/* CONFIRM PASSWORD */}

              {renderPasswordInput({
                label: "Confirm New Password",
                value: confirmPassword,
                setValue:
                  setConfirmPassword,
                showPassword:
                  showConfirmPassword,
                setShowPassword:
                  setShowConfirmPassword,
                placeholder:
                  "Confirm new password",
                error:
                  errors.confirmPassword,
              })}

              {/* ================================================= */}
              {/* ACTION BUTTONS */}
              {/* ================================================= */}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">

                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Change Password
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/owner-dashboard")
                  }
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
}

export default OwnerChangePassword;