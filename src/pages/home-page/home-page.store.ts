const store = {
  tab: {}
};

const homePageStore = {
  saveTabState: function (state: any){
    store.tab = state;
  },
  getTabState: function (){
    return store.tab;
  }
};

export default homePageStore;
