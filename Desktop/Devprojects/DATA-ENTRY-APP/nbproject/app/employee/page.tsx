"use client";

import { useUserContext } from "@/app/context/userContext";
import { useRouter } from "next/navigation";

const EmployeeDashboard = () => {
  const { logout } = useUserContext(); // Access logout from the context
  const router = useRouter(); // For any redirection, if needed (already in the context function)

  const handleLogout = () => {
    logout(); 
    router.push('/')
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Employee (User) Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default EmployeeDashboard;
