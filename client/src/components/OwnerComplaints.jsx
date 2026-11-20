
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Filter,
  User,
  Building2,
  DoorOpen,
  CalendarDays,
  X,
  RefreshCw,
} from "lucide-react";

// =========================================================
// CONSTANTS
// =========================================================

const COMPLAINTS_STORAGE_KEY = "rentalManagementComplaints";

const STATUS_OPTIONS = [
  "All",
  "Pending",
  "In Progress",
  "Resolved",
];

const STATUS_STYLES = {
  Pending: {
    light: "bg-amber-100 text-amber-700",
    dark: "dark:bg-amber-900/30 dark:text-amber-300",
  },
  "In Progress": {
    light: "bg-blue-100 text-blue-700",
    dark: "dark:bg-blue-900/30 dark:text-blue-300",
  },
  Resolved: {
    light: "bg-green-100 text-green-700",
    dark: "dark:bg-green-900/30 dark:text-green-300",
  },
};

// =========================================================
// HELPER FUNCTIONS
// =========================================================

const getStoredComplaints = () => {
  try {
    const storedData = localStorage.getItem(
      COMPLAINTS_STORAGE_KEY
    );

    if (!storedData) return [];

    const parsedData = JSON.parse(storedData);

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error("Unable to load complaints:", error);
    return [];
  }
};

