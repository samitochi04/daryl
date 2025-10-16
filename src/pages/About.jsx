import { FiAward, FiTarget, FiHeart, FiTrendingUp, FiVideo } from 'react-icons/fi'
import { SiPython, SiReact, SiTailwindcss, SiPowerbi, SiBlender } from 'react-icons/si'
import SEO from '../components/SEO'

const About = () => {
  const journey = [
    {
      icon: FiTarget,
      title: 'Notre Vision',
      description: 'Nous croyons que chaque entreprise mérite d\'exploiter pleinement le potentiel de ses données pour créer de la valeur et accélérer sa croissance digitale.'
    },
    {
      icon: FiHeart,
      title: 'Notre Passion',
      description: 'Nous sommes passionnés par l\'innovation technologique et déterminés à transformer des idées complexes en solutions concrètes et accessibles.'
    },
    {
      icon: FiTrendingUp,
      title: 'Notre Approche',
      description: 'Nous combinons expertise technique, créativité et stratégie data-driven pour offrir des solutions qui génèrent des résultats mesurables.'
    },
    {
      icon: FiAward,
      title: 'Notre Mission',
      description: 'Accompagner les entreprises dans leur transformation digitale en proposant des services de pointe en Data Science, IA, développement web et marketing digital.'
    }
  ]

  const skillCategories = [
    {
      category: 'Data Science & IA',
      icon: SiPython,
      skills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'Analyse de Données', 'Modélisation Statistique']
    },
    {
      category: 'Développement Web',
      icon: SiReact,
      skills: ['React', 'Node.js', 'Full-Stack', 'JavaScript', 'APIs RESTful', 'Bases de Données']
    },
    {
      category: 'Design & Contenu',
      icon: FiVideo,
      skills: ['Blender', 'React Three Fiber', 'DaVinci Resolve', 'Canva', 'AutoCAD', 'Production Vidéo']
    },
    {
      category: 'Business Intelligence',
      icon: SiPowerbi,
      skills: ['Power BI', 'Excel', 'Google Analytics', 'Analyse Métier', 'Visualisation de Données', 'Suivi KPI']
    },
    {
      category: 'Marketing Digital',
      icon: SiTailwindcss,
      skills: ['SEO', 'SEA', 'Stratégie de Contenu', 'Gestion Réseaux Sociaux', 'TikTok', 'Instagram', 'YouTube', 'LinkedIn']
    },
    {
      category: 'Maîtrise Web',
      icon: FiTrendingUp,
      skills: ['Optimisation SEO', 'Web Marketing', 'Google Business', 'Search Console', 'Automatisation n8n', 'Low/No Code']
    }
  ]

  return (
    <>
      <SEO 
        title="À Propos de Daryl - Notre Expertise & Notre Vision"
        description="Découvrez Daryl, votre partenaire en Data Science, IA et marketing digital. Nous transformons vos défis en opportunités avec des solutions innovantes et performantes."
        keywords="data science, intelligence artificielle, développement web, marketing digital, France, agence digitale"
      />
      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="py-20 gradient-bg">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-gradient">Qui Sommes-Nous</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Une équipe passionnée qui transforme vos défis en opportunités digitales. 
                Ensemble, créons l'avenir de votre entreprise.
              </p>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8">
              {journey.map((item, index) => (
                <div key={index} className="card p-8 hover:transform hover:-translate-y-2">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-700 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <item.icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 gradient-bg">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center mb-12">Notre Histoire</h2>
              <div className="card p-12">
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Daryl est née d'une vision simple mais ambitieuse : démocratiser l'accès aux technologies de pointe 
                    en Data Science, Intelligence Artificielle et Marketing Digital. Nous croyons que chaque entreprise, 
                    quelle que soit sa taille, mérite des solutions technologiques performantes et accessibles.
                  </p>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Notre équipe combine expertise technique pointue et compréhension profonde des enjeux business. 
                    Nous ne nous contentons pas de livrer des projets – nous créons des partenariats durables basés 
                    sur la confiance, la transparence et les résultats mesurables.
                  </p>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Que ce soit pour transformer vos données en insights actionnables, créer une présence web impactante, 
                    ou développer une stratégie marketing qui convertit, nous apportons l'expertise et la créativité 
                    nécessaires pour propulser votre croissance.
                  </p>
                  <p className="text-lg font-semibold text-primary-700">
                    Bienvenue chez Daryl – Où l'innovation rencontre la performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <h2 className="section-title text-center mb-16">Nos Compétences</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillCategories.map((category, index) => (
                <div key={index} className="card p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-700 w-12 h-12 rounded-lg flex items-center justify-center">
                      <category.icon className="text-2xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{category.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Link */}
        <section className="py-20 gradient-bg">
          <div className="container-custom">
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Découvrez Nos Réalisations</h2>
              <p className="text-xl text-gray-600 mb-8">
                Consultez notre portfolio pour voir nos projets et l'impact que nous avons créé pour nos clients
              </p>
              <a 
                href="https://samuel.diversis.site/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Voir Notre Portfolio
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About
