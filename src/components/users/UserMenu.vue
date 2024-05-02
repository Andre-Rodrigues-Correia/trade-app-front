<template>
    <div class="user-menu">
      <div class="user-icon" @click="toggleMenu">
        <!-- <img src="caminho/para/icone-user.png" alt="User Icon"> -->
        <font-awesome-icon :icon="['fas', 'user']" />
      </div>
      <transition name="fade">
        <div class="menu" v-if="menuOpen">
          <ul>
            <li @click="showUserInfo">{{ $t('header.myInformations') }}</li>
            <li @click="logout">{{ $t('header.logout') }}</li>
          </ul>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
import authService from '@/services/authService';
import { mapActions } from 'vuex';

  export default {
    name: "userMenu",
    data() {
      return {
        menuOpen: false,
        userId: null,
      };
    },
    methods: {
      ...mapActions('auth', ['setAuth']),
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      },
      async verifyUserIsOwnerGroups(){
        return this.userService.verifyUserIsOwner(this.userId);
      },
      showUserInfo() {
        // Lógica para mostrar informações do usuário
        this.$router.push({ name: 'userInfos'});
        this.menuOpen = false;
        console.log("Mostrando informações do usuário");
      },
      showMyGroup() {
        // Lógica para mostrar o grupo do usuário
        console.log("Mostrando o grupo do usuário");
      },
      async logout() {
        authService.logout();
        await this.setAuth(false)
        this.menuOpen = false;
        this.$router.push({ name: 'publicHome'});
      }
    }
  };
  </script>
  
  <style>
  .user-menu {
    position: relative;
    display: inline-block;
  }
  
  .user-icon {
    cursor: pointer;
  }
  
  .menu {
    position: absolute;
    top: 30px;
    right: 0;
    background-color: #fff;
    color: var(--primary-color);
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px 0;
    z-index: 1000;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    padding: 10px;
    cursor: pointer;
  }

  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  