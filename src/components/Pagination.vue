<template>
    <nav aria-label="...">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" @click.prevent="goToPage(currentPage - 1)" href="#">Previous</a>
            </li>
            <li
                class="page-item"
                v-for="page in recount"
                :class="{ 'active': page == currentPage}"
            >
                <a
                    class="page-link"
                    :href="'/?page=' + page"
                    @click.prevent="goToPage(page)"
                >
                    {{ page }}
                </a>
            </li>
            <li class="page-item" >
                <a class="page-link" @click.prevent="goToPage(currentPage + 1)" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "Pagination",
        props: ['totalItems', 'perPage', 'currentPage'],
        data() {
            return {
                items: 0,
            }
        },
        created() {

        },
        watch: {
        },
        computed: {
            recount() {
                return Math.round(this.totalItems / this.perPage);
            },
        },
        methods: {
            goToPage(page) {
                if (page < 1 || page > this.recount) {
                    return;
                }

                this.$router.push('/?page=' + page);
                this.$emit('pageChanged', page);
            },
        }
    }
</script>

<style scoped>

</style>