import React from 'react';

const UnAuthorized = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex items-center space-x-8">
      
                <div className="text-center">
                    <h1 className='text-6xl mb-4'>Ooops!</h1>
                    <h1 className="text-2xl font-bold text-red-500">Permission Denied</h1>
                    <p className="mt-4">You do not have permission to view this page.</p>
                </div>
            </div>
        </div>
    );
}

export default UnAuthorized;
