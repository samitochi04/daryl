import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi'
import { supabase } from '../../lib/supabase'
import { useNotification } from '../../contexts/NotificationContext'
import LoadingSpinner from '../../components/LoadingSpinner'

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const { success, error } = useNotification()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setBlogs(data || [])
    } catch (err) {
      error('Failed to fetch blogs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const togglePublish = async (id, currentStatus) => {
    try {
      const { error: updateError } = await supabase
        .from('blogs')
        .update({ 
          published: !currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : null
        })
        .eq('id', id)

      if (updateError) throw updateError

      success(`Blog ${!currentStatus ? 'published' : 'unpublished'} successfully`)
      fetchBlogs()
    } catch (err) {
      error('Failed to update blog status')
      console.error(err)
    }
  }

  const deleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return

    try {
      const { error: deleteError } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      success('Blog deleted successfully')
      fetchBlogs()
    } catch (err) {
      error('Failed to delete blog')
      console.error(err)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Management</h1>
          <p className="text-gray-600">Create and manage your blog posts</p>
        </div>
        <Link to="/admin/blogs/new" className="btn-primary flex items-center gap-2">
          <FiPlus /> New Blog Post
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-gray-600 mb-4">No blog posts yet</p>
          <Link to="/admin/blogs/new" className="btn-primary inline-flex items-center gap-2">
            <FiPlus /> Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogs.map(blog => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{blog.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{blog.excerpt}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        blog.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(blog.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => togglePublish(blog.id, blog.published)}
                          className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                          title={blog.published ? 'Unpublish' : 'Publish'}
                        >
                          {blog.published ? <FiEyeOff /> : <FiEye />}
                        </button>
                        <Link
                          to={`/admin/blogs/edit/${blog.id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          onClick={() => deleteBlog(blog.id)}
                          className="p-2 text-gray-600 hover:text-red-600 transition-colors"
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

export default AdminBlogs
