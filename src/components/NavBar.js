import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql, Link, useStaticQuery } from 'gatsby';

import './NavBar.scss';

export default function NavBar() {
  const data = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          gatsbyImageData(height: 66, layout: CONSTRAINED)
        }
      }
    }
  `);

  return (
    <header>
      <Navbar className='navbar-light bg-light' expand='lg' fixed='top'>
        <Container className='px-lg-5' fluid>
          <Navbar.Collapse className='order-lg-1 order-3 navigation-menu'>
            <Nav className='align-items-lg-center me-auto'>
              <NavDropdown title='About Us' id='about-nav-dropdown'>
                <NavDropdown.Item as={Link} to='/about'>
                  Our Story
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/about/experience'>
                  Experience the Bakery
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/about/production'>
                  Artisanal Production
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/about/franchising'>
                  Franchising
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/careers'>
                  Career Opportunities
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to='/workshops'>
                Workshops
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Brand className='order-1 order-lg-2 me-lg-0' as={Link} to='/'>
            <GatsbyImage
              image={data.file.childImageSharp.gatsbyImageData}
              alt='Sourdough Artisan Bread &amp; Coffee'
            />
          </Navbar.Brand>
          <Navbar.Toggle
            className='order-2 custom-toggler'
            aria-expanded='false'
            aria-label='Toggle navigation'
            aria-controls='navigation-menu'
            data-bs-toggle='collapse'
            data-bs-target='.navigation-menu'
          />

          <Navbar.Collapse className='order-lg-3 order-4 navigation-menu'>
            <Nav className='align-items-lg-center ms-auto'>
              <Nav.Item as='li'>
                <Nav.Link as={Link} to='/basket'>
                  <i className='bi-basket d-none d-lg-inline' />
                  <span className='d-inline d-lg-none'>My Cart</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as='li'>
                <Button
                  as={Link}
                  className='d-block d-lg-inline-block'
                  to='/order'
                  variant='primary'
                >
                  Order Now
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
