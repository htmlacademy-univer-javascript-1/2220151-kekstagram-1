import {Template} from './template.js';


const COMMENT = `
<li class="social__comment">
    <img
        class="social__picture"
        src="{{avatar}}"
        alt="{{name}}"
        width="35" height="35">
    <p class="social__text">{{message}}</p>
</li>`;
const commentTemplate = new Template(COMMENT);


export {commentTemplate};
