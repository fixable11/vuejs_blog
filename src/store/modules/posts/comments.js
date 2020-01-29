import Comments from "../../../repository/post/comments";

const mutations = {
    updateComment(state, payload) {
        state.post.comments.forEach(comment => {
            if (comment.id === payload.id) {
                Object.assign(comment, payload);
            }
        });
    },
    addComment(state, payload) {
        state.post.comments.push(payload);
    },
    deleteComment(state, id) {
        let index = state.post.comments.findIndex(comment => comment.id === id);
        state.post.comments.splice(index, 1);
    }
};

const actions = {
    async updateComment({commit}, {commentId, formData}) {
        const {data: comment} = await Comments.updateComment(commentId, formData);
        console.log('update', comment);
        commit('updateComment', comment);
    },
    async createComment({commit}, {formData}) {
        const {data: comment} = await Comments.createComment(formData);
        commit('addComment', comment);
    },
    async deleteComment({commit}, {commentId}) {
        await Comments.deleteComment(commentId);
        commit('deleteComment', commentId);
    }
};

export default {
    actions,
    mutations,
};