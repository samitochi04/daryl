import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiClock, FiTag, FiUser, FiArrowLeft } from 'react-icons/fi'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import LoadingSpinner from '../components/LoadingSpinner'

const BlogPost = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedBlogs, setRelatedBlogs] = useState([])

  useEffect(() => {
    fetchBlog()
  }, [slug])

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (error) throw error
      
      setBlog(data)

      // Fetch related blogs
      if (data) {
        const { data: related } = await supabase
          .from('blogs')
          .select('*')
          .eq('category', data.category)
          .eq('published', true)
          .neq('id', data.id)
          .limit(3)

        setRelatedBlogs(related || [])
      }
    } catch (error) {
      console.error('Error fetching blog:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Non Trouvé</h1>
          <Link to="/blog" className="text-primary-600 hover:underline">
            ← Retour au Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO 
        title={blog.meta_title || blog.title}
        description={blog.meta_description || blog.excerpt}
        keywords={blog.tags?.join(', ') || ''}
        ogImage={blog.image_url}
      />
      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="py-12 gradient-bg">
          <div className="container-custom">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
            >
              <FiArrowLeft /> Retour au Blog
            </Link>
            
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <span className="flex items-center gap-1">
                  <FiClock /> {formatDate(blog.created_at)}
                </span>
                <span className="flex items-center gap-1">
                  <FiTag /> {blog.category}
                </span>
                <span className="flex items-center gap-1">
                  <FiUser /> {blog.author}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {blog.title}
              </h1>
              
              <p className="text-xl text-gray-600">{blog.excerpt}</p>

              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {blog.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-white rounded-full text-sm font-medium text-primary-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {blog.image_url && (
          <section className="py-12 bg-white">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <img 
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-full rounded-2xl shadow-2xl"
                  loading="eager"
                />
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <article className="max-w-4xl mx-auto prose prose-lg prose-primary">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </article>
          </div>
        </section>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <section className="py-20 gradient-bg">
            <div className="container-custom">
              <h2 className="section-title text-center mb-12">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedBlogs.map(relatedBlog => (
                  <Link
                    key={relatedBlog.id}
                    to={`/blog/${relatedBlog.slug}`}
                    className="card group hover:transform hover:-translate-y-2"
                  >
                    {relatedBlog.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedBlog.image_url}
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">{relatedBlog.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}

export default BlogPost
