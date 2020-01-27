import Posts from '../../repository/posts';

const PAGE_LIMIT = 8;

const state = {
    posts: [],
};

const getters = {
    getPosts: state => params => {
        let allParams = Object.assign({page: 1, limit: PAGE_LIMIT}, params);

        return state.posts.slice((allParams.page - 1) * allParams.limit, allParams.page * allParams.limit);
    },
    totalPosts: state => state.posts.length,
    pageCount: (state, getters) => Math.ceil(getters.totalPosts / PAGE_LIMIT),
};

const mutations = {
    addPosts(state, posts) {
        state.posts = state.posts.concat(posts);
    },
    addPost(state, post) {
        state.posts.unshift(post);
    }
};

const actions = {
    async fetchPosts({commit}) {
        const {data: posts} = await Posts.fetchPosts();
        commit('addPosts', posts);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}