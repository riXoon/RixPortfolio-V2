import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name = 'Erickson Guhilde', type = 'website', image = 'https://erixon.dev/src/assets/rix-favicon.png' }) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      
      {/* End standard metadata tags */}

      {/* Open Graph / Facebook tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      {/* End Open Graph tags */}

      {/* Twitter tags */}
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content={type === 'article' ? 'summary_large_image' : 'summary'} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
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
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
