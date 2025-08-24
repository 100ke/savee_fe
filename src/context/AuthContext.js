import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsLoggedIn(!!token);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const setLoginState = (token, userData) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setLoginState,
        logout,
        user,
        setIsLoggedIn,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
