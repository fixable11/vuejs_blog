import Base from "../base";

const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

class Comments extends Base {
    static fetchComments(postId) {
        return this.get(`${COMMENTS_URL}/?postId=${postId}`);
    }
    static updateComment(commentId, formData) {
        return this.put(`${COMMENTS_URL}/${commentId}`, formData);
    }
    static deleteComment(commentId) {
        return this.delete(`${COMMENTS_URL}/${commentId}`);
    }
    static createComment(formData) {
        return this.post(`${COMMENTS_URL}`, formData);
    }
}

export default Comments;