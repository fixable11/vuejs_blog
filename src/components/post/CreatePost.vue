<template>
    <div class="container">
        <ValidationObserver v-slot="{ invalid }">
            <div class="row text-left mt-5 justify-content-center">
                <form class="col-md-6 col-12">
                    <div class="form-group">
                        <ValidationProvider name="title" rules="required" v-slot="{ errors }">
                            <label for="post">Post title</label>
                            <input name="title" v-model="form.title" id="post" type="text" class="form-control">
                            <div class="invalid-feedback d-block">
                                {{ errors[0] }}
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                        <ValidationProvider name="body" rules="required" v-slot="{ errors }">
                            <label for="desc">Body</label>
                            <textarea v-model="form.body" type="text" class="form-control" id="desc"/>
                            <div class="invalid-feedback d-block">
                                {{ errors[0] }}
                            </div>
                        </ValidationProvider>
                    </div>
                    <button @click.prevent="create" :disabled="invalid" type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </ValidationObserver>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapState, mapActions, mapGetters, mapMutations } = createNamespacedHelpers('posts');

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
            ...mapActions([
                'createPost'
            ]),
            async create(event) {
                await this.createPost(this.form);
                toastr.success('Post has been created successfully');
                await Object.keys(this.form).forEach(key => this.form[key] = '');
            }
        }
    }
</script>

<style scoped>
    textarea {
        height: 150px;
    }
</style>