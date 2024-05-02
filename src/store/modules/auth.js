const state = {
    isAuthenticated: false
};

const mutations = {
    SET_AUTH(state, status){
        state.isAuthenticated = status;
    }
}

const actions = {
    async setAuth({ commit }, status){
        try {
            commit('SET_AUTH', status);
        } catch (error) {
            console.error('Error in set auth', error);
        }
    }
}

export default {
namespaced: true,
  state,
  mutations,
  actions,
};