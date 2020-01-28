<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-md-2 justify-content-center">
            <div>
                <post :post="getPost" />
            </div>
        </div>
        <div class="panel-body">
            <ul class="list-group row-cols-1 row-cols-md-2 justify-content-center align-items-center d-flex">
               <post-comment :comment="comment" v-for="comment in getPostComments" :key="comment.id"></post-comment>
            </ul>
        </div>
    </div>
</template>

<script>
    import Post from "../../components/post/Post";
    import PostComment from "../../components/post/PostComment";
    import { createNamespacedHelpers } from 'vuex';
    const { mapState, mapActions, mapGetters, mapMutations } = createNamespacedHelpers('posts');

    export default {
        components: {Post, PostComment},
        data() {
            return {

            }
        },
        async created() {
            let loader = this.$loading.show({});
            let postId = this.$route.params.id;
            await this.fetchPost(postId);
            loader.hide()
        },
        methods: {
            ...mapActions([
                'fetchPost'
            ]),
        },
        computed: {
            ...mapGetters([
                'getPost',
                'getPostComments'
            ]),
        }
    }
</script>

<style scoped>

</style>