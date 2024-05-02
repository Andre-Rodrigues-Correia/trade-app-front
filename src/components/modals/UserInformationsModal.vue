<template>
    <div class="modal-overlay">
      <div class="modal">
        <h3>{{ $t('users.informations') }}</h3>
        <div class="modal-content">
          <p>
            {{ $t('generic.name') }}: {{ user.name }} 
          </p>
          <p>
            {{ $t('generic.username') }}: {{ user.username }}
          </p>
          <p>
            {{ $t('generic.mail') }}: {{ user.mail }}
          </p>
          <p>
            {{ $t('generic.phone') }}: <a target="_blank" :href="getWhatsappLink()">{{ user.phone }}</a>
          </p>
          
          <br><hr>
        </div>
        <button type="button" class="close-button" @click="closeModal">Fechar</button>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    name: 'userInfomationsModal',
    data(){
      return {
        userId: null,
        ownerInfos: null
      }
    },
    props: {
      user: {
        type: Object,
        required: true
    },
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      getWhatsappLink(){
        return `https://wa.me/${this.user.phone}`
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para o modal */
  .modal-overlay {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(190, 233, 232, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(68, 67, 67, 0.4);
    max-width: 80%;
    max-height: 80%;
    overflow-y: auto;
    text-align: center;
  }

  
  
  button {
    margin-top: 10px;
  }
  
  span {
      font-weight: bold;
  }
  
  h2{
    text-align: center;
  }
  
  button{
    margin: 1rem;
  }
  
  </style>
  