import { Form, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Buttons from './pages/Buttons'
import './App.css'
import { Toaster } from "react-hot-toast"
import UserPage from './pages/UserPage'
import { UserProvider } from './UserContext'
import Profile from './pages/Profile'
import Uploads from './pages/Uploads'
import UploadForm from './pages/UploadForm'
import AdminDash from './pages/Admin/AdminDash'
import UserUploads from './pages/Admin/UserUploads'
import UnAuthorized from './pages/Admin/UnAuthorized'
import Users from './pages/Admin/Users'
import PermissionRoute from './PermissionRoute'
import Navbar from './components/Navbar'
import { useLocation } from 'wouter'
import Sidebar from './components/SideBar';

function App() {
  const location = useLocation();
  console.log(location[0])
  const shouldDisplayNavbar = !['/', '/login', '/unauthorized'].includes(location[0]);
  return (
    <UserProvider>
      <Toaster />
      {shouldDisplayNavbar && <>
        <Navbar />
        <div className="absolute w-64 bg-gray-100" style={{ marginLeft: '3rem', marginTop: '2rem' }}>
            <Sidebar />
        </div>
      </>}
      <Routes>
        <Route path='/' element={<Buttons />} />
        <Route path='/login' element={<Login />} />
          {/* <Navbar /> */}
          <Route
            path="/admin-dashboard"
            element={
              <PermissionRoute requiredPermissions={['user:read']}>
                <AdminDash />
              </PermissionRoute>
            }
          />

          <Route
            path="/admin-dashboard/user-uploads"
            element={
              <PermissionRoute requiredPermissions={['research_paper:read', 'research_paper:accept', 'research_paper:reject']}>
                <UserUploads />
              </PermissionRoute>
            }
          />

          <Route
            path="/admin-dashboard/users"
            element={
              <PermissionRoute requiredPermissions={['user:read', 'user:write']}>
                <Users />
              </PermissionRoute>
            }
          />

          <Route
            path="/faculty-page"
            element={
              <PermissionRoute requiredPermissions={['user:own_read', 'research_paper:own_read']}>
                <UserPage />
              </PermissionRoute>
            }
          />

          <Route
            path="/profile-page"
            element={
              <PermissionRoute requiredPermissions={['user:own_read']}>
                <Profile />
              </PermissionRoute>
            }
          />

          <Route
            path="/previous-uploads"
            element={
              <PermissionRoute requiredPermissions={['research_paper:own_read', 'research_paper:own_delete']}>
                <Uploads />
              </PermissionRoute>
            }
          />

          <Route
            path="/upload-paper"
            element={
              <PermissionRoute requiredPermissions={['research_paper:own_write']}>
                <UploadForm />
              </PermissionRoute>
            }
          />



        <Route path='/*' element={<UnAuthorized/>}/>
        
      </Routes>
    </UserProvider>
  )
}

export default App
