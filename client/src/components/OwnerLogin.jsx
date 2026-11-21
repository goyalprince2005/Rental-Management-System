
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Footer from "./Footer";
import { useOwnerTheme } from "../context/OwnerThemeContext";

function OwnerLogin() {
  const navigate = useNavigate();
  const { isDarkMode } = useOwnerTheme();

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  // =========================================================
  // MOCK OWNER ACCOUNT
  // =========================================================

  const OWNER_MOBILE = "9876543200";
  const DEFAULT_OWNER_PASSWORD = "Owner@123";

  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = (e) => {
    e.preventDefault();

    const enteredMobile = mobileNumber.trim();
    const enteredPassword = password;

    // BASIC VALIDATION

    if (!enteredMobile || !enteredPassword) {
      alert(
        "Please enter your mobile number and password."
      );
      return;
    }

    // MOBILE VALIDATION

    if (!/^\d{10}$/.test(enteredMobile)) {
      alert(
        "Mobile number must contain exactly 10 digits."
      );
      return;
    }

    // OWNER MOBILE CHECK

    if (enteredMobile !== OWNER_MOBILE) {
      alert(
        "Owner account was not found. Please check your mobile number."
      );
      return;
    }

    // GET CURRENT OWNER PASSWORD

    const storedPassword = localStorage.getItem(
      `ownerPassword_${OWNER_MOBILE}`
    );

    const currentPassword =
      storedPassword || DEFAULT_OWNER_PASSWORD;

    // PASSWORD CHECK

    if (enteredPassword !== currentPassword) {
      alert("Incorrect password. Please try again.");
      return;
    }

    // OWNER LOGIN SUCCESS

    localStorage.setItem("ownerId", "1");

    localStorage.setItem(
      "ownerMobile",
      OWNER_MOBILE
    );

    navigate("/owner-dashboard");
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode
          ? "dark bg-gray-950 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >

      {/* LOGIN CONTENT */}

      <main className="flex-1 flex items-center justify-center p-4">

        <div className="bg-white dark:bg-gray-900 w-full max-w-md p-8 rounded-xl shadow-lg border border-transparent dark:border-gray-800 transition-colors duration-300">

          {/* HEADING */}

          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
            Owner Login
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-2 mb-6">
            Login to manage your rental properties.
          </p>

          {/* LOGIN FORM */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* MOBILE NUMBER */}

            <div>

              <label
                htmlFor="owner-mobile"
                className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
              >
                Mobile Number
              </label>

              <input
                id="owner-mobile"
                type="tel"
                name="mobile"
                autoComplete="username"
                value={mobileNumber}
                onChange={(e) => {
                  const value = e.target.value;

                  if (!/^\d*$/.test(value)) {
                    return;
                  }

                  setMobileNumber(value);
                }}
                placeholder="Enter your mobile number"
                maxLength={10}
                inputMode="numeric"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label
                htmlFor="owner-password"
                className="block mb-2 font-medium text-gray-800 dark:text-gray-300"
              >
                Password
              </label>

              <input
                id="owner-password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              />

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>

          </form>

          {/* LINKS */}

          <div className="flex justify-between mt-6">

            {/* BACK TO HOME */}

            <Link
              to="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to Home
            </Link>

            {/* FORGOT PASSWORD */}

            <Link
              to="/owner-forgot-password"
              className="text-red-500 dark:text-red-400 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

        </div>

      </main>

      {/* FOOTER */}

      <Footer />

    </div>
  );
}

export default OwnerLogin;
