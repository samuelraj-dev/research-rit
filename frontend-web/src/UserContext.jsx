import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/user/data', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const hasPermission = (requiredPermissions) => {
    if (!user || !user.permissions) return false;
    return requiredPermissions.every((perm) => user.permissions.includes(perm));
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, hasPermission }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
