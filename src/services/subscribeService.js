import users from '../localDatabase/users.json'
import userService from './userService';
import axios from '@/plugins/axios';


// let BASE_URL = import.meta.env.VITE_API_URL_PROD
let BASE_URL = 'http://andrerodriguescorreia.com.br:21184'

// if(import.meta.env.VITE_ENVIONMENT == 'staging'){
//     BASE_URL = import.meta.env.VITE_API_URL_STAGING
// }

BASE_URL = `${BASE_URL}/subscription`

const subscribeService = {

    addNewSubscription: async function (subscription) {
        const token = userService.getToken();
        const config = {
            headers: {
                Authorization: token,
              },
          }

        try {
            const response = await axios.post(`${BASE_URL}`, subscription, config);

        
            console.log(response)
            return response.data.message;
        } catch (error) {
            console.error('Error in login');
            throw error
        }
    },

    getSubscribesForGroupId: async function(groupId){
        const token = userService.getToken();
        const config = {
            headers: {
                Authorization: token,
              },
          }

        try {
            const response = await axios.get(`${BASE_URL}/${groupId}`, config)
            console.log(response);
            return response.data.message;
        }catch( error ){
            console.error('Error in getSubscribesForGroupId');
            throw error
        }

    },

    updateSubscripion: async function (subscription){
        const token = userService.getToken();
        const config = {
            headers: {
                Authorization: token,
              },
          }
        const response = await axios.put(`${BASE_URL}/${subscription._id}`, subscription, config)
        console.log(response);
        return response.data.message
    },

    deleteSubscripion: async function (subscriptionId){
        const token = userService.getToken();
        const config = {
            headers: {
                Authorization: token,
              },
          }
        const response = await axios.delete(`${BASE_URL}/${subscriptionId}`, config)
        console.log(response);
        return response.data.message
    },

    // verifyUserAccessGroup: async function (groupId, userId){
    //     const token = userService.getToken();
    //     const config = {
    //         headers: {
    //             Authorization: token,
    //           },
    //       }
    //     const response = await axios.get(`${BASE_URL}/${groupId}/${userId}`, config);
    //     console.log(response);

    //     if(response.data.message.length > 0){
    //         return true
    //     }

    //     return false
    //   },

      verifyUserAccessGroup: async function (groupId, userId){
        const token = userService.getToken();
        const config = {
            headers: {
                Authorization: token,
              },
          }
        const response = await axios.get(`${BASE_URL}/${groupId}/${userId}`, config);
          console.log(response)
        return response.data.message
      },




}

export default subscribeService;