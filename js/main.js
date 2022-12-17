import {getPosts} from './data/api.js';
import {Gallery} from './photos/gallery.js';
import {UploadForm} from './upload/upload-form.js';
import {PostFilter} from './post-filters/post-filter.js';


const showGallery = () => {
  getPosts().then((posts) => {
    if (posts) {
      const gallery = new Gallery(posts);
      gallery.show().addEventListeners();
      const postFilter = new PostFilter();
      postFilter.show();
    }
  });
};


const setupUpload = () => {
  const uploadForm = new UploadForm();
  uploadForm.addImageUploadEventListener();
};


const main = () => {
  setupUpload();
  showGallery();
};

main();
