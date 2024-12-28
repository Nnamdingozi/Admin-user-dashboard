// ' use client'

// import React, { useState, useEffect } from 'react';
// import AccessLogView from "@/app/components/AccessLog/AccessLogView";
// import { useAccessLog } from "@/app/context/accesslogContext";
// import {AccessLog} from '@/app/utilities/definitions';
// import { useUserContext } from '@/app/context/userContext';


// export default function ViewLogPage({
//     params,
//   }: {
//     params: { id: string }; 
//   }) {

//     const {getLogById, accessLog} = useAccessLog();
//     const {token} = useUserContext()

//     const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchData() {

//       try {
//         setLoading(true);
//         setError(null);
//         const resolvedParams = (await params).id;
//         const logId = parseInt(resolvedParams, 10)

//         if (isNaN(logId)) {
//           throw new Error("Invalid category ID provided.");
//         }
//         const result = await getLogById(token!, logId);
//     if(result) {
//         setAce
//     }
//     return (
//         <AccessLogView />
//     )
// }





 


//         const result = await fetchUserById(userId);
//         if (result) {
//           setUser(result);
//         } else {
//           throw new Error('user with id ${id} not found')
//         }
//       } catch (err: any) {

//         setError(err.message || 'An error occurred while fetching user data.');

//       } finally {


//       }
//     }

//     fetchData();


//   }, [params]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!user) {
//     return <div>User not found.</div>;
//   }

//   return <UserView user={user} />;
// };




' use client'

import React, { useState, useEffect } from 'react';
import AccessLogView from "@/app/components/AccessLog/AccessLogView";
import { useAccessLog } from "@/app/context/accesslogContext";
import {AccessLog} from '@/app/utilities/definitions';
import { useUserContext } from '@/app/context/userContext';


export default function ViewLogPage({
    params,
  }: {
    params: { id: string }; 
  }) {

    const {getLogById, accessLog} = useAccessLog();
    const {token} = useUserContext()

    const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {

      try {
        setLoading(true);
        setError(null);
        const resolvedParams = (await params).id;
        const logId = parseInt(resolvedParams, 10)

        if (isNaN(logId)) {
          throw new Error("Invalid category ID provided.");
        }
        const result = await getLogById(token!, logId);
      }
      },[])

    return (
        <AccessLogView />
    )
}





 


        const result = await fetchUserById(userId);
        if (result) {
          setUser(result);
        } else {
          throw new Error('user with id ${id} not found')
        }
      } catch (err: any) {

        setError(err.message || 'An error occurred while fetching user data.');

      } finally {


      }
    }

    fetchData();


  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return <UserView user={user} />;
};

