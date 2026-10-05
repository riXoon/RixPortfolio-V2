import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name = 'Erickson Guhilde', type = 'website', image = 'https://erixon.dev/og-image.jpg' }) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='author' content={name} />
      <meta name='robots' content='index, follow' />
      <link rel='canonical' href={window.location.href} />
      
      {/* End standard metadata tags */}

      {/* Open Graph / Facebook tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={window.location.href} />
      {/* End Open Graph tags */}

      {/* Twitter tags */}
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content={type === 'article' ? 'summary_large_image' : 'summary'} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      {/* End Twitter tags */}

      {/* JSON-LD Schema */}
      <script type='application/ld+json'>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          'name': name,
          'url': 'https://erixon.dev',
          'jobTitle': 'Frontend Developer',
          'worksFor': {
            '@type': 'Organization',
            'name': 'Freelance'
          },
          'sameAs': [
            'https://www.github.com/riXoon',
            'https://www.linkedin.com/in/erickson-guhilde/',
            'https://www.tiktok.com/@rixdev'
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
