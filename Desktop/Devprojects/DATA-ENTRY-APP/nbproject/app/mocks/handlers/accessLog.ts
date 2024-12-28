// import { http, HttpResponse } from 'msw';

// // import type definition
// import {AccessLog } from '@/app/utilities/definitions'



// // Define the response bodies for the different endpoints
// type GetAccessLogsResponseBody = AccessLog[];
// type GetAccessLogResponseBody = AccessLog | { message: string };
// type CreateAccessLogRequestBody = AccessLog;
// type UpdateAccessLogRequestBody = Partial<AccessLog>; // Allow partial updates (e.g., just action or timestamp)
// type DeleteAccessLogResponseBody = { message: string };
// type GetAccessLogParam = {id: string}


// const API_URL = process.env.NEXT_PUBLIC_API_URL

// // Mock data for the logs
// const mockAccessLogs: AccessLog[] = [
//   { id: 1, userId: 101, accesstime: '2024-10-09T12:00:00Z', access_locate: 'user_ip'},
//   { id: 2, userId: 102, accesstime: '2024-11-09T12:00:00Z', access_locate: 'user_ip'},
//   { id: 3, userId: 103, accesstime: '2024-12-09T12:00:00Z', access_locate: 'user_ip'},
// ];

// export const accessLogHandlers = [
//   // GET all access logs1
//   http.get<{}, GetAccessLogsResponseBody>(`${API_URL}/accesslogs`, async () => {
//     return HttpResponse.json<GetAccessLogsResponseBody>(mockAccessLogs);
//   }),

//   // GET access log by ID
//   http.get<GetAccessLogParam , GetAccessLogResponseBody>(`${API_URL}/accesslogs/:id`, async ({ params }: { params: { id: string }}) => {
//     const logId = parseInt(params.id, 10);
//     const log = mockAccessLogs.find((log) => log.id === logId);

//     if (!log) {
//       return HttpResponse.json({ message: 'Access log not found' }, { status: 404 });
//     }

//     return HttpResponse.json<GetAccessLogResponseBody>(log);
//   }),

//   // POST create a new access log
//   http.post<{}, CreateAccessLogRequestBody, GetAccessLogResponseBody>(`${API_URL}/accesslogs`, async ({ request }: { request: Request}) => {
//     const newLog: AccessLog = await request.json();
//     const newId = mockAccessLogs.length + 1;
//     const newAccessLog = { ...newLog, id: newId, timestamp: new Date().toISOString() };
    
//     mockAccessLogs.push(newAccessLog); // Simulate adding to the mock DB
//     return HttpResponse.json<GetAccessLogResponseBody>(newAccessLog, { status: 201 });
//   }),

//   http.put<GetAccessLogParam , UpdateAccessLogRequestBody, GetAccessLogResponseBody>(
//     `${API_URL}/accesslogs/:id`,
//     async ({ request, params, cookies }: { request: Request; params: {id:string}; cookies: Record<string, string> }) => {
//       const logId = parseInt(params.id, 10);
//       const updatedLogData: UpdateAccessLogRequestBody = await request.json();
//       const logIndex = mockAccessLogs.findIndex((log) => log.id === logId);
  
//       if (logIndex === -1) {
//         // Return a consistent response type with a 404 error message
//         return HttpResponse.json<{ message: string }>(
//           { message: 'Access log not found' },
//           { status: 404 }
//         );
//       }
  
//       const updatedLog = { ...mockAccessLogs[logIndex], ...updatedLogData };
//       mockAccessLogs[logIndex] = updatedLog;
  
//       // Return the updated log object for client use
//       return HttpResponse.json<GetAccessLogResponseBody>(updatedLog, { status: 200 });
//     }
//   ),
  

//   // DELETE an access log by ID
//   http.delete<{ id: string }, {}, DeleteAccessLogResponseBody>(`${API_URL}/accesslogs/:id`, async ({ params }: { params: { id: string }}) => {
//     const logId = parseInt(params.id, 10);
//     const logIndex = mockAccessLogs.findIndex((log) => log.id === logId);

//     if (logIndex === -1) {
//       return HttpResponse.json({ message: 'Access log not found' }, { status: 404 });
//     }

//     mockAccessLogs.splice(logIndex, 1); // Simulate deletion
//     return HttpResponse.json<DeleteAccessLogResponseBody>({ message: 'Access log deleted successfully' });
//   }),
// ];



// 



// import { http, HttpResponse} from 'msw';
// import { AccessLog } from '@/app/utilities/definitions';

