let loader = {
    data() {
        return {
            loadingState: {},
        }
    },
    methods: {
        loadStart() {
            this.loadingState = this.$loading.show({
                opacity: 1,
                color: "#007bff",
                height: 100,
                width: 100
            });
        },
        loadEnd() {
            this.loadingState.hide();
        }
    }
};

export default loader;