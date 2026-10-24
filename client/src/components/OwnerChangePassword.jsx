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

  const DEFAULT_OWNER_MOBILE = "9876543200";
  const DEFAULT_OWNER_PASSWORD = "Owner@123";

  // =========================================================
  // PASSWORD STATE
  // =========================================================

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // =========================================================
  // PASSWORD VISIBILITY
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

  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================================================
  // RESET MESSAGES
  // =========================================================

  const clearMessages = () => {
    setErrors({
      currentPassword: "",
      newPassword: [],
      confirmPassword: "",
      general: "",
    });

    setSuccessMessage("");
  };

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

    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~;'+=]/.test(password)) {
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

    setErrors((prev) => ({
      ...prev,
      newPassword: value ? validatePassword(value) : [],
      confirmPassword:
        confirmPassword && value !== confirmPassword
          ? "Passwords do not match."
          : "",
    }));

    setSuccessMessage("");
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

    setSuccessMessage("");
  };

  // =========================================================
  // GET OWNER SESSION
  // =========================================================

  const getOwnerMobile = () => {
    const ownerId = localStorage.getItem("ownerId");
    const ownerMobile = localStorage.getItem("ownerMobile");

    if (!ownerId) {
      return null;
    }

    // Prefer the mobile number stored in the active session.
    // Keep the fallback for the existing mock-account setup.
    return ownerMobile || DEFAULT_OWNER_MOBILE;
  };

  // =========================================================
  // CHANGE PASSWORD
  // =========================================================

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    clearMessages();

    // ---------------------------------------------------------
    // OWNER SESSION CHECK
    // ---------------------------------------------------------

    let ownerMobile;

    try {
      ownerMobile = getOwnerMobile();
    } catch {
      setErrors((prev) => ({
        ...prev,
        general:
          "Unable to verify your session. Please login again.",
      }));
      return;
    }

    if (!ownerMobile) {
      setErrors((prev) => ({
        ...prev,
        general:
          "Owner session not found. Please login again.",
      }));
      return;
    }

    // ---------------------------------------------------------
    // REQUIRED FIELD CHECKS
    // ---------------------------------------------------------

    if (!currentPassword) {
      setErrors((prev) => ({
        ...prev,
        currentPassword:
          "Please enter your current password.",
      }));
      return;
    }

    if (!newPassword) {
      setErrors((prev) => ({
        ...prev,
        newPassword: ["Please enter a new password."],
      }));
      return;
    }

    if (!confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          "Please confirm your new password.",
      }));
      return;
    }

    // ---------------------------------------------------------
    // NEW PASSWORD VALIDATION
    // ---------------------------------------------------------

    const passwordValidationErrors =
      validatePassword(newPassword);

    if (passwordValidationErrors.length > 0) {
      setErrors((prev) => ({
        ...prev,
        newPassword: passwordValidationErrors,
      }));
      return;
    }

    // ---------------------------------------------------------
    // CONFIRM PASSWORD CHECK
    // ---------------------------------------------------------

    if (newPassword !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    // ---------------------------------------------------------
    // SAME PASSWORD CHECK
    // ---------------------------------------------------------

    if (currentPassword === newPassword) {
      setErrors((prev) => ({
        ...prev,
        newPassword: [
          "New password must be different from your current password.",
        ],
      }));
      return;
    }

    // ---------------------------------------------------------
    // VERIFY CURRENT PASSWORD AND SAVE
    // ---------------------------------------------------------

    setIsSubmitting(true);

    try {
      const passwordKey = `ownerPassword_${ownerMobile}`;
      const storedPassword = localStorage.getItem(passwordKey);

      // Use the default password only when no password has
      // previously been saved for this mock account.
      const currentStoredPassword =
        storedPassword === null
          ? DEFAULT_OWNER_PASSWORD
          : storedPassword;

      if (currentPassword !== currentStoredPassword) {
        setErrors((prev) => ({
          ...prev,
          currentPassword: "Current password is incorrect.",
        }));

        setIsSubmitting(false);
        return;
      }

      localStorage.setItem(passwordKey, newPassword);

      setSuccessMessage(
        "Password changed successfully. Redirecting to login..."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);

      // -------------------------------------------------------
      // LOG OUT AFTER PASSWORD CHANGE
      // -------------------------------------------------------

      // Use a short delay so the success message is visible.
      // The redirect occurs after the user sees the confirmation.
      setTimeout(() => {
        try {
          localStorage.removeItem("ownerId");
          localStorage.removeItem("ownerMobile");
        } finally {
          navigate("/owner-login", { replace: true });
        }
      }, 1500);
    } catch {
      setErrors((prev) => ({
        ...prev,
        general:
          "Unable to change the password. Please check browser storage and try again.",
      }));

      setIsSubmitting(false);
    }
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
    autoComplete = "new-password",
    isNewPassword = false,
    isConfirmPassword = false,
  }) => {
    const hasError = Array.isArray(error)
      ? error.length > 0
      : Boolean(error);

    const inputId = label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");

    return (
      <div>
        <label
          htmlFor={inputId}
          className="block mb-2 font-medium text-gray-700"
        >
          {label}
        </label>

        <div className="relative">
          <Lock
            size={18}
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id={inputId}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={(e) => {
              const inputValue = e.target.value;

              if (isNewPassword) {
                handleNewPasswordChange(inputValue);
              } else if (isConfirmPassword) {
                handleConfirmPasswordChange(inputValue);
              } else {
                setValue(inputValue);
                setErrors((prev) => ({
                  ...prev,
                  currentPassword: "",
                  general: "",
                }));
                setSuccessMessage("");
              }
            }}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required
            aria-invalid={hasError}
            aria-describedby={hasError ? `${inputId}-error` : undefined}
            className={`w-full border rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              hasError ? "border-red-500" : "border-gray-300"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={
              showPassword ? `Hide ${label}` : `Show ${label}`
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {/* ERROR MESSAGES */}

        {Array.isArray(error) ? (
          error.length > 0 && (
            <div
              id={`${inputId}-error`}
              className="mt-2 space-y-1"
              role="alert"
            >
              {error.map((message, index) => (
                <p key={`${inputId}-${index}`} className="text-red-500 text-sm">
                  {message}
                </p>
              ))}
            </div>
          )
        ) : (
          error && (
            <p
              id={`${inputId}-error`}
              className="text-red-500 text-sm mt-2"
              role="alert"
            >
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
      {/* NAVBAR */}

      <Navbar />

      {/* MAIN CONTENT */}

      <main className="flex justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* PAGE HEADER */}

          <div className="mb-6">
            <button
              type="button"
              onClick={() => navigate("/owner-dashboard")}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4"
            >
              <ArrowLeft size={18} />
              <span>Back to Dashboard</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Lock size={26} className="text-blue-600" />
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

          {/* PASSWORD CARD */}

          <div className="bg-white rounded-xl shadow-sm border p-6">
            {/* SUCCESS MESSAGE */}

            {successMessage && (
              <div
                className="mb-5 flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4"
                role="status"
                aria-live="polite"
              >
                <CheckCircle
                  size={20}
                  className="text-green-600 mt-0.5 shrink-0"
                />

                <p className="text-sm text-green-700">
                  {successMessage}
                </p>
              </div>
            )}

            {/* GENERAL ERROR */}

            {errors.general && (
              <div
                className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4"
                role="alert"
              >
                <AlertCircle
                  size={20}
                  className="text-red-600 mt-0.5 shrink-0"
                />

                <p className="text-sm text-red-700">
                  {errors.general}
                </p>
              </div>
            )}

            {/* FORM */}

            <form
              onSubmit={handleChangePassword}
              className="space-y-5"
              noValidate
            >
              {/* CURRENT PASSWORD */}

              {renderPasswordInput({
                label: "Current Password",
                value: currentPassword,
                setValue: setCurrentPassword,
                showPassword: showCurrentPassword,
                setShowPassword: setShowCurrentPassword,
                placeholder: "Enter current password",
                error: errors.currentPassword,
                autoComplete: "current-password",
              })}

              {/* NEW PASSWORD */}

              {renderPasswordInput({
                label: "New Password",
                value: newPassword,
                setValue: setNewPassword,
                showPassword: showNewPassword,
                setShowPassword: setShowNewPassword,
                placeholder: "Enter new password",
                error: errors.newPassword,
                autoComplete: "new-password",
                isNewPassword: true,
              })}

              {/* CONFIRM PASSWORD */}

              {renderPasswordInput({
                label: "Confirm New Password",
                value: confirmPassword,
                setValue: setConfirmPassword,
                showPassword: showConfirmPassword,
                setShowPassword: setShowConfirmPassword,
                placeholder: "Confirm new password",
                error: errors.confirmPassword,
                autoComplete: "new-password",
                isConfirmPassword: true,
              })}

              {/* ACTION BUTTONS */}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Changing Password..."
                    : "Change Password"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/owner-dashboard")}
                  disabled={isSubmitting}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-60 disabled:cursor-not-allowed"
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
