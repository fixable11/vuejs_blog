import Base from "./base";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

class Posts extends Base {
    static fetchPosts() {
        return this.get(POSTS_URL);
    }
    static createPost(data) {
        return this.post(POSTS_URL, data);
    }
    static deletePost(id) {
        return this.post(`${POSTS_URL}/${id}`);
    }
    static updatePost(id, data) {
        return this.put(`${POSTS_URL}/${id}`, data);
    }
    static fetchPost(id) {
        return this.get(`${POSTS_URL}/${id}`);
    }
    static fetchComments(postId) {
        return this.get(`${COMMENTS_URL}/?postId=${postId}`);
    }
}


export default Posts;