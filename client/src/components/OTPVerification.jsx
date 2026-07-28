import { Link } from "react-router-dom";

function OTPVerification() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Enter the 6-digit OTP sent to your registered mobile number.
        </p>

        <div className="flex justify-center gap-3 mb-8">

          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 border rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 border rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 border rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 border rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 border rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 border rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

        <button
          type="button"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Verify OTP
        </button>

        <div className="flex justify-between mt-6">

          <button
            type="button"
            className="text-green-600 hover:underline"
          >
            Resend OTP
          </button>

          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            ← Back
          </Link>

        </div>

      </div>

    </div>
  );
}

export default OTPVerification;