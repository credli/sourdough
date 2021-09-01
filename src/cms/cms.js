import CMS from 'netlify-cms-app';
// import uploadcare from 'netlify-cms-media-library-uploadcare';

import IndexPagePreview from './preview-templates/IndexPagePreview';

// CMS.registerMediaLibrary(uploadcare);

CMS.registerPreviewTemplate('indexPage', IndexPagePreview);

CMS.registerEventListener({
  name: 'preSave',
  handler: ({ entry }) => {
    const createdAt = entry.get('data').get('createdAt');
    if (!createdAt) {
      const today = new Date();
      return entry.get('data').set('createdAt', today.toISOString());
    }
  },
});
