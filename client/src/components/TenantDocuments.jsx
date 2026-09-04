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
      <div className="min-h-screen bg-gray-100">

        <TenantNavbar />

        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">

          <div className="bg-white p-8 rounded-xl shadow-sm text-center">

            <h2 className="text-2xl font-bold text-gray-800">
              Tenant Session Not Found
            </h2>

            <p className="text-gray-500 mt-2">
              Please login again to view your documents.
            </p>

            <button
              onClick={() => navigate("/tenant-login")}
              className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
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

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TENANT NAVBAR ================= */}

      <TenantNavbar />


      {/* ================= MAIN CONTENT ================= */}

      <main className="max-w-7xl mx-auto p-4 md:p-6">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            My Documents
          </h1>

          <p className="text-gray-500 mt-1">
            View your rental and personal documents.
          </p>

        </div>


        {/* ================= TENANT INFORMATION ================= */}

        <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">

          <div className="flex items-center gap-4">

            <div className="p-3 bg-green-50 rounded-xl">

              <FileText
                size={28}
                className="text-green-600"
              />

            </div>

            <div>

              <h2 className="text-lg font-bold text-gray-800">
                {tenant.name}
              </h2>

              <p className="text-sm text-gray-500">
                Your uploaded and verified documents
              </p>

            </div>

          </div>

        </div>


        {/* ================= DOCUMENT SUMMARY ================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <p className="text-sm text-gray-500">
              Total Documents
            </p>

            <p className="text-2xl font-bold text-gray-800 mt-2">
              {tenant.documents.length}
            </p>

          </div>


          <div className="bg-white rounded-xl shadow-sm border p-5">

            <p className="text-sm text-gray-500">
              Verified
            </p>

            <p className="text-2xl font-bold text-green-600 mt-2">
              {
                tenant.documents.filter(
                  (document) => document.status === "Verified"
                ).length
              }
            </p>

          </div>


          <div className="bg-white rounded-xl shadow-sm border p-5">

            <p className="text-sm text-gray-500">
              Pending
            </p>

            <p className="text-2xl font-bold text-yellow-600 mt-2">
              {
                tenant.documents.filter(
                  (document) => document.status === "Pending"
                ).length
              }
            </p>

          </div>

        </div>


        {/* ================= DOCUMENT LIST ================= */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-xl font-bold text-gray-800">
              Document Details
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Documents associated with your rental account.
            </p>

          </div>


          <div className="divide-y">

            {tenant.documents.map((document) => (

              <div
                key={document.id}
                className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

                {/* ================= DOCUMENT INFO ================= */}

                <div className="flex items-center gap-4">

                  <div className="p-3 bg-blue-50 rounded-xl">

                    <FileText
                      size={24}
                      className="text-blue-600"
                    />

                  </div>

                  <div>

                    <h3 className="font-bold text-gray-800">
                      {document.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {document.type}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Added: {document.issueDate}
                    </p>

                  </div>

                </div>


                {/* ================= STATUS + ACTIONS ================= */}

                <div className="flex flex-wrap items-center gap-3">

                  <span
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      document.status === "Verified"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >

                    {document.status === "Verified" ? (
                      <CheckCircle size={14} />
                    ) : (
                      <Clock size={14} />
                    )}

                    {document.status}

                  </span>


                  <button
                    onClick={() => handleView(document)}
                    className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                  >

                    <Eye size={17} />

                    View

                  </button>


                  <button
                    onClick={() => handleDownload(document)}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
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