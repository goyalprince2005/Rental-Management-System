
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  IndianRupee,
  Megaphone,
  Wrench,
  FileText,
  CheckCircle,
  Clock,
} from "lucide-react";
import TenantNavbar from "./TenantNavbar";

function TenantNotices() {
  const navigate = useNavigate();

  // ================= MOCK TENANT DATA =================

  const tenants = {
    "1": {
      id: "1",
      name: "Rahul Sharma",
      notices: [
        {
          id: 1,
          title: "Rent Payment Reminder",
          message:
            "Your September rent payment of ₹5,000 is due on September 10, 2026.",
          type: "Rent",
          date: "September 5, 2026",
          status: "Unread",
        },
        {
          id: 2,
          title: "Document Verification Completed",
          message:
            "Your submitted rental documents have been successfully verified.",
          type: "Document",
          date: "September 2, 2026",
          status: "Read",
        },
        {
          id: 3,
          title: "Maintenance Update",
          message:
            "Common area maintenance is scheduled for September 8, 2026.",
          type: "Maintenance",
          date: "August 30, 2026",
          status: "Read",
        },
      ],
    },

    "2": {
      id: "2",
      name: "Aman Kumar",
      notices: [
        {
          id: 1,
          title: "Rent Payment Reminder",
          message:
            "Your September rent payment of ₹6,000 is due on September 10, 2026.",
          type: "Rent",
          date: "September 5, 2026",
          status: "Unread",
        },
        {
          id: 2,
          title: "Important Property Notice",
          message:
            "Please ensure that the common areas are kept clean and tidy.",
          type: "Announcement",
          date: "September 1, 2026",
          status: "Read",
        },
      ],
    },

    "3": {
      id: "3",
      name: "Neha Sharma",
      notices: [
        {
          id: 1,
          title: "Pending Rent Payment",
          message:
            "Your monthly rent of ₹5,500 is currently pending. Please complete the payment.",
          type: "Rent",
          date: "September 5, 2026",
          status: "Unread",
        },
        {
          id: 2,
          title: "Document Verification Required",
          message:
            "Please submit the required address proof for verification.",
          type: "Document",
          date: "September 3, 2026",
          status: "Unread",
        },
        {
          id: 3,
          title: "Maintenance Update",
          message:
            "Common area maintenance is scheduled for September 8, 2026.",
          type: "Maintenance",
          date: "August 30, 2026",
          status: "Read",
        },
      ],
    },
  };

  // ================= GET LOGGED-IN TENANT =================

  const tenantId = localStorage.getItem("tenantId");

  const tenant = tenants[tenantId];

  // ================= INVALID TENANT =================

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
              Please login again to view your notices.
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

  // ================= NOTICE ICON =================

  const getNoticeIcon = (type) => {
    if (type === "Rent") {
      return (
        <IndianRupee
          size={24}
          className="text-green-600 dark:text-green-400"
        />
      );
    }

    if (type === "Document") {
      return (
        <FileText
          size={24}
          className="text-blue-600 dark:text-blue-400"
        />
      );
    }

    if (type === "Maintenance") {
      return (
        <Wrench
          size={24}
          className="text-yellow-600 dark:text-yellow-400"
        />
      );
    }

    return (
      <Megaphone
        size={24}
        className="text-purple-600 dark:text-purple-400"
      />
    );
  };

  // ================= NOTICE BACKGROUND =================

  const getNoticeIconBackground = (type) => {
    if (type === "Rent") {
      return "bg-green-50 dark:bg-green-900/30";
    }

    if (type === "Document") {
      return "bg-blue-50 dark:bg-blue-900/30";
    }

    if (type === "Maintenance") {
      return "bg-yellow-50 dark:bg-yellow-900/30";
    }

    return "bg-purple-50 dark:bg-purple-900/30";
  };

  // ================= NOTICE COUNTS =================

  const totalNotices = tenant.notices.length;

  const unreadNotices = tenant.notices.filter(
    (notice) => notice.status === "Unread"
  ).length;

  const readNotices = tenant.notices.filter(
    (notice) => notice.status === "Read"
  ).length;

  // ================= MAIN UI =================

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100">

      {/* ================= TENANT NAVBAR ================= */}

      <TenantNavbar />

      {/* ================= MAIN CONTENT ================= */}

      <main className="mx-auto max-w-7xl p-4 transition-colors duration-200 md:p-6">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-green-50 p-3 dark:bg-green-900/30">

              <Bell
                size={28}
                className="text-green-600 dark:text-green-400"
              />

            </div>

            <div>

              <h1 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">
                Notices
              </h1>

              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Important updates from your property owner.
              </p>

            </div>

          </div>

        </div>

        {/* ================= TENANT INFORMATION ================= */}

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            {tenant.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your rental-related notices and updates.
          </p>

        </div>

        {/* ================= NOTICE SUMMARY ================= */}

        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">

          {/* TOTAL */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Notices
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
              {totalNotices}
            </p>

          </div>

          {/* UNREAD */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Unread
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
              {unreadNotices}
            </p>

          </div>

          {/* READ */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Read
            </p>

            <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
              {readNotices}
            </p>

          </div>

        </div>

        {/* ================= NOTICE LIST ================= */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">

          <div className="border-b border-gray-200 p-6 dark:border-gray-700">

            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Recent Notices
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Stay updated with important rental information.
            </p>

          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700">

            {tenant.notices.map((notice) => (

              <div
                key={notice.id}
                className={`p-5 transition-colors duration-200 ${
                  notice.status === "Unread"
                    ? "bg-green-50/40 dark:bg-green-900/10"
                    : "bg-white dark:bg-gray-800"
                }`}
              >

                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                  {/* ================= NOTICE DETAILS ================= */}

                  <div className="flex items-start gap-4">

                    <div
                      className={`rounded-xl p-3 ${getNoticeIconBackground(
                        notice.type
                      )}`}
                    >
                      {getNoticeIcon(notice.type)}
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-bold text-gray-800 dark:text-white">
                          {notice.title}
                        </h3>

                        {notice.status === "Unread" && (
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-400">
                            New
                          </span>
                        )}

                      </div>

                      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                        {notice.message}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-3">

                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {notice.type}
                        </span>

                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">

                          <Clock size={13} />

                          {notice.date}

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* ================= NOTICE STATUS ================= */}

                  <div className="flex items-center">

                    {notice.status === "Read" ? (

                      <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">

                        <CheckCircle size={16} />

                        Read

                      </span>

                    ) : (

                      <span className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">

                        <Bell size={16} />

                        Unread

                      </span>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* ================= BACK BUTTON ================= */}

        <div className="mt-6">

          <button
            onClick={() => navigate("/tenant-dashboard")}
            className="rounded-lg border border-gray-300 px-5 py-3 text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            ← Back to Dashboard
          </button>

        </div>

      </main>

    </div>
  );
}

export default TenantNotices;