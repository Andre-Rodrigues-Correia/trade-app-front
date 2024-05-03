<template>
    <div class="signUp-container">
      <h2>{{ $t('generic.signUp')}}</h2>
      <form @submit.prevent="signUp" class="signUp-form">
        <div class="form-group">
          <label for="name">{{ $t('generic.name')}}</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="username">{{ $t('generic.username')}}</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="mail">{{ $t('generic.mail')}}</label>
          <input type="email" id="mail" v-model="mail" required>
        </div>
        <div class="form-group">
          <label for="confirmMail">{{ $t('generic.confirmMail')}}</label>
          <input type="email" id="confirmMail" v-model="confirmMail" required>
        </div>
        <div class="form-group">
          <label for="phone">{{ $t('generic.phone')}}</label>
          <input type="tel" id="phone" v-model="phone"  required />
        </div>
        <div class="form-group">
          <label for="password">{{ $t('generic.password')}}</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="form-group">
          <label for="birthday">{{ $t('generic.birthday')}}</label><br/>
          <input type="date" id="birthday" v-model="birthday" required>
        </div>
        <button type="submit">{{ $t('generic.signUp')}}</button>
        <p class="signup">
            {{ $t('messages.loginText')  }} <a @click="navigateLogin" href="">{{  $t('messages.here') }}</a>
        </p>
      </form>
    </div>
  </template>
  
  <script>

import userService from '@/services/userService';

  export default {
    data() {
      return {
        name: '',
        mail: '',
        confirmMail: '',
        username: '',
        phone: '',
        password: '',
        birthday: null,
      };
    },
    methods: {
      async signUp() {
        const user = {
          name: this.name,
          mail: this.mail,
          username: this.username,
          phone: this.phone,
          password: this.password,
          birthday: this.birthday
        }


        try {
          const newUser = await userService.createNewUser(user);
          alert(this.$t('auth.newUser')) 
        } catch (error) {
          alert(this.$t(`erros.${error.response.data.message}`))
        }
      },
      navigateLogin(){
        return this.$router.push({ name: 'login'});
      }
    }
  };
  </script>
  
  <style scoped>
  .signUp-container {
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
  
  .signUp-form {
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
  input[type="tel"],
  input[type="text"],
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
  