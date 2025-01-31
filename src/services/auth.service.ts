import api from './api.ts';

interface LoginCredentials {
  email: string;
  password: string;
}


interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  phone: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'admin';
  };
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post('/auth/login', credentials);
      const data = response.data;
      return {
        ...data,
        user: {
          ...data.user,
          role: data.user.role as 'user' | 'admin'
        }
      };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      throw new Error(message);
    }
  },

  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
}; 