const state = {
    user: null
};

const mutations = {
    SET_USER(state, user){
        state.user = user;
    }
}

const actions = {
    async setUser({ commit }, user){
        try {
            commit('SET_USER', user);
        } catch (error) {
            console.error('Error in set user', error);
        }
    }
}

export default {
namespaced: true,
  state,
  mutations,
  actions,
};