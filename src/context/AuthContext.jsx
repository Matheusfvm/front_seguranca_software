import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [idUsuario, setId] = useState(null);

  const login = (newToken, newId) => 
    {
      setToken(newToken);
      setId(newId);
    };
  const logout = () => 
    {
      setToken(null);
      setToken(null);
    };

  return (
    <AuthContext.Provider value={{ token, idUsuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
