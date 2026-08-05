import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as authApi from '../api/auth.js';

const STORAGE_KEY = 'finis.auth';

const AuthContext = createContext(null);

function readStoredAuth() {
  const rawValue = window.localStorage.getItem(STORAGE_KEY);
  if (!rawValue) {
    return { token: null, user: null };
  }

  try {
    const parsedValue = JSON.parse(rawValue);
    return {
      token: parsedValue.accessToken ?? null,
      user: parsedValue.user ?? null
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return { token: null, user: null };
  }
}

function persistAuth(authData) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      accessToken: authData.accessToken,
      user: authData.user
    })
  );
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => readStoredAuth());
  const [isLoading, setIsLoading] = useState(Boolean(authState.token));

  const clearAuth = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setAuthState({ token: null, user: null });
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      if (!authState.token) {
        setIsLoading(false);
        return;
      }

      try {
        const user = await authApi.getMe(authState.token);
        if (isMounted) {
          setAuthState((current) => ({ ...current, user }));
        }
      } catch {
        if (isMounted) {
          clearAuth();
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, [authState.token, clearAuth]);

  const handleAuthResponse = useCallback((response) => {
    const nextState = {
      token: response.accessToken,
      user: response.user
    };
    persistAuth(response);
    setAuthState(nextState);
    return nextState;
  }, []);

  const signIn = useCallback(
    async (payload) => {
      const response = await authApi.login(payload);
      return handleAuthResponse(response);
    },
    [handleAuthResponse]
  );

  const signUp = useCallback(
    async (payload, avatarFile) => {
      const response = await authApi.signup(payload, avatarFile);
      return handleAuthResponse(response);
    },
    [handleAuthResponse]
  );

  const signOut = useCallback(async () => {
    const token = authState.token;
    clearAuth();
    if (token) {
      await authApi.logout(token).catch(() => null);
    }
  }, [authState.token, clearAuth]);

  const value = useMemo(
    () => ({
      token: authState.token,
      user: authState.user,
      isAuthenticated: Boolean(authState.token),
      isLoading,
      signIn,
      signUp,
      signOut
    }),
    [authState.token, authState.user, isLoading, signIn, signOut, signUp]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
