import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { StaticImage } from 'gatsby-plugin-image';
import useSiteMetadata from '../hooks/useSiteMetadata';
import { footer, social, logo } from './Footer.module.scss';

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
    <div className={footer}>
      <Container>
        <Row className='py-4'>
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
            <StaticImage
              className={`${logo} my-3`}
              src='../../static/img/logo.png'
              alt='Sourdough'
            />
            <div className='py-3 small'>2021&reg; Copyright {company}</div>
          </Col>

          <Col xs={12} lg={4}>
            <h5>Contact us</h5>
            <hr />
            <ul className='list-unstyled'>
              <li>
                <i className='bi-telephone me-2' />
                <a href={`tel:${phone}`}>{phone}</a>
              </li>
              <li>
                <i className='bi-phone me-2' />
                <a href={`tel:${mobile}`}>{mobile}</a>
              </li>
              <li>
                <i className='bi-envelope me-2' />
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <i className='bi-clock me-2' />
                <span>{openingHours}</span>
              </li>
              <li>
                <i className='bi-geo-alt me-2' />
                <span>
                  {street}, {city}, {region} - {country}
                </span>
              </li>
            </ul>
          </Col>

          <Col xs={12} lg={4}>
            <h5>Check out more</h5>
            <hr />
            <ul className='list-unstyled'>
              <li>Career Opportunities</li>
              <li>Privacy Policy</li>
              <li>General Conditions of Sale, Delivery, and Payments</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
