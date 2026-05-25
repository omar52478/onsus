import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Register new user
  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = existingUsers.find(
        (u) => u.email === userData.email || u.phone === userData.phone
      );

      if (userExists) {
        throw new Error("User with this email or phone already exists");
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        createdAt: new Date().toISOString(),
      };

      // Store password separately (in real app, this would be hashed on backend)
      const userWithPassword = {
        ...newUser,
        password: userData.password,
      };

      // Save to users list
      existingUsers.push(userWithPassword);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Set current user (without password)
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      setLoading(false);
      return { success: true, user: newUser };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setLoading(true);

      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Find user by email or phone
      const foundUser = existingUsers.find(
        (u) =>
          (u.email === credentials.emailOrPhone ||
            u.phone === credentials.emailOrPhone) &&
          u.password === credentials.password
      );

      if (!foundUser) {
        throw new Error("Invalid email/phone or password");
      }

      // Create user object without password
      const userWithoutPassword = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        createdAt: foundUser.createdAt,
      };

      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));

      setLoading(false);
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      setLoading(true);

      const updatedUser = { ...user, ...updates };
      
      // Update in users list
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = existingUsers.findIndex((u) => u.id === user.id);
      
      if (userIndex !== -1) {
        existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates };
        localStorage.setItem("users", JSON.stringify(existingUsers));
      }

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setLoading(false);
      return { success: true, user: updatedUser };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
