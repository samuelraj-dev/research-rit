import { useUserResearchPapersCountByTypeQuery } from '@/libs/services/queries/research-paper.query'
import { useUserDataQuery } from '@/libs/services/queries/user.query';
import defaultAvatar from "@/assets/icons/default_avatar.jpg"
import { ResearchPaperChart } from './research-paper-chart';

export default function UserHomeFeature() {
    const userResearchPapersCountByTypeQuery = useUserResearchPapersCountByTypeQuery();
    const userDataQuery = useUserDataQuery();
  
    if (userResearchPapersCountByTypeQuery.isPending || userDataQuery.isPending) {
      return <span>loading...</span>;
    }
  
    if (userResearchPapersCountByTypeQuery.isError || userDataQuery.isError) {
      return <span>error occured...</span>
    }
  
    return <>
      <div className="flex">
  
        {/* Main Content */}
        <div className="mt-1 flex-grow">
          <div className='flex items-center justify-center'>
            <h1 className="text-4xl font-bold mb-6">Your Profile</h1>
          </div>
  
          {/* Bento Grid Container */}
          <div className="grid grid-cols-2 gap-8 w-full" style={{ gridTemplateRows: 'auto 1fr' }}>
            {/* Left Top: User Card */}
            {userDataQuery.data && (
                <div className="flex flex-col rounded-lg bg-white shadow-lg p-6 h-full">
                    <div className="flex flex-col items-center">
                    <img
                        src={userDataQuery.data.mediaUrl ? `http://localhost:5000${userDataQuery.data.mediaUrl}` : defaultAvatar}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover shadow-xl mb-3"
                    />
                    <div className="text-center">
                        <div className="flex items-baseline justify-center space-x-2 mb-1">
                        <span className="text-4xl font-semibold text-gray-900">{userDataQuery.data.prefix}</span>
                        <p className="text-4xl font-semibold text-gray-900">{userDataQuery.data.fullName}</p>
                        </div>
                        <span className='text-lg'><span className='text-md text-gray-600'>Designation: </span>{userDataQuery.data.designation}</span>
                        <span className="text-lg text-gray-500 mt-1 block">{userDataQuery.data.department}</span>
                    </div>
                    </div>

                    <div className="mt-auto text-center w-full pb-4">
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                        Publications:
                    </p>
                    <p className="text-2xl font-bold text-indigo-600">
                        {userResearchPapersCountByTypeQuery.data.researchPapersCount.total}
                    </p>
                    </div>
                </div>
                )}

  
            {/* Right Top: Visualization */}
            <ResearchPaperChart data={userResearchPapersCountByTypeQuery.data.researchPapersCount} />
  
            {/* Bottom: Publication Stats */}
            <div className="col-span-2 flex flex-col items-center bg-white p-6 rounded-3xl shadow-lg" style={{ marginBottom: '4rem' }}>
              {/* Displaying the Year Range */}
              {/* <button className="text-1xl font-bold text-gray-800 mb-4">2024-2025</button> */}
              <div className="flex justify-center mb-6">
                {/* <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border-2 border-gray-300 px-3 py-2 rounded-lg"
                >
                  
                  <option value="all">All</option>
                  {academicYears.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select> */}
              </div>
  
              <div className="flex justify-between space-x-4 w-full">
                {[
                  { title: 'Journals', bg: 'rgba(255, 99, 132, 0.4)', border: 'rgba(255, 99, 132, 1)', count: userResearchPapersCountByTypeQuery.data.researchPapersCount.journal },
                  { title: 'Books ', bg: '#36A2EB66', border: '#36A2EB', count: userResearchPapersCountByTypeQuery.data.researchPapersCount.book },
                  { title: 'Book Chapters', bg: 'rgba(255, 206, 86, 0.4)', border: 'rgba(255, 206, 86, 1)', count: userResearchPapersCountByTypeQuery.data.researchPapersCount.bookChapter },
                  { title: 'Conferences', bg: 'rgba(75, 192, 192, 0.4)', border: 'rgba(75, 192, 192, 1)', count: userResearchPapersCountByTypeQuery.data.researchPapersCount.conference },
                  { title: 'Patents', bg: 'rgba(153, 102, 255, 0.4)', border: 'rgba(153, 102, 255, 1)', count: userResearchPapersCountByTypeQuery.data.researchPapersCount.patent },
                  { title: 'Copyrights', bg: 'rgba(255, 159, 64, 0.4)', border: 'rgba(255, 159, 64,1)', count: userResearchPapersCountByTypeQuery.data.researchPapersCount.copyright },
                ].map(({ title, bg, border, count }) => (
                  <div
                    key={title}
                    className={`shadow-lg flex-1 p-4 text-center hover:shadow-2xl transition-shadow duration-300 border-4 rounded-xl`}
                    style={{ backgroundColor: bg, borderColor: border }}
                    onClick={() => {
                      // ref.current.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <h2 className="text-base font-bold mb-2 text-gray-800">{title}</h2>
                    <p className="text-4xl font-medium text-gray-600">
                      <div>{count}</div>
                    </p>
                  </div>
                ))}
              </div>
              
            </div>  
          </div>
        </div>
        </div>
    </>
  }
  