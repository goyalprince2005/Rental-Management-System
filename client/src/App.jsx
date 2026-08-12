import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import OwnerLogin from "./components/OwnerLogin";
import TenantLogin from "./components/TenantLogin";
import OTPVerification from "./components/OTPVerification";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
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
    </Routes>
  );
}

export default App;