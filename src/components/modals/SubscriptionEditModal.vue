<template>
    <div class="modal-overlay">
      <div class="modal">
        <h3>{{ $t('add') }}</h3>
        <div class="modal-content">

          <div class="form">
            <div>
              <label for="name">{{ $t('generic.name') }}</label>: 
              <span>{{ userInformations.name }}</span>
            </div>

            <div>
              <label for="username">{{ $t('generic.username') }}</label>: 
              <span>{{ userInformations.name }}</span>
            </div>

            <div>
              <label for="phone">{{ $t('generic.phone') }}</label>: 
              <span>{{ userInformations.phone }}</span>
            </div>

            <div>
              <input type="date" v-model="expirationDate">
              
            </div>
           
          </div>
         
        </div>
        <button type="button" class="close-button" @click="closeModal">Fechar</button>
        <button class="create-button" @click="saveChanges()">{{ $t('buttons.save') }}</button>
      </div>
    </div>
  </template>
  
  <script>
import authService from '@/services/authService';
import gorupService from '@/services/groupService'
import subscribeServicer from '@/services/subscribeService';
import userService from '@/services/userService';
import { format } from 'date-fns';
import { mapActions } from 'vuex';

  export default {
    name: 'SubscriptionEditModal',
    data(){
      return {
        userInformations: null,
        expirationDate: null,
        groupId: this.$route.params.groupId,
      }
    },
    props: {
      subscription: {
        type: Object,
        required: true
    },
    },
    async created(){
      await this.getData();
    },
    methods: {
      ...mapActions('subscriptions', ['setSubscription', 'addSubscription','updateSubscription', 'deleteSubscription']),
      async getData(){
        this.expirationDate = format(this.subscription.expirationDate, 'yyyy-MM-dd')
        await this.getUserInformation();
      },
      async getUserInformation(){
        try {
          this.userInformations = await userService.getUserById(this.subscription.userId);
        } catch (error) {
          console.error(error.message)
          alert(this.$t('erros.internalServerError'))
        }
        
      },
      async saveChanges(){
        const updatedSubscription = {
          ...this.subscription,
          expirationDate: this.expirationDate
        }

        try {
           await this.updateSubscription(updatedSubscription)
           this.closeModal()
        } catch (error) {
          console.error(error.message)
          alert(this.$t('erros.internalServerError'))
        }
      },
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
  