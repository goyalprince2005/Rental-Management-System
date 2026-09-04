import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  User,
  CreditCard,
  FileText,
  LogOut,
} from "lucide-react";

function TenantNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("tenantId");
    navigate("/tenant-login");
  };

  const handleMyDetails = () => {
    const tenantId = localStorage.getItem("tenantId");

    if (tenantId) {
      navigate(`/tenant-details/${tenantId}?view=tenant`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

        {/* ================= LOGO ================= */}

        <button
          onClick={() => navigate("/tenant-dashboard")}
          className="flex items-center gap-3"
        >

          <div className="p-2 bg-green-50 rounded-lg">

            <Home
              size={22}
              className="text-green-600"
            />

          </div>

          <span className="text-xl font-bold text-green-600">
            Tenant Portal
          </span>

        </button>


        {/* ================= NAVIGATION ================= */}

        <nav className="hidden md:flex items-center gap-6">

          <button
            onClick={() => navigate("/tenant-dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
          >
            <Home size={18} />
            Dashboard
          </button>

          <button
            onClick={handleMyDetails}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
          >
            <User size={18} />
            My Details
          </button>

          <button
            onClick={() => navigate("/tenant-payments")}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
          >
            <CreditCard size={18} />
            Payments
          </button>

          <button
                onClick={() => navigate("/tenant-documents")}
                className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
                >
                <FileText size={18} />
                Documents
                </button>

        </nav>


        {/* ================= LOGOUT ================= */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >

          <LogOut size={18} />

          <span className="hidden sm:inline">
            Logout
          </span>

        </button>

      </div>

    </header>
  );
}

export default TenantNavbar;