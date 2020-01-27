<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-md-2 justify-content-center">
            <post :post="post" />
        </div>
        <div class="row">
            <div class="col-md-3  mb-3" v-for="comment in commentsSlice">
                <div
                    class="card h-100 text-white bg-primary"
                    style="max-width: 18rem;"
                >
                    <div class="card-header">{{ comment.email }}</div>
                    <div class="card-body">
                        <h5 class="card-title">{{ comment.name }}</h5>
                        <p class="card-text">{{ comment.body }}</p>
                    </div>
                </div>
            </div>
        </div>
        <pagination
            @pageChanged="changePage"
            :current-page="currentPage"
            :total-items="comments.length"
            :per-page="commentsLimit"
        />
    </div>
</template>

<script>
    import Post from "../components/Post";

    export default {
        components: {Post},
        name: "PostComments",
        data() {
            return {
                post: {},
                comments: [],
                commentsSlice: [],
                currentPage: 1,
                commentsLimit: 20,
            }
        },
        async created() {
            let page = this.$route.query.page || 1;
            this.currentPage = page;

            let postId = this.$route.params.id;
            let {data: post} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            let {data: comments} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            this.post = post;
            this.comments = comments;
            this.updateComments(page);
        },
        methods: {
            changePage(page) {
                this.currentPage = page;
                this.updateComments(page);
            },
            updateComments(page) {
                this.commentsSlice = this.comments.slice(
                    (page - 1) * this.commentsLimit, page * this.commentsLimit
                );
            }
        }
    }
</script>

<style scoped>

</style>