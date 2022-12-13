import {getPosts} from './data/fakedata.js';
import {Gallery} from './photos/gallery.js';
import {UploadForm} from './upload/upload-form.js';


const main = () => {

  const uploadForm = new UploadForm();
  uploadForm.addImageUploadEventListener();

  const posts = getPosts();

  const gallery = new Gallery(posts);
  gallery.show().addEventListeners();


  // getPosts().then((posts) => {
  //   const gallery = new Gallery(posts);
  //   gallery.show().addEventListeners();
  //   //eslint-disable-next-line
  // }).catch(() => console.error('request failed'));
};

main();
