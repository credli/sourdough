import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { BgImage } from 'gbimage-bridge';

import { imageWrapper, dimmed } from './PreviewCompatibleImage.module.scss';

function PreviewCompatibleImage({
  background = false,
  image,
  alt,
  className = '',
  style = {},
  ...rest
}) {
  if (!!image && typeof image === 'object') {
    if (background) {
      const pluginImage = getImage(image.childImageSharp.gatsbyImageData);
      const backgroundFluidImageStack = [
        pluginImage,
        `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1))`,
      ].reverse();
      return (
        <BgImage
          className={className}
          style={style}
          image={backgroundFluidImageStack}
          alt={alt}
          {...rest}
        />
      );
    } else {
      return (
        <GatsbyImage
          className={className}
          style={style}
          image={image.childImageSharp.gatsbyImageData}
          alt={alt}
          {...rest}
        />
      );
    }
  }

  if (!!image && typeof image === 'string') {
    console.log('image', image);
    console.log('rest', rest);
    return (
      <div
        className={`${imageWrapper} ${
          background ? className + ' ' + dimmed : className
        }`}
      >
        <img style={style} src={image} alt={alt} {...rest} />
      </div>
    );
  }
}

PreviewCompatibleImage.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  background: PropTypes.bool,
};

export default PreviewCompatibleImage;
