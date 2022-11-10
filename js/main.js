import {getPosts} from './data.js';
import {Gallery} from './photos/gallery.js';


const main = () => {
  const posts = getPosts();
  const gallery = new Gallery(posts);
  gallery.show().addEventListeners();
};


main();
