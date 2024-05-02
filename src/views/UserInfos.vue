<template>
    <div class="content">
        <div v-if="existsUser" class="form-content">
            <h2>{{ $t('users.informations') }}</h2>
            <div class="form">

                <label class="label-groups">{{ $t('users.name') }}</label>
                <input v-model="editedUser.name" type="text" :readonly="!editMode">

                <label class="label-groups">{{ $t('users.mail') }}</label>
                <input v-model="editedUser.mail" type="text" :readonly="!editMode">

                <label class="label-groups">{{ $t('users.mail') }}</label>
                <input v-model="editedUser.username" type="text" :readonly="!editMode">

                <label class="label-groups">{{ $t('users.phone') }}</label>
                <input v-model="editedUser.phone" type="text" :readonly="!editMode">

                <label class="label-groups">{{ $t('users.birthday') }}</label>
                <input v-model="editedUser.birthday" type="date" :readonly="!editMode">

                <hr>

                <div class="buttons">
                    <button class="create-button" @click="saveChanges">{{ $t('buttons.save') }}</button>
                    <button class="add-button" v-if="!editMode" @click="edit">{{ $t('buttons.edit') }}</button>
                    <button class="close-button" v-if="editMode" @click="cancelEdit">{{ $t('buttons.cancel') }}</button>
                </div>

            </div>

        </div>
    </div>

</template>

<script>
import userService from '@/services/userService';
import { format } from 'date-fns';

export default {
    name: 'userInformations',
    data(){
        return {
            userId: this.$route.params.userId,
            user: {},
            editedUser: {},
            existsUser: false,
            editMode: false
        }
    },
    async created(){
      await this.getData();
    },
    methods: {
        async getData(){
            
            try {
                const user = await userService.getUserById(this.userId);
                user.birthday = format(user.birthday, 'yyyy-MM-dd')
                if(user){
                        this.existsUser = true
                        this.user = user
                        this.editedUser = {...user}
                    }
                console.log(this.user)
            } catch (error) {
                console.error(error.message)
                alert(this.$t('erros.internalServerError'))
            }
        },
        edit(){
                this.editMode = true;
            },
        async saveChanges() {
            this.user = { ...this.editedUser };
            try {
                await userService.updateUser(this.user);
                this.editMode = false;
                //this.$router.push({ name: 'group'});
            } catch (error) {
                console.error(error.message)
                alert(this.$t('erros.internalServerError'))
            }   
        },
        cancelEdit() {
            this.editedUser = { ...this.user };
            this.editMode = false;
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

.form{
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: auto;
    border: 1px solid black;
    border-radius: 5px;
    padding: 1rem;
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