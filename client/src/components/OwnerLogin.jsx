import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

function OwnerLogin() {
  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!mobileNumber || !password) {
      alert("Please enter your mobile number and password.");
      return;
    }

    navigate("/owner-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ================= LOGIN CONTENT ================= */}

      <main className="flex-1 flex items-center justify-center p-4">

        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

          <h1 className="text-3xl font-bold text-center">
            Owner Login
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-6">
            Login to manage your rental properties.
          </p>

          <form className="space-y-5">

            {/* Mobile Number */}

            <div>
              <label className="block mb-2 font-medium">
                Mobile Number
              </label>

              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) =>
                  setMobileNumber(e.target.value)
                }
                placeholder="Enter your mobile number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}

            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Login */}

            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>

          </form>

          {/* Back to Home */}

          <div className="mt-6 text-center">

            <Link
              to="/"
              className="text-blue-600 hover:underline"
            >
              ← Back to Home
            </Link>

          </div>

        </div>

      </main>

      {/* ================= FOOTER ================= */}

      <Footer />

    </div>
  );
}

export default OwnerLogin;