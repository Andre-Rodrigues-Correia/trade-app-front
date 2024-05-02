import groups from '../localDatabase/groups.json'
import users from '../localDatabase/users.json'
import axios from '@/plugins/axios';

// let BASE_URL = import.meta.env.VITE_API_URL_PROD
let BASE_URL = 'http://andrerodriguescorreia.com.br:21184'

// if(import.meta.env.VITE_ENVIONMENT == 'staging'){
//     BASE_URL = import.meta.env.VITE_API_URL_STAGING
// }

BASE_URL = `${BASE_URL}/user`

const userService = {

    getToken: function() {
        return localStorage.getItem('token');
    },

    getPayloadToken: (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        return payload
    },

    getUserById: async function(userId) {
        const token = this.getToken()
        const config = {
            headers: {
                Authorization: token,
              },
          }
        try {
            const response = await axios.get(`${BASE_URL}/${userId}`, config);
            console.log(response)
            return response.data.message;     
        } catch (error) {
            console.error(error);
            throw error
        }

    },

    createNewUser: async (user) => {
        
        try {
            console.log(user)
            const response = await axios.post(BASE_URL, user);
            return response.data.message;    
        } catch (error) {
            console.error(error);
            throw error
        }
    },

    updateUser: async function (user) {
        const token = this.getToken()
        const config = {
            headers: {
                Authorization: token,
              },
          }
        const response = await axios.put(`${BASE_URL}/${user._id}`, user, config)
        console.log(response);
        return response.data.message
    },

    getAllUsers: async function (){
        const token = this.getToken()
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

export default userService;