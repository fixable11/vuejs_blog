<template>
    <li class="list-group-item text-left w-100">
        <div class="row justify-content-center row-cols-md-2 row-cols-1">
            <div class="col-xs-2 col-md-2 justify-content-center align-items-start d-flex">
                <img src="http://placehold.it/80" class="img-circle img-responsive" alt="" />
            </div>
            <div class="col-xs-10 col-md-10">
                <div>
                    <div
                        class="font-weight-bold"
                        v-show="!editState"
                    >
                        {{ comment.name }}
                    </div>
                    <input type="text" v-show="editState" class="form-control" v-model="name">
                    <div class="mic-info">
                        By: <a href="#">{{ comment.email }}</a>
                    </div>
                </div>
                <div class="comment-text" v-show="!editState">
                    {{ comment.body }}
                </div>
                <textarea v-show="editState" class="form-control" v-model="body"></textarea>
                <div class="action d-flex justify-content-start mt-2">
                    <button
                        v-show="!editState"
                        @click="edit"
                        type="button"
                        class="btn btn-primary btn-xs"
                        title="Edit"
                    >
                        <font-awesome-icon icon="pencil-alt" />
                    </button>
                    <button
                        v-show="editState"
                        @click="cancel"
                        type="button"
                        class="btn btn-danger btn-xs"
                        title="Cancel"
                    >
                        <font-awesome-icon icon="ban" />
                    </button>
                    <button
                        v-show="!editState"
                        @click="remove"
                        type="button"
                        class="btn btn-danger btn-xs ml-2"
                        title="Delete"
                    >
                        <font-awesome-icon icon="trash" />
                    </button>
                    <button
                        v-show="editState"
                        @click="save"
                        type="button"
                        class="btn btn-success btn-xs ml-2"
                        title="Ok"
                    >
                        <font-awesome-icon icon="check" />
                    </button>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "PostComment",
        props: ['comment'],
        data() {
            return {
                editState: false,
                formData: {
                    name: this.comment.name,
                    email: this.comment.email,
                    body: this.comment.body,
                },
            }
        },
        created() {
        },
        methods: {
            edit() {
                this.editState = true;
            },
            cancel() {
                this.editState = false;
            },
            remove() {
                this.$emit('commentDeleted', this.comment.id);
            },
            save() {
                this.$emit('commentChanged', {
                    commentId: this.comment.id,
                    formData: this.formData
                });
                this.editState = false;
            },
        },
        computed: {
            name: {
                set(name) {
                    this.formData.name = name;
                },
                get() {
                    return this.comment.name;
                }
            },
            email: {
                set(email) {
                    this.formData.email = email;
                },
                get() {
                    return this.comment.email;
                }
            },
            body: {
                set(body) {
                    this.formData.body = body;
                },
                get() {
                    return this.comment.body;
                }
            }
        }
    }
</script>

<style scoped>
    textarea {
        min-height: 150px;
    }
</style>