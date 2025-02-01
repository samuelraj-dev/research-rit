import { useUserDataQuery } from "@/libs/services/queries/user.query";
import { Book, BookOpen, Calendar, Copyright, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { UserChart } from "./user-chart";

const defaultResearchPapersCount = {
    book: 0,
    bookChapter: 0,
    conference: 0,
    copyright: 0,
    journal: 0,
    patent: 0,
  }

export default function AdminHomeFeature() {
    const userDataQuery = useUserDataQuery();
    const [researchPapersCount, setResearchPapersCount] = useState(defaultResearchPapersCount);
  
    useEffect(() => {
    //   const fetchResearchPapersCount = async () => {
    //     if (!userDataQuery.data?.permissions.includes('user:read')) return;
  
    //     try {
    //       const response = await axios.get('${BASE_URL}/api/research-papers/count-by-type', { withCredentials: true });
    //       if (response.status === 200) {
    //         setResearchPapersCount(response.data?.researchPapersCount ? response.data.researchPapersCount : defaultResearchPapersCount);
    //       } else {
    //         alert('Error fetching research papers count.');
    //       }
    //     } catch (err) {
    //       console.error('Error fetching research papers count:', err);
    //       alert('Network error. Please try again later.');
    //     }
    //   };
  
    //   fetchResearchPapersCount(); 
    }, [userDataQuery.fetchStatus]);
  
    if (userDataQuery.isLoading) return <div>loading</div>
    if (userDataQuery.isError) return <div className="text-red-500 text-center">{"Error occured"}</div>;
  
    const StatCard = ({ Icon, title, count, subtext, bgColor }) => (
        <div className={`max-w-[16rem] p-6 ${bgColor} text-white rounded-lg shadow-lg flex items-center justify-between transform hover:scale-105 duration-300`}>
          <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md">
            <Icon className="text-3xl text-blue-800" />
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">
              <div>{count}</div>
            </div>
            <div className="text-xl font-medium mt-1">{title}</div>
            {subtext && <div className="text-sm opacity-80 mt-1">{subtext}</div>}
          </div>
        </div>
      );
  
    return (
      <>
        <div className="flex flex-col items-center justify-center mt-2 w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome Admin <span className="text-blue-600">{userDataQuery.data.workEmail}</span>!
          </h1>
          {/* <div className="flex justify-center gap-6 mt-10 px-6 w-full"> */}
          <div className="grid grid-cols-2 gap-8">
            {/* <div className="border-4 border-blue-500 p-6 rounded-lg"> */}
              {/* <h2 className="text-xl font-bold mb-4">Registered Users</h2> */}
              {/* <DepartmentPieChart /> */}
            {/* </div> */}
            <UserChart data={{journal: 10, book: 23, bookChapter: 18, conference: 28}} />
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <StatCard Icon={Book} title="Journals" count={researchPapersCount.journal} subtext="Published Journals" bgColor="bg-gradient-to-r from-pink-500 to-pink-700" />
              <StatCard Icon={Calendar} title="Conferences" count={researchPapersCount.conference} subtext="Organized Conferences" bgColor="bg-gradient-to-r from-orange-500 to-orange-700" />
              <StatCard Icon={BookOpen} title="Books" count={researchPapersCount.book} subtext="Published Books" bgColor="bg-gradient-to-r from-indigo-500 to-indigo-700" />
              <StatCard Icon={BookOpen} title="Book Chapters" count={researchPapersCount.bookChapter} subtext="Chapters Published" bgColor="bg-gradient-to-r from-green-500 to-green-700" />
              <StatCard Icon={Lightbulb} title="Patents" count={researchPapersCount.patent} subtext="Filed Patents" bgColor="bg-gradient-to-r from-purple-500 to-purple-700" />
              <StatCard Icon={Copyright} title="Copyrights" count={researchPapersCount.copyright} subtext="Copyrights Filed" bgColor="bg-gradient-to-r from-blue-500 to-blue-700" />
            </div>
          </div>
        </div>
      </>
    );
  };