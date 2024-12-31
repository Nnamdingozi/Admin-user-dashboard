// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// export default function Home() {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
//       import('@/app/mocks/browser').then(({ worker }) => {
//         worker.start({
//           serviceWorker: {
//             url: '/mockServiceWorker.js',
//           },
//           onUnhandledRequest: 'bypass',
//         });
//         console.log('Mock Service Worker is active.');
//       });
//     }
//   }, []);

//   if (!isClient) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <p className="text-gray-700 text-lg font-semibold">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
//       <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome To DashBoard App with MSW Mocked API </h1>
//       <p className="text-lg text-gray-700 mb-6">
//         Open the browser console to see MSW logs when mocking is enabled.
//       </p>
//       <div className="flex space-x-4">
//         <Link
//           href="/user/register"
//           className="text-blue-600 underline hover:text-blue-800 transition-colors"
//         >
//           Register a new account
//         </Link>
//         <Link
//           href="/user/login"
//           className="text-blue-600 underline hover:text-blue-800 transition-colors"
//         >
//           Already have an account? Log in
//         </Link>
//       </div>
//     </div>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      import('@/app/mocks/browser')
        .then(({ worker }) => {
          return worker.start({
            serviceWorker: {
              url: '/mockServiceWorker.js',
            },
            onUnhandledRequest: 'bypass',
          });
        })
        .then(() => {
          console.log('Mock Service Worker is active.');
        })
        .catch((error) => {
          console.error('Failed to initialize MSW:', error);
        });
    }
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome To DashBoard App with MSW Mocked API</h1>
      <p className="text-lg text-gray-700 mb-6">
        Open the browser console to see MSW logs when mocking is enabled.
      </p>
      <div className="flex space-x-4">
        <Link
          href="/user/register"
          className="text-blue-600 underline hover:text-blue-800 transition-colors"
        >
          Register a new account
        </Link>
        <Link
          href="/user/login"
          className="text-blue-600 underline hover:text-blue-800 transition-colors"
        >
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
}
