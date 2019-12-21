<template>
    <div class="col mb-4">
        <div class="card h-100">
            <img src="https://via.placeholder.com/350" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">{{ post.body }}</p>
            </div>
            <slot name="commentsLink"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Post",
        props: ['post'],
    }
</script>

<style scoped>

</style>