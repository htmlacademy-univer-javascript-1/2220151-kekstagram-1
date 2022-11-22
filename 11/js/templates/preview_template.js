import {Template} from './template.js';


const PREVIEW = `
<a href="#" class="picture" data-post-id={{id}}>
  <img class="picture__img" src="{{url}}" width="182" height="182" alt="Случайная фотография">
  <p class="picture__info">
    <span class="picture__comments">{{comments.length}}</span>
    <span class="picture__likes">{{likes}}</span>
  </p>
</a>`;
const previewTemplate = new Template(PREVIEW);


export {previewTemplate};
