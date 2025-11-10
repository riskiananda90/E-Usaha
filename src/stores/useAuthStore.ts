import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/types/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User, token: string) => void;
  updateUser: (user: Partial<User>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;

  hasRole: (role: UserRole) => boolean;
  isGuest: () => boolean;
  isUser: () => boolean;
  isBusinessOwner: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user: User, token: string) => {
        localStorage.setItem('auth_token', token);
        set({ 
          user, 
          token, 
          isAuthenticated: true,
          isLoading: false,
        });
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (!currentUser) return;
        
        set({ 
          user: { ...currentUser, ...userData } 
        });
      },

      logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
      hasRole: (role: UserRole) => {
        const { user, isAuthenticated } = get();
        
        if (role === 'guest') {
          return !isAuthenticated;
        }
        
        return isAuthenticated && user?.role === role;
      },

      isGuest: () => {
        return !get().isAuthenticated;
      },

      isUser: () => {
        const { user, isAuthenticated } = get();
        return isAuthenticated && user?.role === 'user';
      },

      isBusinessOwner: () => {
        const { user, isAuthenticated } = get();
        return isAuthenticated && user?.role === 'business_owner';
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
