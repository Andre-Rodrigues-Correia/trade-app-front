<template>
    <footer>
      <div class="footer-content">
        <p>&copy; {{ currentYear }} TradeGroups. Todos os direitos reservados.</p>
        <p class="button-nav" @click="navigate('policy')">{{ $t('privacy.policy') }}</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    data() {
      return {
        currentYear: new Date().getFullYear()
      };
    },
    methods: {
      navigate(destiny){
      this.$router.push({ name: destiny })
    },
    }
  };
  </script>
  
  <style scoped>
  footer {
    background-color: var(--primary-color);
    display: flex;
    color: var(--text-color);
    padding: 20px 0;
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .button-nav{
    cursor: pointer;
  }
  
  .footer-content {
    max-width: 960px;
    margin: 0 auto;
  }
  </style>
  
  

  