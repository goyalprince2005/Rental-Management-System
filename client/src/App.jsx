
import {
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";

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
import OwnerChangePassword from "./components/OwnerChangePassword";

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

// =========================================================
// TENANT LAYOUT
// Theme provider is already mounted globally in main.jsx.
// =========================================================

import TenantLayout from "./components/TenantLayout";

// =========================================================
// SHARED TENANT DETAILS ROUTE
// =========================================================

function TenantDetailsRoute() {
  const [searchParams] = useSearchParams();

  // Both owner and tenant views use the same component.
  // Tenant view is identified by the URL query parameter.
  // The global theme provider is available to both.
  return <TenantDetails />;
}

// =========================================================
// TENANT PORTAL LAYOUT
// =========================================================

function TenantPortalLayout() {
  return <TenantLayout />;
}

// =========================================================
// MAIN APP
// =========================================================

function App() {
  return (
    <Routes>

      {/* ================================================= */}
      {/* GENERAL */}
      {/* ================================================= */}

      <Route
        path="/"
        element={<Home />}
      />

      {/* ================================================= */}
      {/* AUTHENTICATION */}
      {/* ================================================= */}

      <Route
        path="/owner-login"
        element={<OwnerLogin />}
      />

      <Route
        path="/tenant-login"
        element={<TenantLogin />}
      />

      <Route
        path="/forgot-password"
        element={<TenantForgotPassword />}
      />

      <Route
        path="/owner-forgot-password"
        element={<OwnerForgotPassword />}
      />

      <Route
        path="/otp-verification"
        element={<OTPVerification />}
      />

      <Route
        path="/tenant-reset-password"
        element={<TenantResetPassword />}
      />

      <Route
        path="/owner-reset-password"
        element={<OwnerResetPassword />}
      />

      {/* ================================================= */}
      {/* OWNER PORTAL */}
      {/* ================================================= */}

      <Route
        path="/owner-dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/properties"
        element={<Properties />}
      />

      <Route
        path="/property-details/:id"
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
        element={<TenantDetailsRoute />}
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

      <Route
        path="/owner-change-password"
        element={<OwnerChangePassword />}
      />

      {/* ================================================= */}
      {/* TENANT PORTAL */}
      {/* ================================================= */}

      <Route element={<TenantPortalLayout />}>

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

      </Route>

    </Routes>
  );
}

export default App;
