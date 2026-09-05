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
      <div className="min-h-screen bg-gray-100">

        <TenantNavbar />

        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">

          <div className="bg-white p-8 rounded-xl shadow-sm text-center">

            <h2 className="text-2xl font-bold text-gray-800">
              Tenant Session Not Found
            </h2>

            <p className="text-gray-500 mt-2">
              Please login again to view your notices.
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

  // ================= NOTICE ICON =================

  const getNoticeIcon = (type) => {
    if (type === "Rent") {
      return (
        <IndianRupee
          size={24}
          className="text-green-600"
        />
      );
    }

    if (type === "Document") {
      return (
        <FileText
          size={24}
          className="text-blue-600"
        />
      );
    }

    if (type === "Maintenance") {
      return (
        <Wrench
          size={24}
          className="text-yellow-600"
        />
      );
    }

    return (
      <Megaphone
        size={24}
        className="text-purple-600"
      />
    );
  };

  // ================= NOTICE BACKGROUND =================

  const getNoticeIconBackground = (type) => {
    if (type === "Rent") {
      return "bg-green-50";
    }

    if (type === "Document") {
      return "bg-blue-50";
    }

    if (type === "Maintenance") {
      return "bg-yellow-50";
    }

    return "bg-purple-50";
  };

  // ================= NOTICE COUNTS =================

  const totalNotices = tenant.notices.length;

  const unreadNotices = tenant.notices.filter(
    (notice) => notice.status === "Unread"
  ).length;

  const readNotices = tenant.notices.filter(
    (notice) => notice.status === "Read"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TENANT NAVBAR ================= */}

      <TenantNavbar />


      {/* ================= MAIN CONTENT ================= */}

      <main className="max-w-7xl mx-auto p-4 md:p-6">

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">

          <div className="flex items-center gap-3">

            <div className="p-3 bg-green-50 rounded-xl">

              <Bell
                size={28}
                className="text-green-600"
              />

            </div>

            <div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Notices
              </h1>

              <p className="text-gray-500 mt-1">
                Important updates from your property owner.
              </p>

            </div>

          </div>

        </div>


        {/* ================= TENANT INFORMATION ================= */}

        <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">

          <h2 className="text-lg font-bold text-gray-800">
            {tenant.name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Your rental-related notices and updates.
          </p>

        </div>


        {/* ================= NOTICE SUMMARY ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">

          {/* Total */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <p className="text-sm text-gray-500">
              Total Notices
            </p>

            <p className="text-2xl font-bold text-gray-800 mt-2">
              {totalNotices}
            </p>

          </div>


          {/* Unread */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <p className="text-sm text-gray-500">
              Unread
            </p>

            <p className="text-2xl font-bold text-green-600 mt-2">
              {unreadNotices}
            </p>

          </div>


          {/* Read */}

          <div className="bg-white rounded-xl shadow-sm border p-5">

            <p className="text-sm text-gray-500">
              Read
            </p>

            <p className="text-2xl font-bold text-blue-600 mt-2">
              {readNotices}
            </p>

          </div>

        </div>


        {/* ================= NOTICE LIST ================= */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-xl font-bold text-gray-800">
              Recent Notices
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Stay updated with important rental information.
            </p>

          </div>


          <div className="divide-y">

            {tenant.notices.map((notice) => (

              <div
                key={notice.id}
                className={`p-5 transition ${
                  notice.status === "Unread"
                    ? "bg-green-50/40"
                    : "bg-white"
                }`}
              >

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                  {/* ================= NOTICE DETAILS ================= */}

                  <div className="flex items-start gap-4">

                    <div
                      className={`p-3 rounded-xl ${getNoticeIconBackground(
                        notice.type
                      )}`}
                    >
                      {getNoticeIcon(notice.type)}
                    </div>


                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-bold text-gray-800">
                          {notice.title}
                        </h3>

                        {notice.status === "Unread" && (
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                            New
                          </span>
                        )}

                      </div>


                      <p className="text-sm text-gray-600 mt-2 leading-6">
                        {notice.message}
                      </p>


                      <div className="flex flex-wrap items-center gap-3 mt-3">

                        <span className="text-xs text-gray-500">
                          {notice.type}
                        </span>

                        <span className="flex items-center gap-1 text-xs text-gray-500">

                          <Clock size={13} />

                          {notice.date}

                        </span>

                      </div>

                    </div>

                  </div>


                  {/* ================= NOTICE STATUS ================= */}

                  <div className="flex items-center">

                    {notice.status === "Read" ? (
                      <span className="flex items-center gap-1 text-sm text-gray-500">

                        <CheckCircle size={16} />

                        Read

                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-sm font-medium text-green-600">

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
            className="px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            ← Back to Dashboard
          </button>

        </div>

      </main>

    </div>
  );
}

export default TenantNotices;