import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useLayoutEffect,
  } from "react";
  import api from "@/utils/api";
  import { AxiosRequestHeaders } from "axios";
  import {jwtDecode} from "jwt-decode";
  
  export type AuthContextType = {
    user: User | undefined;
    setToken: (token: string) => void;
    token: string | undefined | null;
    loading: boolean; // New loading state
  };
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContext;
  };
  
  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [token, setToken] = useState<string | undefined | null>(undefined);
    const [loading, setLoading] = useState<boolean>(true); // New loading state
  
    useEffect(() => {
      const fetchMe = async () => {
        try {
          const response = await api.post("api/user/refresh/token/", {
            withCredentials: true,
          });
          setToken(response.data.access);
        } catch {
          setToken(null);
          setLoading(false)
        }
      };
  
      fetchMe();
    }, []);
  
    useLayoutEffect(() => {
      if (token) {
        const decoded = jwtDecode<JWTPayload>(token);
        const userObj = {
          id: decoded.user.id,
          email: decoded.user.email,
          name: decoded.user.name,
          country: decoded.user.country,
          is_active: decoded.user.is_active,
        };
        setUser(userObj);
        setLoading(false);
      } else {
        setUser(undefined);
      }
    }, [token]);
  
    useLayoutEffect(() => {
      const authInterceptor = api.interceptors.request.use(
        function (config) {
          config.headers = config.headers || ({} as AxiosRequestHeaders);
          config.headers.Authorization = token ? `Bearer ${token}` : "";
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );
  
      return () => {
        api.interceptors.request.eject(authInterceptor);
      };
    }, [token]);
  
    useLayoutEffect(() => {
      const refreshInterceptor = api.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
          if (
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized"
          ) {
            try {
              const response = await api.post("api/user/refresh/token/", {
                withCredentials: true,
              });
              setToken(response.data.access);
              originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
              return api(originalRequest);
            } catch {
              setToken(null);
            }
          }
          return Promise.reject(error);
        }
      );
  
      return () => {
        api.interceptors.response.eject(refreshInterceptor);
      };
    }, []);
  
    return (
      <AuthContext.Provider value={{ user, setToken, token, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };
  