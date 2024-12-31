
"use client";

import { useUserContext } from "@/app/context/userContext";
import { useAccessLogContext } from "@/app/context/accesslogContext";
import { useRouter } from "next/navigation";

const EmployeeDashboard = () => {
  const { logout, currentUser } = useUserContext();
  const { accessLogs } = useAccessLogContext();
  const router = useRouter();

  // Safely filter logs based on the userId
  const filteredLogs = Array.isArray(accessLogs)
    ? accessLogs.filter((log) => log.userId === currentUser?.id)
    : [];

  const handleLogout = () => {
    logout();
  };

  const handleEditProfile = () => {
    router.push("/userEdit");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Top Buttons */}
      <div className="w-full max-w-6xl flex justify-between mb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-600">Employee Dashboard</h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleEditProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 flex gap-6">
        {/* User Profile Section */}
        <div className="flex-1 h-screen">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">User Profile</h2>
          <div className="h-32 w-32 rounded-full bg-blue-600 text-center mb-16">
            image
          </div>
          <div className="ml-20">
  <p className="text-gray-700 mb-2">
    <strong>id:</strong> {currentUser?.id || "N/A"}
  </p>
  <p className="text-gray-700 mb-2">
    <strong>Username:</strong> {currentUser?.username || "N/A"}
  </p>
  <p className="text-gray-700 mb-2">
    <strong>Email:</strong> {currentUser?.email || "N/A"}
  </p>
  <p className="text-gray-700 mb-2">
  <strong>Role:</strong> {currentUser?.role || "N/A"}
  </p>
</div>

        </div>

        {/* Access Logs Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Access Logs</h2>
          {filteredLogs.length > 0 ? (
            <ul className="space-y-4">
              {filteredLogs.map((log) => (
                <li
                  key={log.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <p className="text-gray-700">
                    <strong>Access Time:</strong> {new Date(log.accesstime).toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <strong>Access Location:</strong> {log.access_locate}
                  </p>
                  {/* Add other log details as needed */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No access logs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
