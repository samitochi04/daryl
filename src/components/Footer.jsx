import { Link } from 'react-router-dom'
import { FiMail, FiLinkedin, FiInstagram, FiGithub } from 'react-icons/fi'
import EmailSubscription from './EmailSubscription'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Liens Rapides': [
      { name: 'Accueil', path: '/' },
      { name: 'À Propos', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Blog', path: '/blog' },
      { name: 'Contact', path: '/contact' }
    ],
    'Nos Services': [
      { name: 'Data Science & IA', path: '/services#data-science' },
      { name: 'Développement Web', path: '/services#web-dev' },
      { name: 'Marketing Digital', path: '/services#marketing' },
      { name: 'Business Intelligence', path: '/services#business-intelligence' }
    ]
  }

  const socialLinks = [
    { icon: FiInstagram, url: 'https://instagram.com/darylbusinessdev', label: 'Instagram' },
    { icon: FiMail, url: 'mailto:temmo@daryl.com', label: 'Email' }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="container-custom py-12">
          <EmailSubscription />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-4xl font-display font-bold text-white hover:text-primary-400 transition-colors inline-block mb-4">
              Daryl.
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Nous créons des solutions innovantes avec la Data Science, l'IA et les technologies de pointe. 
              Construisons ensemble le futur de votre entreprise.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="bg-gray-700 hover:bg-primary-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>© {currentYear} Daryl. Tous droits réservés.</p>
            <p className="mt-2 md:mt-0">
              Créé avec ❤️ en utilisant React, Tailwind CSS & Supabase
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
