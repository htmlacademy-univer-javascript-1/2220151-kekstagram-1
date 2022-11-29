import {getPosts} from './data/data.js';
import {Gallery} from './photos/gallery.js';
import {UploadForm} from './upload/upload-form.js';


const main = () => {
  const posts = getPosts();

  const gallery = new Gallery(posts);
  gallery.show().addEventListeners();

  const uploadForm = new UploadForm();
  uploadForm.addImageUploadEventListener();
};


main();
