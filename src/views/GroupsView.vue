
<template>
  <LoadingSpinner v-if="isLoading"/>
  <div v-else class="content">
    <div class="title-content">
      <h2>{{ $t('home.featuredGroups')}}</h2>
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
    <!-- <div>
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-3952085048030934"
        data-ad-slot="1672254219"
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
    </div> -->
  </div>

  
</template>

<script>
import GroupInfoModal from "@/components/modals/GroupInfoModal.vue"
import LoadingSpinner from "@/components/generic/LoadingSpinner.vue"
import { mapActions } from "vuex"
import gorupService from "@/services/groupService"
  export default {
    components: {
      GroupInfoModal,
      LoadingSpinner
    },
    async created(){
      console.log(this.$store.state.trades.trades)
      await this.getData();
    },
    mounted() {
    // Carregue os anúncios do Google AdSense
    // (adsbygoogle = window.adsbygoogle || []).push({});
    },
    data(){
      return {
        selectedGroup: null,
        showModal: false,
        tradesGrups: [],
        isLoading: false,
      }
    },
    methods: {
      ...mapActions('trades', ['addTrade', 'updateTrade', 'setTrades', 'deleteTrades']),
      ...mapActions('groups', ['setGroups']),

      async getData(){
        this.isLoading = true;
        try {
          this.tradesGrups = await gorupService.getAllGroups();
          this.isLoading = false;
        } catch (error) {
          console.error(error.message)
          alert(this.$t('erros.internalServerError'))
        }
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

.title-content{
  width: 80%;
  text-align: center;
  margin: auto;
  margin-bottom: 1rem;
}

.groups-content{
  display: flex;
  width: 80%;
  flex-wrap: wrap;
  gap: 0.5rem;
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
