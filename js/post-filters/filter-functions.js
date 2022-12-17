import {getShuffled} from '../data/data-util.js';


const getDefaultPosts = (posts) => posts;

const getShuffledPosts = (posts) => getShuffled(posts).slice(0, 10);

const getSortedPosts = (posts) => [...posts].sort((post1, post2) => post2.comments.length - post1.comments.length);


export {getDefaultPosts, getShuffledPosts, getSortedPosts};
