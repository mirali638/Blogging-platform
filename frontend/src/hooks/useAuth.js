import { useState, useEffect, createContext, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Heartbeat interval for tracking user activity
  useEffect(() => {
    let heartbeatInterval;

    if (isAuthenticated && user) {
      // Send heartbeat every 2 minutes
      heartbeatInterval = setInterval(async () => {
        try {
          await api.post('/userdashboard/users/heartbeat');
        } catch (error) {
          console.error('Heartbeat failed:', error);
        }
      }, 2 * 60 * 1000); // 2 minutes
    }

    return () => {
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }
    };
  }, [isAuthenticated, user]);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        try {
          // Verify token with backend
          const response = await api.get('/userdashboard/users/verify');
          setUser(response.data.user);
          setIsAuthenticated(true);
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    const response = await api.post('/userdashboard/users/login', credentials);
    const { token, user: userData } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    setUser(userData);
    setIsAuthenticated(true);
    
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post('/userdashboard/users/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const register = async (userData) => {
    await api.post('/userdashboard/users/signup', userData);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 