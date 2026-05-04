import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

const SESSION_DURATION_MS = 4 * 60 * 60 * 1000; // 4 hours

interface AuthStore extends AuthState {
  hasPassword: boolean;
  sessionExpiry: number | null;
  setUser: (user: User) => void;
  setToken: (token: string, refreshToken: string) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User, accessToken: string, refreshToken: string, hasPassword?: boolean) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  checkSession: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      hasPassword: false,
      sessionExpiry: null,

      setUser: (user: User) => set({ user }),

      setToken: (token: string, refreshToken: string) => {
        set({ token, refreshToken, isAuthenticated: true });
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      login: (user: User, accessToken: string, refreshToken: string, hasPassword = false) => {
        const expiry = hasPassword ? Date.now() + SESSION_DURATION_MS : null;
        set({
          user,
          token: accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
          hasPassword,
          sessionExpiry: expiry,
        });
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
          hasPassword: false,
          sessionExpiry: null,
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) set({ user: { ...currentUser, ...userData } });
      },

      // Returns true if session is still valid, logs out if expired
      checkSession: () => {
        const { hasPassword, sessionExpiry } = get();
        if (!hasPassword) return true; // no-password users never expire
        if (sessionExpiry && Date.now() > sessionExpiry) {
          get().logout();
          return false;
        }
        return true;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        hasPassword: state.hasPassword,
        sessionExpiry: state.sessionExpiry,
      }),
    }
  )
);
