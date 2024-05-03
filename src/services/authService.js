import users from '../localDatabase/users.json'
import userService from './userService';
import axios from '@/plugins/axios';

// let BASE_URL = import.meta.env.VITE_API_URL_PROD
let BASE_URL = 'http://andrerodriguescorreia.com.br:21184'

// if(import.meta.env.VITE_ENVIONMENT == 'staging'){
//     BASE_URL = import.meta.env.VITE_API_URL_STAGING
// }

BASE_URL = `${BASE_URL}/auth`


const authService = {

    getPayloadToken: (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        return payload
    },

    logout: function () {
        localStorage.removeItem('token')
    },

    authenticate: async function (mail, password) {


        const user = {
            mail: mail,
            password: password
        }

        try {
            const response = await axios.post(`${BASE_URL}/login`, user);

            const token = response.data.message;



            localStorage.setItem('token', token);

            const userInfos = this.getPayloadToken(token);



            return userInfos;
        } catch (error) {
            console.error('Error in login');
            throw error
        }
    },

    checkAuthenticatedUser: () => {
        //realizar tratativas
        if(userService.getToken()){
            return true
        }

        false
    },

}

export default authService;