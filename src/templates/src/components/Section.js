import React from 'react';

const Section = ({
  sectionBody,
  title,
}) => (
  <section className='sissi-section'>

    <h3 className='sissi-section__title'>{title}</h3>
    <article
      dangerouslySetInnerHTML={{ __html: sectionBody }}
      className='sissi-section__body'
    />

  </section>
);

export default Section;
