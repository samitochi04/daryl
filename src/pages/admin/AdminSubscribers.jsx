import { useState, useEffect } from 'react'
import { FiMail, FiTrash2, FiDownload } from 'react-icons/fi'
import { supabase } from '../../lib/supabase'
import { useNotification } from '../../contexts/NotificationContext'
import LoadingSpinner from '../../components/LoadingSpinner'

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const { success, error } = useNotification()

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('email_subscriptions')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setSubscribers(data || [])
    } catch (err) {
      error('Failed to fetch subscribers')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteSubscriber = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return

    try {
      const { error: deleteError } = await supabase
        .from('email_subscriptions')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      success('Subscriber deleted successfully')
      fetchSubscribers()
    } catch (err) {
      error('Failed to delete subscriber')
      console.error(err)
    }
  }

  const exportSubscribers = () => {
    const csv = [
      ['Email', 'Subscribed Date'],
      ...subscribers.map(sub => [
        sub.email,
        new Date(sub.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    success('Subscribers exported successfully')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Subscribers</h1>
          <p className="text-gray-600">Manage your newsletter subscribers</p>
        </div>
        {subscribers.length > 0 && (
          <button
            onClick={exportSubscribers}
            className="btn-primary flex items-center gap-2"
          >
            <FiDownload /> Export CSV
          </button>
        )}
      </div>

      {subscribers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <FiMail className="text-6xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No subscribers yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-semibold">Total Subscribers: {subscribers.length}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subscribed Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscribers.map(subscriber => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FiMail className="text-gray-400" />
                        <span className="font-medium text-gray-900">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        subscriber.subscribed
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {subscriber.subscribed ? 'Active' : 'Unsubscribed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(subscriber.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => deleteSubscriber(subscriber.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminSubscribers
