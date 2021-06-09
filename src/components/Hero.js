import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { getImage } from 'gatsby-plugin-image';
import { BgImage } from 'gbimage-bridge';
import cn from 'classnames';
import { Link } from 'gatsby';

import './Hero.scss';

function Hero({ interval = 3000, items, className }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Carousel className={className} fade>
      {items.map((item, index) => {
        const pluginImage = getImage(item.image);
        const backgroundFluidImageStack = [
          pluginImage,
          `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5))`,
        ].reverse();

        return (
          <Carousel.Item key={index}>
            <BgImage
              style={{ height: '700px', width: '100%' }}
              image={backgroundFluidImageStack}
              alt={item.title}
            />
            <Carousel.Caption>
              <h5>{item.title}</h5>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
    // <div
    //   id='heroCarousel'
    //   ref={carouselRef}
    //   data-bs-ride='carousel'
    //   className={`carousel slide ${className}`}
    // >
    //   <div className='carousel-indicators'>
    //     {items.map((item, index) => (
    //       <button
    //         key={index}
    //         type='button'
    //         data-bs-target='#heroCarousel'
    //         data-bs-slide-to={`${activeIndex}`}
    //         aria-current={index === activeIndex ? 'true' : 'false'}
    //         className={cn(index === activeIndex && 'active')}
    //       ></button>
    //     ))}
    //   </div>
    //   <div className='carousel-inner'>
    //     {items.map((item, index) => {
    //       const pluginImage = getImage(item.image);
    //       const backgroundFluidImageStack = [
    //         pluginImage,
    //         `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))`,
    //       ].reverse();

    //       return (
    //         <div
    //           key={index}
    //           className={cn('carousel-item', index === activeIndex && 'active')}
    //         >
    //           <BgImage
    //             image={backgroundFluidImageStack}
    //             className='d-block w-100'
    //             alt={item.title || 'Hero image'}
    //           />
    //           {item.title && (
    //             <div className='carousel-caption d-none d-lg-block'>
    //               <h5>{item.title}</h5>
    //               {item.subtitle && <p>{item.subtitle}</p>}
    //               {item.actions &&
    //                 item.actions.map((action, index) =>
    //                   typeof action.action === 'function' ? (
    //                     <button type='button' onClick={action.action}>
    //                       {action.caption}
    //                     </button>
    //                   ) : (
    //                     <Link to={action.action}>{action.caption}</Link>
    //                   )
    //                 )}
    //             </div>
    //           )}
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
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
