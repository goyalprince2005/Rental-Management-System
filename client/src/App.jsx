import { Routes, Route, useSearchParams } from "react-router-dom";

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
import OwnerComplaints from "./components/OwnerComplaints";

// =========================================================
// TENANT PORTAL
// =========================================================

import TenantDashboard from "./components/TenantDashboard";
import TenantPayments from "./components/TenantPayments";
import TenantDocuments from "./components/TenantDocuments";
import TenantNotices from "./components/TenantNotices";
import TenantMaintenance from "./components/TenantMaintenance";
import TenantChangePassword from "./components/TenantChangePassword";
import TenantSettings from "./components/TenantSettings";

// =========================================================
// THEME PROVIDERS AND LAYOUTS
// =========================================================

import TenantLayout from "./components/TenantLayout";
import OwnerLayout from "./components/OwnerLayout";

import { OwnerThemeProvider } from "./context/OwnerThemeContext";

// =========================================================
// OWNER PORTAL LAYOUT
// =========================================================

function OwnerPortalLayout() {
  return (
    <OwnerThemeProvider>
      <OwnerLayout />
    </OwnerThemeProvider>
  );
}

// =========================================================
// TENANT PORTAL LAYOUT
// TenantThemeProvider is mounted globally through main.jsx.
// =========================================================

function TenantPortalLayout() {
  return <TenantLayout />;
}

// =========================================================
// SHARED TENANT DETAILS ROUTE
// =========================================================

function SharedTenantDetailsRoute() {
  const [searchParams] = useSearchParams();

  const isTenantView = searchParams.get("view") === "tenant";

  // Tenant viewing their own details
  if (isTenantView) {
    return (
      <TenantLayout>
        <TenantDetails />
      </TenantLayout>
    );
  }

  // Owner viewing tenant details
  return (
    <OwnerThemeProvider>
      <OwnerLayout>
        <TenantDetails />
      </OwnerLayout>
    </OwnerThemeProvider>
  );
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

      <Route path="/" element={<Home />} />

      {/* ================================================= */}
      {/* AUTHENTICATION */}
      {/* ================================================= */}

      {/* OWNER LOGIN */}

      <Route
        path="/owner-login"
        element={
          <OwnerThemeProvider>
            <OwnerLogin />
          </OwnerThemeProvider>
        }
      />

      {/* TENANT LOGIN */}

      <Route
        path="/tenant-login"
        element={
          <TenantLayout>
            <TenantLogin />
          </TenantLayout>
        }
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
      {/* SHARED TENANT DETAILS */}
      {/* ================================================= */}

      <Route
        path="/tenant-details/:id"
        element={<SharedTenantDetailsRoute />}
      />

      {/* ================================================= */}
      {/* OWNER PORTAL */}
      {/* ================================================= */}

      <Route element={<OwnerPortalLayout />}>

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

        {/* TENANT MANAGEMENT */}

        <Route
          path="/tenants"
          element={<Tenants />}
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
          path="/owner-complaints"
          element={<OwnerComplaints />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/owner-change-password"
          element={<OwnerChangePassword />}
        />

      </Route>

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

        {/* TENANT SETTINGS */}

        <Route
          path="/tenant-settings"
          element={<TenantSettings />}
        />

      </Route>

    </Routes>
  );
}

export default App;