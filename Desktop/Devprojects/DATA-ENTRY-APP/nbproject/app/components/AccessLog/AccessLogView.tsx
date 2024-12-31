'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import { AccessLog, User } from '@/app/utilities/definitions'

interface AccessLogViewProps {
  logById: AccessLog | null;
  fetchUserView: (userId: string) => void;
  userById: User | null
}

const AccessLogView: React.FC<AccessLogViewProps> = ({ logById, fetchUserView, userById }) => {
  
  const userId = logById?.userId ?? null;

  useEffect(() => {
    if (!userById) { // Fetch user if it's not available in context
      fetchUserView(userId!.toString());
    }
  }, [userById]);

  if (!logById) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <p className="text-lg font-semibold">No Access Log Found</p>
      </div>
    );
  }

 
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Log Details</h2>
      <div className="space-y-3">
        <p className="text-gray-700">
          <span className="font-semibold">User ID:</span> {logById.userId}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">User Name:</span> {userById!.user.username}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Access Time:</span> {new Date(logById.accesstime).toLocaleString()}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Access Location:</span> {logById.access_locate}
        </p>
      </div>
      <div className="mt-6">
        <Link
          href="/accesslogView"
          className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
};

export default AccessLogView;
