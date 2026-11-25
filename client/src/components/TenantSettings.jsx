import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Sun,
  Moon,
  Bell,
  CreditCard,
  Wrench,
  ShieldCheck,
  Lock,
  HelpCircle,
  ChevronRight,
  Check,
  Settings,
  Info,
  ArrowLeft,
} from "lucide-react";

import { useTenantTheme } from "../context/TenantThemeContext";

// =========================================================
// STORAGE KEY
// =========================================================

const TENANT_SETTINGS_STORAGE_KEY =
  "rentalManagementTenantSettings";

// =========================================================
// DEFAULT NOTIFICATION SETTINGS
// =========================================================

const defaultNotificationSettings = {
  rentReminders: true,
  paymentNotifications: true,
  maintenanceUpdates: true,
  importantNotices: true,
};

// =========================================================
// SAFE LOCAL STORAGE HELPERS
// =========================================================

const getSavedNotificationSettings = () => {
  try {
    const savedSettings = localStorage.getItem(
      TENANT_SETTINGS_STORAGE_KEY
    );

    if (!savedSettings) {
      return defaultNotificationSettings;
    }

    const parsedSettings = JSON.parse(savedSettings);

    return {
      ...defaultNotificationSettings,
      ...parsedSettings,
    };
  } catch (error) {
    console.error(
      "Error loading tenant settings:",
      error
    );

    return defaultNotificationSettings;
  }
};

// =========================================================
// TENANT SETTINGS COMPONENT
// =========================================================

