

import { http, HttpResponse } from 'msw';
import { AccessLog } from '@/app/utilities/definitions';

// Define response bodies
type GetAccessLogsResponseBody = AccessLog[];
type GetAccessLogResponseBody = AccessLog | null;
type CreateAccessLogRequestBody = AccessLog | null;
type UpdateAccessLogRequestBody = Partial<AccessLog>;
type DeleteAccessLogResponseBody = {
  message: string;
  updatedLogs: AccessLog[];
};
type GetAccessLogParam = { id: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Mock token for validation
const mockToken = 'mock-valid-token';

// Mock access logs
let mockAccessLogs: AccessLog[] = [
  { id: 101, userId: 1, accesstime: '2024-10-09T12:00:00Z', access_locate: 'user1_ip' },
  { id: 102, userId: 2, accesstime: '2024-11-09T12:00:00Z', access_locate: 'user2_ip' },
  { id: 103, userId: 3, accesstime: '2024-12-09T12:00:00Z', access_locate: 'user3_ip' },
];

let lastAssignedId = 103; // Initial value before any user is created

// Function to get and increment the last assigned ID
function generateNewUserId(): number {
  lastAssignedId += 1;
  return lastAssignedId;
};

export const accessLogHandlers = [
  
  // GET all access logs
  http.get<{}, GetAccessLogsResponseBody>(`${API_URL}/accesslogs`,
    async ({ cookies }: { cookies: Record<string, string> }) => {
      const token = cookies.token;  // Extract token from cookies
      if (!token) {
        return new HttpResponse(null, { status: 404 });
      }
      return HttpResponse.json<GetAccessLogsResponseBody>(mockAccessLogs);
    }),

  // GET access log by ID
  http.get<GetAccessLogParam, GetAccessLogResponseBody>(`${API_URL}/accesslogs/:id`,
    async ({ params, cookies }: { params: { id: string }; cookies: Record<string, string> }) => {
      const { id } = params;
      console.log('id from params in accesslog handler:', id);
      const token = cookies.token;
      if (!token) {
        return new HttpResponse(null, { status: 403 });
      }
      const log = mockAccessLogs.find((log) => log.id === Number(id));
      console.log('log data in handler:', log);
      if (!log) {
        return HttpResponse.json({ message: 'Access log not found' }, { status: 404 });
      }
      return HttpResponse.json<GetAccessLogResponseBody>(log);
    }),

  // POST create a new access log
  http.post<{}, CreateAccessLogRequestBody>(
    `${API_URL}/accesslogs`,
    async ({ cookies, request }: { cookies: Record<string, string>; request: Request }) => {
      const token = cookies.token;
      if (!token) {
        return new HttpResponse(null, { status: 403 });
      }

      const newLog = await request.json() as CreateAccessLogRequestBody;
      if (newLog) {
        const logResponse = {
          id: generateNewUserId(),  // Generate new ID
          userId: newLog.userId,
          accesstime: newLog.accesstime,
          access_locate: newLog.access_locate
        };

        mockAccessLogs.push(logResponse);  // Add new log to mockAccessLogs
        return HttpResponse.json<GetAccessLogResponseBody>(logResponse, { status: 201 });
      }

      // Return an error if there's no valid log data
      return new HttpResponse(null, { status: 400 });
    }
  ),


  // PUT update an access log
  http.put<GetAccessLogParam, UpdateAccessLogRequestBody>(`${API_URL}/accesslogs/:id`,
    async ({ params, cookies, request }: { params: { id: string }; cookies: Record<string, string>; request: Request }) => {
      const { id } = params;
      console.log('id from params in log handler:', id);
      const token = cookies.token;

      if (!token) {
        return new HttpResponse(null, { status: 403 });
      }

      const logIndex = mockAccessLogs.findIndex(log => log.id === Number(id));
      if (logIndex === -1) {
        return new HttpResponse(null, { status: 404 });
      }

      try {
        const updatedLogData: UpdateAccessLogRequestBody = await request.json() as Partial<UpdateAccessLogRequestBody>;
        const updatedLog = { ...mockAccessLogs[logIndex], ...updatedLogData };
        mockAccessLogs[logIndex] = updatedLog;

        console.log('Updated log in handler:', updatedLog);
        return HttpResponse.json<GetAccessLogResponseBody>(updatedLog, { status: 200 });
      } catch (error) {
        console.error('Error updating log:', error);
        return new HttpResponse(null, { status: 400 });
      }
    }),

  // DELETE an access log by ID
  http.delete<GetAccessLogParam, DeleteAccessLogResponseBody>(`${API_URL}/accesslogs/:id`,
    async ({ params, cookies }: { params: GetAccessLogParam; cookies: Record<string, string> }) => {
      const { id } = params;
      const token = cookies.token;
      if (!token) {
        return new HttpResponse(null, { status: 403 });
      }

      const logIndex = mockAccessLogs.findIndex((log) => log.id === Number(id));
      if (logIndex === -1) {
        return HttpResponse.json({ message: 'Access log not found' }, { status: 404 });
      }

      mockAccessLogs.splice(logIndex, 1);  // Remove the log from the array
      return HttpResponse.json<DeleteAccessLogResponseBody>({
        message: 'Access log deleted successfully',
        updatedLogs: mockAccessLogs  // Return the updated logs
      })
    }),
];
