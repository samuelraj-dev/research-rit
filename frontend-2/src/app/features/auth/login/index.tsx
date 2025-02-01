import ArrowRight from '@/assets/icons/arrow-right.svg'
import ritbg from '@/assets/images/ritbg.jpg'
import { useCheckUserActivationMutation, useCheckUserOtpMutation, useLoginUserMutation, useSetUserPasswordMutation } from '@/libs/services/mutations/auth.mutation';
import { useNavigate } from '@tanstack/react-router';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

export default function LoginFeature() {

    const [showPassword, setShowPassword] = useState(false);
    const [workEmail, setWorkEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const checkUserActivationMutation = useCheckUserActivationMutation();
    const checkUserOtpMutation = useCheckUserOtpMutation();
    const setUserPasswordMutation = useSetUserPasswordMutation();
    const loginUserMutation = useLoginUserMutation();

      async function handleEmailSubmit(e: any) {
        e.preventDefault();
        checkUserActivationMutation.mutate({workEmail}, {
          onSuccess: (data) => {
            if (data.message === 'OTP_SENT') {
              setStatus('OTP_SENT');
            } else if (data.message === 'ACTIVATED') {
              setStatus('ACTIVATED');
            } else {
              alert('Invalid credentials')
            }
          },
          onError: (error) => {
            alert('An error occurred while checking user activation.');
            console.error(error);
          },
        })
      }
    
      async function handleOtpSubmit(e: any) {
        e.preventDefault();
        checkUserOtpMutation.mutate({workEmail, otp}, {
          onSuccess: (data) => {
            if (data.message === 'OTP_VERIFIED') {
              setStatus('OTP_VERIFIED');
            } else {
              alert('Invalid OTP!')
            }
          },
          onError: (error) => {
            alert('Error verifying otp.');
            console.error(error);
          },
        })
      }
    
      const handleActivate = async (e: any) => {
        e.preventDefault();
        setUserPasswordMutation.mutate({workEmail, password}, {
          onSuccess: (data) => {
            if (data.message === 'ACTIVATED') {
              setStatus('ACTIVATED');
              setPassword('');
            } else {
              alert('Error activating account!')
            }
          },
          onError: (error) => {
            alert('Error activating account!');
            console.error(error);
          },
        })
      };
    
      const handleLogin = async (e: any) => {
        e.preventDefault();
        loginUserMutation.mutate({workEmail, password}, {
          onSuccess: (data) => {
            if (data.session) {
              navigate({
                to: "/dashboard"
              });
            } else {
              alert('Invalid Credentials!')
            }
          },
          onError: (error) => {
            alert('Error logging in!');
            console.error(error);
          },
        })
      };

    return <div className="flex items-center justify-center w-full h-full relative">
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
    <div
      className="w-full max-w-md m-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-4 flex justify-center">Login</h1>
      <form className='space-y-4'>

      <input
                type="text"
                placeholder='Work Email'
                required
                value={workEmail}
                disabled={status != ''}
                onChange={e => setWorkEmail(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2'
              />
  
        {status === '' && (
            <>
              <button
                onClick={(e) => handleEmailSubmit(e)}
                disabled={checkUserActivationMutation.isPending}
                className="w-full py-2 bg-blue-300 font-semibold rounded-lg hover:bg-[#eecfa7] transition duration-200 flex items-center justify-center space-x-2"
              >
                {checkUserActivationMutation.isPending ? 'Checking...' : 'Next'}
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
              disabled={checkUserOtpMutation.isPending}
              className="w-full py-2 bg-blue-300 font-semibold rounded-lg hover:bg-[#eecfa7] transition duration-200 flex items-center justify-center space-x-2"
            >
              {checkUserOtpMutation.isPending ? 'Checking...' : 'Next'}
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
                {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
              </div>
            </div>
            <button
              onClick={(e) => handleActivate(e)}
              disabled={setUserPasswordMutation.isPending}
              className="w-full py-2 bg-blue-300 font-semibold rounded-lg hover:bg-[#eecfa7] transition duration-200 flex items-center justify-center space-x-2"
            >
              {setUserPasswordMutation.isPending ? 'Activating...' : 'Activate'}
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
              {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
            </div>
          </div>
          <button
            onClick={(e) => handleLogin(e)}
            disabled={loginUserMutation.isPending}
            className="w-full py-2 bg-blue-300 font-semibold rounded-lg hover:bg-[#eecfa7] transition duration-200 flex items-center justify-center space-x-2"
          >
            {loginUserMutation.isPending ? 'Logging in...' : 'Login'}
            <img src={ArrowRight} alt="" className="ml-6" width={20} height={20} />
          </button>
  
          </>
        )}
      </form>
    </div>
  </div>
  }