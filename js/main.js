import {getPosts} from './data.js';
import {Gallery} from './photos/gallery.js';
import {UploadForm} from './upload/upload_form.js';


const main = () => {
  const posts = getPosts();

  const gallery = new Gallery(posts);
  gallery.show().addEventListeners();

  const uploadForm = new UploadForm();
  uploadForm.addEventListeners();
};


main();
