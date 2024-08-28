import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import api from "@/utils/api";
import { AxiosRequestHeaders } from "axios";
import { jwtDecode } from "jwt-decode";

export type AuthContextType = {
  user: User | undefined;
  setToken: (token: string) => void; //method
}

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

  useEffect(() => {
    const fetchMe = async () => {
        try {
          const response = await api.post("api/user/refresh/token/", {
            withCredentials: true,
          });
          setToken(response.data.access);
        } catch {
          setToken(null);
        }
    };

    fetchMe();
  }, []);

  useEffect(() => {
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
    } else {
      setUser(undefined);
    }
  }, [token]);

  // Intercept requests to add Authorization header with token
  useLayoutEffect(() => {
    // Add a request interceptor
    const authInterceptor = api.interceptors.request.use(
      function (config) {
        // Ensure config.headers is of type AxiosRequestHeaders
        config.headers = config.headers || ({} as AxiosRequestHeaders);

        // Assign the Authorization header
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on component unmount
    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  // Handle 401 responses by refreshing the token
  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 401 &&
          error.response.statusText === "Unauthorized"
        ) 
        {
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
    <AuthContext.Provider value={{ user, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
