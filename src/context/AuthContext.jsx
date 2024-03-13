import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, seTUsername] = useState('');

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, seTUsername }}>
      {children}
    </AuthContext.Provider>
  );
};