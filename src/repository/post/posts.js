import Base from "../base";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';

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
    static async fetchPost(id) {
        let {data: photo} = await this.get(`${PHOTOS_URL}/${id}`);
        let {data: post} = await this.get(`${POSTS_URL}/${id}`);
        post.photo = photo.url;

        return {data: post};
    }
}


export default Posts;