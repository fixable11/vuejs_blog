import Posts from '../../../repository/post/posts';
import Comments from "../../../repository/post/comments";
import comments from "./comments";


const PAGE_LIMIT = 8;
const COMMENTS_LIMIT = 2;

const state = {
    posts: [],
    post: {
        id: '',
        photo: '',
        title: '',
        body: '',
        comments: [],
    },
};

const getters = {
    getPosts: state => page => {
        let allParams = Object.assign({page: 1, limit: PAGE_LIMIT}, {page});

        return state.posts.slice((allParams.page - 1) * allParams.limit, allParams.page * allParams.limit);
    },
    totalPosts: state => state.posts.length,
    pageCount: (state, getters) => Math.ceil(getters.totalPosts / PAGE_LIMIT),
    commentsCount: (state, getters) => Math.ceil(getters.getPost.comments.length / COMMENTS_LIMIT),
    getPost: (state) => state.post,
    getPostComments: state => page => {
        let allParams = Object.assign({page: 1, limit: COMMENTS_LIMIT}, {page});

        return state.post.comments.slice((allParams.page - 1) * allParams.limit, allParams.page * allParams.limit);
    },
};

const mutations = {

    /**
     * Load all posts to state.
     *
     * @param state
     * @param posts
     */
    setPosts(state, posts) {
        state.posts = posts;
    },

    /**
     * Add new post to state.
     *
     * @param state
     * @param post
     */
    addPost(state, post) {
        state.posts.unshift(post);
    },

    /**
     * Set current post.
     *
     * @param state
     * @param post
     */
    setCurrentPost(state, post) {
        Object.assign(state.post, post);
    },

    /**
     * Load post's comments.
     *
     * @param state
     * @param comments
     */
    setPostComments(state, comments) {
        state.post.comments = comments;
    },

    ...comments.mutations,
};

const actions = {

    /**
     * Fetch all posts.
     *
     * @param commit
     * @returns {Promise<void>}
     */
    async fetchPosts({commit}) {
        const {data: posts} = await Posts.fetchPosts();
        commit('setPosts', posts);
    },

    /**
     * Fetch the specific post.
     *
     * @param commit
     * @param dispatch
     * @param postId
     * @returns {Promise<void>}
     */
    async fetchPost({commit, dispatch}, postId) {
        const {data: post} = await Posts.fetchPost(postId);
        commit('setCurrentPost', post);
        await dispatch('fetchPostComments', postId);
    },

    /**
     * Create new post.
     *
     * @param commit
     * @param state
     * @param data
     * @returns {Promise<void>}
     */
    async createPost({commit, state}, data) {
        let {data: post} = await Posts.createPost(data);
        commit('addPost', post);
    },

    /**
     * Fetch post's comments.
     *
     * @param commit
     * @param dispatch
     * @param postId
     * @returns {Promise<void>}
     */
    async fetchPostComments({commit, dispatch}, postId) {
        const {data: comments} = await Comments.fetchComments(postId);
        commit('setPostComments', comments);
    },

    ...comments.actions,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}