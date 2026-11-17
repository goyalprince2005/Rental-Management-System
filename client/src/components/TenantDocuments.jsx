
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Eye,
  Download,
  CheckCircle,
  Clock,
} from "lucide-react";
import TenantNavbar from "./TenantNavbar";

function TenantDocuments() {
  const navigate = useNavigate();

  // ================= GET LOGGED-IN TENANT =================

  const tenantId = localStorage.getItem("tenantId");

  const tenants = {
    "1": {
      name: "Rahul Sharma",
      documents: [
        {
          id: 1,
          name: "Aadhaar Card",
          type: "Identity Document",
          status: "Verified",
          issueDate: "January 05, 2026",
        },
        {
          id: 2,
          name: "Rent Agreement",
          type: "Rental Document",
          status: "Verified",
          issueDate: "January 10, 2026",
        },
        {
          id: 3,
          name: "Address Proof",
          type: "Address Document",
          status: "Verified",
          issueDate: "January 05, 2026",
        },
        {
          id: 4,
          name: "Passport Size Photo",
          type: "Profile Document",
          status: "Verified",
          issueDate: "January 05, 2026",
        },
      ],
    },

    "2": {
      name: "Aman Kumar",
      documents: [
        {
          id: 1,
          name: "Aadhaar Card",
          type: "Identity Document",
          status: "Verified",
          issueDate: "February 01, 2026",
        },
        {
          id: 2,
          name: "Rent Agreement",
          type: "Rental Document",
          status: "Verified",
          issueDate: "February 05, 2026",
        },
        {
          id: 3,
          name: "Address Proof",
          type: "Address Document",
          status: "Verified",
          issueDate: "February 01, 2026",
        },
      ],
    },

    "3": {
      name: "Neha Sharma",
      documents: [
        {
          id: 1,
          name: "Aadhaar Card",
          type: "Identity Document",
          status: "Verified",
          issueDate: "March 10, 2026",
        },
        {
          id: 2,
          name: "Rent Agreement",
          type: "Rental Document",
          status: "Verified",
          issueDate: "March 15, 2026",
        },
        {
          id: 3,
          name: "Address Proof",
          type: "Address Document",
          status: "Pending",
          issueDate: "March 10, 2026",
        },
      ],
    },
  };

  const tenant = tenants[tenantId];

  // ================= INVALID SESSION =================

  if (!tenant) {
    return (
      <div className="min-h-screen bg-slate-50 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100">

        <TenantNavbar />

        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">

          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Tenant Session Not Found
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Please login again to view your documents.
            </p>

            <button
              onClick={() => navigate("/tenant-login")}
              className="mt-5 rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
            >
              Go to Tenant Login
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ================= DOCUMENT ACTIONS =================

  const handleView = (document) => {
    alert(
      `${document.name}\n\nDocument viewing will be connected with the backend later.`
    );
  };

  const handleDownload = (document) => {
    alert(
      `${document.name}\n\nDocument download will be connected with the backend later.`
    );
  };

  // ================= MAIN UI =================

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100">

      {/* ================= TENANT NAVBAR ================= */}

      <TenantNavbar />

      {/* ================= MAIN CONTENT ================= */}

      <main className="mx-auto max-w-7xl p-4 transition-colors duration-200 md:p-6">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <h1 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">
            My Documents
          </h1>

          <p className="mt-1 text-gray-500 dark:text-gray-400">
            View your rental and personal documents.
          </p>

        </div>

        {/* ================= TENANT INFORMATION ================= */}

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-green-50 p-3 dark:bg-green-900/30">

              <FileText
                size={28}
                className="text-green-600 dark:text-green-400"
              />

            </div>

            <div>

              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {tenant.name}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your uploaded and verified documents
              </p>

            </div>

          </div>

        </div>

        {/* ================= DOCUMENT SUMMARY ================= */}

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* TOTAL DOCUMENTS */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Documents
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
              {tenant.documents.length}
            </p>

          </div>

          {/* VERIFIED */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Verified
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
              {
                tenant.documents.filter(
                  (document) => document.status === "Verified"
                ).length
              }
            </p>

          </div>

          {/* PENDING */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pending
            </p>

            <p className="mt-2 text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {
                tenant.documents.filter(
                  (document) => document.status === "Pending"
                ).length
              }
            </p>

          </div>

        </div>

        {/* ================= DOCUMENT LIST ================= */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

          <div className="border-b border-gray-200 p-6 dark:border-gray-700">

            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Document Details
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Documents associated with your rental account.
            </p>

          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700">

            {tenant.documents.map((document) => (

              <div
                key={document.id}
                className="flex flex-col gap-4 p-5 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/30 md:flex-row md:items-center md:justify-between"
              >

                {/* ================= DOCUMENT INFO ================= */}

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-green-50 p-3 dark:bg-green-900/30">

                    <FileText
                      size={24}
                      className="text-green-600 dark:text-green-400"
                    />

                  </div>

                  <div>

                    <h3 className="font-bold text-gray-800 dark:text-white">
                      {document.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {document.type}
                    </p>

                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      Added: {document.issueDate}
                    </p>

                  </div>

                </div>

                {/* ================= STATUS + ACTIONS ================= */}

                <div className="flex flex-wrap items-center gap-3">

                  {/* DOCUMENT STATUS */}

                  <span
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm ${
                      document.status === "Verified"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                    }`}
                  >

                    {document.status === "Verified" ? (
                      <CheckCircle size={14} />
                    ) : (
                      <Clock size={14} />
                    )}

                    {document.status}

                  </span>

                  {/* VIEW BUTTON */}

                  <button
                    onClick={() => handleView(document)}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                  >

                    <Eye size={17} />

                    View

                  </button>

                  {/* DOWNLOAD BUTTON */}

                  <button
                    onClick={() => handleDownload(document)}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                  >

                    <Download size={17} />

                    Download

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}

export default TenantDocuments;

