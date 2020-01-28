import Posts from '../../repository/posts';

const PAGE_LIMIT = 8;

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
    getPost: (state) => state.post,
    getPostComments: (state) => state.post.comments,
};

const mutations = {
    addPosts(state, posts) {
        state.posts = posts;
    },
    addPost(state, post) {
        state.posts.unshift(post);
    },
    setCurrentPost(state, post) {
        Object.assign(state.post, post);
    },
    setPostComments(state, comments) {
        state.post.comments = comments;
    }
};

const actions = {
    async fetchPosts({commit}) {
        const {data: posts} = await Posts.fetchPosts();
        commit('addPosts', posts);
    },
    async fetchPost({commit, dispatch}, postId) {
        const {data: post} = await Posts.fetchPost(postId);
        commit('setCurrentPost', post);
        await dispatch('fetchPostComments', postId);
    },
    async fetchPostComments({commit, dispatch}, postId) {
        const {data: comments} = await Posts.fetchComments(postId);
        commit('setPostComments', comments);
    },
    async createPost({commit, state}, data) {
        let {data: post} = await Posts.createPost(data);
        commit('addPost', post);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}