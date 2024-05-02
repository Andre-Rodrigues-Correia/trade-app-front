import tradeService from "@/services/tradeService";

const state = {
    trades: []
};

const mutations = {
    SET_TRADES(state, trades){
        state.trades = trades;
    },
    ADD_TRADE(state, trade){
        state.trades.push(trade);
    },
    UPDATE_TRADE(state, updatedTrade) {
        const index = state.trades.findIndex(trade => trade._id === updatedTrade._id);
        if (index !== -1) {
          state.trades.splice(index, 1, updatedTrade);
        }
      },
    REMOVE_TRADE(state, tradeId) {
        state.trades = state.trades.filter(trade => trade._id !== tradeId);
    }
}

const actions = {
    async setTrades({ commit }, groupId){
        try {
            const trades = await tradeService.getGroupTradesById(groupId);
            commit('SET_TRADES', trades);
        } catch (error) {
            console.error('Error in set trades', error);
        }
    },
    async addTrade({ commit }, trade){
        const newTrade = await tradeService.createTrade(trade);
        commit('ADD_TRADE', newTrade)
    },
    async updateTrade({ commit }, updatedTrade){
        await tradeService.updateTrade(updatedTrade)
        commit('UPDATE_TRADE', updatedTrade)
      },
    async removeTrade({ commit }, tradeId) {
        try {
          await tradeService.deleteTrade(tradeId);    
          commit('REMOVE_TRADE', tradeId);
        } catch (error) {
          console.error('Error removing trade:', error);
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