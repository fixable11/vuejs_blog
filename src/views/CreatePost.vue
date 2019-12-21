<template>
    <div class="container">
        <div class="row text-left mt-5 justify-content-center">
            <form class="col-md-6 col-12" >
                <div class="form-group">
                    <label for="post">Post name</label>
                    <input v-model="form.title" id="post" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="desc">Body</label>
                    <textarea v-model="form.body" type="text" class="form-control" id="desc"/>
                </div>
                <button @click.prevent="onSubmit" type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';

    export default {
        name: "CreatePost",
        data() {
            return {
                form: {
                    title: '',
                    body: '',
                }
            }
        },
        methods: {
            ...mapMutations(['addPost']),
            async onSubmit(event) {
                let {data} = await axios.post('https://jsonplaceholder.typicode.com/posts', this.form);
                this.addPost(data);

                Object.keys(this.form).forEach(key => this.form[key] = '');
            }
        }
    }
</script>

<style scoped>
    textarea {
        height: 150px;
    }
</style>