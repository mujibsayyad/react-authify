import { useState, createContext, useContext } from 'react';
import { postData } from './hooks/useFetchApi';

interface User {
  [key: string]: any;
}

export interface AuthContextInterface {
  user: User;
  isLoggedIn: boolean;
  token: string | null;
  message: string;

  loginUser: (url: string, data: LoginData) => void;
  login: () => void;
  logout: () => void;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

type LibraryProps = {
  children: React.ReactNode;
  AuthProvider?: React.ComponentType<AuthProviderProps>;
};

const AuthContext = createContext<AuthContextInterface>({
  user: {},
  isLoggedIn: false,
  token: null,
  message: '',

  loginUser: () => {},
  login: () => {},
  logout: () => {},
});

interface LoginData {
  email: string;
  password: string;
}

export const ReactAuthify = ({ children }: LibraryProps) => {
  const [user, setUser] = useState<User>({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const loginUser = async (
    url: string,
    data: LoginData,
    expirationTimeInHours: number = 12 // default to 12 hours
  ): Promise<void> => {
    try {
      const loginData: { userId: string; token: string } = await postData(
        url,
        data
      );
      // console.log('🚀 loginData:', loginData);

      const { userId, token } = loginData;
      const expiryTime = Date.now() + expirationTimeInHours * 60 * 60 * 1000;

      localStorage.setItem(
        'token',
        JSON.stringify({ userId, token, expiryTime })
      );

      login();
      // navigate('/');
    } catch (err) {
      console.error('Error:', (err as Error).message);
      setMessage((err as Error).message);
    }
  };

  const login = () => {
    if (localStorage.getItem('token')) {
      const localStorageValue = localStorage.getItem('token');
      const localValue = localStorageValue
        ? JSON.parse(localStorageValue)
        : null;

      // console.log('🚀 localValue:', localValue);
      setUser(localValue);

      setIsLoggedIn(true);
      setToken(localValue.token);

      if (Date.now() > localValue.expiryTime) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setToken(null);
        setUser({});
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setToken('');
    setUser({});
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        token,
        message,
        loginUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextInterface =>
  useContext(AuthContext);
