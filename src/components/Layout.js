import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Alert, Button } from 'react-bootstrap';

import NavBar from './NavBar';
import Footer from './Footer';

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

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/static/img/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          href='/static/img/favicon-32x32.png'
          sizes='32x32'
        />
        <link
          rel='icon'
          type='image/png'
          href='/static/img/favicon-16x16.png'
          sizes='16x16'
        />

        <link
          rel='mask-icon'
          href='/static/img/safari-pinned-tab.svg'
          color='#ff4400'
        />

        <meta name='theme-color' content='#fff' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
      </Helmet>
      <header className={header}>
        <NavBar />
      </header>
      {/* {data.settingsJson.announcement.visible && (
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
      )} */}
      <main className={main}>{children}</main>
      <footer className={footer}>
        <Footer />
      </footer>
    </div>
  );
}
