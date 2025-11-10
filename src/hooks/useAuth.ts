import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient, { handleApiError } from '@/lib/api';
import { useAuthStore } from '@/stores/useAuthStore';
import { AuthResponse, LoginRequest, RegisterRequest } from '@/types/api';
import { toast } from './use-toast';

export const useLogin = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      setUser(data.user, data.token);
      toast({
        title: 'Login berhasil!',
        description: `Selamat datang, ${data.user.email}`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Login gagal',
        description: handleApiError(error),
        variant: 'destructive',
      });
    },
  });
};

export const useRegister = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.user, data.token);
      toast({
        title: 'Registrasi berhasil!',
        description: 'Akun Anda telah dibuat',
      });
    },
    onError: (error) => {
      toast({
        title: 'Registrasi gagal',
        description: handleApiError(error),
        variant: 'destructive',
      });
    },
  });
};

export const useGoogleAuth = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (googleToken: string) => {
      const { data } = await apiClient.post<AuthResponse>('/auth/google', {
        token: googleToken,
      });
      return data;
    },
    onSuccess: (data) => {
      setUser(data.user, data.token);
      toast({
        title: 'Login berhasil!',
        description: `Selamat datang, ${data.user.email}`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Login Google gagal',
        description: handleApiError(error),
        variant: 'destructive',
      });
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post('/auth/logout');
    },
    onSuccess: () => {
      logout();
      toast({
        title: 'Logout berhasil',
        description: 'Sampai jumpa lagi!',
      });
    },
    onError: (error) => {
      logout();
      console.error('Logout error:', error);
    },
  });
};

export const useCurrentUser = () => {
  const { isAuthenticated, setUser, logout } = useAuthStore();

  const query = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<{ user: AuthResponse['user'] }>('/auth/me');
        return data.user;
      } catch (error) {
        logout();
        throw error;
      }
    },
    enabled: isAuthenticated,
    retry: false,
  });

  if (query.data) {
    const token = localStorage.getItem('auth_token');
    if (token && query.data) {
      setUser(query.data, token);
    }
  }

  return query;
};

export const useRequestRoleUpgrade = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post('/users/upgrade-role');
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Permintaan terkirim',
        description: 'Tim kami akan meninjau permintaan Anda',
      });
    },
    onError: (error) => {
      toast({
        title: 'Gagal mengirim permintaan',
        description: handleApiError(error),
        variant: 'destructive',
      });
    },
  });
};
