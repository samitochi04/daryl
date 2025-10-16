import { useEffect } from 'react'

const SEO = ({ 
  title = 'Daryl - Expert Data Science & IA | Solutions Digitales',
  description = 'Nous créons des solutions innovantes en Data Science, IA et Développement Web. Experts en Machine Learning, Business Intelligence et Marketing Digital.',
  keywords = 'Data Science, IA, Intelligence Artificielle, Machine Learning, Développement Web, Marketing Digital, SEO, Business Intelligence, Power BI, React, Python, France',
  ogImage = 'https://daryl.diversis.site/og-image.jpg',
  url = window.location.href
}) => {
  useEffect(() => {
    // Update title
    document.title = title

    // Update meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: url },
      { property: 'twitter:title', content: title },
      { property: 'twitter:description', content: description },
      { property: 'twitter:image', content: ogImage },
      { name: 'twitter:url', content: url }
    ]

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`
      let element = document.querySelector(selector)
      
      if (element) {
        element.setAttribute('content', content)
      } else {
        element = document.createElement('meta')
        if (name) element.setAttribute('name', name)
        if (property) element.setAttribute('property', property)
        element.setAttribute('content', content)
        document.head.appendChild(element)
      }
    })

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', url)
    } else {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      canonical.setAttribute('href', url)
      document.head.appendChild(canonical)
    }
  }, [title, description, keywords, ogImage, url])

  return null
}

export default SEO
