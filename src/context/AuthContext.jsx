import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Base URL for backend API
  const BASE_URL = 'http://localhost:4000';

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/is-auth`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.success);
        if (data.success) {
          await fetchUserData();
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/data`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.userData);
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        await fetchUserData();
        toast.success('Login successful!');
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return { success: false, message: 'Network error' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setUser(data.user);
        toast.success('Registration successful!');
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return { success: false, message: 'Network error' };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      toast.success('Logged out successfully');
    }
  };

  const sendVerificationOtp = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/send-verify-otp`, {
        method: 'POST',
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Verification OTP sent to your email');
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      toast.error('Failed to send OTP');
      return { success: false, message: 'Network error' };
    }
  };

  const verifyEmail = async (otp) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/verify-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        await fetchUserData(); // Refresh user data to get updated verification status
        toast.success('Email verified successfully!');
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      toast.error('Verification failed');
      return { success: false, message: 'Network error' };
    }
  };

  // Password reset functions
  const sendResetOtp = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/send-reset-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Password reset OTP sent to your email');
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      toast.error('Failed to send reset OTP');
      return { success: false, message: 'Network error' };
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword }),
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Password reset successfully!');
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      toast.error('Password reset failed');
      return { success: false, message: 'Network error' };
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout,
    sendVerificationOtp,
    verifyEmail,
    sendResetOtp,
    resetPassword,
    checkAuthStatus,
    fetchUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};