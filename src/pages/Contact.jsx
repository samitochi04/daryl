import { useState } from 'react'
import { FiMail, FiUser, FiMessageSquare, FiSend, FiMapPin, FiLinkedin, FiInstagram } from 'react-icons/fi'
import { supabase } from '../lib/supabase'
import { useNotification } from '../contexts/NotificationContext'
import SEO from '../components/SEO'

const Contact = () => {
  const { success, error } = useNotification()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      error('Veuillez remplir tous les champs')
      return
    }

    if (!formData.email.includes('@')) {
      error('Veuillez entrer une adresse email valide')
      return
    }

    setLoading(true)

    try {
      // Save to Supabase
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([formData])

      if (dbError) throw dbError

      // Send email via backend
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/send-contact-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      } catch (emailError) {
        console.log('Email sending failed, but message saved:', emailError)
      }

      success('Message envoyé avec succès ! Nous reviendrons vers vous rapidement.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      error('Échec de l\'envoi du message. Veuillez réessayer.')
      console.error('Contact form error:', err)
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'contact@daryl.com',
      link: 'mailto:temmodaryl317@gmail.com'
    },
    {
      icon: FiInstagram,
      title: 'Instagram',
      value: '@daryl',
      link: 'https://instagram.com/darylbusinessdev'
    },
    {
      icon: FiMapPin,
      title: 'Localisation',
      value: 'France & International',
      link: null
    }
  ]

  return (
    <>
      <SEO 
        title="Contactez Daryl - Travaillons Ensemble"
        description="Contactez-nous pour vos projets Data Science, IA, Développement Web et Marketing Digital. Discutons de votre projet et créons ensemble quelque chose d'extraordinaire."
        keywords="contact, recruter data scientist, contact développeur web, services marketing digital, consultation, France"
      />
      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="py-20 gradient-bg">
          <div className="container-custom text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Prenons Contact</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vous avez un projet en tête ? Envie de collaborer ? Ou simplement discuter ? 
              Nous serions ravis d'échanger avec vous !
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Envoyez-nous un Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom Complet *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field pl-12"
                        placeholder="Jean Dupont"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse Email *
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
                        placeholder="jean@exemple.fr"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="input-field pl-12"
                        placeholder="Demande de Projet"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className="input-field resize-none"
                      placeholder="Parlez-nous de votre projet..."
                      disabled={loading}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Envoi en cours...' : (
                      <>
                        Envoyer le Message <FiSend />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Nous sommes toujours ouverts à discuter de nouveaux projets, d'idées créatives ou d'opportunités de collaboration. 
                  Que vous ayez besoin d'une solution data science, d'un site web performant ou d'une stratégie marketing digital complète, 
                  réalisons-le ensemble.
                </p>

                <div className="space-y-6 mb-12">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-primary-500 to-primary-700 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="text-xl text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                        {info.link ? (
                          <a 
                            href={info.link}
                            target={info.link.startsWith('http') ? '_blank' : undefined}
                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="card p-8 bg-gradient-to-br from-primary-50 to-blue-50">
                  <h3 className="text-2xl font-bold mb-4">Pourquoi Travailler Avec Nous ?</h3>
                  <ul className="space-y-3">
                    {[
                      'Temps de réponse rapide - Sous 24 heures généralement',
                      'Communication transparente tout au long du projet',
                      'Focus sur la qualité avec attention aux détails',
                      'Flexible et adaptable à vos besoins',
                      'Support continu après la livraison du projet'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact
