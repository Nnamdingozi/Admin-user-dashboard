// import {http, HttpResponse} from 'msw';
// import {User } from '@/app/utilities/definitions'

// const API_URL= process.env.NEXT_PUBLIC_API_URL
// export const loginHandlers = [

//     http.post(`${API_URL}/login`, async ({request}) => {
//       const body = (await request.json()) as { username: string; password: string };

//       const { username, password } = body;

//       const users: User[] = [
//         { id: 1, user: { username: 'user1', email: 'user1@example.com', password: 'User1@password1', privacyPolicy: true, role: 'admin' } },
//         { id: 2, user: { username: 'user2', email: 'user2@example.com', password: 'User2@password2', privacyPolicy: true, role: 'user' } },
//         { id: 3, user: { username: 'user3', email: 'user3@example.com', password: 'User3@password3', privacyPolicy: false, role: 'user' } },
//     ];


//       const mockUser = users.find((u) => u.user.username === username && u.user.password === password);

//       return new HttpResponse(null, {
//         headers: {
//           // Setting the "Set-Cookie" mocked response header
//           // will forward these cookies onto "document" as if they
//           // were sent from the server.
//           'Set-Cookie': `mocked-token-${mockUser!.id}`,
//         },
//       })
//     }),
//   ]




// import { http, HttpResponse } from 'msw';
// import { User } from '@/app/utilities/definitions';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const loginHandlers = [
//   http.post(`${API_URL}/login`, async ({ request }: { request: Request }) => {
//     console.log('login msw hit')
//     const body = (await request.json()) as { username: string; password: string };
//     const { username, password } = body;

//     // Mock user database
//     const users: User[] = [
//       { id: 1, user: { username: 'user1', email: 'user1@example.com', password: 'User1@password1', privacyPolicy: true, role: 'admin' } },
//       { id: 2, user: { username: 'user2', email: 'user2@example.com', password: 'User2@password2', privacyPolicy: true, role: 'user' } },
//       { id: 3, user: { username: 'user3', email: 'user3@example.com', password: 'User3@password3', privacyPolicy: false, role: 'user' } },
//     ];

//     // Find the user by username and password
//     const mockUser = users.find((u) => u.user.username === username && u.user.password === password);

//     if (!mockUser) {
//       return new HttpResponse(
//         JSON.stringify({ message: 'Invalid username or password' }),
//         { status: 401 }
//       );
//     }

//     // Generate token (mocked for simplicity)
//     const token = `mocked-token-${mockUser.id}`;

//     // Return token and user details
//     return new HttpResponse(
//       JSON.stringify({
//         token,
//         user: {
//           id: mockUser.id,
//           username: mockUser.user.username,
//           email: mockUser.user.email,
//           role: mockUser.user.role,
//         },
//       }),
//       {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//   }),
// ];

  
import { http, HttpResponse } from 'msw';
import { User } from '@/app/utilities/definitions';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginHandlers = [
  http.post(`${API_URL}/login`, async ({ request }: { request: Request }) => {
    console.log('Login MSW handler hit'); // Debugging handler
    const { username, password } = await request.json();

    // Mock user database
    const users: User[] = [
      { id: 1, user: { username: 'user1', email: 'user1@example.com', password: 'User1@password1', privacyPolicy: true, role: 'admin' } },
      { id: 2, user: { username: 'user2', email: 'user2@example.com', password: 'User2@password2', privacyPolicy: true, role: 'user' } },
      { id: 3, user: { username: 'user3', email: 'user3@example.com', password: 'User3@password3', privacyPolicy: false, role: 'user' } },
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

    return new HttpResponse(
      JSON.stringify({
        user: {
          id: mockUser.id,
          username: mockUser.user.username,
          email: mockUser.user.email,
          role: mockUser.user.role,
        },
        token
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }),
];