// // Define response bodies
// type GetAccessLogsResponseBody = AccessLog[];
// type GetAccessLogResponseBody = AccessLog | { message: string };
// type CreateAccessLogRequestBody = AccessLog;
// type UpdateAccessLogRequestBody = Partial<AccessLog>;
// type DeleteAccessLogResponseBody = { message: string };
// type GetAccessLogParam = { id: string };

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// // Mock token for validation
// const mockToken = 'mock-valid-token';

// // Mock access logs
// const mockAccessLogs: AccessLog[] = [
//   { id: 1, userId: 101, accesstime: '2024-10-09T12:00:00Z', access_locate: 'user_ip' },
//   { id: 2, userId: 102, accesstime: '2024-11-09T12:00:00Z', access_locate: 'user_ip' },
//   { id: 3, userId: 103, accesstime: '2024-12-09T12:00:00Z', access_locate: 'user_ip' },
// ];

// // Utility to validate token
// const validateToken = (cookies:{ cookies: Record<string, string> }, headers: Headers): boolean => {
//   const tokenFromCookies = cookies.get('auth-token');
//   const tokenFromHeaders = headers.get('Authorization')?.replace('Bearer ', '');
//   return tokenFromCookies === mockToken || tokenFromHeaders === mockToken;
// };

// // Handlers
// export const accessLogHandlers = [
//   // GET all access logs
//   http.get<{}, GetAccessLogsResponseBody>(`${API_URL}/accesslogs`, async ({ cookies, request }: { cookies: Record<string, string> ; request:{ request: Request }}) => {
//     if (!validateToken(cookies, request.headers)) {
//       return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     return HttpResponse.json<GetAccessLogsResponseBody>(mockAccessLogs);
//   }),

//   // GET access log by ID
//   http.get<GetAccessLogParam, GetAccessLogResponseBody>(`${API_URL}/accesslogs/:id`, async ({ params, cookies, request }: { params: GetAccessLogParam; cookies:{ cookies: Record<string, string> }; request: { request: Request }}) => {
//     if (!validateToken(cookies, request.headers)) {
//       return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     const logId = parseInt(params.id, 10);
//     const log = mockAccessLogs.find((log) => log.id === logId);

//     if (!log) {
//       return HttpResponse.json({ message: 'Access log not found' }, { status: 404 });
//     }

//     return HttpResponse.json<GetAccessLogResponseBody>(log);
//   }),

//   // POST create a new access log
//   http.post<{}, CreateAccessLogRequestBody, GetAccessLogResponseBody>(`${API_URL}/accesslogs`, async ({ request, cookies }: { request: { request: Request }; cookies:{ cookies: Record<string, string> } }) => {
//     if (!validateToken(cookies, request.headers)) {
//       return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     const newLog: AccessLog = await request.json();
//     const newId = mockAccessLogs.length + 1;
//     const newAccessLog = { ...newLog, id: newId, accesstime: new Date().toISOString() };

//     mockAccessLogs.push(newAccessLog);
//     return HttpResponse.json<GetAccessLogResponseBody>(newAccessLog, { status: 201 });
//   }),

//   // PUT update an access log
//   http.put<GetAccessLogParam, UpdateAccessLogRequestBody, GetAccessLogResponseBody>(`${API_URL}/accesslogs/:id`, async ({ request, params, cookies }: { request: { request: Request }; params: GetAccessLogParam; cookies: Record<string, string> }) => {
//     if (!validateToken(cookies, request.headers)) {
//       return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     const logId = parseInt(params.id, 10);
//     const updatedLogData: UpdateAccessLogRequestBody = await request.json();
//     const logIndex = mockAccessLogs.findIndex((log) => log.id === logId);

//     if (logIndex === -1) {
//       return HttpResponse.json({ message: 'Access log not found' }, { status: 404 });
//     }

//     const updatedLog = { ...mockAccessLogs[logIndex], ...updatedLogData };
//     mockAccessLogs[logIndex] = updatedLog;

//     return HttpResponse.json<GetAccessLogResponseBody>(updatedLog, { status: 200 });
//   }),

//   // DELETE an access log by ID
//   http.delete<{ id: string }, {}, DeleteAccessLogResponseBody>(`${API_URL}/accesslogs/:id`, async ({ params, cookies, request }: { params: GetAccessLogParam;  cookies:{ cookies: Record<string, string> }; request: { request: Request }}) => {
//     if (!validateToken(cookies, request.headers)) {
//       return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     const logId = parseInt(params.id, 10);
//     const logIndex = mockAccessLogs.findIndex((log) => log.id === logId);

//     if (logIndex === -1) {
//       return HttpResponse.json({ message: 'Access log not found' }, { status: 404 });
//     }

//     mockAccessLogs.splice(logIndex, 1);
//     return HttpResponse.json<DeleteAccessLogResponseBody>({ message: 'Access log deleted successfully' });
//   }),
// ];


