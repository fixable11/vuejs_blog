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
        const {data: posts} = await axios.get('https://jsonplaceholder.typicode.com/posts');
        commit('addPosts', posts)
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}