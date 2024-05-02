<template>
  <header>
    
    <h2 @click="navigateMenu">
      <span class="text-logo-1">Trade</span>
      <span class="text-logo-2">Groups</span>
    </h2>

    <button class="menu-toggle" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav class="menu-options" :class="{ 'active': isMenuOpen }">
      <ul>
        <!-- <li><RouterLink class="text-menu" to="/groups">{{ $t('header.groups') }}</RouterLink></li>
        <li><RouterLink class="text-menu" to="/">{{ $t('header.myGroups') }}</RouterLink></li>
        <li><RouterLink class="text-menu" to="/create">{{ $t('header.createGroup') }}</RouterLink></li>
        <li><RouterLink class="text-menu" to="/create">{{ $t('header.tutorials') }}</RouterLink></li> -->
        <li v-if="!isLog" @click="navigate('login')" class="text-menu">{{ $t('generic.login') }}</li>
        <li v-if="!isLog" @click="navigate('signUp')" class="text-menu">{{ $t('generic.signUp') }}</li>
        <li v-if="isLog" @click="navigate('groups')" class="text-menu">{{ $t('header.groups') }}</li>
        <li v-if="isLog" @click="navigate('myGroups')" class="text-menu">{{ $t('header.myGroups') }}</li>
        <li v-if="isLog" @click="navigate('createGroup')" class="text-menu">{{ $t('header.createGroup') }}</li>
        <li><SelectLanguage/></li>
        <li v-if="isLog"><UserMenu /></li>
        <!-- BOTÃO DE USER -->
      </ul>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';
import SelectLanguage from '@/components/internationalization/SelectLanguage.vue';
import UserMenu from '@/components/users/UserMenu.vue'
import authService from '@/services/authService';
import userService from '@/services/userService';

export default {
  name: 'Header',
  components: {
    RouterLink,
    SelectLanguage,
    UserMenu
  },
  data() {
    return {
      userIsLogged : false,
      isMenuOpen: false
    };
  },
  computed: {
    isLog(){
      return this.$store.state.auth.isAuthenticated
    }
  },
  async created(){
    await this.getData();
  },
  methods: {
    async getData(){
      this.userIsLogged = authService.checkAuthenticatedUser();
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    navigate(destiny){
      this.$router.push({ name: destiny })
    },
    async navigateMenu(){
      console.log(this.userIsLogged)
      if(this.userIsLogged){
        const token = userService.getToken();
        const userInfos = await userService.getPayloadToken(token);
        console.log(userInfos)
        return this.$router.push({ name: 'home', params: {userId:  userInfos._id} });
      }
      return this.$router.push({ name: 'publicHome'});
    }
  },
};
</script>

<style scoped>
header {
  background-color: var(--primary-color);
  color: var(--text-color);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-options{
  margin: 0.8rem;
}

.logo img {
  max-width: 100px;
}

h2{
  display: inline;
}

h2:hover {
  cursor: pointer;
}

.menu-toggle {
  display: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #fff;
  margin-bottom: 5px;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  display: inline-block;
  margin-left: 20px;
  transition: transform 0.3s ease-in-out; /* Adicionando transição de animação */
}

nav ul li:first-child {
  margin-left: 0;
}

.text-menu {
  color: var(--text-color);
  text-decoration: none;
  font-weight: bold;
}

/* Adicionando efeito de animação no hover */
nav ul li:hover {
  transform: translateY(-3px); /* Movendo o elemento para cima ao passar o mouse */
}

.text-logo-1{
  color: var(--secondary-color);
}

.text-logo-2{
  color: var(--terciary-color);
}

@media (max-width: 768px) {
  .logo img {
    max-width: 80px;
  }
  .menu-toggle {
    display: block;
  }
  nav ul {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: var(--primary-color);
    padding: 10px;
    text-align: center;
  }
  nav ul li {
    display: block;
    margin: 10px 0;
  }
  nav.active ul {
    display: block;
  }
}
</style>
