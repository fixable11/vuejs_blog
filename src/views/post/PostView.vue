<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-md-2 justify-content-center">
            <div>
                <post :post="getPost" />
            </div>
        </div>
        <div class="panel-body">
            <ul class="list-group row-cols-1 row-cols-md-2 justify-content-center align-items-center d-flex">
               <post-comment :comment="comment" v-for="comment in getPostComments(page)" :key="comment.id"></post-comment>
            </ul>
        </div>
        <div class="row justify-content-center row-cols-1 row-cols-md-2 mt-3 ml-0 mr-0">
            <paginate
                :value="page"
                :page-count="commentsCount"
                :page-range="3"
                :margin-pages="2"
                :click-handler="goToPage"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'page-item'"
                :page-link-class="'page-link'"
                :prev-link-class="'page-link'"
                :next-link-class="'page-link'"
            >
            </paginate>
        </div>
    </div>
</template>

<script>
    import Post from "../../components/post/Post";
    import PostComment from "../../components/post/PostComment";
    import { createNamespacedHelpers } from 'vuex';
    import loader from "../../mixins/loader";
    const { mapState, mapActions, mapGetters, mapMutations } = createNamespacedHelpers('posts');

    export default {
        components: {Post, PostComment},
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.changePage(+vm.$route.query.page || 1);
            })
        },
        data() {
            return {
                page: 1,
            }
        },
        mixins: [loader],
        async created() {
            this.loadStart();
            let postId = this.$route.params.id;
            await this.fetchPost(postId);
            this.loadEnd();
        },
        methods: {
            ...mapActions([
                'fetchPost'
            ]),
            changePage(page) {
                this.page = page;
            },
            goToPage(page) {
                this.$router.push('?page=' + page);
                this.changePage(page);
            },
        },
        computed: {
            ...mapGetters([
                'getPost',
                'getPostComments',
                'commentsCount'
            ]),
        }
    }
</script>

<style scoped>

</style>