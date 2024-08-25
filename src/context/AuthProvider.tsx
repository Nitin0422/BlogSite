import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import api from "@/utils/api";
import { AxiosRequestHeaders } from "axios";

const AuthContext = createContext<User | undefined>(undefined);

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
    const [user, setUser] = useState<User | undefined>(undefined)
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get("/api/me");
        setToken(response.data.accessToken);
      } catch {
        setToken(null);
      }
    };

    fetchMe();
  }, []);

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
          error.response.data.message === "Unauthorized"
        ) {
          try {
            const response = await api.get("/api/refreshToken");
            setToken(response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
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
  }, [token]);

  return (
    <AuthContext.Provider value={user? user : undefined}>{children}</AuthContext.Provider>
  );
};
