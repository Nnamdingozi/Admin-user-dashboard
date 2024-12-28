

import { ApiError } from '@/app/validation/errorEnum';

import {User, NewUserRequestBody, UpdatedUserRequestBody, DeleteUserResponseBody, UserProfile} from '@/app/utilities/definitions';
 import { axiosInstance, validatePayload, handleApiError, configWithToken, validateUpdate} from '@/app/validation/validation'


// Get users with automatic token and error handling
export const getUsers = async (token: string | null): Promise<UserProfile[] | []> => {
  try{
    const response = await axiosInstance.get(`/users`, configWithToken(token));

    console.log('Users list fetched in api:', response.data);
    console.log('Users List without .data in response', response)

    // Flatten the user data after fetching from the API
    const flattenedUsers = response.data.map((user: any) => ({
      id: user.id,
      username: user.user.username,  // Assuming the structure has 'user' object with 'username'
      email: user.user.email,
      role: user.user.role,
      privacyPolicy: user.user.privacyPolicy,
    }));

    console.log('Flattened Users list:', flattenedUsers);  // Log the flattened user data
    return response.data;  // Return the flattened data

  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage); // Throw the error to be handled in the calling function
  }
};
 

// Example function to get user by ID
export const getUserById = async (id: string, token: string): Promise<User | null> => {
  try {
    const response = await axiosInstance.get(`/users/${id}`, configWithToken(token));

    console.log('User fetched by Id in api:', response.data);
    return response.data;
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage);
  }
};

// Example function to create a new user
export const createUser = async (user: NewUserRequestBody): Promise<{ user: UserProfile; token: string }> => {
  try {
    // Validate the input
    const isValidInput = validatePayload(user);
    if (!isValidInput) {
      throw new Error(ApiError.INVALID_PAYLOAD); // Invalid input provided
    }

    const response = await axiosInstance.post('/users', user);

    console.log('Received token and user from mockApi', response.data);
    return { user: response.data.user, token: response.data.token };
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage);
  }
};



// export const updateUser = async (
//   id: string, 
//   token: string, 
//   user: UpdatedUserRequestBody
// ): Promise<{ user: UserProfile | null }> => {
//   try {
//  // Validate the input
//  const isValidInput = validateUpdate(user);
//  if (!isValidInput) {
//    throw new Error(ApiError.INVALID_PAYLOAD); // Invalid input provided
//  }

//     const response = await axiosInstance.put(`/users/${id}`, user, configWithToken(token));

 
//     console.log('User updated successfully:', response.data);

//     // Assuming response.data contains the updated user and new token
//     const updatedUser = response.data
   

//     return { user: updatedUser }; // Return both the updated user and token
//   } catch (err: unknown) {
//     const errorMessage = handleApiError(err);
//     throw new Error(errorMessage);
//   }
// };




// export const updateUser = async (
//   id: string,
//   token: string,
//   user: UpdatedUserRequestBody
// ): Promise<{ user: UserProfile | null }> => {
//   try {
//     // Validate the input
//     const isValidInput = validateUpdate(user);
//     if (!isValidInput) {
//       throw new Error(ApiError.INVALID_PAYLOAD); // Invalid input provided
//     }

//     const response = await axiosInstance.put(`/users/${id}`, user, configWithToken(token));

//     console.log('User updated successfully:', response.data);

//     // Assuming response.data contains the updated user in nested form
//     const updatedUserData = response.data;

//     // Flatten the updated user data if necessary
//     const flattenedUser: UserProfile = {
//       id: updatedUserData.id ?? null,
//       username: updatedUserData.username ?? null,
//       email: updatedUserData.email ?? null,
//       role: updatedUserData.role ?? null,
//     };

//     return { user: flattenedUser }; // Return the flattened user object
//   } catch (err: unknown) {
//     const errorMessage = handleApiError(err);
//     throw new Error(errorMessage);
//   }
// };


export const updateUser = async (
  id: string,
  token: string,
  user: UpdatedUserRequestBody
): Promise<{ user: UserProfile | null; users: UserProfile[] | null; token: string | null }> => {
  try {
    // Validate the input
    const isValidInput = validateUpdate(user);
    if (!isValidInput) {
      throw new Error(ApiError.INVALID_PAYLOAD); // Invalid input provided
    }

    // Make the PUT request with the token in the headers
    const response = await axiosInstance.put(`/users/${id}`, user, configWithToken(token));

    console.log('User updated successfully:', response.data);

    // Assuming the response contains the updated user, users array, and new token
    const updatedUserData = response.data.user;  // Updated user object
    const updatedUsersArray = response.data.users; // Updated users array (optional)
    const newToken = response.data.token;         // New token (optional)

    // You don't need to flatten again if the data is already flat (i.e., directly returned in the response)
    // But if needed, flatten here (e.g., for handling nested data)
    // const flattenedUser: UserProfile = {
    //   id: updatedUserData.id ?? null,
    //   username: updatedUserData.username ?? null,
    //   email: updatedUserData.email ?? null,
    //   role: updatedUserData.role ?? null,
    // };

    // Return updated user profile, users array, and token (if available)
    return {
      user: updatedUserData?? null,
      users: updatedUsersArray ?? [],  // You can return the updated users array if needed
      token: newToken ?? null,           // New token if generated
    };
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage);
  }
};


// Example function to delete user
export const deleteUser = async (id: string, token: string, ): Promise<DeleteUserResponseBody | undefined> => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`, configWithToken(token));

    return response.data;
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage);
  }
};