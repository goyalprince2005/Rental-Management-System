import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Create a new password for your account.
        </p>

        <form className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="button"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Reset Password
          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            to="/tenant-login"
            className="text-blue-600 hover:underline"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;