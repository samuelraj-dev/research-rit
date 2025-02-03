import { useUserDataQuery } from "@/libs/services/queries/user.query";
import { Book, BookOpen, Calendar, Copyright, Lightbulb } from "lucide-react";
import { UserChart } from "./user-chart";
import { useResearchPapersCountByTypeQuery, useUsersCountByDeptQuery } from "@/libs/services/queries/research-paper.query";

export default function AdminHomeFeature() {
    const researchPapersCountByTypeQuery = useResearchPapersCountByTypeQuery();
    const usersCountByDeptQuery = useUsersCountByDeptQuery();
    const userDataQuery = useUserDataQuery();
  
    if (researchPapersCountByTypeQuery.isPending || userDataQuery.isPending || usersCountByDeptQuery.isPending) {
      return <span>loading...</span>;
    }
  
    if (researchPapersCountByTypeQuery.isError || userDataQuery.isError || usersCountByDeptQuery.isError) {
      return <span>error occured...</span>
    }
  
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
            {/* <UserChart data={{journal: 10, book: 23, bookChapter: 18, conference: 28}} /> */}
            <UserChart data={usersCountByDeptQuery.data.usersCount} />
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <StatCard Icon={Book} title="Journals" count={researchPapersCountByTypeQuery.data?.researchPapersCount?.journal || 0} subtext="Published Journals" bgColor="bg-gradient-to-r from-pink-500 to-pink-700" />
              <StatCard Icon={Calendar} title="Conferences" count={researchPapersCountByTypeQuery.data?.researchPapersCount?.conference || 0} subtext="Organized Conferences" bgColor="bg-gradient-to-r from-orange-500 to-orange-700" />
              <StatCard Icon={BookOpen} title="Books" count={researchPapersCountByTypeQuery.data?.researchPapersCount?.book || 0} subtext="Published Books" bgColor="bg-gradient-to-r from-indigo-500 to-indigo-700" />
              <StatCard Icon={BookOpen} title="Book Chapters" count={researchPapersCountByTypeQuery.data?.researchPapersCount?.bookChapter || 0} subtext="Chapters Published" bgColor="bg-gradient-to-r from-green-500 to-green-700" />
              <StatCard Icon={Lightbulb} title="Patents" count={researchPapersCountByTypeQuery.data?.researchPapersCount?.patent || 0} subtext="Filed Patents" bgColor="bg-gradient-to-r from-purple-500 to-purple-700" />
              <StatCard Icon={Copyright} title="Copyrights" count={researchPapersCountByTypeQuery.data?.researchPapersCount?.copyright || 0} subtext="Copyrights Filed" bgColor="bg-gradient-to-r from-blue-500 to-blue-700" />
            </div>
          </div>
        </div>
      </>
    );
  };