
// import { http, HttpResponse } from 'msw';
// import { User } from '@/app/utilities/definitions';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// let lastAssignedId = 103; // Initial value before any user is created

// // Function to get and increment the last assigned ID
// function generateNewLogId(): number {
//   lastAssignedId += 1;
//   return lastAssignedId;
// }




// export const loginHandlers = [
//   http.post(`${API_URL}/login`, async ({ request }: { request: Request }) => {
//     console.log('Login MSW handler hit'); // Debugging handler
//     const { username, password } = await request.json();

//     // Mock user database
//     const users: User[] = [
//       {
//         id: 1,
//         user: {
//           username: 'user1',
//           email: 'user1@example.com',
//           password: 'User1@password1',
//           privacyPolicy: true,
//           role: 'admin',
//         },
//       },
//       {
//         id: 2,
//         user: {
//           username: 'user2',
//           email: 'user2@example.com',
//           password: 'User2@password2',
//           privacyPolicy: true,
//           role: 'user',
//         },
//       },
//       {
//         id: 3,
//         user: {
//           username: 'user3',
//           email: 'user3@example.com',
//           password: 'User3@password3',
//           privacyPolicy: false,
//           role: 'user',
//         },
//       },
//     ];

//     // Find user by username and password
//     const mockUser = users.find((u) => u.user.username === username && u.user.password === password);

//     if (!mockUser) {
//       return new HttpResponse(
//         JSON.stringify({ message: 'Invalid username or password' }),
//         { status: 401 }
//       );
//     }

//     // Generate mock token
//     const token = `mocked-token-${mockUser.id}`;
//     const timestamp = new Date(Date.now()).toISOString();
//     const logId = generateNewLogId();
 
//     // Create access log entry
//     const accessLog = {
//       id: logId,
//       userId: mockUser.id,
//       accesstime: timestamp,
//       access_locate: `${mockUser.user.username}-${mockUser.id}-ipAddressr `
//     };

//     return new HttpResponse(
//       JSON.stringify({
//         mockUser,
//         token,
//         accessLog, // Include access log in the response
//       }),
//       { status: 200, headers: { 'Content-Type': 'application/json' } }
//     );
//   }),
// ];



import { http, HttpResponse } from 'msw';
import { User } from '@/app/utilities/definitions';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

let lastAssignedId = 103; // Initial value before any user is created

// Function to get and increment the last assigned ID
function generateNewLogId(): number {
  lastAssignedId += 1;
  return lastAssignedId;
}




export const loginHandlers = [
  http.post(`${API_URL}/login`, async ({ request }: { request: Request }) => {
    console.log('Login MSW handler hit'); // Debugging handler
    const { username, password } = await request.json();

    // Mock user database
    const users: User[] = [
      {
        id: 1,
        user: {
          username: 'user1',
          email: 'user1@example.com',
          password: 'User1@password1',
          privacyPolicy: true,
          role: 'admin',
        },
      },
      {
        id: 2,
        user: {
          username: 'user2',
          email: 'user2@example.com',
          password: 'User2@password2',
          privacyPolicy: true,
          role: 'user',
        },
      },
      {
        id: 3,
        user: {
          username: 'user3',
          email: 'user3@example.com',
          password: 'User3@password3',
          privacyPolicy: false,
          role: 'user',
        },
      },
    ];

    // Find user by username and password
    const mockUser = users.find((u) => u.user.username === username && u.user.password === password);

    if (!mockUser) {
      return new HttpResponse(
        JSON.stringify({ message: 'Invalid username or password' }),
        { status: 401 }
      );
    }

    // Generate mock token
    const token = `mocked-token-${mockUser.id}`;
    const timestamp = new Date(Date.now()).toISOString();
    const logId = generateNewLogId();
 
    // Create access log entry
    const accessLog = {
      id: logId,
      userId: mockUser.id,
      accesstime: timestamp,
      access_locate: `${mockUser.user.username}-${mockUser.id}-ipAddressr `
    };

    return new HttpResponse(
      JSON.stringify({
        mockUser,
        token,
        accessLog, // Include access log in the response
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }),
];

