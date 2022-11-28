import {Template} from './template.js';


const COMMENT_HTML = `
<li class="social__comment">
    <img
        class="social__picture"
        src="{{avatar}}"
        alt="{{name}}"
        width="35" height="35">
    <p class="social__text">{{message}}</p>
</li>`;
const commentTemplate = new Template(COMMENT_HTML);


export {commentTemplate};
