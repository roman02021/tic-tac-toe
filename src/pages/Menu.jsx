import React from 'react';
import '../styles/styles.css';

export default function Menu(props) {
  const { children } = props;
  console.log(children);
  return <section className='menu'>
      {children}
  </section>;
}
