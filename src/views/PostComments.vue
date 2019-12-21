<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-md-2 justify-content-center">
            <post :post="post" />
        </div>
        <div class="row">
            <div class="col-md-3  mb-3" v-for="comment in comments">
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
            }
        },
        async created() {
            let postId = this.$route.params.id;
            let {data: post} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            let {data: comments} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            this.post = post;
            this.comments = comments;
        }
    }
</script>

<style scoped>

</style>