<template>
    <div class="col mb-4">
        <div class="card h-100">
            <img :src="post.photo ? post.photo : 'https://via.placeholder.com/350'" class="card-img-top" alt="...">
            <div class="card-body">
                <slot name="postView">
                    <h5 class="card-title">{{ post.title }}</h5>
                </slot>
                <p class="card-text">{{ post.body }}</p>
            </div>
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