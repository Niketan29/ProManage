import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginUser } from "../api/authApi";
import { setToken, getToken, removeToken } from "../utils/token";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (data) => {
    const res = await loginUser(data);

    const newToken = res.data.token;
    const newUser = res.data.user;

    setToken(newToken);
    localStorage.setItem("user", JSON.stringify(newUser));

    setTokenState(newToken);
    setUser(newUser);

    return res;
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem("user");
    setTokenState(null);
    setUser(null);
  };

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [token]);

  const value = useMemo(
    () => ({ token, user, login, logout }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
