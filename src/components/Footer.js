import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { graphql, useStaticQuery } from 'gatsby';
import useSiteMetadata from '../hooks/useSiteMetadata';
import { footer, social } from './Footer.module.scss';

export default function Footer() {
  const {
    company,
    social: { instagram, facebook, twitter },
    email,
    phone,
    mobile,
    address: { street, city, region, country },
    openingHours,
  } = useSiteMetadata();

  return (
    <footer className={footer}>
      <Container fluid>
        <Row className='py-4 px-lg-5'>
          <Col xs={12} lg={4}>
            <h5>Check out more</h5>
            <hr />
            <ul className='list-unstyled'>
              <li>Career Opportunities</li>
              <li>Privacy Policy</li>
              <li>General Conditions of Sale, Delivery, and Payments</li>
            </ul>
          </Col>

          <Col xs={12} lg={4}>
            <h5>Contact us</h5>
            <hr />
            <ul className='list-unstyled'>
              <li>
                <i className='bi-telephone me-1' />
                <a href={`tel:${phone}`}>{phone}</a>
              </li>
              <li>
                <i className='bi-envelope me-1' />
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            </ul>
          </Col>

          <Col xs={12} lg={4}>
            <div className={`${social} d-flex`}>
              <OutboundLink className='nav-link' href={instagram}>
                <i className='bi-instagram' />
              </OutboundLink>
              <OutboundLink className='nav-link' href={facebook}>
                <i className='bi-facebook' />
              </OutboundLink>
              <OutboundLink className='nav-link' href={twitter}>
                <i className='bi-twitter' />
              </OutboundLink>
            </div>
            <div className='py-3 small'>2021&reg; Copyright {company}</div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
