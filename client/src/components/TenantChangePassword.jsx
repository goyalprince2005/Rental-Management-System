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
import TenantNavbar from "./TenantNavbar";

function TenantChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // ================= MOCK TENANT PASSWORDS =================

  const tenants = {
    "1": {
      password: "Rahul@123",
    },
    "2": {
      password: "Aman@123",
    },
    "3": {
      password: "Neha@123",
    },
  };

  // ================= PASSWORD VALIDATION =================

  const validatePassword = (password) => {
    const passwordErrors = [];

    if (password.length < 8) {
      passwordErrors.push(
        "Password must contain at least 8 characters."
      );
    }

    if (!/[A-Z]/.test(password)) {
      passwordErrors.push(
        "Password must contain at least one uppercase character."
      );
    }

    if (!/[a-z]/.test(password)) {
      passwordErrors.push(
        "Password must contain at least one lowercase character."
      );
    }

    if (!/[0-9]/.test(password)) {
      passwordErrors.push(
        "Password must contain at least one number."
      );
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/;'`~+=]/.test(password)) {
      passwordErrors.push(
        "Password must contain at least one special character."
      );
    }

    return passwordErrors;
  };

  // ================= HANDLE NEW PASSWORD CHANGE =================

  const handleNewPasswordChange = (event) => {
    const value = event.target.value;

    setNewPassword(value);

    setErrors((previousErrors) => ({
      ...previousErrors,
      newPassword: value
        ? validatePassword(value)
        : [],
    }));
  };

  // ================= HANDLE CONFIRM PASSWORD =================

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;

    setConfirmPassword(value);

    setErrors((previousErrors) => ({
      ...previousErrors,
      confirmPassword:
        value && value !== newPassword
          ? "Passwords do not match."
          : "",
    }));
  };

  // ================= HANDLE SUBMIT =================

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors({});
    setSuccessMessage("");

    const tenantId = localStorage.getItem("tenantId");

    if (!tenantId || !tenants[tenantId]) {
      setErrors({
        general: "Tenant session not found. Please login again.",
      });
      return;
    }

    const newErrors = {};

    // ================= CURRENT PASSWORD =================

    if (!currentPassword.trim()) {
      newErrors.currentPassword =
        "Please enter your current password.";
    } else if (
      currentPassword !== tenants[tenantId].password
    ) {
      newErrors.currentPassword =
        "Incorrect current password.";
    }

    // ================= NEW PASSWORD =================

    if (!newPassword) {
      newErrors.newPassword = [
        "Please enter a new password.",
      ];
    } else {
      const passwordErrors = validatePassword(newPassword);

      if (passwordErrors.length > 0) {
        newErrors.newPassword = passwordErrors;
      }
    }

    // ================= CONFIRM PASSWORD =================

    if (!confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your new password.";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    // ================= SAME PASSWORD =================

    if (
      currentPassword &&
      newPassword &&
      currentPassword === newPassword
    ) {
      newErrors.newPassword = [
        ...(newErrors.newPassword || []),
        "New password must be different from current password.",
      ];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ================= MOCK SUCCESS =================

    setSuccessMessage(
      "Password changed successfully. Please login again."
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      localStorage.removeItem("tenantId");
      navigate("/tenant-login");
    }, 1500);
  };

  // ================= PASSWORD INPUT =================

  const renderPasswordInput = ({
    value,
    setValue,
    showPassword,
    setShowPassword,
    placeholder,
    error,
    onChange,
  }) => {
    return (
      <div>

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange || ((event) => setValue(event.target.value))}
            placeholder={placeholder}
            className={`w-full px-4 py-3 pr-12 border rounded-lg outline-none transition ${
              error
                ? "border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        {/* ================= ERROR MESSAGE ================= */}

        {Array.isArray(error) ? (
          error.map((message, index) => (
            <p
              key={index}
              className="flex items-center gap-1 text-sm text-red-600 mt-2"
            >
              <AlertCircle size={14} />
              {message}
            </p>
          ))
        ) : (
          error && (
            <p className="flex items-center gap-1 text-sm text-red-600 mt-2">
              <AlertCircle size={14} />
              {error}
            </p>
          )
        )}

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TENANT NAVBAR ================= */}

      <TenantNavbar />


      {/* ================= MAIN CONTENT ================= */}

      <main className="max-w-3xl mx-auto p-4 md:p-6">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <div className="flex items-center gap-3">

            <div className="p-3 bg-green-50 rounded-xl">

              <Lock
                size={28}
                className="text-green-600"
              />

            </div>

            <div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Change Password
              </h1>

              <p className="text-gray-500 mt-1">
                Update your tenant account password.
              </p>

            </div>

          </div>

        </div>


        {/* ================= SUCCESS MESSAGE ================= */}

        {successMessage && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-xl">

            <CheckCircle size={20} />

            <p className="text-sm font-medium">
              {successMessage}
            </p>

          </div>
        )}


        {/* ================= GENERAL ERROR ================= */}

        {errors.general && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-xl">

            <AlertCircle size={20} />

            <p className="text-sm font-medium">
              {errors.general}
            </p>

          </div>
        )}


        {/* ================= PASSWORD FORM ================= */}

        <div className="bg-white rounded-xl shadow-sm border p-5 md:p-7">

          <form onSubmit={handleSubmit}>

            {/* ================= CURRENT PASSWORD ================= */}

            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>

              {renderPasswordInput({
                value: currentPassword,
                setValue: setCurrentPassword,
                showPassword: showCurrentPassword,
                setShowPassword: setShowCurrentPassword,
                placeholder: "Enter current password",
                error: errors.currentPassword,
              })}

            </div>


            {/* ================= NEW PASSWORD ================= */}

            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>

              {renderPasswordInput({
                value: newPassword,
                setValue: setNewPassword,
                showPassword: showNewPassword,
                setShowPassword: setShowNewPassword,
                placeholder: "Enter new password",
                error: errors.newPassword,
                onChange: handleNewPasswordChange,
              })}

            </div>


            {/* ================= CONFIRM PASSWORD ================= */}

            <div className="mb-6">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>

              {renderPasswordInput({
                value: confirmPassword,
                setValue: setConfirmPassword,
                showPassword: showConfirmPassword,
                setShowPassword: setShowConfirmPassword,
                placeholder: "Confirm new password",
                error: errors.confirmPassword,
                onChange: handleConfirmPasswordChange,
              })}

            </div>


            {/* ================= ACTIONS ================= */}

            <div className="flex flex-col sm:flex-row gap-3">

              <button
                type="submit"
                className="flex-1 bg-green-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Change Password
              </button>

              <button
                type="button"
                onClick={() => navigate("/tenant-dashboard")}
                className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >

                <ArrowLeft size={18} />

                Cancel

              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default TenantChangePassword;