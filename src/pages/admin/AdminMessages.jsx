import { useState, useEffect } from 'react'
import { FiMail, FiTrash2, FiCheck } from 'react-icons/fi'
import { supabase } from '../../lib/supabase'
import { useNotification } from '../../contexts/NotificationContext'
import LoadingSpinner from '../../components/LoadingSpinner'

const AdminMessages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const { success, error } = useNotification()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setMessages(data || [])
    } catch (err) {
      error('Failed to fetch messages')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      const { error: updateError } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', id)

      if (updateError) throw updateError
      success('Message marked as read')
      fetchMessages()
    } catch (err) {
      error('Failed to update message')
      console.error(err)
    }
  }

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return

    try {
      const { error: deleteError } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      success('Message deleted successfully')
      setSelectedMessage(null)
      fetchMessages()
    } catch (err) {
      error('Failed to delete message')
      console.error(err)
    }
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Messages</h1>
        <p className="text-gray-600">Manage inquiries and contact requests</p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <FiMail className="text-6xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No messages yet</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold">All Messages ({messages.length})</h2>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {messages.map(message => (
                <div
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message)
                    if (!message.read) markAsRead(message.id)
                  }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-primary-50' : ''
                  } ${!message.read ? 'border-l-4 border-l-primary-600' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{message.name}</h3>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                    {!message.read && (
                      <span className="px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-gray-900 text-sm mb-1">{message.subject}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{formatDate(message.created_at)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div className="bg-white rounded-xl shadow-lg">
            {selectedMessage ? (
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedMessage.subject}
                    </h2>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>From:</strong> {selectedMessage.name}</p>
                      <p><strong>Email:</strong> {selectedMessage.email}</p>
                      <p><strong>Date:</strong> {formatDate(selectedMessage.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!selectedMessage.read && (
                      <button
                        onClick={() => markAsRead(selectedMessage.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <FiCheck />
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3">Message:</h3>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
                <div className="border-t mt-6 pt-6">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <FiMail /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-600">
                <FiMail className="text-6xl text-gray-400 mx-auto mb-4" />
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminMessages
