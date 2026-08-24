import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import OwnerLogin from "./components/OwnerLogin";
import TenantLogin from "./components/TenantLogin";
import OTPVerification from "./components/OTPVerification";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Properties from "./components/Properties";
import PropertyDetails from "./components/PropertyDetails";
import Rooms from "./components/Rooms";
import RoomDetails from "./components/RoomDetails";
import EditRoom from "./components/EditRoom";
import Tenants from "./components/Tenants";
import TenantDetails from "./components/TenantDetails";
import EditTenant from "./components/EditTenant";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

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
        element={<ForgotPassword />}
      />
      <Route
        path="/otp-verification"
        element={<OTPVerification />}
      />
      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />
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
      
    </Routes>
  );
}

export default App;