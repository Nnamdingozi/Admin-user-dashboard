
import { http, HttpResponse } from 'msw';
import { User, NewUserRequestBody, UpdatedUserRequestBody, DeleteUserResponseBody, UserParams, UserProfile } from '@/app/utilities/definitions';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

let lastAssignedId = 3; // Initial value before any user is created

// Function to get and increment the last assigned ID
function generateNewUserId(): number {
  lastAssignedId += 1;
  return lastAssignedId;
}

export const userHandlers = [

  
 // Mocking GET /users
  http.get<never, User[]>(`${API_URL}/users`, async ({ cookies }: { cookies: Record<string, string> }) => {
    const token = cookies.token;  // Extract token from cookies
console.log('token in get handler', token)
    if (!token) {
      return new HttpResponse(null, { status: 404 });
    }

    // Example user data (replace with real data if needed)
    const users: User[] = [
      { id: 1, user: { username: 'user1', email: 'user1@example.com', password: 'User1@password1', privacyPolicy: true, role: 'admin' } },
      { id: 2, user: { username: 'user2', email: 'user2@example.com', password: 'User2@password2', privacyPolicy: true, role: 'user' } },
      { id: 3, user: { username: 'user3', email: 'user3@example.com', password: 'User3@password3', privacyPolicy: false, role: 'user' } },
    ];



  
    return HttpResponse.json(users);  // Return the user data
  }),
  

  http.get<{ id: string }>(
    `${API_URL}/users/:id`,
    async ({ params, cookies }: { params: { id: string }; cookies: Record<string, string> }) => {
      const { id } = params;
console.log('id from params in handler:', id)
      const token = cookies.token; 


      if (!token) {
        return new HttpResponse(null, { status: 403 });
      }

      const users: User[] = [
        { id: 1, user: { username: 'user1', email: 'user1@example.com', password: 'User1@password1', privacyPolicy: true, role: 'admin' } },
        { id: 2, user: { username: 'user2', email: 'user2@example.com', password: 'User2@password2', privacyPolicy: true, role: 'user' } },
        { id: 3, user: { username: 'user3', email: 'user3@example.com', password: 'User3@password3', privacyPolicy: false, role: 'user' } },
      ];

      const user = users.find(user => user.id === Number(id));

      console.log('user data in handler:', user)

      if (!user) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json(user); 
    }
  ),


  // Mocking POST /users
  http.post<never, { user: NewUserRequestBody }>(`${API_URL}/users`, async ({ request }: { request: Request }) => {
    const newUser = await request.json() as NewUserRequestBody;

    // Create user object with all fields
    const createdUser = {
      id: generateNewUserId(),
      username: newUser.username,
      email: newUser.email,
      password: newUser.password, 
      privacyPolicy: newUser.privacyPolicy, 
      role: newUser.role,
    };

    // Create a response user object omitting password and privacyPolicy
    const responseUser = {
      id: createdUser.id,
      user: {
      username: createdUser.username,
      email: createdUser.email,
      role: createdUser.role,
      }
    };

    const token = `mocked-token-${createdUser.id}`;

    return HttpResponse.json({ user: responseUser, token }, { status: 201 });
  }),




http.put<{ id: string }, { user: Partial<UpdatedUserRequestBody> }>(
  `${API_URL}/users/:id`,
  async ({ params, cookies, request }: { params: { id: string }; cookies: Record<string, string>; request: Request }) => {
    const { id } = params;
    const token = cookies.token;

    console.log('id from params in handler:', id);

    // If no token is provided in cookies, return Forbidden response
    if (!token) {
      return new HttpResponse(null, { status: 403 });
    }

    // Sample users array (mock data)
    const users = [
      { id: 1, user: { username: 'user1', email: 'user1@example.com', password: 'User1@password1', privacyPolicy: true, role: 'admin' } },
      { id: 2, user: { username: 'user2', email: 'user2@example.com', password: 'User2@password2', privacyPolicy: true, role: 'user' } },
      { id: 3, user: { username: 'user3', email: 'user3@example.com', password: 'User3@password3', privacyPolicy: false, role: 'user' } },
    ];

    // Find the user by id
    const userIndex = users.findIndex(user => user.id === Number(id));

    if (userIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    try {
      // Parse the updated data from the request
      const updatedData = await request.json() as Partial<User['user']>;
      console.log('Updated data from request:', updatedData);

      // Update the user object with the provided fields
      users[userIndex].user = {
        ...users[userIndex].user,
        ...updatedData,
      };

      console.log('Updated user in handler:', users[userIndex]);

      // Flatten the updated user object into the UserProfile type
      const updatedUserProfile: User = {
        id: users[userIndex].id, 
        user: {
          username: users[userIndex].user.username ?? null,
          email: users[userIndex].user.email ?? null,
          role: users[userIndex].user.role ?? null,
        }
       
      };

      // Generate the new mocked token (based on updated user ID)
      const newToken = `mocked-token-${users[userIndex].id}-${users[userIndex].user.username}`;
console.log('new user array in handler:', users)
      // Return the updated user profile, new token, and the updated users array
      return new HttpResponse(
        JSON.stringify({
          userProfile: updatedUserProfile,
          token: newToken,
          users: users,  // Return the updated users array
        }),
        { status: 200 }
      );

    } catch (error) {
      console.error('Error updating user:', error);
      return new HttpResponse(null, { status: 400 });
    }
  }
),



// Mocking DELETE /users/:id
http.delete<UserParams, DeleteUserResponseBody>(
  `${API_URL}/users/:id`,
  async ({ params, cookies }: { params: UserParams; cookies: Record<string, string> }) => {
    const { id } = params;
    const token = cookies.token;

    // If no token is provided in cookies, return Forbidden response
    if (!token) {
      return new HttpResponse(null, { status: 403 });
    }

    // Sample users array (this would typically come from your database)
    let users = [
      { id: 1, user: { username: 'user1', email: 'user1@example.com', password: 'User1@password1', privacyPolicy: true, role: 'admin' } },
      { id: 2, user: { username: 'user2', email: 'user2@example.com', password: 'User2@password2', privacyPolicy: true, role: 'user' } },
      { id: 3, user: { username: 'user3', email: 'user3@example.com', password: 'User3@password3', privacyPolicy: false, role: 'user' } },
    ];

    // Find the index of the user with the given id
    const userIndex = users.findIndex(user => user.id === Number(id));

    if (userIndex === -1) {
      // User not found
      return new HttpResponse(null, { status: 404 });
    }

    // Remove the user from the users array
    users.splice(userIndex, 1); // This removes the user at the found index

    
    // Return the updated users array after deletion
    return HttpResponse.json({
      message: `User with ID ${id} has been deleted.`,
      users, 
    });
  }
),


];