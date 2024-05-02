<template>
    <div class="login-container">
      <h2>{{ $t('generic.login')}}</h2>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="email">{{ $t('generic.mail')}}</label>
          <input type="email" id="email" v-model="mail" required>
        </div>
        <div class="form-group">
          <label for="password">{{ $t('generic.password')}}</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">{{ $t('generic.login')}}</button>
        <p class="signup">
            {{ $t('messages.signUpText')  }} <a @click="navigateSignUp" href="">{{  $t('messages.here') }}</a>
        </p>
      </form>
    </div>
  </template>
  
  <script>
import authService from '@/services/authService';
import userService from '@/services/userService';
import { mapActions } from "vuex"

  export default {
    data() {
      return {
        mail: '',
        password: ''
      };
    },
    methods: {
      ...mapActions('user', ['setUser']),
      ...mapActions('auth', ['setAuth']),
      async login() {

        try {
          const userInfos = await authService.authenticate(this.mail, this.password)
          await this.setUser(userInfos)
          await this.setAuth(true)
          this.$router.push({ name: 'groups', params: {userId: userInfos._id }});
        } catch (error) {
          console.error(error.response.data.message)
          alert(this.$t(`erros.${error.response.data.message}`))
        }
      },
      navigateSignUp(){
        return this.$router.push({ name: 'signUp'});
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
    background-color: var(--fourth-color);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin-top: 1rem;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  .signup{
    margin-top: 0.3rem;
    text-align: center;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="email"],
  input[type="password"] {
    display: flex;
    width: 100%;
    padding: 12px 0;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  }
  
  button {
    padding: 12px 0;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: var(--primary-color);
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: var(--green-color);
  }
  </style>
  