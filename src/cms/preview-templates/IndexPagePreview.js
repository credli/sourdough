import React from 'react';
import PropTypes from 'prop-types';

import IndexPageView from '../../templates/views/index-page-view';

function IndexPagePreview({ entry, widgetFor, widgetsFor }) {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return <IndexPageView carousel={data.carousel} pitch={data.pitch} />;
  } else {
    return <div>Loading...</div>;
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default IndexPagePreview;
