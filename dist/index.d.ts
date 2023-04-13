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
export type AuthProviderProps = {
    children: React.ReactNode;
};
type LibraryProps = {
    children: React.ReactNode;
    AuthProvider?: React.ComponentType<AuthProviderProps>;
};
interface LoginData {
    email: string;
    password: string;
}
export declare const ReactAuthify: ({ children }: LibraryProps) => JSX.Element;
export declare const useAuthContext: () => AuthContextInterface;
export {};
