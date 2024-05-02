<template>
    <div class="content">

        <div class="header-content">
            <button class="edit-button" @click="selectMenu('trades')">{{ $t('buttons.trades') }}</button>
            <button class="add-button" @click="selectMenu('informations')" >{{ $t('buttons.informations') }}</button>
            <button class="create-button" @click="selectMenu('subscribers')">{{ $t('buttons.subscribes') }}</button>
        </div>

        <div class="info">

            <div v-if="selectedOption == 'informations'">
                <EditGroupInformations />
            </div>

            <div v-if="selectedOption == 'subscribers'">
                <AdminSubscribers />
            </div>

            <div v-if="selectedOption == 'trades'">
                {{ this.$router.push({ name: 'group'}) }}
            </div>

        </div>
    </div>
    
</template>

<script>
import gorupService from '@/services/groupService';
import EditGroupInformations from '@/components/group/EditGroupInformations.vue'
import AdminSubscribers from '@/components/group/AdminSubscribers.vue';
import { mapActions } from 'vuex';

    export default {
        name: 'AdminGroup',
        components: {
            EditGroupInformations,
            AdminSubscribers
        },
        data() {
            return {
                selectedOption: 'informations',
                groupId: this.$route.params.groupId,
            }
        },
        async created(){
            this.getData()
        },
        methods: {
            ...mapActions('subscriptions', ['setSubscription', 'addSubscription','updateSubscription', 'deleteSubscription']),
            async getData(){
                try {
                    await this.setSubscription(this.groupId);
                } catch (error) {
                    console.error(error.message);
                    alert(this.$t('erros.internalServerError'))
                } 
            },
            selectMenu(option){
                this.selectedOption = option;
            }
            
        }
    }

</script>

<style scoped>

.content{
    width: 80%;
    margin: auto;
    margin-top: 1rem;
}

.header-content{
    display: flex;
    margin: auto;
    justify-content: center;
}

.info{
    display: flex;
    flex-direction: column;
    /* width: 80%;
    margin: auto;
    border: 1px solid black;
    border-radius: 5px;
    padding: 1rem; */
}

h2{
    text-align: center;
    margin-bottom: 1rem;
}

input{
    padding: 10px;
}

.buttons{
    display: flex;
}
button{
    margin-right: 0.2rem;
}


.label-groups{
  display: block;
  margin-bottom: 0.2rem;
}

input{
    margin-bottom: 0.4rem;
}

hr{
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}


</style>