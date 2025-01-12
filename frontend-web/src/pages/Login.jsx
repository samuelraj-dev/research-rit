import React, { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import ArrowRight from '../assets/arrow-right.svg';
import ritbg from '../assets/ritbg.jpg';
import axios from "axios";
import { useUser } from '@/UserContext';
import LoadingPage from './LoadingPage';

const Login = () => {
  const {user, setUser, loading: loadingContext} = useUser()
  const [showPassword, setShowPassword] = useState(false);
  const [workEmail, setWorkEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.permissions) {
      if (user.permissions.includes('user:write')) {
        navigate('/admin-dashboard')
      } else {
        navigate('/faculty-page')
      }
    }
  }, [user, navigate])

  async function handleEmailSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/users/check-activation', { workEmail }, { withCredentials: true });
      setLoading(false);
      console.log(response)
      console.log(status)
      console.log(response.data.message === 'OTP_SENT')

      if (response.data.message === 'OTP_SENT') {
        setStatus('OTP_SENT');
      } else if (response.data.message === 'ACTIVATED') {
        setStatus('ACTIVATED');
      } else {
        toast.error('Invalid credentials!');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error checking activation:', error);
      toast.error('Error verifying email!');
    }
  }

  async function handleOtpSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/users/check-otp', { workEmail, otp }, { withCredentials: true });
      setLoading(false);
      console.log(response)
      console.log(status)

      if (response.data.message === 'OTP_VERIFIED') {
        setStatus('OTP_VERIFIED');
      } else {
        toast.error('Invalid otp!');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error verifying otp:', error);
      toast.error('Error verifying otp!');
    }
  }

  const handleActivate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await axios.post('http://localhost:5000/api/users/activate', { workEmail, password }, { withCredentials: true });
      setLoading(false);

      if (result.data.message == 'ACTIVATED') {
        setStatus('ACTIVATED');
        setPassword('')
      } else {
        console.error('Error activating account:', error);
        toast.error('Error activating account!');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error activating account:', error);
      toast.error('Error activating account!');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await axios.post('http://localhost:5000/api/users/login', { workEmail, password }, { withCredentials: true });
      setLoading(false);

      if (result.data.session) {
        await fetchUser()
        console.log("success")
        toast.success('Login Successful!');  
        const isAdmin = result.data.session.permissions.includes("user:write");      
        navigate(isAdmin ? "/admin-dashboard" : "/faculty-page");
      } else {
        console.error('Error logging in:', error);
        toast.error('Invalid credentials!');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error logging in:', error);
      toast.error('Invalid credentials!');
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/user/data', { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    }
  };

  if (loadingContext) return <LoadingPage />

  const variants = {
    hidden: { opacity: 0, y: 200 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${ritbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8,
          zIndex: -1,
        }}
      ></div>
      <motion.div 
        className="w-full max-w-md m-auto p-6 bg-white rounded-lg shadow-md"
        animate="visible"
        variants={variants} 
        initial="hidden"
      >
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Login</h1>
        <form className='space-y-4'>
          {status === '' && (
            <>
              <input
                type="text"
                placeholder='Work Email'
                required
                value={workEmail}
                onChange={e => setWorkEmail(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2'
              />
              <button
                onClick={(e) => handleEmailSubmit(e)}
                disabled={loading}
                className="w-full py-2 bg-blue-300 font-semibold rounded-lg hover:bg-[#eecfa7] transition duration-200 flex items-center justify-center space-x-2"
              >
                {loading ? 'Checking...' : 'Next'}
                <img src={ArrowRight} alt="" className="ml-6" width={20} height={20} />
              </button>
            </>
          )}
          {status === 'OTP_SENT' && (
            <>
              <input
                type="text"
                placeholder='Enter OTP sent to your email'
                required
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2'
              />
              <button
                onClick={(e) => handleOtpSubmit(e)}
                disabled={loading}
                className="w-full py-2 bg-blue-300 font-semibold rounded-lg hover:bg-[#eecfa7] transition duration-200 flex items-center justify-center space-x-2"
              >
                {loading ? 'Checking...' : 'Next'}
                <img src={ArrowRight} alt="" className="ml-6" width={20} height={20} />
              </button>
            </>
          )}
          {status === 'OTP_VERIFIED' && (
            <>
              <div className="relative">
              <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Set New Password'
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2'
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                  {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                </div>
              </div>
              <button
                onClick={(e) => handleActivate(e)}
                disabled={loading}
                className="w-full py-2 bg-blue-300 font-semibold rounded-lg hover:bg-[#eecfa7] transition duration-200 flex items-center justify-center space-x-2"
              >
                {loading ? 'Activating...' : 'Activate'}
                <img src={ArrowRight} alt="" className="ml-6" width={20} height={20} />
              </button>
            </>
          )}
          {status === "ACTIVATED" && (
            <>
            <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder='Enter Password'
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2'
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </div>
            </div>
            <button
              onClick={(e) => handleLogin(e)}
              disabled={loading}
              className="w-full py-2 bg-blue-300 font-semibold rounded-lg hover:bg-[#eecfa7] transition duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? 'Logging in...' : 'Login'}
              <img src={ArrowRight} alt="" className="ml-6" width={20} height={20} />
            </button>

            </>
          )}
        </form>
      </motion.div>
    </div>
  );
}

export default Login;