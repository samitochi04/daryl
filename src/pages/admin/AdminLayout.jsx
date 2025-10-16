import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom'
import { FiHome, FiFileText, FiMail, FiUsers, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const AdminLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const navItems = [
    { icon: FiHome, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: FiFileText, label: 'Blogs', path: '/admin/blogs' },
    { icon: FiMail, label: 'Messages', path: '/admin/messages' },
    { icon: FiUsers, label: 'Subscribers', path: '/admin/subscribers' }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white shadow-lg fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-2xl text-gray-700"
            >
              {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>
            <Link to="/" className="text-2xl font-bold text-gradient">
              Daryl.
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 hidden sm:inline">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <FiLogOut /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 w-64 bg-white shadow-lg transform transition-transform lg:translate-x-0 z-20 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <nav className="p-4 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="text-xl" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-20 lg:pl-64 p-6">
        <Outlet />
      </main>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default AdminLayout
