require('./src/components/main.scss');
require('bootstrap-icons/font/bootstrap-icons.css');
require('@popperjs/core/dist/umd/popper.min.js');
require('bootstrap/dist/js/bootstrap.min.js');

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    import(`intersection-observer`);
    console.log(`# IntersectionObserver is polyfilled!`);
  }
};