// 


import { http, HttpResponse } from 'msw'
import { AccessLog } from '@/app/utilities/definitions';

// Define response bodies
type GetAccessLogsResponseBody = AccessLog[];
type GetAccessLogResponseBody = AccessLog | { message: string };
type CreateAccessLogRequestBody = AccessLog;
type UpdateAccessLogRequestBody = Partial<AccessLog>;
type DeleteAccessLogResponseBody = { message: string };
type GetAccessLogParam = { id: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Mock token for validation
const mockToken = 'mock-valid-token';

// Mock access logs
const mockAccessLogs: AccessLog[] = [
  { id: 1, userId: 101, accesstime: '2024-10-09T12:00:00Z', access_locate: 'user_ip' },
  { id: 2, userId: 102, accesstime: '2024-11-09T12:00:00Z', access_locate: 'user_ip' },
  { id: 3, userId: 103, accesstime: '2024-12-09T12:00:00Z', access_locate: 'user_ip' },
];

// Utility to validate token
const validateToken = (headers: Headers): boolean => {
  // Extract token from the 'Authorization' header
  const authorizationHeader = headers.get('Authorization');
  
  if (!authorizationHeader) {
    return false; // No authorization header
  }
  
  // Check if the header starts with 'Bearer '
  if (!authorizationHeader.startsWith('Bearer ')) {
    return false; // Invalid authorization format
  }
  
  // Extract token by removing 'Bearer ' prefix
  const tokenFromHeaders = authorizationHeader.replace('Bearer ', '');
  
  return tokenFromHeaders === mockToken; // Compare with the mock token
};


export const accessLogHandlers = [
  // GET all access logs
  http.get<{}, GetAccessLogsResponseBody>(`${API_URL}/accesslogs`, async ({ request }: { request: Request }) => {
    if (!validateToken(request.headers)) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return HttpResponse.json<GetAccessLogsResponseBody>(mockAccessLogs);
  }),

  // GET access log by ID
  http.get<GetAccessLogParam, GetAccessLogResponseBody>(`${API_URL}/accesslogs/:id`, async ({ params, request }: { params: GetAccessLogParam; request: Request }) => {
    if (!validateToken(request.headers)) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const logId = parseInt(params.id, 10);
    const log = mockAccessLogs.find((log) => log.id === logId);

    if (!log) {
      return HttpResponse.json({ message: 'Access log not found' }, { status: 404 });
    }

    return HttpResponse.json<GetAccessLogResponseBody>(log);
  }),

  // POST create a new access log
  http.post<{}, CreateAccessLogRequestBody, GetAccessLogResponseBody>(`${API_URL}/accesslogs`, async ({ request }: { request: Request }) => {
    if (!validateToken(request.headers)) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const newLog: AccessLog = await request.json();
    const newId = mockAccessLogs.length + 1;
    const newAccessLog = { ...newLog, id: newId, accesstime: new Date().toISOString() };

    mockAccessLogs.push(newAccessLog);
    return HttpResponse.json<GetAccessLogResponseBody>(newAccessLog, { status: 201 });
  }),

  // PUT update an access log
  http.put<GetAccessLogParam, UpdateAccessLogRequestBody, GetAccessLogResponseBody>(`${API_URL}/accesslogs/:id`, async ({ request, params }: { request: Request; params: GetAccessLogParam }) => {
    if (!validateToken(request.headers)) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const logId = parseInt(params.id, 10);
    const updatedLogData: UpdateAccessLogRequestBody = await request.json();
    const logIndex = mockAccessLogs.findIndex((log) => log.id === logId);

    if (logIndex === -1) {
      return HttpResponse.json({ message: 'Access log not found' }, { status: 404 });
    }

    const updatedLog = { ...mockAccessLogs[logIndex], ...updatedLogData };
    mockAccessLogs[logIndex] = updatedLog;

    return HttpResponse.json<GetAccessLogResponseBody>(updatedLog, { status: 200 });
  }),

  // DELETE an access log by ID
  http.delete<GetAccessLogParam, {}, DeleteAccessLogResponseBody>(`${API_URL}/accesslogs/:id`, async ({ params, request }: { params: GetAccessLogParam; request: Request }) => {
    if (!validateToken(request.headers)) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const logId = parseInt(params.id, 10);
    const logIndex = mockAccessLogs.findIndex((log) => log.id === logId);

    if (logIndex === -1) {
      return HttpResponse.json({ message: 'Access log not found' }, { status: 404 });
    }

    mockAccessLogs.splice(logIndex, 1);
    return HttpResponse.json<DeleteAccessLogResponseBody>({ message: 'Access log deleted successfully' });
  }),
];  // Closing bracket for the array
