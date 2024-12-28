export type User = {
    id?: number;
    user: {
      username: string;
      email: string;
      password: string;
      privacyPolicy: boolean;
      role: string;
    }
   
  };
  
  export type NewUserRequestBody = {
    username: string;
    email: string;
    password: string;
    privacyPolicy: boolean;
    role: string;
  };
  export interface UpdatedUserRequestBody {
    id?: string; // ID should be a string for requests
    username: string;
    email: string; // String or undefined, no null
    password: string; // Optional password
    privacyPolicy: boolean;
    role: string;
  }

  export type UserProfile = {
    id: number | null | undefined;
    username: string | null;
    email?: string | null; // Includes null and undefined
    role: string | null;
  };

  export type DeleteUserResponseBody = {
    message: string;
    users: UserProfile[];  // Include users array in the response body
  };
  
  
  export type UserParams = {
    id: string;
  };

  export type AccessLog = {
    id?: number;
    userId: number;
    accesstime: string;
    access_locate: string;
  };
  
  export type UpdateAccessLog = {
    id?: number;
    userId: number;
    accesstime?: string;
    access_locate?: string;
  }
  
  export type Login = {
    id?: number;
    username: string;
    password: string;

  } 


  export type LoginRequest = {
    // id?: number;
    username: string;
    password: string;
  }