<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-md-2 justify-content-center">
            <div>
                <post :post="getPost" />
            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2 justify-content-center align-items-start mb-3">
            <div class="d-flex justify-content-start">
                <div class="col text-left">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#commentModal">Create</button>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="commentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Create comment</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group text-left">
                            <label>Name</label>
                            <input v-model="newComment.name" class="form-control"/>
                        </div>
                        <div class="form-group text-left">
                            <label>Body</label>
                            <textarea v-model="newComment.body" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="closeCommentModal btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="createNewComment">Create</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <ul class="list-group row-cols-1 row-cols-md-2 justify-content-center align-items-center d-flex">
               <post-comment
                   :comment="comment"
                   v-for="comment in getPostComments(page)"
                   :key="comment.id"
                   @commentChanged="commentChanged"
                   @commentDeleted="commentDeleted"
               ></post-comment>
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
                newComment: {
                    name: '',
                    body: '',
                    email: '',
                }
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
                'fetchPost',
                'updateComment',
                'deleteComment',
                'createComment'
            ]),
            changePage(page) {
                this.page = page;
            },
            goToPage(page) {
                this.$router.push('?page=' + page);
                this.changePage(page);
            },
            async commentChanged({commentId, formData}) {
                await this.updateComment({commentId, formData});
            },
            async commentDeleted({commentId}) {
                await this.deleteComment({commentId});
            },
            async createNewComment() {
                await this.createComment({postId: this.id, formData: this.newComment});
                document.querySelector('.closeCommentModal').click();
                for (let key in this.newComment) {
                    this.newComment[key] = '';
                }
            }
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

<style scoped lang="scss">

</style>