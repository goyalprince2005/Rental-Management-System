import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  User,
  Building2,
  Calendar,
  Eye,
  Download,
} from "lucide-react";

function Documents() {
  const navigate = useNavigate();

  const documents = [
    {
      id: 1,
      name: "Rahul Sharma - Rent Agreement",
      type: "Rent Agreement",
      tenant: "Rahul Sharma",
      property: "Green View Apartments",
      date: "Jan 10, 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Aman Kumar - ID Proof",
      type: "ID Proof",
      tenant: "Aman Kumar",
      property: "Green View Apartments",
      date: "Feb 05, 2026",
      status: "Verified",
    },
    {
      id: 3,
      name: "Neha Sharma - Rent Agreement",
      type: "Rent Agreement",
      tenant: "Neha Sharma",
      property: "Shyam Residency",
      date: "Mar 15, 2026",
      status: "Active",
    },
  ];

  const totalDocuments = documents.length;
  const activeDocuments = documents.filter(
    (document) => document.status === "Active"
  ).length;
  const verifiedDocuments = documents.filter(
    (document) => document.status === "Verified"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TOP NAVBAR ================= */}

      <header className="bg-white shadow-sm h-16 flex items-center px-4 md:px-6">

        <button
          onClick={() => navigate("/owner-dashboard")}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="Back to Dashboard"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="ml-3">

          <h1 className="text-xl font-bold text-blue-600">
            Documents
          </h1>

          <p className="text-xs text-gray-500 hidden sm:block">
            Manage rental-related documents
          </p>

        </div>

      </header>


      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Document Management
          </h2>

          <p className="text-gray-500 mt-1">
            View and manage documents related to your rental properties
            and tenants.
          </p>

        </div>


        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

          {/* TOTAL DOCUMENTS */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-blue-50 rounded-xl">

                <FileText
                  size={26}
                  className="text-blue-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Total Documents
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {totalDocuments}
                </h3>

              </div>

            </div>

          </div>


          {/* ACTIVE DOCUMENTS */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-green-50 rounded-xl">

                <FileText
                  size={26}
                  className="text-green-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Active Documents
                </p>

                <h3 className="text-2xl font-bold text-green-600">
                  {activeDocuments}
                </h3>

              </div>

            </div>

          </div>


          {/* VERIFIED DOCUMENTS */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-purple-50 rounded-xl">

                <FileText
                  size={26}
                  className="text-purple-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Verified Documents
                </p>

                <h3 className="text-2xl font-bold text-purple-600">
                  {verifiedDocuments}
                </h3>

              </div>

            </div>

          </div>

        </div>


        {/* ================= DOCUMENT RECORDS ================= */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          {/* SECTION HEADER */}

          <div className="p-5 border-b">

            <h3 className="text-lg font-bold text-gray-800">
              Document Records
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Rental and tenant-related documents.
            </p>

          </div>


          {/* DOCUMENT LIST */}

          <div className="divide-y">

            {documents.map((document) => (

              <div
                key={document.id}
                className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
              >

                {/* DOCUMENT NAME */}

                <div className="flex items-center gap-4">

                  <div className="p-3 bg-blue-50 rounded-xl">

                    <FileText
                      size={24}
                      className="text-blue-600"
                    />

                  </div>

                  <div>

                    <h4 className="font-bold text-gray-800">
                      {document.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      Document ID: {document.id}
                    </p>

                  </div>

                </div>


                {/* DOCUMENT TYPE */}

                <div className="flex items-center gap-3 text-gray-600">

                  <FileText size={18} />

                  <span className="text-sm">
                    {document.type}
                  </span>

                </div>


                {/* TENANT */}

                <div className="flex items-center gap-3 text-gray-600">

                  <User size={18} />

                  <span className="text-sm">
                    {document.tenant}
                  </span>

                </div>


                {/* PROPERTY */}

                <div className="flex items-center gap-3 text-gray-600">

                  <Building2 size={18} />

                  <span className="text-sm">
                    {document.property}
                  </span>

                </div>


                {/* DATE */}

                <div className="flex items-center gap-3 text-gray-600">

                  <Calendar size={18} />

                  <span className="text-sm">
                    {document.date}
                  </span>

                </div>


                {/* STATUS */}

                <span
                  className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${
                    document.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {document.status}
                </span>


                {/* ACTIONS */}

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      alert(`Viewing ${document.name}`)
                    }
                    className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                  >

                    <Eye size={18} />

                    View

                  </button>


                  <button
                    onClick={() =>
                      alert(`Downloading ${document.name}`)
                    }
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >

                    <Download size={18} />

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

export default Documents;