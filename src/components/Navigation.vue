<template>
    <div id="nav">
        <router-link :to="{ name:'home' }">Home</router-link> |
        <router-link :to="{ name:'createPost'}">Add post</router-link>
    </div>
</template>

<script>
    export default {
        name: "Navigation"
    }
</script>

<style scoped>

</style>