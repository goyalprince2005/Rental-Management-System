
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Shield,
  Bell,
  Home,
  Save,
  LockKeyhole,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import Navbar from "./Navbar";

// =========================================================
// STORAGE CONFIGURATION
// =========================================================

const SETTINGS_STORAGE_KEY = "ownerSettings";

const defaultSettings = {
  ownerName: "Prince Goyal",
  email: "owner@example.com",
  phone: "+91 9876543200",
  emailNotifications: true,
  paymentNotifications: true,
  rentReminders: true,
  defaultRentDueDay: "5",
};

const rentDueDays = ["1", "5", "10", "15", "20"];

// =========================================================
// LOAD SETTINGS SAFELY
// =========================================================

function getInitialSettings() {
  try {
    const savedSettings = localStorage.getItem(
      SETTINGS_STORAGE_KEY
    );

    if (!savedSettings) {
      return { ...defaultSettings };
    }

    const parsedSettings = JSON.parse(savedSettings);

    if (
      !parsedSettings ||
      typeof parsedSettings !== "object" ||
      Array.isArray(parsedSettings)
    ) {
      return { ...defaultSettings };
    }

    return {
      ...defaultSettings,
      ...parsedSettings,
    };
  } catch (error) {
    console.error("Unable to load owner settings:", error);
    return { ...defaultSettings };
  }
}

// =========================================================
// VALIDATION HELPERS
// =========================================================

function validateSettings(settings) {
  const ownerName = String(settings.ownerName ?? "").trim();
  const email = String(settings.email ?? "").trim();
  const phone = String(settings.phone ?? "").trim();
  const normalizedPhone = phone.replace(/[\s()-]/g, "");

  if (!ownerName) {
    return "Please enter the owner's name.";
  }

  if (ownerName.length > 100) {
    return "Owner name cannot exceed 100 characters.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email) || email.length > 254) {
    return "Please enter a valid email address.";
  }

  if (!/^\+?\d{10,15}$/.test(normalizedPhone)) {
    return "Enter a valid phone number containing 10–15 digits.";
  }

  if (!rentDueDays.includes(String(settings.defaultRentDueDay))) {
    return "Please select a valid default rent due day.";
  }

  return "";
}

// =========================================================
// SETTINGS COMPONENT
// =========================================================

