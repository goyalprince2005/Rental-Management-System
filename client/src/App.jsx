import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import OwnerLogin from "./components/OwnerLogin";
import TenantLogin from "./components/TenantLogin";

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
    </Routes>
  );
}

export default App;