
import React, { useMemo, useState } from "react";

import {
  FileText,
  User,
  Building2,
  Calendar,
  Eye,
  Download,
  Search,
  X,
} from "lucide-react";

import Navbar from "./Navbar";

function Documents() {

  // =========================================================
  // SEARCH AND FILTER STATES
  // =========================================================

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  // =========================================================
  // DOCUMENT DATA
  // =========================================================

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

  // =========================================================
  // SUMMARY CALCULATIONS
  // These always represent all documents.
  // =========================================================

  const totalDocuments = documents.length;

  const activeDocuments = documents.filter(
    (document) => document.status === "Active"
  ).length;

  const verifiedDocuments = documents.filter(
    (document) => document.status === "Verified"
  ).length;

  // =========================================================
  // UNIQUE FILTER OPTIONS
  // Automatically generated from document data.
  // =========================================================

  const documentTypes = [
    ...new Set(documents.map((document) => document.type)),
  ];

  const documentStatuses = [
    ...new Set(documents.map((document) => document.status)),
  ];

  // =========================================================
  // SMART SEARCH AND FILTER LOGIC
  // =========================================================

  const filteredDocuments = useMemo(() => {

    const searchValue = searchTerm.trim().toLowerCase();

    return documents.filter((document) => {

      // SEARCH ACROSS MULTIPLE FIELDS

      const matchesSearch =
        !searchValue ||
        document.name.toLowerCase().includes(searchValue) ||
        document.tenant.toLowerCase().includes(searchValue) ||
        document.property.toLowerCase().includes(searchValue) ||
        document.type.toLowerCase().includes(searchValue) ||
        document.status.toLowerCase().includes(searchValue) ||
        document.id.toString().includes(searchValue);

      // DOCUMENT TYPE FILTER

      const matchesType =
        selectedType === "All Types" ||
        document.type === selectedType;

      // STATUS FILTER

      const matchesStatus =
        selectedStatus === "All Statuses" ||
        document.status === selectedStatus;

      // ALL CONDITIONS MUST MATCH

      return matchesSearch && matchesType && matchesStatus;

    });

  }, [documents, searchTerm, selectedType, selectedStatus]);

  // =========================================================
  // CLEAR SEARCH AND FILTERS
  // =========================================================

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedType("All Types");
    setSelectedStatus("All Statuses");
  };

  // =========================================================
  // CHECK ACTIVE FILTERS
  // =========================================================

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedType !== "All Types" ||
    selectedStatus !== "All Statuses";

  // =========================================================
  // COMPONENT UI
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= MAIN CONTENT ================= */}

      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Document Management
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            View and manage documents related to your rental properties
            and tenants.
          </p>

        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

          {/* TOTAL DOCUMENTS */}

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">

                <FileText
                  size={26}
                  className="text-blue-600 dark:text-blue-400"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Documents
                </p>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {totalDocuments}
                </h3>

              </div>

            </div>

          </div>

          {/* ACTIVE DOCUMENTS */}

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl">

                <FileText
                  size={26}
                  className="text-green-600 dark:text-green-400"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Active Documents
                </p>

                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {activeDocuments}
                </h3>

              </div>

            </div>

          </div>

          {/* VERIFIED DOCUMENTS */}

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl">

                <FileText
                  size={26}
                  className="text-purple-600 dark:text-purple-400"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Verified Documents
                </p>

                <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {verifiedDocuments}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* ================= SEARCH AND FILTERS ================= */}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">

            <div>

              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Find Documents
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Search by tenant, property, document name or ID.
              </p>

            </div>

            {hasActiveFilters && (

              <button
                type="button"
                onClick={handleClearFilters}
                className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
              >

                <X size={16} />

                Clear Filters

              </button>

            )}

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* SMART SEARCH */}

            <div className="lg:col-span-1">

              <label
                htmlFor="document-search"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Search Documents
              </label>

              <div className="relative">

                <Search
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="document-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tenant, property, document..."
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />

                {searchTerm && (

                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >

                    <X size={17} />

                  </button>

                )}

              </div>

            </div>

            {/* DOCUMENT TYPE FILTER */}

            <div>

              <label
                htmlFor="document-type"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Document Type
              </label>

              <select
                id="document-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >

                <option value="All Types">
                  All Types
                </option>

                {documentTypes.map((type) => (

                  <option key={type} value={type}>
                    {type}
                  </option>

                ))}

              </select>

            </div>

            {/* STATUS FILTER */}

            <div>

              <label
                htmlFor="document-status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Document Status
              </label>

              <select
                id="document-status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >

                <option value="All Statuses">
                  All Statuses
                </option>

                {documentStatuses.map((status) => (

                  <option key={status} value={status}>
                    {status}
                  </option>

                ))}

              </select>

            </div>

          </div>

        </div>

        {/* ================= DOCUMENT RECORDS ================= */}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">

          {/* SECTION HEADER */}

          <div className="p-5 border-b border-gray-200 dark:border-gray-700">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

              <div>

                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Document Records
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Rental and tenant-related documents.
                </p>

              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">

                Showing{" "}
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {filteredDocuments.length}
                </span>
                {" "}of{" "}
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {totalDocuments}
                </span>
                {" "}documents

              </p>

            </div>

          </div>

          {/* DOCUMENT LIST */}

          <div className="divide-y divide-gray-200 dark:divide-gray-700">

            {filteredDocuments.length > 0 ? (

              filteredDocuments.map((document) => (

                <div
                  key={document.id}
                  className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors duration-200"
                >

                  {/* DOCUMENT NAME */}

                  <div className="flex items-center gap-4">

                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">

                      <FileText
                        size={24}
                        className="text-blue-600 dark:text-blue-400"
                      />

                    </div>

                    <div>

                      <h4 className="font-bold text-gray-800 dark:text-gray-100">
                        {document.name}
                      </h4>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Document ID: {document.id}
                      </p>

                    </div>

                  </div>

                  {/* DOCUMENT TYPE */}

                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">

                    <FileText size={18} />

                    <span className="text-sm">
                      {document.type}
                    </span>

                  </div>

                  {/* TENANT */}

                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">

                    <User size={18} />

                    <span className="text-sm">
                      {document.tenant}
                    </span>

                  </div>

                  {/* PROPERTY */}

                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">

                    <Building2 size={18} />

                    <span className="text-sm">
                      {document.property}
                    </span>

                  </div>

                  {/* DATE */}

                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">

                    <Calendar size={18} />

                    <span className="text-sm">
                      {document.date}
                    </span>

                  </div>

                  {/* STATUS */}

                  <span
                    className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${
                      document.status === "Active"
                        ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                        : document.status === "Verified"
                        ? "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                        : "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300"
                    }`}
                  >
                    {document.status}
                  </span>

                  {/* ACTIONS */}

                  <div className="flex gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        alert(`Viewing ${document.name}`)
                      }
                      className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >

                      <Eye size={18} />

                      View

                    </button>

                    <button
                      type="button"
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

              ))

            ) : (

              /* ================= EMPTY SEARCH RESULT ================= */

              <div className="p-10 text-center">

                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">

                  <Search
                    size={28}
                    className="text-gray-400 dark:text-gray-300"
                  />

                </div>

                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  No documents found
                </h4>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Try changing your search term or filters.
                </p>

                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Clear Filters
                </button>

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Documents;
