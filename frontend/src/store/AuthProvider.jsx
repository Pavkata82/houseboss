import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({
  children,
  initialToken,
  initialUser,
  initialRole,
}) {
  const [token, setToken] = useState(initialToken || null);
  const [user, setUser] = useState(initialUser || null);
  const [role, setRole] = useState(initialRole || null);

  const login = (token, user, role) => {
    setToken(token);
    setUser(user);
    setRole(role);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", JSON.stringify(role));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
