import React, { useState } from "react";
import { Wrench, Clock, CheckCircle, Send } from "lucide-react";
import TenantNavbar from "./TenantNavbar";

function TenantMaintenance() {
  const tenantId = localStorage.getItem("tenantId");

  // ================= MOCK COMPLAINT DATA =================

  const [complaints, setComplaints] = useState([
    {
      id: 1,
      tenantId: "1",
      category: "Plumbing",
      description: "Water tap is leaking in the bathroom.",
      status: "Pending",
      date: "September 5, 2026",
    },
    {
      id: 2,
      tenantId: "1",
      category: "Electrical",
      description: "Tube light is not working.",
      status: "In Progress",
      date: "September 2, 2026",
    },
    {
      id: 3,
      tenantId: "2",
      category: "Cleaning",
      description: "Room cleaning is required.",
      status: "Resolved",
      date: "August 28, 2026",
    },
  ]);

  // ================= FORM STATE =================

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [categoryError, setCategoryError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  // ================= SUBMIT COMPLAINT =================

  const handleSubmit = (e) => {
    e.preventDefault();

    setCategoryError("");
    setDescriptionError("");

    let hasError = false;

    // ================= CATEGORY VALIDATION =================

    if (!category) {
      setCategoryError("Please select a complaint category.");
      hasError = true;
    }

    // ================= DESCRIPTION VALIDATION =================

    if (!description.trim()) {
      setDescriptionError("Please describe your problem.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // ================= NEW COMPLAINT =================

    const newComplaint = {
      id: Date.now(),
      tenantId: tenantId,
      category: category,
      description: description.trim(),
      status: "Pending",
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    setComplaints((previousComplaints) => [
      newComplaint,
      ...previousComplaints,
    ]);

    // ================= CLEAR FORM =================

    setCategory("");
    setDescription("");

    alert("Complaint submitted successfully.");
  };

  // ================= TENANT COMPLAINTS =================

  const tenantComplaints = complaints.filter(
    (complaint) => complaint.tenantId === tenantId
  );

  // ================= STATUS ICON =================

  const getStatusIcon = (status) => {
    if (status === "Resolved") {
      return <CheckCircle size={18} />;
    }

    if (status === "In Progress") {
      return <Clock size={18} />;
    }

    return <Clock size={18} />;
  };

  // ================= STATUS STYLE =================

  const getStatusStyle = (status) => {
    if (status === "Resolved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "In Progress") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}

      <TenantNavbar />


      {/* ================= MAIN CONTENT ================= */}

      <main className="max-w-6xl mx-auto p-4 md:p-6">

        {/* ================= PAGE HEADER ================= */}

        <div className="mb-6">

          <div className="flex items-center gap-3">

            <div className="p-3 bg-green-50 rounded-xl">

              <Wrench
                size={28}
                className="text-green-600"
              />

            </div>

            <div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Maintenance & Complaints
              </h1>

              <p className="text-gray-500 mt-1">
                Report a problem or check the status of your complaints.
              </p>

            </div>

          </div>

        </div>


        {/* ================= REPORT PROBLEM ================= */}

        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">

          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Report a Problem
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ================= CATEGORY ================= */}

            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Complaint Category
              </label>

              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCategoryError("");
                }}
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  categoryError
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >

                <option value="">
                  Select a category
                </option>

                <option value="Plumbing">
                  Plumbing
                </option>

                <option value="Electrical">
                  Electrical
                </option>

                <option value="Cleaning">
                  Cleaning
                </option>

                <option value="Room / Property">
                  Room / Property
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

              {categoryError && (
                <p className="text-red-500 text-sm mt-2">
                  {categoryError}
                </p>
              )}

            </div>


            {/* ================= DESCRIPTION ================= */}

            <div>

              <label className="block mb-2 font-medium text-gray-700">
                Problem Description
              </label>

              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDescriptionError("");
                }}
                placeholder="Describe your problem..."
                rows={5}
                className={`w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  descriptionError
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              {descriptionError && (
                <p className="text-red-500 text-sm mt-2">
                  {descriptionError}
                </p>
              )}

            </div>


            {/* ================= SUBMIT ================= */}

            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >

              <Send size={18} />

              Submit Complaint

            </button>

          </form>

        </div>


        {/* ================= MY COMPLAINTS ================= */}

        <div className="bg-white rounded-xl shadow-sm border p-6">

          <h2 className="text-xl font-bold text-gray-800 mb-5">
            My Complaints
          </h2>

          {tenantComplaints.length === 0 ? (

            <div className="text-center py-10">

              <Wrench
                size={40}
                className="mx-auto text-gray-400"
              />

              <p className="text-gray-500 mt-3">
                You have not submitted any complaints yet.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {tenantComplaints.map((complaint) => (

                <div
                  key={complaint.id}
                  className="border rounded-xl p-5"
                >

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                    <div>

                      <h3 className="font-bold text-lg text-gray-800">
                        {complaint.category}
                      </h3>

                      <p className="text-gray-600 mt-2">
                        {complaint.description}
                      </p>

                      <p className="text-sm text-gray-400 mt-3">
                        Submitted on {complaint.date}
                      </p>

                    </div>


                    {/* ================= STATUS ================= */}

                    <span
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                        complaint.status
                      )}`}
                    >

                      {getStatusIcon(complaint.status)}

                      {complaint.status}

                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default TenantMaintenance;