<template>
    <div class="home">
        <div class="container">
            <div class="row row-cols-1 row-cols-md-4">
                <post v-for="post in posts" :post="post">
                    <template v-slot:commentsLink>
                        <router-link :to="{ name:'postComments', params: {id: post.id}}">Comments</router-link>
                    </template>
                </post>
            </div>
            <paginate
                :page-count="pageCount"
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
    import { createNamespacedHelpers } from 'vuex';
    import Post from "../components/Post";

    const { mapState, mapActions, mapGetters } = createNamespacedHelpers('posts');

    export default {
        name: 'home',
        components: {Post},
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.changePage(1);
            })
        },
        data () {
            return {
                postsLimit: 8,
                posts: [],
                currentPage: 1,
                loaded: false,
            }
        },
        async created() {
            let page = this.$route.query.page || 1;
            this.currentPage = page;

            if (this.loaded === false) {
                await this.fetchPosts();
                this.loaded = true;
                this.updatePosts(page);
            }
        },
        methods: {
            ...mapActions(['fetchPosts']),
            changePage(page) {
                this.currentPage = page;
                this.updatePosts(page);
            },
            updatePosts(page) {
                this.posts = this.getPosts({page, limit: this.postsLimit});
            },
            goToPage(page) {
                this.$router.push('?page=' + page);
                this.changePage(page);
            },
        },
        computed: {
            ...mapGetters([
                'pageCount',
                'totalPosts',
                'getPosts'
            ]),
        }
    }
</script>

<style scoped lang="scss">

</style>