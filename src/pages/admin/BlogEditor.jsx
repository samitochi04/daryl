import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiArrowLeft } from 'react-icons/fi'
import { supabase } from '../../lib/supabase'
import { useNotification } from '../../contexts/NotificationContext'
import LoadingSpinner from '../../components/LoadingSpinner'

const BlogEditor = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { success, error } = useNotification()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: '',
    tags: '',
    published: false,
    meta_title: '',
    meta_description: ''
  })

  useEffect(() => {
    if (id) {
      fetchBlog()
    }
  }, [id])

  const fetchBlog = async () => {
    setLoading(true)
    try {
      const { data, error: fetchError } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      setFormData({
        ...data,
        tags: data.tags?.join(', ') || ''
      })
    } catch (err) {
      error('Failed to fetch blog')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })

    // Auto-generate slug from title
    if (name === 'title' && !id) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content || !formData.category) {
      error('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        updated_at: new Date().toISOString()
      }

      if (id) {
        // Update existing blog
        const { error: updateError } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', id)

        if (updateError) throw updateError
        success('Blog updated successfully')
      } else {
        // Create new blog
        const { error: insertError } = await supabase
          .from('blogs')
          .insert([blogData])

        if (insertError) throw insertError
        success('Blog created successfully')
      }

      navigate('/admin/blogs')
    } catch (err) {
      error('Failed to save blog')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading && id) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/blogs')}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <FiArrowLeft className="text-xl" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {id ? 'Edit Blog Post' : 'New Blog Post'}
          </h1>
          <p className="text-gray-600">Fill in the details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          {/* Title & Slug */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter blog title"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="input-field"
                placeholder="blog-post-url"
                disabled={loading}
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="3"
              className="input-field resize-none"
              placeholder="Brief description of the blog post"
              disabled={loading}
            ></textarea>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content * (HTML supported)
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="12"
              className="input-field resize-none font-mono text-sm"
              placeholder="<p>Your blog content here...</p>"
              disabled={loading}
            ></textarea>
          </div>

          {/* Image, Category, Tags */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="input-field"
                placeholder="https://..."
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                placeholder="Data Science, Web Dev, etc."
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="input-field"
                placeholder="ai, machine-learning, python"
                disabled={loading}
              />
            </div>
          </div>

          {/* SEO */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="meta_title"
                  value={formData.meta_title}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Leave empty to use blog title"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="meta_description"
                  value={formData.meta_description}
                  onChange={handleChange}
                  rows="2"
                  className="input-field resize-none"
                  placeholder="Leave empty to use excerpt"
                  disabled={loading}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Published */}
          <div className="flex items-center gap-3 border-t pt-6">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
              disabled={loading}
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              Publish this blog post
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSave /> {loading ? 'Saving...' : 'Save Blog Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/blogs')}
            className="btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogEditor
