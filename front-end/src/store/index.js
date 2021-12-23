import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    imagePath: null,
  },
  mutations: {
    setImagePath(state, path) {
      state.imagePath = path;
    },
  },
  actions: {
    setImagePath({ commit }, path) {
      commit("setImagePath", path);
    },
  },
  modules: {
    getImagePath(state) {
      return state.imagePath;
    },
  },
});
