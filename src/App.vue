<template>
    <div id="app">
        <Navigation/>
        <router-view/>
    </div>
</template>

<script>
    import Navigation from "./components/Navigation";
    import { createNamespacedHelpers } from 'vuex';
    const { mapState, mapActions, mapGetters } = createNamespacedHelpers('posts');

    export default {
        components: { Navigation },
        data() {
            return {

            }
        },
        async created() {
            await this.fetchPosts();
        },
        methods: {
            ...mapActions(['fetchPosts']),
        }
    }
</script>

<style>
    @import "../src/assets/scss/app.scss";
</style>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
