import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken')); // Set token from localStorage if available
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        return jwtDecode(token).user;
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (authToken) {
      try {
        const decoded = jwtDecode(authToken);
        setUser(decoded.user);
      } catch (error) {
        console.error('Error decoding token on load', error);
      }
    }
  }, [authToken]);

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
    try {
      const decoded = jwtDecode(token);
      setUser(decoded.user);
    } catch (error) {
      console.error('Error decoding token on login', error);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const isAuthenticated = !!authToken; // Authentication based on authToken

  return (
    <AuthContext.Provider value={{ authToken, login, logout, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
