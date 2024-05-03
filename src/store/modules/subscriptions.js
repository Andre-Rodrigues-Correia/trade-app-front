import subscribeService from "@/services/subscribeService";

const state = {
    subscriptions: []
};

const mutations = {
    SET_SUBSCRIPTIONS(state, subscriptions){
        state.subscriptions = [...subscriptions];
    },
    ADD_SUBSCRIPTION(state, subscription){
        state.subscriptions.push(subscription);
    },
    UPDATE_SUBSCRIPTION(state, updatedSubsription) {
        const index = state.subscriptions.findIndex(sub => sub._id === updatedSubsription._id);
        if (index !== -1) {
          state.subscriptions.splice(index, 1, updatedSubsription);
        }
      },
    REMOVE_SUBSCRIPTION(state, subscriptionId) {
        state.subscriptions = state.subscriptions.filter(sub => sub._id !== subscriptionId);
    }
}

const actions = {
    async setSubscription({ commit }, groupId){
        try {
            const subscriptions = await subscribeService.getSubscribesForGroupId(groupId);
            commit('SET_SUBSCRIPTIONS', subscriptions);
        } catch (error) {
            console.error('Error in set subscriptions', error);
        }
    },
    async addSubscription({ commit }, subscription){
        await subscribeService.addNewSubscription(subscription);
        commit('ADD_SUBSCRIPTION', subscription)
    },
    async updateSubscription({ commit }, updatedSubscription){
        await subscribeService.updateSubscripion(updatedSubscription)
        commit('ADD_SUBSCRIPTION', updatedSubscription)
      },
    async removeSubscription({ commit }, subscriptionId) {
        try {
          await subscribeService.deleteSubscripion(subscriptionId)  
          commit('REMOVE_SUBSCRIPTION', subscriptionId);
        } catch (error) {
          console.error('Error removing subscription:', error);
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