<template>
    <li class="list-group-item text-left" >
        <div class="row justify-content-center row-cols-md-2 row-cols-1">
            <div class="col-xs-2 col-md-2 justify-content-center align-items-start d-flex">
                <img src="http://placehold.it/80" class="img-circle img-responsive" alt="" />
            </div>
            <div class="col-xs-10 col-md-10">
                <div>
                    <div class="font-weight-bold">{{ comment.name }}</div>
                    <div class="mic-info">
                        By: <a href="#">{{ comment.email }}</a>
                    </div>
                </div>
                <div class="comment-text">
                    {{ comment.body }}
                </div>
                <div class="action d-flex justify-content-start">
                    <button type="button" class="btn btn-primary btn-xs" title="Edit">
                        <font-awesome-icon icon="pencil-alt" />
                    </button>
                    <button type="button" class="btn btn-danger btn-xs ml-2" title="Delete">
                        <font-awesome-icon icon="trash" />
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
        created() {
        }
    }
</script>

<style scoped>

</style>