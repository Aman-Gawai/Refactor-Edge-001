// src/context/AuthContext.jsx
import { createContext, useState } from "react";
import { login as loginService, logout as logoutService, register as registerService } from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const response = await loginService(credentials);
    setUser(response.data.user);
    return response;
  };

  const register = async (userData) => {
    const response = await registerService(userData);
    // Optionally, automatically log in the user after registration
    return response;
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
