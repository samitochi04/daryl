import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiClock, FiTag, FiArrowRight, FiSearch } from 'react-icons/fi'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import LoadingSpinner from '../components/LoadingSpinner'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setBlogs(data || [])
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', ...new Set(blogs.map(blog => blog.category))]

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <SEO 
        title="Blog - Insights Data Science, IA & Innovation Digitale | Daryl"
        description="Découvrez nos derniers articles sur la Data Science, l'Intelligence Artificielle, le Développement Web et le Marketing Digital. Apprenez de nos expériences et insights du secteur."
        keywords="blog data science, articles IA, tutoriels machine learning, conseils développement web, insights marketing digital, blog tech, France"
      />
      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="py-20 gradient-bg">
          <div className="container-custom text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Blog & Insights</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explorons ensemble la Data Science, l'IA, le Développement Web et notre parcours vers l'excellence digitale
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher des articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-12 w-full"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Grid */}
            {loading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-600">
                  {searchTerm || selectedCategory !== 'All' 
                    ? 'Aucun article trouvé correspondant à vos critères'
                    : 'Aucun article publié pour le moment. Revenez bientôt !'}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map(blog => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.slug}`}
                    className="card group hover:transform hover:-translate-y-2"
                  >
                    {blog.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <FiClock /> {formatDate(blog.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiTag /> {blog.category}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                        {blog.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                      <div className="flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
                        Lire la suite <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Blog