const formatDate = (dateValue) => {
  if (!dateValue) return "Date unavailable";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getStatusStyle = (status) => {
  return (
    STATUS_STYLES[status] || {
      light: "bg-gray-100 text-gray-700",
      dark: "dark:bg-gray-700 dark:text-gray-200",
    }
  );
};

// =========================================================
// MAIN COMPONENT
// =========================================================

function OwnerComplaints() {
  const [complaints, setComplaints] = useState(
    getStoredComplaints
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  const [ownerResponse, setOwnerResponse] = useState("");

  const [feedback, setFeedback] = useState("");

  // =======================================================
  // LOAD COMPLAINTS
  // =======================================================

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (
        event.key === COMPLAINTS_STORAGE_KEY ||
        event.key === null
      ) {
        setComplaints(getStoredComplaints());
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // =======================================================
  // SAVE COMPLAINTS
  // =======================================================

  const saveComplaints = (updatedComplaints) => {
    try {
      localStorage.setItem(
        COMPLAINTS_STORAGE_KEY,
        JSON.stringify(updatedComplaints)
      );

      setComplaints(updatedComplaints);
      setFeedback("");
      return true;
    } catch (error) {
      console.error("Unable to save complaints:", error);
      setFeedback("Unable to save changes. Please try again.");
      return false;
    }
  };

  // =======================================================
  // COMPLAINT STATISTICS
  // =======================================================

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const inProgressComplaints = complaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  // =======================================================
  // SEARCH AND FILTER
  // =======================================================

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch = [
        complaint.tenantName,
        complaint.propertyName,
        complaint.roomNumber,
        complaint.title,
        complaint.description,
      ].some((value) =>
        String(value || "").toLowerCase().includes(search)
      );

      const matchesStatus =
        selectedStatus === "All" ||
        complaint.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [complaints, searchTerm, selectedStatus]);

  // =======================================================
  // UPDATE COMPLAINT STATUS
  // =======================================================

  const handleStatusChange = (complaintId, newStatus) => {
    const updatedComplaints = complaints.map((complaint) =>
      String(complaint.id) === String(complaintId)
        ? {
            ...complaint,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          }
        : complaint
    );

    saveComplaints(updatedComplaints);

    if (
      selectedComplaint &&
      String(selectedComplaint.id) === String(complaintId)
    ) {
      setSelectedComplaint({
        ...selectedComplaint,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  // =======================================================
  // OPEN COMPLAINT DETAILS
  // =======================================================

  const handleViewComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setOwnerResponse(complaint.ownerResponse || "");
    setFeedback("");
  };

  // =======================================================
  // SEND OWNER RESPONSE
  // =======================================================

  const handleSendResponse = () => {
    if (!selectedComplaint) return;

    if (!ownerResponse.trim()) {
      setFeedback("Please enter a response before submitting.");
      return;
    }

    const updatedComplaints = complaints.map((complaint) =>
      String(complaint.id) ===
      String(selectedComplaint.id)
        ? {
            ...complaint,
            ownerResponse: ownerResponse.trim(),
            respondedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        : complaint
    );

    const saved = saveComplaints(updatedComplaints);

    if (saved) {
      setSelectedComplaint({
        ...selectedComplaint,
        ownerResponse: ownerResponse.trim(),
        respondedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      setFeedback("Response saved successfully.");
    }
  };

  // =======================================================
  // REFRESH COMPLAINTS
  // =======================================================

  const handleRefresh = () => {
    setComplaints(getStoredComplaints());
    setFeedback("");
  };

  // =======================================================
  // STAT CARD
  // =======================================================

  const StatCard = ({
    title,
    count,
    icon: Icon,
    iconColor,
    iconBg,
  }) => (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {count}
          </h3>
        </div>

        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon size={23} className={iconColor} />
        </div>
      </div>
    </div>
  );

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8 transition-colors">

      {/* PAGE HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Complaints Management
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Manage tenant complaints and respond to their concerns.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <RefreshCw size={17} />
          Refresh
        </button>

      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">

        <StatCard
          title="Total Complaints"
          count={totalComplaints}
          icon={MessageSquare}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-100 dark:bg-indigo-900/30"
        />

        <StatCard
          title="Pending"
          count={pendingComplaints}
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-100 dark:bg-amber-900/30"
        />

        <StatCard
          title="In Progress"
          count={inProgressComplaints}
          icon={AlertCircle}
          iconColor="text-blue-600"
          iconBg="bg-blue-100 dark:bg-blue-900/30"
        />

        <StatCard
          title="Resolved"
          count={resolvedComplaints}
          icon={CheckCircle}
          iconColor="text-green-600"
          iconBg="bg-green-100 dark:bg-green-900/30"
        />

      </div>

      {/* SEARCH AND FILTER */}

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6 shadow-sm">

        <div className="flex flex-col md:flex-row gap-3">

          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search tenant, property, room or complaint..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative md:w-56">
            <Filter
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={selectedStatus}
              onChange={(event) =>
                setSelectedStatus(event.target.value)
              }
              className="w-full appearance-none pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status === "All"
                    ? "All Statuses"
                    : status}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* FEEDBACK */}

      {feedback && !selectedComplaint && (
        <div
          role="status"
          className="mb-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm"
        >
          {feedback}
        </div>
      )}

      {/* COMPLAINT LIST */}

      <div className="space-y-4">

        {filteredComplaints.length === 0 ? (

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-10 text-center shadow-sm">

            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
              <MessageSquare
                size={29}
                className="text-gray-400"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {complaints.length === 0
                ? "No Complaints Yet"
                : "No Matching Complaints"}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
              {complaints.length === 0
                ? "Tenant complaints will appear here when tenants submit them through their portal."
                : "Try changing your search or status filter."}
            </p>

          </div>

        ) : (

          filteredComplaints.map((complaint) => {

            const statusStyle = getStatusStyle(
              complaint.status
            );

            return (
              <div
                key={complaint.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >

                {/* CARD HEADER */}

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                  <div className="flex items-start gap-3">

                    <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                      <MessageSquare
                        size={21}
                        className="text-indigo-600 dark:text-indigo-400"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {complaint.title || "Tenant Complaint"}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Complaint ID: {complaint.id}
                      </p>
                    </div>

                  </div>

                  <span
                    className={`inline-flex items-center w-fit px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.light} ${statusStyle.dark}`}
                  >
                    {complaint.status || "Pending"}
                  </span>

                </div>

                {/* COMPLAINT INFORMATION */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <User
                      size={17}
                      className="text-gray-400"
                    />
                    <span>
                      {complaint.tenantName || "Unknown Tenant"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Building2
                      size={17}
                      className="text-gray-400"
                    />
                    <span>
                      {complaint.propertyName || "Unknown Property"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <DoorOpen
                      size={17}
                      className="text-gray-400"
                    />
                    <span>
                      Room {complaint.roomNumber || "N/A"}
                    </span>
                  </div>

                </div>

                {/* DESCRIPTION */}

                <div className="mt-5">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Complaint Description
                  </p>

                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {complaint.description || "No description provided."}
                  </p>
                </div>

                {/* DATE AND ACTION */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">

                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <CalendarDays size={15} />
                    Submitted: {formatDate(complaint.createdAt)}
                  </div>

                  <button
                    onClick={() =>
                      handleViewComplaint(complaint)
                    }
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition"
                  >
                    View & Respond
                  </button>

                </div>

              </div>
            );
          })

        )}

      </div>

      {/* COMPLAINT DETAILS MODAL */}

      {selectedComplaint && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedComplaint(null)}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="complaint-modal-title"
            className="bg-white dark:bg-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">

              <div>
                <h2
                  id="complaint-modal-title"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  Complaint Details
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  ID: {selectedComplaint.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedComplaint(null)}
                aria-label="Close complaint details"
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X size={21} />
              </button>

            </div>

            {/* MODAL BODY */}

            <div className="p-5 space-y-5">

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Complaint Title
                </p>

                <p className="font-semibold text-gray-900 dark:text-white mt-1">
                  {selectedComplaint.title || "Tenant Complaint"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tenant
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">
                    {selectedComplaint.tenantName || "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Property
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">
                    {selectedComplaint.propertyName || "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Room
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">
                    {selectedComplaint.roomNumber || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Submitted
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">
                    {formatDate(selectedComplaint.createdAt)}
                  </p>
                </div>

              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Description
                </p>

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {selectedComplaint.description || "No description provided."}
                </div>
              </div>

              {/* STATUS UPDATE */}

              <div>
                <label
                  htmlFor="complaint-status"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Update Complaint Status
                </label>

                <select
                  id="complaint-status"
                  value={selectedComplaint.status || "Pending"}
                  onChange={(event) =>
                    handleStatusChange(
                      selectedComplaint.id,
                      event.target.value
                    )
                  }
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              {/* OWNER RESPONSE */}

              <div>
                <label
                  htmlFor="owner-response"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Owner Response
                </label>

                <textarea
                  id="owner-response"
                  rows={4}
                  value={ownerResponse}
                  onChange={(event) =>
                    setOwnerResponse(event.target.value)
                  }
                  placeholder="Write your response to the tenant..."
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                />

                {selectedComplaint.ownerResponse && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Previously saved response:
                    {" "}{formatDate(selectedComplaint.respondedAt)}
                  </p>
                )}
              </div>

              {feedback && (
                <p
                  role="status"
                  className="text-sm text-blue-600 dark:text-blue-400"
                >
                  {feedback}
                </p>
              )}

              {/* ACTION BUTTON */}

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">

                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Close
                </button>

                <button
                  onClick={handleSendResponse}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
                >
                  <Send size={17} />
                  Save Response
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default OwnerComplaints;
