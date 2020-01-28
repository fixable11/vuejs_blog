import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import CreatePost from "../views/post/CreatePost";
import PostView from "../views/post/PostView";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/posts/create',
        name: 'createPost',
        component: CreatePost,
    },
    {
        path: '/posts/:id',
        name: 'postView',
        component: PostView,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
