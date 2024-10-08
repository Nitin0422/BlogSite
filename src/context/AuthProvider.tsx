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
    setToken: (token: string | undefined | null) => void;
    loading: boolean; // New loading state
    setLoading: (loading:boolean) => void
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
    const [firstRender, setFirstRender] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchMe = async () => {
        console.log("Fetch Me Called")
        try {
          const response = await api.get("api/user/access/token/", {
            withCredentials: true,
          });
          setToken(response.data.token);
        } catch {
          setToken(null);
        }
      };
  
      fetchMe();
    }, []);
  
    useLayoutEffect(() => {
      if(!firstRender) {
        if (token) {
          const decoded = jwtDecode<JWTPayload>(token);
          const userObj = {
            id: decoded.user.id,
            email: decoded.user.email,
            name: decoded.user.name,
            country: decoded.user.country,
            is_active: decoded.user.is_active,
          };
          console.log("User set to: ", userObj)
          setUser(userObj);
          setLoading(false);
        } else {
          console.log("User set to undefined")
          setUser(undefined);
          setLoading(false);
        }
      }
      setFirstRender(false)
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
      <AuthContext.Provider value={{ user, setToken, loading, setLoading }}>
        {children}
      </AuthContext.Provider>
    );
  };
  