import {TemplateEngine} from './template_engine.js';


const COMMENT = `
<li class="social__comment">
    <img
        class="social__picture"
        src="{{avatar}}"
        alt="{{name}}"
        width="35" height="35">
    <p class="social__text">{{message}}</p>
</li>`;
const commentTemplate = new TemplateEngine(COMMENT);


export {commentTemplate};
