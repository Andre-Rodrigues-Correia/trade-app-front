import groups from '../localDatabase/groups.json'
import subscriptions from '../localDatabase/subscriptions.json'
import users from '../localDatabase/users.json'
import userService from './userService';
//import axios from 'axios';
import axios from '@/plugins/axios';

//let BASE_URL = import.meta.env.VITE_API_URL_PROD
let BASE_URL = 'http://andrerodriguescorreia.com.br:21184'

// if(import.meta.env.VITE_ENVIONMENT == 'staging'){
//     BASE_URL = import.meta.env.VITE_API_URL_STAGING
// }

BASE_URL = `${BASE_URL}/group`

const gorupService = {


    verifyUserIsOwnerGroup: async function (groupId, userId) {

      const token = userService.getToken();

        const config = {
          headers: {
              Authorization: token,
            },
        }

        const response = await axios.get(`${BASE_URL}/${groupId}/${userId}`, config);

        console.log(response)

        return response.data.message.isOwner;
      },

      getGroupById: async function (groupId) {
        const token = userService.getToken();

        const config = {
          headers: {
              Authorization: token,
            },
        }
        const response = await axios.get(`${BASE_URL}/${groupId}/group`, config);
        const group = response.data.message;
        console.log(group)
        if(group) {
          console.log(group)
          return group
        }

        return false
      },

      updateGroup: async function (group){
        const token = userService.getToken();

        const config = {
          headers: {
              Authorization: token,
            },
        }

        const response = await axios.put(`${BASE_URL}/${group._id}`, group, config)
        console.log(response);
        return response.data.message
      },

      createGroup: async (group) => {
        const token = userService.getToken();
        const config = {
          headers: {
              Authorization: token,
            },
        }
        const response = await axios.post(BASE_URL, group, token)
      },

      getGroupsByOwnerId: async(id) => {
        const token = userService.getToken();

        const config = {
          headers: {
              Authorization: token,
            },
        }

        console.log(id)
        const response = await axios.get(`${BASE_URL}/${id}`, config);
        console.log(response);
        return response.data.message;
      },

      getAllGroups: async() => {

        const token = userService.getToken();

        const config = {
          headers: {
              Authorization: token,
            },
        }

        const response = await axios.get(BASE_URL, config);
        console.log(response);
        return response.data.message;
      },

      

}

export default gorupService;