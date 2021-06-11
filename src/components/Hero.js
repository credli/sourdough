import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'gatsby';

import './Hero.scss';
import PreviewCompatibleImage from './PreviewCompatibleImage';

function Hero({ interval = 3000, items, className }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={activeIndex}
      onSelect={handleSelect}
      className={className}
      fade
    >
      {items.map((item, index) => {
        return (
          <Carousel.Item key={index}>
            <PreviewCompatibleImage
              className='item-image'
              image={item.image}
              style={{ height: 700, width: '100%' }}
              alt={item.title}
              background
            />
            <Carousel.Caption>
              <div className='content'>
                <h1 className='display-5'>{item.title}</h1>
                {item.subtitle && <p>{item.subtitle}</p>}
                {item.actions &&
                  item.actions.map((action, index) =>
                    typeof action.action === 'function' ? (
                      <Button key={index} size='lg' onClick={action.action}>
                        {action.caption}
                      </Button>
                    ) : (
                      <Link
                        key={index}
                        className={`btn btn-block shadow btn-${
                          action.actionType ?? 'primary'
                        }`}
                        to={action.action}
                      >
                        {action.caption}
                      </Link>
                    )
                  )}
              </div>
            </Carousel.Caption>
            <svg xmlns='http://www.w3.org/2000/svg' version='1.1'>
              <defs>
                <filter id='blur'>
                  <feGaussianBlur stdDeviation='5' />
                </filter>
              </defs>
            </svg>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

const ImagePropType = PropTypes.shape({
  childImageSharp: PropTypes.shape({
    gatsbyImageData: PropTypes.object.isRequired,
  }).isRequired,
});

const ActionButtonPropType = PropTypes.shape({
  caption: PropTypes.string.isRequired,
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  actionType: PropTypes.oneOf(['primary', 'secondary']),
});

Hero.propTypes = {
  className: PropTypes.string,
  interval: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: ImagePropType.isRequired,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      actions: PropTypes.arrayOf(ActionButtonPropType),
    })
  ).isRequired,
};

export default Hero;
