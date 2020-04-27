const store = {
    slide: {}
};

const postPageStore = {
    saveTabState: function (state: any) {
        store.slide = state;
    },
    getTabState: function () {
        return store.slide;
    }
};

export default postPageStore;
