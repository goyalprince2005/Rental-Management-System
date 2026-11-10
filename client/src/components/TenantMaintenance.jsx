
import React, { useEffect, useState } from "react";

import {
  Wrench,
  Clock,
  CheckCircle,
  Send,
  AlertCircle,
  ImagePlus,
  X,
  Eye,
  MessageSquare,
  Calendar,
  Building2,
  DoorOpen,
  User,
  FileText,
  Trash2,
  ArrowLeft,
  History,
  Paperclip,
} from "lucide-react";

import TenantNavbar from "./TenantNavbar";

function TenantMaintenance() {
  // =========================================================
  // LOGGED-IN TENANT
  // =========================================================

  const tenantId = localStorage.getItem("tenantId");

  // =========================================================
  // MOCK COMPLAINT DATA
  // Backend integration will be added later.
  // =========================================================

  const [complaints, setComplaints] = useState([
    {
      id: "CMP-001",
      tenantId: "1",
      title: "Bathroom water leakage",
      category: "Plumbing",
      description:
        "Water tap is leaking in the bathroom. Please arrange a repair.",
      priority: "High",
      status: "Pending",
      date: "2026-09-05T10:30:00",
      property: "Green View Apartments",
      room: "101",
      attachments: [],
      ownerResponse: "",
      responseDate: null,
      history: [
        {
          status: "Pending",
          message: "Complaint submitted successfully.",
          date: "2026-09-05T10:30:00",
        },
      ],
    },
    {
      id: "CMP-002",
      tenantId: "1",
      title: "Tube light not working",
      category: "Electrical",
      description:
        "The tube light in my room is not working properly.",
      priority: "Medium",
      status: "In Progress",
      date: "2026-09-02T12:00:00",
      property: "Green View Apartments",
      room: "101",
      attachments: [],
      ownerResponse:
        "Maintenance staff has been informed. The electrician will visit shortly.",
      responseDate: "2026-09-03T11:00:00",
      history: [
        {
          status: "Pending",
          message: "Complaint submitted successfully.",
          date: "2026-09-02T12:00:00",
        },
        {
          status: "In Progress",
          message: "Owner has acknowledged your complaint.",
          date: "2026-09-03T11:00:00",
        },
      ],
    },
    {
      id: "CMP-003",
      tenantId: "2",
      title: "Room cleaning required",
      category: "Cleaning",
      description: "Room cleaning is required.",
      priority: "Low",
      status: "Resolved",
      date: "2026-08-28T09:00:00",
      property: "Green View Apartments",
      room: "102",
      attachments: [],
      ownerResponse:
        "The cleaning request has been completed.",
      responseDate: "2026-08-29T14:00:00",
      history: [
        {
          status: "Pending",
          message: "Complaint submitted successfully.",
          date: "2026-08-28T09:00:00",
        },
        {
          status: "In Progress",
          message: "Cleaning has been scheduled.",
          date: "2026-08-28T15:00:00",
        },
        {
          status: "Resolved",
          message: "Cleaning request completed.",
          date: "2026-08-29T14:00:00",
        },
      ],
    },
  ]);

  // =========================================================
  // FORM STATE
  // =========================================================

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [attachments, setAttachments] = useState([]);

  // =========================================================
  // VALIDATION STATE
  // =========================================================

  const [errors, setErrors] = useState({});

  const [attachmentError, setAttachmentError] = useState("");

  // =========================================================
  // UI STATE
  // =========================================================

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================================================
  // CLEANUP OBJECT URLS
  // =========================================================

  useEffect(() => {
    return () => {
      attachments.forEach((attachment) => {
        if (attachment.previewUrl) {
          URL.revokeObjectURL(attachment.previewUrl);
        }
      });
    };
  }, [attachments]);

  // =========================================================
  // TENANT COMPLAINTS
  // =========================================================

  const tenantComplaints = complaints.filter(
    (complaint) => complaint.tenantId === tenantId
  );

  // =========================================================
  // COMPLAINT COUNTS
  // =========================================================

  const totalComplaints = tenantComplaints.length;

  const pendingComplaints = tenantComplaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const inProgressComplaints = tenantComplaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolvedComplaints = tenantComplaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  // =========================================================
  // DATE FORMATTER
  // =========================================================

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not available";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateValue) => {
    if (!dateValue) return "Not available";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================================================
  // FORM VALIDATION
  // =========================================================

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Please enter a complaint title.";
    } else if (title.trim().length < 5) {
      newErrors.title =
        "Complaint title must contain at least 5 characters.";
    } else if (title.trim().length > 100) {
      newErrors.title =
        "Complaint title cannot exceed 100 characters.";
    }

    if (!category) {
      newErrors.category =
        "Please select a complaint category.";
    }

    if (!description.trim()) {
      newErrors.description =
        "Please describe your problem.";
    } else if (description.trim().length < 10) {
      newErrors.description =
        "Please provide at least 10 characters.";
    } else if (description.trim().length > 1000) {
      newErrors.description =
        "Description cannot exceed 1000 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================================================
  // IMAGE ATTACHMENT HANDLER
  // =========================================================

  const handleAttachmentChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    setAttachmentError("");

    const remainingSlots = 5 - attachments.length;

    if (remainingSlots <= 0) {
      setAttachmentError(
        "You can upload a maximum of 5 images."
      );

      event.target.value = "";
      return;
    }

    const newAttachments = [];

    for (const file of selectedFiles) {
      if (!file.type.startsWith("image/")) {
        setAttachmentError(
          "Only image files are allowed."
        );
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        setAttachmentError(
          `${file.name} exceeds the 5 MB size limit.`
        );
        continue;
      }

      if (
        attachments.length + newAttachments.length >= 5
      ) {
        setAttachmentError(
          "You can upload a maximum of 5 images."
        );
        break;
      }

      const previewUrl = URL.createObjectURL(file);

      newAttachments.push({
        id: `${Date.now()}-${Math.random()}`,
        file,
        name: file.name,
        size: file.size,
        previewUrl,
      });
    }

    setAttachments((previous) => [
      ...previous,
      ...newAttachments,
    ]);

    event.target.value = "";
  };

  // =========================================================
  // REMOVE ATTACHMENT
  // =========================================================

  const removeAttachment = (attachmentId) => {
    setAttachments((previous) => {
      const attachmentToRemove = previous.find(
        (attachment) => attachment.id === attachmentId
      );

      if (attachmentToRemove?.previewUrl) {
        URL.revokeObjectURL(
          attachmentToRemove.previewUrl
        );
      }

      return previous.filter(
        (attachment) => attachment.id !== attachmentId
      );
    });

    setAttachmentError("");
  };

  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    attachments.forEach((attachment) => {
      if (attachment.previewUrl) {
        URL.revokeObjectURL(attachment.previewUrl);
      }
    });

    setTitle("");
    setCategory("");
    setDescription("");
    setPriority("Medium");
    setAttachments([]);
    setErrors({});
    setAttachmentError("");
  };

  // =========================================================
  // SUBMIT COMPLAINT
  // =========================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    setSuccessMessage("");

    if (!tenantId) {
      alert(
        "Tenant session not found. Please login again."
      );
      return;
    }

    if (!validateForm()) {
      return;
    }

    const currentDate = new Date().toISOString();

    const newComplaint = {
      id: `CMP-${Date.now()}`,
      tenantId,

      title: title.trim(),
      category,
      description: description.trim(),
      priority,

      status: "Pending",

      date: currentDate,

      // Temporary frontend sample information.
      // Later, obtain these from the authenticated tenancy record.
      property: "Property details will be linked later",
      room: "Room details will be linked later",

      attachments: attachments.map((attachment) => ({
        id: attachment.id,
        name: attachment.name,
        previewUrl: attachment.previewUrl,
      })),

      ownerResponse: "",
      responseDate: null,

      history: [
        {
          status: "Pending",
          message: "Complaint submitted successfully.",
          date: currentDate,
        },
      ],
    };

    setIsSubmitting(true);

    setComplaints((previous) => [
      newComplaint,
      ...previous,
    ]);

    resetForm();

    setSuccessMessage(
      "Your complaint has been submitted successfully."
    );

    setIsSubmitting(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // STATUS ICON
  // =========================================================

  const getStatusIcon = (status) => {
    if (status === "Resolved") {
      return <CheckCircle size={17} />;
    }

    if (status === "In Progress") {
      return <Clock size={17} />;
    }

    if (status === "Rejected") {
      return <X size={17} />;
    }

    return <Clock size={17} />;
  };

  // =========================================================
  // STATUS STYLE
  // =========================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // =========================================================
  // PRIORITY STYLE
  // =========================================================

  const getPriorityStyle = (value) => {
    switch (value) {
      case "Urgent":
        return "bg-red-100 text-red-700";

      case "High":
        return "bg-orange-100 text-orange-700";

      case "Medium":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // =========================================================
  // OPEN COMPLAINT DETAILS
  // =========================================================

  const openComplaintDetails = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeComplaintDetails = () => {
    setSelectedComplaint(null);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Remaining JSX continues in Part 2 */}

      {/* =====================================================
          TENANT NAVBAR
      ===================================================== */}

      <TenantNavbar />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-7xl p-4 md:p-6">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-6 flex items-center gap-3">

          <div className="rounded-xl bg-green-50 p-3">
            <Wrench
              size={28}
              className="text-green-600"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Maintenance & Complaints
            </h1>

            <p className="mt-1 text-gray-500">
              Report a problem or track your maintenance requests.
            </p>
          </div>

        </div>

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {successMessage && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">

            <CheckCircle
              size={21}
              className="mt-0.5 shrink-0"
            />

            <div>
              <p className="font-semibold">
                Complaint submitted
              </p>

              <p className="mt-1 text-sm">
                {successMessage}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSuccessMessage("")}
              className="ml-auto text-green-700 hover:text-green-900"
              aria-label="Dismiss success message"
            >
              <X size={18} />
            </button>

          </div>
        )}

        {/* =================================================
            COMPLAINT SUMMARY
        ================================================= */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Total Complaints
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-800">
                  {totalComplaints}
                </p>
              </div>

              <div className="rounded-xl bg-gray-100 p-3">
                <FileText
                  size={23}
                  className="text-gray-600"
                />
              </div>

            </div>
          </div>

          {/* PENDING */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Pending
                </p>

                <p className="mt-2 text-3xl font-bold text-yellow-600">
                  {pendingComplaints}
                </p>
              </div>

              <div className="rounded-xl bg-yellow-50 p-3">
                <Clock
                  size={23}
                  className="text-yellow-600"
                />
              </div>

            </div>
          </div>

          {/* IN PROGRESS */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  In Progress
                </p>

                <p className="mt-2 text-3xl font-bold text-blue-600">
                  {inProgressComplaints}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3">
                <Wrench
                  size={23}
                  className="text-blue-600"
                />
              </div>

            </div>
          </div>

          {/* RESOLVED */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Resolved
                </p>

                <p className="mt-2 text-3xl font-bold text-green-600">
                  {resolvedComplaints}
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3">
                <CheckCircle
                  size={23}
                  className="text-green-600"
                />
              </div>

            </div>
          </div>

        </div>

        {/* =================================================
            REPORT A PROBLEM
        ================================================= */}

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Report a Problem
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Provide the details below so the Owner can understand your issue.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* COMPLAINT TITLE */}

            <div>
              <label
                htmlFor="complaint-title"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Complaint Title
                <span className="text-red-500"> *</span>
              </label>

              <input
                id="complaint-title"
                type="text"
                value={title}
                maxLength={100}
                onChange={(event) => {
                  setTitle(event.target.value);

                  setErrors((previous) => ({
                    ...previous,
                    title: "",
                  }));
                }}
                placeholder="e.g. Bathroom water leakage"
                className={`w-full rounded-lg border px-4 py-3 text-gray-800 outline-none transition focus:ring-2 focus:ring-green-500 ${
                  errors.title
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              <div className="mt-1 flex justify-between gap-2">
                {errors.title ? (
                  <p className="text-sm text-red-500">
                    {errors.title}
                  </p>
                ) : (
                  <span />
                )}

                <p className="text-xs text-gray-400">
                  {title.length}/100
                </p>
              </div>
            </div>

            {/* COMPLAINT CATEGORY */}

            <div>
              <label
                htmlFor="complaint-category"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Complaint Category
                <span className="text-red-500"> *</span>
              </label>

              <select
                id="complaint-category"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);

                  setErrors((previous) => ({
                    ...previous,
                    category: "",
                  }));
                }}
                className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-800 outline-none transition focus:ring-2 focus:ring-green-500 ${
                  errors.category
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

                <option value="Furniture">
                  Furniture
                </option>

                <option value="Water Supply">
                  Water Supply
                </option>

                <option value="Security">
                  Security
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              {errors.category && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.category}
                </p>
              )}
            </div>

            {/* PRIORITY */}

            <div>
              <label
                htmlFor="complaint-priority"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Complaint Priority
                <span className="text-red-500"> *</span>
              </label>

              <select
                id="complaint-priority"
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:ring-2 focus:ring-green-500"
              >
                <option value="Low">
                  Low - Can wait
                </option>

                <option value="Medium">
                  Medium - Needs attention
                </option>

                <option value="High">
                  High - Needs quick attention
                </option>

                <option value="Urgent">
                  Urgent - Immediate attention required
                </option>
              </select>

              <p className="mt-1 text-xs text-gray-500">
                Select the urgency level of your problem.
              </p>
            </div>

            {/* PROBLEM DESCRIPTION */}

            <div>
              <label
                htmlFor="complaint-description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Problem Description
                <span className="text-red-500"> *</span>
              </label>

              <textarea
                id="complaint-description"
                value={description}
                maxLength={1000}
                onChange={(event) => {
                  setDescription(event.target.value);

                  setErrors((previous) => ({
                    ...previous,
                    description: "",
                  }));
                }}
                placeholder="Describe your problem in detail..."
                rows={5}
                className={`w-full resize-none rounded-lg border px-4 py-3 text-gray-800 outline-none transition focus:ring-2 focus:ring-green-500 ${
                  errors.description
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              <div className="mt-1 flex justify-between gap-2">
                {errors.description ? (
                  <p className="text-sm text-red-500">
                    {errors.description}
                  </p>
                ) : (
                  <span className="text-xs text-gray-400">
                    Minimum 10 characters.
                  </span>
                )}

                <p className="text-xs text-gray-400">
                  {description.length}/1000
                </p>
              </div>
            </div>

            {/* IMAGE ATTACHMENTS */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Attach Photographs
                <span className="ml-1 font-normal text-gray-400">
                  (Optional)
                </span>
              </label>

              <label
                htmlFor="complaint-images"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-7 text-center transition hover:border-green-500 hover:bg-green-50"
              >
                <ImagePlus
                  size={32}
                  className="mb-2 text-green-600"
                />

                <span className="font-semibold text-gray-700">
                  Click to upload photographs
                </span>

                <span className="mt-1 text-xs text-gray-500">
                  Images only · Maximum 5 images · 5 MB each
                </span>
              </label>

              <input
                id="complaint-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleAttachmentChange}
                className="hidden"
                disabled={attachments.length >= 5}
              />

              {attachmentError && (
                <p className="mt-2 text-sm text-red-500">
                  {attachmentError}
                </p>
              )}

              {/* IMAGE PREVIEWS */}

              {attachments.length > 0 && (
                <div className="mt-4">
                  <p className="mb-3 text-sm font-semibold text-gray-700">
                    Selected Images ({attachments.length}/5)
                  </p>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                    {attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="relative overflow-hidden rounded-xl border border-gray-200 bg-white"
                      >
                        <img
                          src={attachment.previewUrl}
                          alt={attachment.name}
                          className="h-28 w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeAttachment(attachment.id)
                          }
                          className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white shadow-md transition hover:bg-red-700"
                          aria-label={`Remove ${attachment.name}`}
                        >
                          <Trash2 size={14} />
                        </button>

                        <p className="truncate px-2 py-2 text-xs text-gray-600">
                          {attachment.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FORM ACTIONS */}

            <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row">

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={18} />

                {isSubmitting
                  ? "Submitting..."
                  : "Submit Complaint"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Clear Form
              </button>

            </div>

          </form>
        </div>

        {/* =================================================
            MY COMPLAINTS
        ================================================= */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                My Complaints
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Track the progress of your submitted complaints.
              </p>
            </div>

            <span className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
              {totalComplaints} Total
            </span>

          </div>

          {tenantComplaints.length === 0 ? (

            <div className="py-12 text-center">

              <Wrench
                size={42}
                className="mx-auto text-gray-400"
              />

              <h3 className="mt-3 font-semibold text-gray-700">
                No complaints yet
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Your submitted complaints will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {tenantComplaints.map((complaint) => (

                <div
                  key={complaint.id}
                  className="rounded-xl border border-gray-200 p-4 transition hover:border-green-200 hover:shadow-sm md:p-5"
                >

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                    {/* COMPLAINT INFORMATION */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-lg font-bold text-gray-800">
                          {complaint.title}
                        </h3>

                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityStyle(
                          complaint.priority
                        )}`}>
                          {complaint.priority}
                        </span>

                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        {complaint.category}
                      </p>

                      <p className="mt-2 break-words text-sm leading-6 text-gray-600">
                        {complaint.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">

                        <span className="flex items-center gap-1">
                          <FileText size={14} />
                          {complaint.id}
                        </span>

                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(complaint.date)}
                        </span>

                        {complaint.attachments?.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Paperclip size={14} />
                            {complaint.attachments.length} image(s)
                          </span>
                        )}

                      </div>

                    </div>

                    {/* STATUS AND ACTION */}

                    <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-end">

                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ${getStatusStyle(
                        complaint.status
                      )}`}>
                        {getStatusIcon(complaint.status)}
                        {complaint.status}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          openComplaintDetails(complaint)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-green-600 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50"
                      >
                        <Eye size={16} />
                        View Details
                      </button>

                    </div>

                  </div>

                  {/* OWNER RESPONSE PREVIEW */}

                  {complaint.ownerResponse && (
                    <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-3">

                      <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
                        <MessageSquare size={16} />
                        Owner Response
                      </div>

                      <p className="mt-2 text-sm text-blue-900">
                        {complaint.ownerResponse}
                      </p>

                    </div>
                  )}

                </div>

              ))}

            </div>

          )}

        </div>

        {/* =================================================
            COMPLAINT DETAILS MODAL
        ================================================= */}

        {selectedComplaint && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 sm:p-5"
            onClick={closeComplaintDetails}
          >

            <div
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >

              {/* MODAL HEADER */}

              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-5">

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Complaint Details
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    {selectedComplaint.id}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeComplaintDetails}
                  className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                  aria-label="Close complaint details"
                >
                  <X size={23} />
                </button>

              </div>

              {/* MODAL BODY */}

              <div className="space-y-6 p-5 md:p-6">

                {/* TITLE AND STATUS */}

                <div>
                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="text-xl font-bold text-gray-800">
                      {selectedComplaint.title}
                    </h3>

                    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      selectedComplaint.status
                    )}`}>
                      {selectedComplaint.status}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    {selectedComplaint.category}
                  </p>
                </div>

                {/* COMPLAINT INFORMATION */}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} />
                      Submitted Date
                    </div>

                    <p className="mt-2 font-semibold text-gray-800">
                      {formatDateTime(selectedComplaint.date)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <AlertCircle size={16} />
                      Priority
                    </div>

                    <span className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${getPriorityStyle(
                      selectedComplaint.priority
                    )}`}>
                      {selectedComplaint.priority}
                    </span>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Building2 size={16} />
                      Property
                    </div>

                    <p className="mt-2 font-semibold text-gray-800">
                      {selectedComplaint.property}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <DoorOpen size={16} />
                      Room
                    </div>

                    <p className="mt-2 font-semibold text-gray-800">
                      {selectedComplaint.room}
                    </p>
                  </div>

                </div>

                {/* DESCRIPTION */}

                <div>
                  <h3 className="mb-2 font-bold text-gray-800">
                    Problem Description
                  </h3>

                  <div className="rounded-xl border border-gray-200 p-4">
                    <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-600">
                      {selectedComplaint.description}
                    </p>
                  </div>
                </div>

                {/* ATTACHMENTS */}

                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-bold text-gray-800">
                    <Paperclip size={18} />
                    Attached Photographs
                  </h3>

                  {selectedComplaint.attachments?.length > 0 ? (

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {selectedComplaint.attachments.map(
                        (attachment) => (
                          <a
                            key={attachment.id}
                            href={attachment.previewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group overflow-hidden rounded-xl border border-gray-200"
                          >
                            <img
                              src={attachment.previewUrl}
                              alt={attachment.name}
                              className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
                            />

                            <p className="truncate px-3 py-2 text-xs text-gray-600">
                              {attachment.name}
                            </p>
                          </a>
                        )
                      )}
                    </div>

                  ) : (

                    <div className="rounded-xl border border-dashed border-gray-300 p-5 text-center">
                      <ImagePlus
                        size={26}
                        className="mx-auto text-gray-400"
                      />

                      <p className="mt-2 text-sm text-gray-500">
                        No photographs attached.
                      </p>
                    </div>

                  )}
                </div>

                {/* OWNER RESPONSE */}

                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-bold text-gray-800">
                    <MessageSquare size={18} />
                    Owner Response
                  </h3>

                  {selectedComplaint.ownerResponse ? (

                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">

                      <div className="flex items-center gap-2 font-semibold text-blue-800">
                        <User size={17} />
                        Property Owner
                      </div>

                      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-blue-900">
                        {selectedComplaint.ownerResponse}
                      </p>

                      <p className="mt-3 text-xs text-blue-700">
                        Responded on{" "}
                        {formatDateTime(
                          selectedComplaint.responseDate
                        )}
                      </p>

                    </div>

                  ) : (

                    <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">

                      <div className="flex items-center gap-2 font-semibold text-yellow-800">
                        <Clock size={18} />
                        Awaiting Owner Response
                      </div>

                      <p className="mt-2 text-sm text-yellow-700">
                        Your complaint has been recorded. The Owner has not responded yet.
                      </p>

                    </div>

                  )}
                </div>

                {/* COMPLAINT HISTORY */}

                <div>
                  <h3 className="mb-4 flex items-center gap-2 font-bold text-gray-800">
                    <History size={19} />
                    Complaint Activity History
                  </h3>

                  {selectedComplaint.history?.length > 0 ? (

                    <div className="space-y-0">

                      {selectedComplaint.history.map(
                        (historyItem, index) => (

                          <div
                            key={`${historyItem.status}-${index}`}
                            className="relative flex gap-3 pb-5 last:pb-0"
                          >

                            {/* TIMELINE MARKER */}

                            <div className="relative flex flex-col items-center">

                              <div className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                                historyItem.status === "Resolved"
                                  ? "bg-green-100 text-green-600"
                                  : historyItem.status === "In Progress"
                                  ? "bg-blue-100 text-blue-600"
                                  : historyItem.status === "Rejected"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}>
                                {getStatusIcon(historyItem.status)}
                              </div>

                              {index !==
                                selectedComplaint.history.length - 1 && (
                                <div className="absolute top-8 h-full w-px bg-gray-200" />
                              )}

                            </div>

                            {/* TIMELINE CONTENT */}

                            <div className="min-w-0 flex-1 pt-1">

                              <div className="flex flex-wrap items-center gap-2">

                                <p className="font-semibold text-gray-800">
                                  {historyItem.status}
                                </p>

                                <span className="text-xs text-gray-400">
                                  {formatDateTime(historyItem.date)}
                                </span>

                              </div>

                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                {historyItem.message}
                              </p>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  ) : (

                    <p className="text-sm text-gray-500">
                      No activity history available.
                    </p>

                  )}

                </div>

                {/* CLOSE BUTTON */}

                <div className="border-t border-gray-200 pt-5">

                  <button
                    type="button"
                    onClick={closeComplaintDetails}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
                  >
                    <ArrowLeft size={17} />
                    Back to Complaints
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default TenantMaintenance;
