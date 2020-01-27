import Posts from '../../repository/posts';

const state = {
    posts: [],
};

const getters = {
    getPosts: state => params => {
        let allParams = Object.assign({page: 1, limit: 8}, params);

        return state.posts.slice((allParams.page - 1) * allParams.limit, allParams.page * allParams.limit);
    },
    totalPosts: state => state.posts.length,
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