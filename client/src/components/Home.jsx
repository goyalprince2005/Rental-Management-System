import React from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Building2,
  Users,
} from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 relative overflow-hidden">

      {/* =====================================================
          DECORATIVE BACKGROUND ELEMENTS
      ===================================================== */}

      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute -bottom-32 -right-24 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div className="w-full max-w-lg bg-white/95 backdrop-blur-sm border border-white rounded-2xl shadow-xl p-8 sm:p-10">

          {/* =================================================
              APPLICATION ICON
          ================================================= */}

          <div className="flex justify-center mb-6">

            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">

              <HomeIcon
                size={32}
                className="text-blue-600"
              />

            </div>

          </div>

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="text-center">

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Rental Management System
            </h1>

            <p className="text-gray-600 text-base sm:text-lg mt-3">
              Manage your rooms and tenants easily.
            </p>

          </div>

          {/* =================================================
              PORTAL DESCRIPTION
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

            {/* OWNER */}

            <div className="border border-blue-100 bg-blue-50/60 rounded-xl p-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">

                  <Building2
                    size={20}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <p className="font-semibold text-gray-900">
                    Owner Portal
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Manage your property
                  </p>

                </div>

              </div>

            </div>

            {/* TENANT */}

            <div className="border border-green-100 bg-green-50/60 rounded-xl p-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">

                  <Users
                    size={20}
                    className="text-green-600"
                  />

                </div>

                <div>

                  <p className="font-semibold text-gray-900">
                    Tenant Portal
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Manage your rental
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              LOGIN BUTTONS
          ================================================= */}

          <div className="flex flex-col sm:flex-row gap-4 mt-6">

            {/* OWNER LOGIN */}

            <Link
              to="/owner-login"
              className="flex-1"
            >
              <button
                type="button"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 hover:shadow-md transition duration-300"
              >
                Owner Login
              </button>
            </Link>

            {/* TENANT LOGIN */}

            <Link
              to="/tenant-login"
              className="flex-1"
            >
              <button
                type="button"
                className="w-full bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 hover:shadow-md transition duration-300"
              >
                Tenant Login
              </button>
            </Link>

          </div>

          {/* =================================================
              SMALL INFORMATION
          ================================================= */}

          <p className="text-center text-xs text-gray-500 mt-6">
            Choose your portal to continue
          </p>

        </div>

      </main>

      {/* =====================================================
          COPYRIGHT FOOTER
      ===================================================== */}

      <footer className="relative z-10 text-center text-sm text-gray-500 py-5 px-4">

        © {new Date().getFullYear()} Rental Management System.
        All rights reserved.

      </footer>

    </div>
  );
}

export default Home;