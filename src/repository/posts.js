import Base from "./base";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

class Posts extends Base {
    static fetchPosts() {
        return this.get(POSTS_URL);
    }
}

export default Posts;