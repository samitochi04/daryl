import { useState } from 'react'
import { FiMail, FiSend } from 'react-icons/fi'
import { supabase } from '../lib/supabase'
import { useNotification } from '../contexts/NotificationContext'

const EmailSubscription = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { success, error } = useNotification()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      error('Veuillez entrer une adresse email valide')
      return
    }

    setLoading(true)

    try {
      const { error: dbError } = await supabase
        .from('email_subscriptions')
        .insert([{ email }])

      if (dbError) {
        if (dbError.code === '23505') {
          error('Cet email est déjà inscrit')
        } else {
          throw dbError
        }
      } else {
        success('Inscription réussie ! Consultez votre boîte mail.')
        setEmail('')
      }
    } catch (err) {
      error('Échec de l\'inscription. Veuillez réessayer.')
      console.error('Subscription error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-primary-600 p-4 rounded-full">
          <FiMail className="text-3xl text-white" />
        </div>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mb-3">Restez Informé</h3>
      <p className="text-gray-300 mb-6">
        Inscrivez-vous pour recevoir les derniers insights sur la Data Science, l'IA et l'Innovation Digitale
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre adresse email"
          className="flex-1 px-6 py-4 rounded-lg bg-white text-gray-900 border-2 border-transparent focus:border-primary-500 outline-none transition-all"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Inscription...' : (
            <>
              S'inscrire <FiSend />
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default EmailSubscription
