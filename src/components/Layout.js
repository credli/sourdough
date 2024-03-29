import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Alert } from 'react-bootstrap';

import NavBar from './NavBar';
import Footer from './Footer';
import CartDrawer from './shop/CartDrawer';

import { contentWrapper, main, header, footer } from './Layout.module.scss';

export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    {
      settingsJson {
        announcement {
          theme
          message
          visible
        }
      }
    }
  `);

  return (
    <div className={contentWrapper}>
      <Helmet>
        <html lang='en' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
      </Helmet>
      <header className={header}>
        <NavBar />
      </header>
      {data.settingsJson.announcement.visible && (
        <Alert
          className='text-center mb-0'
          variant={data.settingsJson.announcement.theme}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: data.settingsJson.announcement.message,
            }}
          />
        </Alert>
      )}
      <main className={main}>{children}</main>
      <footer className={footer}>
        <Footer />
      </footer>
      <CartDrawer />
    </div>
  );
}
