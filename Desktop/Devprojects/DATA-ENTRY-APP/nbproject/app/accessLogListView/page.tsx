// 'use client'

// import React, { useEffect } from 'react';
// import { AccessLogList } from '@/app/components/AccessLog/AccessLogList';
// import { useAccessLogContext } from '@/app/context/accesslogContext';
// import { useUserContext } from '@/app/context/userContext';

// const ViewAccessLogsPage = () => {
//   const { users, fetchUsers } = useUserContext(); // Access users from context
//   const { accessLogs, getLogs, deleteLog, loading } = useAccessLogContext();
//   const {token} = useUserContext()

//   console.log('users in accesslogpage:', users)

//   useEffect(() => {
//     const initializeLogs = async () => {
//       if (token && !loading && !accessLogs || accessLogs.length === 0) {
//         await getLogs(); // Fetch logs if they are not already loaded
//       }
//     };
//     initializeLogs();
//   }, [loading, accessLogs]);


//   useEffect(() => {
//     const initializeUsers = async () => {
//       if ((!loading && !users || users.length === 0)) {
//         await fetchUsers(); // Fetch users only if they are not loaded from localStorage
//       }
//     };
//     initializeUsers();
//   }, [loading, users]);




//   const handleDelete = async (id: string | null | undefined) => {
//     if (!id) return;
//     try {
//       await deleteLog(id); // Delete log via context
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   // Check if users are loaded before rendering
//   if (!users || users.length === 0) {
//     return <p>Loading users...</p>;
//   }
//   return (
//     <AccessLogList
//       accessLogs={accessLogs}
//       users={users}  // Pass users list as prop
//       onDelete={handleDelete}
//     />
//   );
// };

// export default ViewAccessLogsPage;



'use client';

import React, { useEffect } from 'react';
import { AccessLogList } from '@/app/components/AccessLog/AccessLogList';
import { useAccessLogContext } from '@/app/context/accesslogContext';
import { useUserContext } from '@/app/context/userContext';

const ViewAccessLogsPage = () => {
  const { users, fetchUsers, token } = useUserContext(); // Access users and token from context
  const { accessLogs, getLogs, deleteLog, loading } = useAccessLogContext();

  console.log('Users in AccessLogPage:', users);
  console.log('Token in AccessLogPage:', token);

  // Fetch logs only when the token is available
  useEffect(() => {
    const initializeLogs = async () => {
      if (token && !loading && (!accessLogs || accessLogs.length === 0)) {
        try {
          await getLogs(); // Fetch logs only if they are not already loaded
        } catch (error) {
          console.error('Error fetching logs:', error);
        }
      }
    };

    initializeLogs();
  }, [token]); // Depend on token, accessLogs, and loading

  // Fetch users only when necessary
  useEffect(() => {
    const initializeUsers = async () => {
      if (token && !loading && (!users || users.length === 0)) {
        try {
          await fetchUsers(); // Fetch users only if not already loaded
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    };

    initializeUsers();
  }, [token]); // Depend on token, users, and loading

  // Handle deletion of logs
  const handleDelete = async (id: string | null | undefined) => {
    if (!id) return;
    try {
      await deleteLog(id); // Delete log via context
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Show loading state if users or logs are not yet loaded
  if (!users || users.length === 0) {
    return <p>Loading users...</p>;
  }

  if (!accessLogs || accessLogs.length === 0) {
    return <p>Loading access logs...</p>;
  }

  // Render the AccessLogList once data is loaded
  return (
    <AccessLogList
      accessLogs={accessLogs}
      users={users} // Pass users list as prop
      onDelete={handleDelete}
    />
  );
};

export default ViewAccessLogsPage;



// 'use client';

// import React, { useEffect } from 'react';
// import { AccessLogList } from '@/app/components/AccessLog/AccessLogList';
// import { useAccessLogContext } from '@/app/context/accesslogContext';
// import { useUserContext } from '@/app/context/userContext';

// const ViewAccessLogsPage = () => {
//   const { users, fetchUsers, token } = useUserContext(); // Access users and token from context
//   const { accessLogs, getLogs, deleteLog, loading } = useAccessLogContext();

//   console.log('Users in AccessLogPage:', users);
//   console.log('Token in AccessLogPage:', token);

//   // Handle deletion of logs
//   const handleDelete = async (id: string | null | undefined) => {
//     if (!id) return;
//     try {
//       await deleteLog(id); // Delete log via context
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   // Show loading state if users or logs are not yet loaded
//   if (!users || users.length === 0) {
//     return <p>Loading users...</p>;
//   }

//   if (!accessLogs || accessLogs.length === 0) {
//     return <p>Loading access logs...</p>;
//   }

//   // Render the AccessLogList once data is loaded
//   return (
//     <AccessLogList
//       accessLogs={accessLogs}
//       users={users} // Pass users list as prop
//       onDelete={handleDelete}
//     />
//   );
// };

// export default ViewAccessLogsPage;
