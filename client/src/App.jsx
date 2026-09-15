import { Routes, Route } from "react-router-dom";

// =========================================================
// AUTHENTICATION
// =========================================================

import Home from "./components/Home";
import OwnerLogin from "./components/OwnerLogin";
import TenantLogin from "./components/TenantLogin";
import TenantForgotPassword from "./components/TenantForgotPassword";
import OwnerForgotPassword from "./components/OwnerForgotPassword";
import OTPVerification from "./components/OTPVerification";
import TenantResetPassword from "./components/TenantResetPassword";
import OwnerResetPassword from "./components/OwnerResetPassword";

// =========================================================
// OWNER PORTAL
// =========================================================

import Dashboard from "./components/Dashboard";
import Properties from "./components/Properties";
import PropertyDetails from "./components/PropertyDetails";
import Rooms from "./components/Rooms";
import RoomDetails from "./components/RoomDetails";
import EditRoom from "./components/EditRoom";

import Tenants from "./components/Tenants";
import TenantDetails from "./components/TenantDetails";
import EditTenant from "./components/EditTenant";

import RentBills from "./components/RentBills";
import Payments from "./components/Payments";
import Documents from "./components/Documents";
import Reports from "./components/Reports";
import Settings from "./components/Settings";

// =========================================================
// TENANT PORTAL
// =========================================================

import TenantDashboard from "./components/TenantDashboard";
import TenantPayments from "./components/TenantPayments";
import TenantDocuments from "./components/TenantDocuments";
import TenantNotices from "./components/TenantNotices";
import TenantMaintenance from "./components/TenantMaintenance";
import TenantChangePassword from "./components/TenantChangePassword";

function App() {
  return (
    <Routes>

      {/* ===================================================== */}
      {/* GENERAL */}
      {/* ===================================================== */}

      <Route
        path="/"
        element={<Home />}
      />

      {/* ===================================================== */}
      {/* AUTHENTICATION */}
      {/* ===================================================== */}

      {/* ================= OWNER LOGIN ================= */}

      <Route
        path="/owner-login"
        element={<OwnerLogin />}
      />

      {/* ================= TENANT LOGIN ================= */}

      <Route
        path="/tenant-login"
        element={<TenantLogin />}
      />

      {/* ================= TENANT FORGOT PASSWORD ================= */}

      <Route
        path="/forgot-password"
        element={<TenantForgotPassword />}
      />

      {/* ================= OWNER FORGOT PASSWORD ================= */}

      <Route
        path="/owner-forgot-password"
        element={<OwnerForgotPassword />}
      />

      {/* ================= SHARED OTP VERIFICATION =================
          Used by both Owner and Tenant */}

      <Route
        path="/otp-verification"
        element={<OTPVerification />}
      />

      {/* ================= TENANT RESET PASSWORD ================= */}

      <Route
        path="/tenant-reset-password"
        element={<TenantResetPassword />}
      />

      {/* ================= OWNER RESET PASSWORD ================= */}

      <Route
        path="/owner-reset-password"
        element={<OwnerResetPassword />}
      />

      {/* ===================================================== */}
      {/* OWNER PORTAL */}
      {/* ===================================================== */}

      {/* ================= OWNER DASHBOARD ================= */}

      <Route
        path="/owner-dashboard"
        element={<Dashboard />}
      />

      {/* ================= PROPERTIES ================= */}

      <Route
        path="/properties"
        element={<Properties />}
      />

      <Route
        path="/property-details"
        element={<PropertyDetails />}
      />

      {/* ================= ROOMS ================= */}

      <Route
        path="/rooms"
        element={<Rooms />}
      />

      <Route
        path="/room-details/:id"
        element={<RoomDetails />}
      />

      <Route
        path="/edit-room/:id"
        element={<EditRoom />}
      />

      {/* ================= TENANTS ================= */}

      <Route
        path="/tenants"
        element={<Tenants />}
      />

      <Route
        path="/tenant-details/:id"
        element={<TenantDetails />}
      />

      <Route
        path="/edit-tenant/:id"
        element={<EditTenant />}
      />

      {/* ================= RENT & PAYMENTS ================= */}

      <Route
        path="/rent-bills"
        element={<RentBills />}
      />

      <Route
        path="/payments"
        element={<Payments />}
      />

      {/* ================= DOCUMENTS ================= */}

      <Route
        path="/documents"
        element={<Documents />}
      />

      {/* ================= REPORTS ================= */}

      <Route
        path="/reports"
        element={<Reports />}
      />

      {/* ================= SETTINGS ================= */}

      <Route
        path="/settings"
        element={<Settings />}
      />

      {/* ===================================================== */}
      {/* TENANT PORTAL */}
      {/* ===================================================== */}

      {/* ================= TENANT DASHBOARD ================= */}

      <Route
        path="/tenant-dashboard"
        element={<TenantDashboard />}
      />

      {/* ================= TENANT PAYMENTS ================= */}

      <Route
        path="/tenant-payments"
        element={<TenantPayments />}
      />

      {/* ================= TENANT DOCUMENTS ================= */}

      <Route
        path="/tenant-documents"
        element={<TenantDocuments />}
      />

      {/* ================= TENANT NOTICES ================= */}

      <Route
        path="/tenant-notices"
        element={<TenantNotices />}
      />

      {/* ================= TENANT MAINTENANCE ================= */}

      <Route
        path="/tenant-maintenance"
        element={<TenantMaintenance />}
      />

      {/* ================= TENANT CHANGE PASSWORD ================= */}

      <Route
        path="/tenant-change-password"
        element={<TenantChangePassword />}
      />

    </Routes>
  );
}

export default App;