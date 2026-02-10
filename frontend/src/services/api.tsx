import axios from 'axios';

// Type definitions for API requests and responses
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/api/auth/login', credentials);
  return response.data;
};

// Register
export const register = async (credentials: RegisterCredentials): Promise<UserResponse> => {
  const response = await api.post<UserResponse>('/api/auth/register', credentials);
  return response.data;
};

// Get current user info
export const getCurrentUser = async (token: string): Promise<UserResponse> => {
  const response = await api.get<UserResponse>('/api/auth/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