function Settings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState(getInitialSettings);
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // -------------------------------------------------------
  // PAGE TITLE
  // -------------------------------------------------------

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Settings | Rental Management System";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  // -------------------------------------------------------
  // HANDLE INPUT CHANGES
  // -------------------------------------------------------

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSettings((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setFeedback({
      type: "",
      message: "",
    });
  };

  // -------------------------------------------------------
  // SAVE SETTINGS
  // -------------------------------------------------------

  const handleSave = (event) => {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setFeedback({
      type: "",
      message: "",
    });

    const settingsToSave = {
      ...settings,
      ownerName: String(settings.ownerName ?? "").trim(),
      email: String(settings.email ?? "").trim(),
      phone: String(settings.phone ?? "").trim(),
      defaultRentDueDay: String(settings.defaultRentDueDay),
    };

    const validationError = validateSettings(settingsToSave);

    if (validationError) {
      setFeedback({
        type: "error",
        message: validationError,
      });
      return;
    }

    setIsSaving(true);

    try {
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(settingsToSave)
      );

      setSettings(settingsToSave);

      setFeedback({
        type: "success",
        message: "Settings saved successfully.",
      });
    } catch (error) {
      console.error("Unable to save owner settings:", error);

      setFeedback({
        type: "error",
        message:
          "Unable to save settings. Please check browser storage and try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // -------------------------------------------------------
  // CHANGE PASSWORD
  // Use the existing authenticated password-change route.
  // -------------------------------------------------------

  const handleChangePassword = () => {
    navigate("/owner-change-password");
  };

  // =========================================================
  // PAGE UI
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-4 md:p-6 max-w-5xl mx-auto">
        {/* PAGE HEADING */}

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Settings
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your account, notifications and rental preferences.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6" noValidate>
          {/* PROFILE SETTINGS */}

          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-5 border-b flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <User size={24} className="text-blue-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Profile Settings
                </h2>

                <p className="text-sm text-gray-500">
                  Manage your owner profile information.
                </p>
              </div>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* OWNER NAME */}

              <div>
                <label
                  htmlFor="ownerName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Owner Name
                </label>

                <input
                  id="ownerName"
                  type="text"
                  name="ownerName"
                  value={settings.ownerName}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  maxLength={100}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="ownerEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>

                <input
                  id="ownerEmail"
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  maxLength={254}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* PHONE */}

              <div>
                <label
                  htmlFor="ownerPhone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>

                <input
                  id="ownerPhone"
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                  maxLength={20}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* SECURITY */}

          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-5 border-b flex items-center gap-3">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Shield size={24} className="text-purple-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Security
                </h2>

                <p className="text-sm text-gray-500">
                  Manage your account security settings.
                </p>
              </div>
            </div>

            <div className="p-5">
              <button
                type="button"
                onClick={handleChangePassword}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <LockKeyhole size={18} />
                <span>Change Password</span>
              </button>
            </div>
          </section>

          {/* NOTIFICATIONS */}

          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-5 border-b flex items-center gap-3">
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Bell size={24} className="text-yellow-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Notifications
                </h2>

                <p className="text-sm text-gray-500">
                  Choose which notifications you want to receive.
                </p>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {/* EMAIL NOTIFICATIONS */}

              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <div>
                  <p className="font-medium text-gray-800">
                    Email Notifications
                  </p>

                  <p className="text-sm text-gray-500">
                    Receive important rental updates by email.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={Boolean(settings.emailNotifications)}
                  onChange={handleChange}
                  className="w-5 h-5 accent-blue-600"
                />
              </label>

              {/* PAYMENT NOTIFICATIONS */}

              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <div>
                  <p className="font-medium text-gray-800">
                    Payment Notifications
                  </p>

                  <p className="text-sm text-gray-500">
                    Get notified when a tenant makes a payment.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="paymentNotifications"
                  checked={Boolean(settings.paymentNotifications)}
                  onChange={handleChange}
                  className="w-5 h-5 accent-blue-600"
                />
              </label>

              {/* RENT REMINDERS */}

              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <div>
                  <p className="font-medium text-gray-800">
                    Rent Reminders
                  </p>

                  <p className="text-sm text-gray-500">
                    Receive reminders about pending rent payments.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="rentReminders"
                  checked={Boolean(settings.rentReminders)}
                  onChange={handleChange}
                  className="w-5 h-5 accent-blue-600"
                />
              </label>
            </div>
          </section>

          {/* RENTAL PREFERENCES */}

          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-5 border-b flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-xl">
                <Home size={24} className="text-green-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Rental Preferences
                </h2>

                <p className="text-sm text-gray-500">
                  Configure your default rental preferences.
                </p>
              </div>
            </div>

            <div className="p-5">
              <label
                htmlFor="defaultRentDueDay"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Default Rent Due Day
              </label>

              <select
                id="defaultRentDueDay"
                name="defaultRentDueDay"
                value={settings.defaultRentDueDay}
                onChange={handleChange}
                className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1st of every month</option>
                <option value="5">5th of every month</option>
                <option value="10">10th of every month</option>
                <option value="15">15th of every month</option>
                <option value="20">20th of every month</option>
              </select>

              <p className="text-xs text-gray-500 mt-2">
                This saves your default preference. It does not yet
                override individual tenants' rent due dates.
              </p>
            </div>
          </section>

          {/* SAVE FEEDBACK */}

          {feedback.message && (
            <div
              role={feedback.type === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`flex items-start gap-3 rounded-lg border p-4 ${
                feedback.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
              )}

              <p className="text-sm font-medium">
                {feedback.message}
              </p>
            </div>
          )}

          {/* SAVE BUTTON */}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Settings;
