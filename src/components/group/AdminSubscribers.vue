<template>
    <div class="content">
        <div class="list-content">
            <LoadingSpinner class="patient-content" v-if="isLoading"/>
            <div v-else>
                <div>
                <h2>Assinantes</h2>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                        <th> {{ $t('generic.username') }}</th>
                        <th> {{ $t('users.informations') }}</th>
                        <th> {{ $t('users.expirationDate') }}</th>
                        <th> {{ $t('generic.actions') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="sub in subscribers" :key="sub._id">
                        <td>{{ sub.username }}</td>
                        <td >
                            <td><button class="view-infos" @click="viewUserInfos(sub.userId)"><font-awesome-icon class="icons" icon="eye" /></button></td>  
                        </td>
                        <td>{{ sub.expirationDate }}</td>
                        <td>
                            <button class="close-button" @click="deleteUser(sub)">{{ $t('buttons.delete')}}</button>
                            <button class="create-button" @click="editSubscription(sub)">{{ $t('buttons.edit')}}</button>
                        </td>
                        </tr>
                        <tr v-if="addUser">
                            <th>
                                <input type="text" @input="findUser" v-model="newUsername">
                            </th>

                            <th v-if="selectedUser">
                                <td><button class="view-infos" @click="viewUserInfos(selectedUser._id)"><font-awesome-icon class="icons" icon="eye" /></button></td>         
                            </th>
                           
                            <th v-if="selectedUser">
                                <input type="date" v-model="newUserDateExpiration">
                            </th>
                            <th v-if="selectedUser">
                                <button class="add-button" @click="addSubscriber">{{ $t('buttons.add') }}</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button class="add-button" @click="addNewUser">{{$t('buttons.addNewUser')}}</button>
                    <button v-if="addUser" class="close-button" @click="closeNewUser">{{$t('buttons.cancel')}}</button>
                </div>
            </div>
        </div>
            <SubscriptionEditModal v-if="showEditModal" :subscription="selectedSub" @close="closeModal"/>
            <UserInformationsModal v-if="showInformations" :user="selectedUser" @close="closeInformationsModal"/>
        </div>
            </div>
            

</template>


<script>
import gorupService from '@/services/groupService';
import userService from '@/services/userService';
import subscribeService from '@/services/subscribeService';
import SubscriptionEditModal from '../modals/SubscriptionEditModal.vue';
import LoadingSpinner from '../generic/LoadingSpinner.vue';
import { mapActions } from 'vuex';
import UserInformationsModal from '../modals/UserInformationsModal.vue';

    export default {
        name: "AdminSubscribers",
        components: {
            SubscriptionEditModal,
            UserInformationsModal,
            LoadingSpinner
        },
        data(){
            return {
                subscribers: [],
                newExpirationDate: null,
                newUsername: '',
                newUserDateExpiration: null,
                selectedUser: null,
                addUser: false,
                editing: false,
                userId: this.$route.params.userId,
                groupId: this.$route.params.groupId,
                allUsers: [],
                selectedSub: null,
                showEditModal: false,
                showInformations: false,
                isLoading: true,
                usersInfo: {}
            }
        },
        async created(){
            await this.getData();
        },
        methods: {
            ...mapActions('subscriptions', ['setSubscription', 'addSubscription','updateSubscriptions', 'removeSubscription']),
            async getData(){
                try {
                    this.subscribers =  this.$store.state.subscriptions.subscriptions
                    this.allUsers = await userService.getAllUsers();//mudar depois, não da para ficar buscando todos os users sempre
                    this.isLoading = false;
                } catch (error) {
                    console.error(error.message)
                    alert(this.$t('erros.internalServerError'))
                }
                
            },
            async viewUserInfos(userId){
                try {
                    const user = await userService.getUserById(userId);
                    this.selectedUser = user;
                    this.showInformations = true
                    return user
                } catch (error) {
                    console.error(error.message)
                    alert(this.$t('erros.internalServerError'))
                }
            },
            editSubscription(sub){
                this.selectedSub =  sub;
                this.showEditModal = true;
            },
            async deleteUser(sub) {
                if (confirm(this.$t('messages.confirmDelete'))) {
                    try {
                        await this.removeSubscription(sub._id);
                        await this.setSubscription(this.groupId);
                        this.subscribers = this.$store.state.subscriptions.subscriptions
                        return
                    } catch (error) {
                        console.error(error.message)
                        alert(this.$t('erros.internalServerError'))
                    }
                    
                }  
            },
            findUser(){

                const findUser = this.allUsers.find((user) => user.username == this.newUsername);
                if(findUser){
                    this.selectedUser = findUser
                    return
                }

                this.selectedUser = null;
            },
            async addSubscriber(){
                console.log(this.selectedUser)
                if(!this.selectedUser){
                    alert('messages.usernotselected')
                }

                if(!this.newUserDateExpiration){
                    alert('messages.selectdateisreqiresd')
                    return
                }

                console.log(this.groupId)

                const existsUserAccess = await subscribeService.verifyUserAccessGroup(this.groupId, this.selectedUser._id)

                

                console.log(existsUserAccess)

                if(existsUserAccess){
                    this.selectedUser = null,
                    this.newUsername = ''
                    this.newUserDateExpiration = null,
                    this.addUser = false;
                    alert('messages.userExistsAccess')
                    return
                }

                const newSubscription = {
                    userId: this.selectedUser._id,
                    groupId: this.groupId,
                    username: this.selectedUser.username,
                    active: true,
                    expirationDate: this.newUserDateExpiration
                }

                //const response = await subscribeService.addNewSubscription(newSubscription)

                try {
                    await this.addSubscription(newSubscription)
                } catch (error) {
                    console.error(error.message)
                    alert(this.$t('erros.internalServerError'))
                }

                this.selectedUser = null,
                this.newUsername = ''
                this.newUserDateExpiration = null,
                this.addUser = false;
            },

            addNewUser(){
                this.addUser = true
            },
            closeNewUser(){
                this.addUser = false
            },
            closeInformationsModal(){
                this.selectedUser = null
                this.showInformations = false
            },
            async closeModal(){
                try {
                    await this.setSubscription(this.groupId);
                    this.subscribers = this.$store.state.subscriptions.subscriptions
                    this.showEditModal = false
                } catch (error) {
                    console.error(error.message)
                    alert(this.$t('erros.internalServerError'))
                }
                
            },
        }
    }

</script>

<style scoped>

.content{
    width: 80%;
    margin: auto;
}

.list-subs{
    border: 1px solid black;
    padding: 0.4rem;
}

.view-infos{
    display: flex;
    width: 110px;
    justify-content: center;
    background-color: var(--terciary-color);
    padding: 5px;
    border: solid 1px var(--terciary-color);
    border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}


th {
  background-color: #f2f2f2;
}


tr:nth-child(even) {
  background-color: #f2f2f2;
}



</style>