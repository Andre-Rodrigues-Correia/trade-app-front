<template>
    <div class="modal-overlay">
      <div class="modal">
        <img :src="modalImage" class="modal-image">
        <button type="button" class="close-button" @click="closeModal">Fechar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ShowImageModal',
    props: {
      modalImage: {
        type: String,
        required: true
    },
    },
    methods: {
      closeModal() {
        this.$emit('close');
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
    overflow: hidden;
  }

  
  
.modal-image {
  display: flex;
  max-width: 100%;
  height: 500px;
  margin-bottom: 1rem;
}
  
  </style>
  