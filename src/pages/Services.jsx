import { Link } from 'react-router-dom'
import { 
  FiDatabase, FiCode, FiTrendingUp, FiBarChart2, 
  FiInstagram, FiVideo, FiSearch, FiCpu 
} from 'react-icons/fi'
import { SiBlender, SiPowerbi, SiReact, SiPython } from 'react-icons/si'
import SEO from '../components/SEO'

const Services = () => {
  const services = [
    {
      id: 'data-science',
      icon: FiDatabase,
      title: 'Data Science & IA',
      tagline: 'Transformez vos Données en Insights',
      description: 'Exploitez la puissance du machine learning, deep learning et de l\'IA pour révéler les tendances cachées dans vos données et piloter vos décisions business.',
      features: [
        'Développement de Modèles ML',
        'Analyse Prédictive',
        'Traitement du Langage Naturel',
        'Solutions de Computer Vision',
        'Architecture de Pipelines Data',
        'Analyse & Modélisation Statistique'
      ],
      tools: [SiPython, FiCpu],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'web-dev',
      icon: FiCode,
      title: 'Développement Web',
      tagline: 'Élégant, Rapide & Fonctionnel',
      description: 'Développement web full-stack avec les frameworks modernes. Nous créons des sites responsives et optimisés SEO qui convertissent vos visiteurs en clients.',
      features: [
        'Applications Web Sur Mesure',
        'Solutions E-commerce',
        'Progressive Web Apps (PWA)',
        'Développement & Intégration API',
        'Design & Optimisation BDD',
        'Optimisation des Performances'
      ],
      tools: [SiReact, FiCode],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'marketing',
      icon: FiTrendingUp,
      title: 'Marketing Digital',
      tagline: 'Développez Votre Présence en Ligne',
      description: 'Stratégies marketing digital complètes incluant SEO, maîtrise des réseaux sociaux et création de contenu qui génère engagement et croissance.',
      features: [
        'Optimisation SEO & SEA',
        'Gestion des Réseaux Sociaux',
        'Stratégie & Création de Contenu',
        'Croissance TikTok, Instagram, YouTube',
        'Développement Business LinkedIn',
        'Optimisation Google Business Profile'
      ],
      tools: [FiInstagram, FiSearch],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'business-intelligence',
      icon: FiBarChart2,
      title: 'Business Intelligence',
      tagline: 'Décisions Pilotées par la Data',
      description: 'Transformez vos données brutes en insights actionnables avec des solutions BI puissantes, tableaux de bord interactifs et systèmes de reporting complets.',
      features: [
        'Développement Dashboards Power BI',
        'Analytics Avancées Excel',
        'Suivi & Monitoring des KPI',
        'Visualisation de Données',
        'Systèmes de Reporting Business',
        'Intégration Google Analytics'
      ],
      tools: [SiPowerbi, FiBarChart2],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'content-creation',
      icon: FiVideo,
      title: 'Production Contenu & Média',
      tagline: 'Donnez Vie à Votre Vision',
      description: 'Modélisation 3D, montage vidéo et création de contenu multimédia qui captive vos audiences et raconte l\'histoire de votre marque.',
      features: [
        'Modélisation & Animation 3D (Blender)',
        'Montage Vidéo (DaVinci Resolve)',
        'React Three Fiber Web 3D',
        'Réalisation & Vidéographie',
        'Design Graphique (Canva)',
        'Plans Techniques AutoCAD'
      ],
      tools: [SiBlender, FiVideo],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'automation',
      icon: FiCpu,
      title: 'Automatisation & Intégration',
      tagline: 'Optimisez Vos Workflows',
      description: 'Automatisez les tâches répétitives, intégrez plusieurs plateformes et optimisez vos processus business avec des solutions low-code/no-code.',
      features: [
        'Automatisation Workflows n8n',
        'Intégration API',
        'Optimisation des Processus',
        'Solutions Low-Code/No-Code',
        'Automatisation Processus Métier',
        'Intégrations Tierces'
      ],
      tools: [FiCpu, FiCode],
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Découverte',
      description: 'Nous discutons de vos objectifs, défis et vision pour comprendre exactement vos besoins.'
    },
    {
      step: '02',
      title: 'Stratégie',
      description: 'Nous créons un plan sur mesure avec des jalons clairs, livrables et échéanciers.'
    },
    {
      step: '03',
      title: 'Développement',
      description: 'Nous donnons vie à la solution avec des mises à jour régulières et une communication transparente.'
    },
    {
      step: '04',
      title: 'Livraison & Support',
      description: 'Lancement réussi de votre projet avec support continu et optimisation.'
    }
  ]

  return (
    <>
      <SEO 
        title="Nos Services - Data Science, Développement Web & Marketing Digital | Daryl"
        description="Services professionnels en Data Science & IA, Développement Web Full-Stack, Marketing Digital, Business Intelligence et Création de Contenu. Construisons ensemble quelque chose d'extraordinaire."
        keywords="services data science, consulting IA, développement web, marketing digital, services SEO, business intelligence, power BI, création contenu, marketing réseaux sociaux, France"
      />
      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="py-20 gradient-bg">
          <div className="container-custom text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Des Services Qui Génèrent des Résultats</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des insights data-driven aux expériences digitales époustouflantes, nous offrons des solutions complètes 
              qui propulsent votre entreprise à l'ère digitale.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  id={service.id}
                  className="card p-8 hover:transform hover:-translate-y-2 scroll-mt-24"
                >
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                    <service.icon className="text-3xl text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-2">{service.title}</h2>
                  <p className="text-primary-600 font-semibold mb-4">{service.tagline}</p>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Ce que nous offrons :</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">Outils & Tech :</span>
                    <div className="flex gap-3">
                      {service.tools.map((Tool, idx) => (
                        <Tool key={idx} className="text-2xl text-gray-700" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 gradient-bg">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="section-title">Notre Processus</h2>
              <p className="text-xl text-gray-600">Une méthode éprouvée pour délivrer des résultats exceptionnels</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-3xl font-bold text-gradient">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-2xl p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Prêt à Commencer ?</h2>
              <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
                Discutons de votre projet et créons ensemble une solution qui dépasse vos attentes. 
                Sans engagement, juste une conversation amicale sur vos objectifs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="bg-white text-primary-700 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Nous Contacter
                </Link>
                <Link to="/blog" className="border-2 border-white text-white hover:bg-white hover:text-primary-700 font-semibold py-4 px-8 rounded-lg transition-all duration-300">
                  Lire Nos Success Stories
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Services
