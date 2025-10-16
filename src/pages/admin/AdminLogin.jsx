import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMail, FiLock } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import { useNotification } from '../../contexts/NotificationContext'

const AdminLogin = () => {
  const navigate = useNavigate()
  const { login, user } = useAuth()
  const { success, error } = useNotification()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  // Redirect if already logged in
  if (user) {
    navigate('/admin/dashboard')
    return null
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      error('Veuillez remplir tous les champs')
      return
    }

    setLoading(true)

    const result = await login(formData.email, formData.password)

    if (result.success) {
      success('Connexion réussie !')
      navigate('/admin/dashboard')
    } else {
      error(result.error || 'Identifiants invalides')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Daryl.</h1>
          <p className="text-gray-600">Portail Admin</p>
        </div>

        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="admin@daryl.com"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de Passe
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connexion...' : 'Se Connecter'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Zone d'administration sécurisée. Accès non autorisé interdit.
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
