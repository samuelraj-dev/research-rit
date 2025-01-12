import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { toast } from 'react-toastify';
import UserTable from './Tables/UserTable';
import axios from 'axios';
import { AddUserDialog } from './AddUserDialog';
import AdminSidebar from './AdminSidebar';
import { useUser } from '@/UserContext';
import LoadingPage from '../LoadingPage';

const Users = () => {
  const { user, loading, error } = useUser();
  const [users, setUsers] = useState([])

  // const handleDelete = (id, type) => {
  //   switch (type) {
  //     case 'journal':
  //       fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.journal)
  //       break;
  //     case 'bookChapter':
  //       fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.bookChapter)
  //       break;
  //     case 'conference':
  //       fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.conference)
  //       break;
  //     case 'patent':
  //       fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.patent)
  //       break;
  //     case 'copyright':
  //       fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.copyright)
  //       break;
  //     case 'book':
  //       fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.book)
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const fetchResearchPaperByType = async (type) => {
  //   try {
  //     setLoading(true)
  //     const response = 
  //       await axios.get(`http://localhost:5000/api/research-papers/research-paper/${type}`, { withCredentials: true })
  //     setLoading(false)
  //     console.log(response)

  //     if (response.status === 200) {
  //       const temp = response.data.researchPapers ? response.data.researchPapers : []
  //       setResearchPapers(temp);
  //     }

  //   } catch (error) {
  //     // if (error.response.status == 401 || error.response.status == 403) {
  //     //   toast.error('You are not authorized. Please log in.');
  //     //   navigate('/login');
  //     // } else {
  //       console.log("err: ", error)
  //     // }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {  

    async function fetchUsers() {
      if (!user?.permissions.includes('user:read')) return;

      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          withCredentials: 'include',
        });

        if (response.status === 200) {
          setUsers(response.data.users);
        } else {
          toast.error('Error fetching research papers count.');
        }
      } catch (err) {
        console.error('Error fetching research papers count:', err);
        toast.error('Network error. Please try again later.');
      }
    }

    fetchUsers();
  }, [user]);

  
  if (loading) {
    return <LoadingPage />
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <>

      <div className="flex">

        {/* Main Content */}
        <div className="flex-1 p-6" style={{ marginTop: '6rem' }}>
          <div className="flex justify-end items-center w-full z-10">
            {/* <nav className="flex gap-2 p-0.5 border border-white/15 rounded-full backdrop-blur nav-items"> */}
            <AddUserDialog />
            {/* </nav> */}
          </div>

          <div id="journals">
            <UserTable users={users} handleDelete={(id) => handleDelete(id, 'journal')} />
          </div>

        </div>
      </div>
    </>
  );
};

export default Users;
