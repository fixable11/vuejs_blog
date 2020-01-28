<template>
    <div class="home">
        <div class="container">
            <div class="row row-cols-1 row-cols-md-4">
                <post v-for="post in getPosts(currentPage)" :post="post" :key="post.id">
                    <template v-slot:postView>
                        <router-link class="card-title" :to="{ name:'postView', params: {id: post.id}}">{{post.title}}</router-link>
                    </template>
                </post>
            </div>
            <paginate
                :value="page"
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
    import Post from "../components/post/Post";
    const { mapState, mapActions, mapGetters } = createNamespacedHelpers('posts');

    export default {
        name: 'home',
        components: {Post},
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.changePage(+vm.$route.query.page || 1);
            })
        },
        data () {
            return {
                postsLimit: 8,
                posts: [],
                loaded: false,
                page: 1,
            }
        },
        async created() {

        },
        methods: {
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
                'pageCount',
                'totalPosts',
                'getPosts'
            ]),
            currentPage() {
                return this.page;
            }
        }
    }
</script>

<style scoped lang="scss">

</style>