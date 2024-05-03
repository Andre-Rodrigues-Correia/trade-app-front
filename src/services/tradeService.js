import axios from '@/plugins/axios';
import groups from '../localDatabase/groups.json'
import subscriptions from '../localDatabase/subscriptions.json'
import users from '../localDatabase/users.json'
import userService from './userService';
import { config } from '@fortawesome/fontawesome-svg-core';

// let BASE_URL = import.meta.env.VITE_API_URL_PROD
let BASE_URL = 'http://andrerodriguescorreia.com.br:21184'

// if(import.meta.env.VITE_ENVIONMENT == 'staging'){
//     BASE_URL = import.meta.env.VITE_API_URL_STAGING
// }

BASE_URL = `${BASE_URL}/trade`

const tradeService = {

    createTrade: async (trade) => {
      const token = userService.getToken();
        const config = {
            headers: {
                Authorization: token,
              },
          }

      const response = await axios.post(BASE_URL, trade, config)

    },

    getTradeById: async (groupId) => {
      const token = userService.getToken();
      const config = {
          headers: {
              Authorization: token,
            },
        }

      const response = await axios.get(`${BASE_URL}/${groupId}`, config)

      return response.data.message
    },

    updateTrade: async function (trade) {
      const token = userService.getToken();
        const config = {
            headers: {
                Authorization: token,
              },
          }

      const response = await axios.put(`${BASE_URL}/${trade._id}`, trade, config)
      return response.data.message
    },

    deleteTrade: async function (tradeId){
      const token = userService.getToken();
        const config = {
            headers: {
                Authorization: token,
              },
          }
      const response = await axios.delete(`${BASE_URL}/${tradeId}`, config)
      return response.data.message
    },

    getGroupTradesById: async (groupId) => {
      const token = userService.getToken();
      const config = {
          headers: {
              Authorization: token,
            },
        }
      const response = await axios.get(`${BASE_URL}/${groupId}/group`, config)

      return response.data.message
    },


}

export default tradeService;