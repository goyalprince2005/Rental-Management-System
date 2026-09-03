import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Shield,
  Bell,
  Home,
  Save,
} from "lucide-react";
import Navbar from "./Navbar";

function Settings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    ownerName: "Prince Goyal",
    email: "owner@example.com",
    phone: "+91 9876543210",
    emailNotifications: true,
    paymentNotifications: true,
    rentReminders: true,
    defaultRentDueDay: "5",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log("Settings saved:", settings);

    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= COMMON NAVBAR ================= */}

      <Navbar />


      {/* ================= MAIN CONTENT ================= */}

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


        <form onSubmit={handleSave} className="space-y-6">


          {/* ================= PROFILE SETTINGS ================= */}

          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">

            <div className="p-5 border-b flex items-center gap-3">

              <div className="p-3 bg-blue-50 rounded-xl">

                <User
                  size={24}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h3 className="text-lg font-bold text-gray-800">
                  Profile Settings
                </h3>

                <p className="text-sm text-gray-500">
                  Manage your owner profile information.
                </p>

              </div>

            </div>


            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner Name
                </label>

                <input
                  type="text"
                  name="ownerName"
                  value={settings.ownerName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* Email */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* Phone */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

          </section>


          {/* ================= SECURITY ================= */}

          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">

            <div className="p-5 border-b flex items-center gap-3">

              <div className="p-3 bg-purple-50 rounded-xl">

                <Shield
                  size={24}
                  className="text-purple-600"
                />

              </div>

              <div>

                <h3 className="text-lg font-bold text-gray-800">
                  Security
                </h3>

                <p className="text-sm text-gray-500">
                  Manage your account security settings.
                </p>

              </div>

            </div>


            <div className="p-5">

              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition"
              >
                Change Password
              </button>

            </div>

          </section>


          {/* ================= NOTIFICATIONS ================= */}

          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">

            <div className="p-5 border-b flex items-center gap-3">

              <div className="p-3 bg-yellow-50 rounded-xl">

                <Bell
                  size={24}
                  className="text-yellow-600"
                />

              </div>

              <div>

                <h3 className="text-lg font-bold text-gray-800">
                  Notifications
                </h3>

                <p className="text-sm text-gray-500">
                  Choose which notifications you want to receive.
                </p>

              </div>

            </div>


            <div className="p-5 space-y-4">

              {/* Email Notifications */}

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
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="w-5 h-5 accent-blue-600"
                />

              </label>


              {/* Payment Notifications */}

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
                  checked={settings.paymentNotifications}
                  onChange={handleChange}
                  className="w-5 h-5 accent-blue-600"
                />

              </label>


              {/* Rent Reminders */}

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
                  checked={settings.rentReminders}
                  onChange={handleChange}
                  className="w-5 h-5 accent-blue-600"
                />

              </label>

            </div>

          </section>


          {/* ================= RENTAL PREFERENCES ================= */}

          <section className="bg-white rounded-xl shadow-sm border overflow-hidden">

            <div className="p-5 border-b flex items-center gap-3">

              <div className="p-3 bg-green-50 rounded-xl">

                <Home
                  size={24}
                  className="text-green-600"
                />

              </div>

              <div>

                <h3 className="text-lg font-bold text-gray-800">
                  Rental Preferences
                </h3>

                <p className="text-sm text-gray-500">
                  Configure your default rental preferences.
                </p>

              </div>

            </div>


            <div className="p-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Rent Due Day
              </label>

              <select
                name="defaultRentDueDay"
                value={settings.defaultRentDueDay}
                onChange={handleChange}
                className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="1">
                  1st of every month
                </option>

                <option value="5">
                  5th of every month
                </option>

                <option value="10">
                  10th of every month
                </option>

                <option value="15">
                  15th of every month
                </option>

                <option value="20">
                  20th of every month
                </option>

              </select>

            </div>

          </section>


          {/* ================= SAVE BUTTON ================= */}

          <div className="flex justify-end">

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >

              <Save size={18} />

              Save Changes

            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default Settings;