import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper: decode JWT to get email
  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  // Validate token by fetching user by email from /api/users (if array)
  const validateToken = async (token) => {
    try {
      const decoded = parseJwt(token);
      if (!decoded?.email) return null;
      const response = await axiosInstance.get('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // If response is array, find user by email
      if (Array.isArray(response.data)) {
        const user = response.data.find(u => u.email === decoded.email);
        return user || null;
      }
      // If response is user object
      if (response.data && response.data.email === decoded.email) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Token validation failed:', error);
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Validate token and get user
          const userData = await validateToken(token);
          if (userData) {
            setAuth({ token, user: userData });
          } else {
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // On login, save token and user from login response
  const login = async (token, user) => {
    try {
      localStorage.setItem('token', token);
      setAuth({ token, user });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      localStorage.removeItem('token');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 