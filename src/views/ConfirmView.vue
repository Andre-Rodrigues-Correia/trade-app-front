<template>
    <div class="confirmation-container">
      <h2>{{ $t('messages.ConfirmCode')}}</h2>
      <p>{{ $t('messages.ConfirmCodeDescription')}}.</p>
      <form @submit.prevent="confirmCode" class="confirmation-form">
        <div class="form-group">
          <label for="code">{{ $t('messages.code')}}:</label>
          <input type="text" id="code" v-model="code" required>
        </div>
        <div class="buttons">
            <button type="submit" class="create-button">{{ $t('messages.confirm')}}</button>
            <button type="submit" class="create-button">{{ $t('messages.resendCode')}}</button>
        </div>
        
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        code: '',
        error: ''
      };
    },
    methods: {
      confirmCode() {
        // Aqui você pode adicionar lógica para confirmar o código
        if (this.code === '123456') {
          // Código correto, redirecionar para a próxima tela
          // Aqui você pode redirecionar o usuário para a próxima tela
        } else {
          // Código incorreto, exibir mensagem de erro
          this.error = 'Código incorreto. Por favor, tente novamente.';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .confirmation-container {
    max-width: 400px;
    margin: auto;
    margin-top: 1rem;
    padding: 20px;
    border-radius: 5px;
    background-color: var(--fourth-color);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .confirmation-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 20px;
    margin-top: 1rem;
  }
  
  label {
    font-weight: bold;
    margin-right: 0.2rem;
  }
  
  input[type="text"] {
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  }
  
  .error {
    color: #ff0000;
    font-size: 14px;
  }

  button{
    margin-right: 0.2rem;
  }
  </style>
  