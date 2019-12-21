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
            <pagination @pageChanged="changePage" :current-page="currentPage" :total-items="totalPosts" :per-page="postsLimit" />
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex';
    import Pagination from "../components/Pagination";
    import Post from "../components/Post";

    export default {
        name: 'home',
        components: {Pagination, Post},
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
                this.posts = this.$store.getters.getPosts({page, limit: this.postsLimit});
            }
        },
        computed: {
            ...mapGetters(['totalPosts']),
            getPosts() {
                return this.$store.getters.getPosts({});
            }
        }
    }
</script>

<style scoped lang="scss">

</style>