
<template>
    <div class="content">
      <div class="filter-content">
        <h2>Implementar filtro</h2>
      </div>
      <div class="groups-content">
        <div v-for="group in tradesGrups" :key="group._id.$oid">
          <div class="group" @click="viewGroup(group)">
            <div class="group-image">
              <img :src="group.image">
            </div>
            <div class="group-infos">
              {{ group.name }}
            </div>
          </div>
        </div>
      </div>
      <GroupInfoModal :group="selectedGroup" v-if="showModal" @close="closeModal"/>
    </div>
  
    
  </template>
  
  <script>
  import GroupInfoModal from "@/components/modals/GroupInfoModal.vue"
  import { mapActions } from "vuex"
import gorupService from "@/services/groupService"
    export default {
      components: {
        GroupInfoModal
      },
      async created(){
        await this.getData();
      },
      data(){
        return {
          selectedGroup: null,
          showModal: false,
          userId: this.$route.params.userId,
          tradesGrups: [],
        }
      },
      methods: {
        ...mapActions('trades', ['addTrade', 'updateTrade', 'setTrades', 'deleteTrades']),
  
        async getData(){

          try {
            this.tradesGrups = await gorupService.getGroupsByOwnerId(this.userId);
          } catch (error) {
            console.error(error.message)
            alert(this.$t('erros.internalServerError'))
          }
          //Pegar dois tipos de grupos, por owner id ficar na aba meus grupos que gerencio e grupos qque participo
        },
        viewGroup(group){
          this.selectedGroup = group;
          this.showModal = true;
        },
        closeModal(){
          this.showModal = false;
        }
      }
    }
  </script>
  
  <style scoped>
  .content{
    width: 100%;
  }
  
  .filter-content{
    width: 80%;
    text-align: center;
    margin: auto;
    margin-bottom: 1rem;
  }
  
  .groups-content{
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 80%;
    flex-direction: row;
    justify-content: center;
    margin: auto;
  }
  
  .group{
    width: 100px;
    height: 100px;
    padding: 1rem;
  }
  .group-image{
    display: flex;
    justify-content: center;
    justify-items: center;
    width: 70px;
    height: 70px;
    margin: auto;
    border: solid 2px var(--primary-color);
    border-radius: 50%;
  }
  .group-infos{
    text-align: center;
    height: 30px;
  }
  
  
  
  .group:hover{
    cursor: pointer;
  }
  
  img{
    width: 70px;
    height: 70px;
    margin: auto;
    border-radius: 50%;
  }
  
  </style>
  