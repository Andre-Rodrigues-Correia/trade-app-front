const state = {
    groups: []
};

const mutations = {
    SET_GROUPS(state, groups){
        state.groups = groups;
    },
    ADD_GROUP(state, group){
        state.groups.push(group);
    },
    UPDATE_GROUP(state, updatedGroup) {
        const index = state.groups.findIndex(group => group._id === updatedGroup._id);
        if (index !== -1) {
          state.groups.splice(index, 1, updatedGroup);
        }
      },
    REMOVE_GROUP(state, groupId) {
        state.groups = state.groups.filter(group => group._id !== groupId);
    }
}

const actions = {
    async setGroups({ commit }, groups){
        try {
            commit('SET_GROUPS', groups);
        } catch (error) {
            console.error('Error in set groups', error);
        }
    },
    async addGroup({ commit }, group){
        //const newTrade = await groupService.createTrade(group)
        const newTrade = group;
        commit('ADD_GROUP', newTrade)
    },
    async updateGroup({ commit }, updatedTrade){
        //const updatedTrade = await groupService.updateTrade(group)
        commit('UPDATE_GROUP', updatedTrade)
      },
    async removeGroup({ commit }, groupId) {
        try {
          // await groupService.removeTrade(groupId);    
          commit('REMOVE_GROUP', groupId);
        } catch (error) {
          console.error('Error removing group:', error);
          throw error;
        }
      }
}

export default {
namespaced: true,
  state,
  mutations,
  actions,
};