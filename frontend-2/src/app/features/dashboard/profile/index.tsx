import { LogoutDialog } from '@/app/components/logout';
import defaultAvatar from '@/assets/icons/default_avatar.jpg'
import { BASE_URL } from '@/libs/constants/server-endpoint';
import { useUserDataQuery } from '@/libs/services/queries/user.query';

function logoutTrigger() {
    return (
        <button
            className="py-4 border px-10 transition duration-300 ease-in-out shadow-lg bg-red-500 hover:bg-red-600 rounded-full"
        >
            <span className='flex justify-center items-center text-white font-semibold'>LOGOUT</span>
        </button>
    )
}

function LogoutDialogBtn() {
    return (
        <LogoutDialog Trigger={logoutTrigger} />
    )
}

export default function ProfileFeature() {
    
    const userDataQuery = useUserDataQuery();

  if (userDataQuery.isLoading) return <div>loading...</div>
  if (userDataQuery.isError) return <div>error occured</div>

    return (
        <>

            <div className=" flex flex-col items-center justify-center">
                <h1 className='text-4xl font-bold mb-4'>Your Profile</h1>

                {!userDataQuery?.data?.permissions?.includes('user:write') ?
                    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10 lg:p-12">

                        <div className="flex flex-col items-center md:flex-row md:space-x-6">
                            {/* Profile Photo */}
                            <div className="flex-shrink-0">
                                <img
                                    src={userDataQuery.data.avatarUrl ? `${BASE_URL}${userDataQuery.data.avatarUrl}` : defaultAvatar}
                                    alt="User Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                                />
                            </div>

                            {/* Profile Details */}
                            <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
                                <h1 className="text-2xl font-semibold text-gray-900">{userDataQuery.data.prefix} {userDataQuery.data.fullName}</h1>
                                <p className="text-gray-600">{userDataQuery.data.designation}</p>
                                <p className="text-gray-500">{userDataQuery.data.department}</p>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="mt-8">
                            <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-600">Full Name</h3>
                                    <p className="text-lg text-gray-900">{userDataQuery.data.prefix} {userDataQuery.data.fullName}</p>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-600">Employee ID</h3>
                                    <p className="text-lg text-gray-900">{userDataQuery.data.employeeId}</p>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-600">Email</h3>
                                    <p className="text-lg text-gray-900">{userDataQuery.data.workEmail}</p>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-600">Designation</h3>
                                    <p className="text-lg text-gray-900">{userDataQuery.data.designation}</p>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-600">Department</h3>
                                    <p className="text-lg text-gray-900">{userDataQuery.data.department}</p>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-600">Date of Joining</h3>
                                    <p className="text-lg text-gray-900">{userDataQuery.data.dateOfJoining}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <LogoutDialogBtn />
                        </div>
                    </div>
                :
                    <div className="flex flex-col item-center justify-center w-auto max-w-4xl bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10 lg:p-12">
                        {/* Profile Photo */}
                        <div className="flex items-center justify-center w-full">
                            <img
                                src={defaultAvatar}
                                alt="User Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                            />
                        </div>

                        {/* Email Info */}
                        <div className="mt-8 py-4 px-6 bg-gray-100 rounded-lg">
                            <h3 className="text-sm font-semibold text-gray-600">Email</h3>
                            <p className="text-lg text-gray-900">{userDataQuery.data.workEmail}</p>
                        </div>

                        <div className="mt-6 text-center">
                            <LogoutDialogBtn />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}