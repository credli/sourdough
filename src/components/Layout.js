import React from 'react';
import { Helmet } from 'react-helmet';
import useSiteMetadata from '../hooks/useSiteMetadata';

import NavBar from './NavBar';
import Footer from './Footer';

import { contentWrapper } from './Layout.module.scss';

export default function Layout({ children }) {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <Helmet>
        <html lang='en' />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/img/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          href='/img/favicon-32x32.png'
          sizes='32x32'
        />
        <link
          rel='icon'
          type='image/png'
          href='/img/favicon-16x16.png'
          sizes='16x16'
        />

        <link
          rel='mask-icon'
          href='/img/safari-pinned-tab.svg'
          color='#ff4400'
        />

        <meta name='theme-color' content='#fff' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
      </Helmet>
      <NavBar />
      <main className={contentWrapper}>{children}</main>
      <Footer />
    </>
  );
}
