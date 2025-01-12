import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import right from '../assets/right.png';
import { toast } from 'react-hot-toast';
import moment from 'moment'; 
import ritbg from '../assets/ritbg.jpg'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [prefix, setPrefix] = useState('Mr.');
  const [empid, setEmpId] = useState('');
  const [date, setDate] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [designation, setDesignation] = useState('Professor');
  const [dept, setDept] = useState('B.Tech. Artificial Intelligence & Data Science');
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:4300/faculty-page', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 200) {
          toast.success('Already Logged in.');
          navigate('/faculty-page');
        } else if (response.status === 401 || response.status === 403) {
          return
        } else {
          return
        }
      } catch (err) {
        return
      }
    };

    fetchUserData();
  }, [navigate]);


  async function register(e) {
    e.preventDefault();

    const formattedDate = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
  
    if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
      toast.error("Invalid date format.");
      return;
    }
 

    const formData = new FormData();
    formData.append("prefix", prefix);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('photo', photo);
    formData.append('empid', empid);  
    formData.append('date_of_joining', formattedDate);
    formData.append('designation', designation);
    formData.append('dept', dept);

    try {
      const response = await fetch('http://localhost:4300/signup', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (response.ok) {
        toast.success('Registration Successful');
        navigate('/login');
      } else {
        const errorData = await response.json();
        toast.error(`Registration Failed: ${errorData.message}`);
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    }
  }



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
          opacity: 0.8, // Adjust opacity here to make it less visible
          zIndex: -1, // Ensure the background is behind the content
        }}
      ></div>
      <motion.div className="w-3/4 gap-1 mt-6 mb-6  bg-white rounded-lg shadow-md" animate="visible" variants={variants} initial="hidden">

        <h1 className="text-3xl pt-3 font-bold mb-4 text-center">Sign Up</h1>

        <form className="space-y-4" onSubmit={register}>

          <div className="flex items-center space-x-2 p-3">
            {/* Dropdown for prefix */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              required
            >

              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Dr.">Dr.</option>
            </select>


            <input
              type="text"
              placeholder="Employee name"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className='p-3'>
            <input
              type="text"
              placeholder="Employee ID"
              value={empid}
              required
              onChange={(e) => setEmpId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className='p-3'>
            <div className="mb-2 ml-3 text-animation">*** Only Rit Email is allowed ***</div>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4  py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className='flex p-3'>
            <span className='pl-2'>Date of Joining</span>
            <input
              type="date"
              required
              placeholder="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full  px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className='flex p-3 pl-3'>
            <span className='pl-2 pt-2'>Designation</span>
            <select
              className="px-3 ml-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue- w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            >
              <option value="Professor">Professor</option>
              <option value="AssistantProfessor"> Assistant Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Dean">Dean</option>
              <option value="Associate Dean">Associate Dean</option>
              <option value="Director">Director</option>
              <option value="Principal">Principal</option>
              <option value="Research Scholar Full">Research Scholar (Full time)</option>
              <option value="Research Scholar Part">Research Scholar (Part time)</option>
              <option value="Student Faculty Coordinator">Student Faculty Coordinator</option>
            </select>
          </div>

          <div className='flex p-3'>
            <span className='pl-2 pt-2'>Department</span>
            <select
              className="px-3 py-2 ml-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
    w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
              value={dept}
              required
              onChange={(e) => setDept(e.target.value)}
            >
              <option value="B.Tech. Artificial Intelligence & Data Science">B.Tech. Artificial Intelligence & Data Science</option>
              <option value="B.E. Bio Technology">B.E. Bio Technology</option>
              <option value="B.E. Computer Science & Engineering">B.E. Computer Science & Engineering</option>
              <option value="B.E. Computer Science & Engineering(AI&ML)">B.E. Computer Science & Engineering(AI&ML)</option>
              <option value="B.Tech. Computer Science and Business Systems">B.Tech. Computer Science and Business Systems</option>
              <option value="B.E. Computer & Communication Engineering">B.E. Computer & Communication Engineering</option>
              <option value="B.E. Electronics & Communication Engineering">B.E. Electronics & Communication Engineering</option>
              <option value="B.E. Mechanical Engineering">B.E. Mechanical Engineering</option>
              <option value="B.E. Electronic Engineering (VLSI)">B.E. Electronic Engineering (VLSI)</option>
              <option value="Research Department">Research Department</option>
            </select>

          </div>


          <div className='p-4'>
            <span>Profile Photo</span>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handlePhotoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative p-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4  py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 ml-3 flex items-center pr-3 cursor-pointer"
            >
              {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </div>
          </div>

          <div className='p-3'>
            <PasswordStrengthMeter password={password} />
          </div>

          <p className="text-center text-gray-600">
            Already a member?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>

          <div>
            <button
              type="submit"
              className="w-1/2 sm:p-4 mb-4 pb-3 m-auto py-2 mt-4 bg-blue-500 font-semibold rounded-lg hover:bg-[#eecfa7] transition duration-200 flex items-center justify-center space-x-2"
            >
              <span>Sign Up</span>
              <img src={right} alt="" className="ml-2" width={22} height={22} />
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default Register;


