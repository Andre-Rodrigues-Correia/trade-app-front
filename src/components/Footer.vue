<template>
    <footer>
      <div class="footer-content">
        <p>&copy; {{ currentYear }} TradeGroups. Todos os direitos reservados.</p>
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
    }
  };
  </script>
  
  <style scoped>
  footer {
    background-color: var(--primary-color);
    color: var(--text-color);
    padding: 20px 0;
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  
  .footer-content {
    max-width: 960px;
    margin: 0 auto;
  }
  </style>
  
  

  