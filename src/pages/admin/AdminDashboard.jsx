import { useState, useEffect } from 'react'
import { FiFileText, FiMail, FiUsers, FiTrendingUp } from 'react-icons/fi'
import { supabase } from '../../lib/supabase'
import LoadingSpinner from '../../components/LoadingSpinner'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    blogs: 0,
    messages: 0,
    subscribers: 0,
    unreadMessages: 0
  })
  const [loading, setLoading] = useState(true)
  const [recentMessages, setRecentMessages] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch counts
      const [blogsRes, messagesRes, subscribersRes, unreadRes] = await Promise.all([
        supabase.from('blogs').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
        supabase.from('email_subscriptions').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('read', false)
      ])

      setStats({
        blogs: blogsRes.count || 0,
        messages: messagesRes.count || 0,
        subscribers: subscribersRes.count || 0,
        unreadMessages: unreadRes.count || 0
      })

      // Fetch recent messages
      const { data: messages } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentMessages(messages || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      icon: FiFileText,
      label: 'Total Blogs',
      value: stats.blogs,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiMail,
      label: 'Messages',
      value: stats.messages,
      badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} new` : null,
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiUsers,
      label: 'Subscribers',
      value: stats.subscribers,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiTrendingUp,
      label: 'Growth',
      value: '+12%',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="text-2xl text-white" />
              </div>
              {stat.badge && (
                <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                  {stat.badge}
                </span>
              )}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Messages</h2>
        {recentMessages.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No messages yet</p>
        ) : (
          <div className="space-y-4">
            {recentMessages.map(message => (
              <div
                key={message.id}
                className={`p-4 rounded-lg border-2 ${
                  message.read ? 'border-gray-200 bg-gray-50' : 'border-primary-200 bg-primary-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{message.name}</h3>
                    <p className="text-sm text-gray-600">{message.email}</p>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(message.created_at)}</span>
                </div>
                <p className="font-medium text-gray-900 mb-1">{message.subject}</p>
                <p className="text-gray-600 text-sm line-clamp-2">{message.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
