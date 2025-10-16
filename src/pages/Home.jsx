import { Link } from 'react-router-dom'
import { FiArrowRight, FiCode, FiDatabase, FiTrendingUp, FiBarChart2 } from 'react-icons/fi'
import SEO from '../components/SEO'

const Home = () => {
  const skills = [
    {
      icon: FiDatabase,
      title: 'Data Science & IA',
      description: 'Solutions de Machine Learning, Deep Learning et IA qui créent de la valeur métier',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiCode,
      title: 'Développement Web',
      description: 'Développement full-stack avec les frameworks modernes et les meilleures pratiques',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiTrendingUp,
      title: 'Marketing Digital',
      description: 'Maîtrise du SEO, SEA et des réseaux sociaux pour la croissance de votre entreprise',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiBarChart2,
      title: 'Business Intelligence',
      description: 'Power BI, Excel et visualisation de données pour des décisions éclairées',
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <>
      <SEO 
        title="Daryl - Solutions Data Science, IA & Marketing Digital"
        description="Daryl transforme vos données en excellence digitale. Nous offrons des solutions en Data Science, IA, développement web et marketing digital pour propulser votre croissance."
        keywords="data science, intelligence artificielle, développement web, marketing digital, business intelligence, France"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 gradient-bg min-h-screen flex items-center">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-gradient">Transformons</span>
                  <br />
                  Vos Données
                  <br />
                  En Excellence Digitale
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Nous créons des solutions innovantes qui allient technologie et business pour propulser votre croissance digitale.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/services" className="btn-primary flex items-center gap-2">
                    Découvrir nos services <FiArrowRight />
                  </Link>
                  <Link to="/contact" className="btn-outline">
                    Nous contacter
                  </Link>
                </div>
              </div>
              <div className="relative animate-float">
                <div className="relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop" 
                    alt="Data Science et Technologie"
                    className="rounded-2xl shadow-2xl"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="section-title">Notre Expertise</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Nous combinons expertise technique et créativité pour offrir des résultats exceptionnels
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="card p-8 group hover:transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <skill.icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{skill.title}</h3>
                  <p className="text-gray-600">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: '50+', label: 'Projets Réalisés' },
                { number: '100%', label: 'Satisfaction Client' },
                { number: '24/7', label: 'Support Disponible' },
                { number: '∞', label: 'Possibilités' }
              ].map((stat, index) => (
                <div key={index} className="animate-fade-in">
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-primary-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-bg">
          <div className="container-custom">
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Prêt à Construire Quelque Chose d'Incroyable ?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Collaborons ensemble pour transformer vos idées en réalité. Des insights data-driven aux expériences web époustouflantes, 
                nous sommes là pour faire prospérer votre entreprise à l'ère digitale.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Démarrer un Projet
                </Link>
                <Link to="/blog" className="btn-secondary">
                  Lire Notre Blog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
