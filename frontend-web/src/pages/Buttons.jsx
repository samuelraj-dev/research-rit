import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/UserContext'
import LoadingPage from './LoadingPage'
import axios from 'axios'

const Buttons = () => {

  const navigate = useNavigate()
  const { user, setUser, loading, error } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/user/data', { withCredentials: true });
        if (!response.data?.permissions) {
          navigate('/login')
          return
        }
    
        if (response.data?.permissions.includes('user:read')) {
          await setUser(response.data);
          navigate("/admin-dashboard")
        } else {
          navigate('/faculty-page');
        }
      } catch (error) {
        navigate('/login')
        await setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    
  }, [user, navigate]);

  if (loading) return <LoadingPage />
  if (error) return <h1>{error}</h1>
}

export default Buttons