function TenantSettings() {
  const navigate = useNavigate();

  const { isDarkMode, toggleTheme } = useTenantTheme();

  // =======================================================
  // NOTIFICATION STATE
  // =======================================================

  const [notificationSettings, setNotificationSettings] =
    useState(getSavedNotificationSettings);

  // =======================================================
  // SAVE NOTIFICATION SETTINGS
  // =======================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        TENANT_SETTINGS_STORAGE_KEY,
        JSON.stringify(notificationSettings)
      );
    } catch (error) {
      console.error(
        "Error saving tenant settings:",
        error
      );
    }
  }, [notificationSettings]);

  // =======================================================
  // HANDLE NOTIFICATION TOGGLE
  // =======================================================

  const handleNotificationToggle = (settingName) => {
    setNotificationSettings((previousSettings) => ({
      ...previousSettings,
      [settingName]: !previousSettings[settingName],
    }));
  };

  // =======================================================
  // NAVIGATION HANDLERS
  // =======================================================

  const handleMyDetails = () => {
    const tenantId = localStorage.getItem("tenantId");

    if (!tenantId) {
      navigate("/tenant-login");
      return;
    }

    navigate(`/tenant-details/${tenantId}?view=tenant`);
  };

  const handleChangePassword = () => {
    navigate("/tenant-change-password");
  };

  // =======================================================
  // BACK TO DASHBOARD
  // =======================================================

  const handleBackToDashboard = () => {
    navigate("/tenant-dashboard");
  };

  // =======================================================
  // NOTIFICATION SWITCH COMPONENT
  // =======================================================

  const NotificationSwitch = ({
    label,
    description,
    settingName,
  }) => {
    const isEnabled =
      notificationSettings[settingName];

    return (
      <div className="flex items-center justify-between gap-4 py-4">
        <div className="min-w-0">
          <p className="font-medium text-gray-800 dark:text-gray-100">
            {label}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            handleNotificationToggle(settingName)
          }
          role="switch"
          aria-checked={isEnabled}
          aria-label={label}
          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
            isEnabled
              ? "bg-green-600"
              : "bg-gray-300 dark:bg-gray-600"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
              isEnabled
                ? "translate-x-6"
                : "translate-x-1"
            }`}
          />
        </button>
      </div>
    );
  };

  // =======================================================
  // SETTINGS NAVIGATION CARD
  // =======================================================

  const SettingsNavigationCard = ({
    icon: Icon,
    title,
    description,
    onClick,
  }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:border-green-300 hover:bg-green-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-700 dark:hover:bg-gray-800/80"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/30">
            <Icon
              size={20}
              className="text-green-600 dark:text-green-400"
            />
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              {title}
            </p>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>

        <ChevronRight
          size={20}
          className="shrink-0 text-gray-400"
        />
      </button>
    );
  };

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-5 transition-colors duration-300 dark:bg-gray-950 sm:px-5 sm:py-7 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* ================================================= */}
        {/* PAGE HEADER */}
        {/* ================================================= */}

        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">

          {/* HEADER TITLE */}

          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
              <Settings
                size={24}
                className="text-green-600 dark:text-green-400"
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                Settings
              </h1>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                Manage your account preferences and settings.
              </p>
            </div>
          </div>

          {/* BACK TO DASHBOARD BUTTON */}

          <button
            type="button"
            onClick={handleBackToDashboard}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-700 active:bg-green-800 sm:w-auto sm:shrink-0"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

        </div>

        {/* ================================================= */}
        {/* PROFILE SETTINGS */}
        {/* ================================================= */}

        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">

          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Profile Settings
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View and manage your personal information.
            </p>
          </div>

          <SettingsNavigationCard
            icon={User}
            title="My Profile"
            description="View your personal, property and room details."
            onClick={handleMyDetails}
          />

        </section>

        {/* ================================================= */}
        {/* APPEARANCE */}
        {/* ================================================= */}

        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">

          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Appearance
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Customize how your Tenant Portal looks.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/30">
                {isDarkMode ? (
                  <Moon
                    size={21}
                    className="text-green-600 dark:text-green-400"
                  />
                ) : (
                  <Sun
                    size={21}
                    className="text-green-600 dark:text-green-400"
                  />
                )}
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  {isDarkMode
                    ? "Dark Mode"
                    : "Light Mode"}
                </p>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {isDarkMode
                    ? "Dark appearance is currently enabled."
                    : "Light appearance is currently enabled."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 font-medium text-white transition hover:bg-green-700 sm:w-auto"
            >
              {isDarkMode ? (
                <>
                  <Sun size={18} />
                  Switch to Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} />
                  Switch to Dark Mode
                </>
              )}
            </button>

          </div>

        </section>

        {/* ================================================= */}
        {/* NOTIFICATION PREFERENCES */}
        {/* ================================================= */}

        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">

          <div className="mb-5 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/30">
              <Bell
                size={21}
                className="text-green-600 dark:text-green-400"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notification Preferences
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Choose which notifications you would like to receive.
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">

            <NotificationSwitch
              label="Rent Reminders"
              description="Receive reminders when your rent payment is approaching."
              settingName="rentReminders"
            />

            <NotificationSwitch
              label="Payment Notifications"
              description="Receive updates about rent payment status."
              settingName="paymentNotifications"
            />

            <NotificationSwitch
              label="Maintenance Updates"
              description="Receive updates about complaints and maintenance requests."
              settingName="maintenanceUpdates"
            />

            <NotificationSwitch
              label="Important Notices"
              description="Receive important announcements from your property owner."
              settingName="importantNotices"
            />

          </div>

          <div className="mt-4 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <div className="flex items-start gap-2">
              <Check
                size={17}
                className="mt-0.5 shrink-0 text-green-600 dark:text-green-400"
              />

              <p className="text-sm text-green-700 dark:text-green-400">
                Your notification preferences are automatically saved on this device.
              </p>
            </div>
          </div>

        </section>

        {/* ================================================= */}
        {/* SECURITY */}
        {/* ================================================= */}

        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">

          <div className="mb-5 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/30">
              <ShieldCheck
                size={21}
                className="text-green-600 dark:text-green-400"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Security
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your account security.
              </p>
            </div>
          </div>

          <SettingsNavigationCard
            icon={Lock}
            title="Change Password"
            description="Update your password to keep your account secure."
            onClick={handleChangePassword}
          />

        </section>

        {/* ================================================= */}
        {/* HELP & SUPPORT */}
        {/* ================================================= */}

        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">

          <div className="mb-5 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/30">
              <HelpCircle
                size={21}
                className="text-green-600 dark:text-green-400"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Help & Support
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Information about your Tenant Portal.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">

            <div className="flex items-start gap-3">
              <Info
                size={20}
                className="mt-0.5 shrink-0 text-green-600 dark:text-green-400"
              />

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Rental Management System
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  The Tenant Portal allows you to manage your rental information,
                  check payments, view documents and notices, and submit
                  maintenance or complaint requests.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-4 space-y-3">

            <SettingsNavigationCard
              icon={User}
              title="Contact Property Owner"
              description="Visit your tenant details to view your property information."
              onClick={handleMyDetails}
            />

          </div>

        </section>

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <div className="pb-6 text-center">

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Rental Management System
          </p>

          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Tenant Portal Settings
          </p>

        </div>

      </div>

    </div>
  );
}

export default TenantSettings;