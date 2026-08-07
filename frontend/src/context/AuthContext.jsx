import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync state on load and fetch latest profile info
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('rasoi_sutra_token');
      const savedUser = localStorage.getItem('rasoi_sutra_user');
      
      if (savedToken) {
        setToken(savedToken);
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (e) {
            console.warn('Failed to parse saved user JSON, ignoring legacy value.');
          }
        }
        
        // Fetch fresh profile info to confirm JWT validity
        try {
          const response = await axiosInstance.get('/v1/users/me');
          if (response.data.success) {
            const freshUser = response.data.data;
            const userPayload = {
              id: freshUser.id,
              fullName: freshUser.fullName,
              mobileNumber: freshUser.mobileNumber,
              email: freshUser.email,
              role: freshUser.role
            };
            localStorage.setItem('rasoi_sutra_user', JSON.stringify(userPayload));
            setUser(userPayload);
          }
        } catch (error) {
          console.warn('Token verification failed, clearing session.', error);
          logout();
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (mobileNumber, password) => {
    try {
      let response;
      if (mobileNumber === 'admin') {
        response = await axiosInstance.post('/auth/login', { username: 'admin', password });
        const { token: jwtToken, username, role } = response.data.data;
        
        localStorage.setItem('rasoi_sutra_token', jwtToken);
        const userPayload = { fullName: 'Admin User', mobileNumber: 'admin', role };
        localStorage.setItem('rasoi_sutra_user', JSON.stringify(userPayload));
        
        setToken(jwtToken);
        setUser(userPayload);
        localStorage.setItem('rasoi_sutra_admin_token', jwtToken);
        
        toast.success('Welcome back, Admin!');
        return { success: true, role };
      } else {
        response = await axiosInstance.post('/v1/auth/login', { mobileNumber, password });
        const { token: jwtToken, fullName, mobileNumber: resMobile, role } = response.data.data;
        
        localStorage.setItem('rasoi_sutra_token', jwtToken);
        const userPayload = { fullName, mobileNumber: resMobile, role };
        localStorage.setItem('rasoi_sutra_user', JSON.stringify(userPayload));
        
        setToken(jwtToken);
        setUser(userPayload);
        
        // Keep admin dashboard backwards-compatibility active
        if (role === 'ROLE_ADMIN') {
          localStorage.setItem('rasoi_sutra_admin_token', jwtToken);
        }
        
        toast.success(`Welcome back, ${fullName}!`);
        return { success: true, role };
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Login failed. Please check credentials.';
      toast.error(errMsg);
      return { success: false, message: errMsg };
    }
  };

  const register = async (fullName, mobileNumber, email, password) => {
    try {
      await axiosInstance.post('/v1/auth/signup', { fullName, mobileNumber, email, password });
      toast.success('You registered successfully!');
      return { success: true };
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Registration failed. Try again.';
      toast.error(errMsg);
      return { success: false, message: errMsg };
    }
  };

  const logout = () => {
    localStorage.removeItem('rasoi_sutra_token');
    localStorage.removeItem('rasoi_sutra_user');
    localStorage.removeItem('rasoi_sutra_admin_token');
    setUser(null);
    setToken(null);
    toast.info('Logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
