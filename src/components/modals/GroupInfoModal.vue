<template>
    <LoadingSpinner v-if="isLoading"/>
    <div v-else class="modal-overlay">
      <div class="modal">
        <h3>{{ group.name }}</h3>
        <div class="modal-content">
          <p>
            {{ group.description }}
          </p>      
          <br>
          <h4>
            Valor: {{ group.price }}
          </h4>

          <br><hr><br>
          <h4>
            Administrador: {{ ownerInfos.name }}
          </h4>
          <p>
            Dúvidas ? entre em contato via Whatsapp clicando <a :href="getWhatsappLink(ownerInfos.phone)">aqui</a>
          </p>
          <br><hr>
        </div>
        <button type="button" class="close-button" @click="closeModal">Fechar</button>
        <button type="button" class="create-button" @click="selectGroup">Entrar</button>
      </div>
    </div>
  </template>
  
  <script>
import authService from '@/services/authService';
import groupService from '@/services/groupService'
import subscribeService from '@/services/subscribeService';
import userService from '@/services/userService';
import LoadingSpinner from "@/components/generic/LoadingSpinner.vue"

  export default {
    name: 'GenericModal',
    components: {
      LoadingSpinner
    },
    data(){
      return {
        userId: null,
        ownerInfos: null,
        isLoading: true,
      }
    },
    props: {
      group: {
        type: Object,
        required: true
    },
    },
    async created(){
      await this.getData();
    },
    methods: {
      async getData(){
        
        try {
          this.ownerInfos = await userService.getUserById(this.group.ownerId)
          if(!this.$route.params.userId){
            alert(this.$t('auth.isNotAutententicated'));
            this.$router.push({ name: 'login' })
            return
          }
          
        this.userId = this.$route.params.userId;
        this.isLoading = false
        } catch (error) {
          console.error(error.message)
          this.$router.push({ name: 'home' })
          alert(this.$t('erros.internalServerError'))
        }

        
      },
      closeModal() {
        this.$emit('close');
      },
      async selectGroup(){

        try {

          if(!authService.checkAuthenticatedUser()){
            alert(this.$t('auth.isNotAutententicated'))
            this.$router.push({ name: 'login' })
            return
          }

          
          const userAcess = await this.verifyUserAcess()

          if(!userAcess){
            alert(this.$t('auth.isNotGroupAccess'))
            this.$router.push({ name: 'subscriber', params: { groupId: this.group._id} })
            return
          }

          this.$router.push({ name: 'group', params: { groupId: this.group._id} })
          
        } catch (error) {
          console.error(error.message)
          alert(this.$t('erros.internalServerError'))
        }
      },
      getWhatsappLink(phone){
        return `https://wa.me/${phone}`
      },
      async verifyUserAcess(){

        try {
          const userAcess = await subscribeService.verifyUserAccessGroup(this.group._id, this.userId);
          const isOwner = await groupService.verifyUserIsOwnerGroup(this.group._id, this.userId);

          if(userAcess){

            return true
          }

          if(isOwner){
            return true
          }

          return false
        } catch (error) {
          console.error(error.message)
          alert(this.$t('erros.internalServerError'))
        }
      }
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
  