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
import ResetPassword from "./components/TenantResetPassword";

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

      {/* OWNER LOGIN */}

      <Route
        path="/owner-login"
        element={<OwnerLogin />}
      />

      {/* TENANT LOGIN */}

      <Route
        path="/tenant-login"
        element={<TenantLogin />}
      />

      {/* TENANT FORGOT PASSWORD */}

      <Route
        path="/forgot-password"
        element={<TenantForgotPassword />}
      />

      {/* OWNER FORGOT PASSWORD */}

      <Route
        path="/owner-forgot-password"
        element={<OwnerForgotPassword />}
      />

      {/* SHARED OTP PAGE
          Used by both owner and tenant */}

      <Route
        path="/otp-verification"
        element={<OTPVerification />}
      />

      {/* SHARED RESET PASSWORD PAGE
          Used by both owner and tenant */}

      <Route
        path="/reset-password"
        element={<TenantResetPassword />}
      />

      {/* ===================================================== */}
      {/* OWNER PORTAL */}
      {/* ===================================================== */}

      <Route
        path="/owner-dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/properties"
        element={<Properties />}
      />

      <Route
        path="/property-details"
        element={<PropertyDetails />}
      />

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

      <Route
        path="/rent-bills"
        element={<RentBills />}
      />

      <Route
        path="/payments"
        element={<Payments />}
      />

      <Route
        path="/documents"
        element={<Documents />}
      />

      <Route
        path="/reports"
        element={<Reports />}
      />

      <Route
        path="/settings"
        element={<Settings />}
      />

      {/* ===================================================== */}
      {/* TENANT PORTAL */}
      {/* ===================================================== */}

      <Route
        path="/tenant-dashboard"
        element={<TenantDashboard />}
      />

      <Route
        path="/tenant-payments"
        element={<TenantPayments />}
      />

      <Route
        path="/tenant-documents"
        element={<TenantDocuments />}
      />

      <Route
        path="/tenant-notices"
        element={<TenantNotices />}
      />

      <Route
        path="/tenant-maintenance"
        element={<TenantMaintenance />}
      />

      <Route
        path="/tenant-change-password"
        element={<TenantChangePassword />}
      />

    </Routes>
  );
}

export default App;