<template>
    <div class="content">

        <div v-if="existisGroup">
            <h2>
                {{$t('groups.informations')}}
            </h2>
            <div class="form">
                <label class="label-groups">{{ $t('groups.name') }}</label>
                <input v-model="editedGroup.name" type="text" :readonly="!editMode">
                <label class="label-groups">{{ $t('groups.description') }}</label>
                <input v-model="editedGroup.description" type="text" :readonly="!editMode">
                <label class="label-groups">{{ $t('groups.price') }}</label>
                <input v-model="editedGroup.price" type="number" :readonly="!editMode">
                <label class="label-groups">{{ $t('groups.image') }}</label>
                <input v-model="editedGroup.image" type="text" :readonly="!editMode">
                
                <hr>

                <div class="buttons">
                    <button class="create-button" @click="saveChanges">{{ $t('buttons.save') }}</button>
                    <button class="add-button" v-if="!editMode" @click="edit">{{ $t('buttons.edit') }}</button>
                    <button class="close-button" v-if="editMode" @click="cancelEdit">{{ $t('buttons.cancel') }}</button>
                </div>

                
            </div>
            
        </div>

        <div v-else>
            crie seu grupo
        </div>

    </div>
    
</template>

<script>
import gorupService from '@/services/groupService';

    export default {
        name: 'AdminGroup',
        data() {
            return {
                userId: this.$route.params.userId,
                groupId: this.$route.params.groupId,
                existisGroup: false,
                group: {},
                editedGroup: {},
                editMode: false
            }
        },
        async created(){
            this.getData()
        },
        methods: {
            async getData(){
                //const group = gorupService.getGroupById(this.groupId);//errado
                try {
                    console.log(this.userId)
                    const group = await gorupService.getGroupById(this.groupId);
                    console.log(group)
                    if(group){
                        this.existisGroup = true
                        this.group = group
                        this.editedGroup = {...group}
                    }
                } catch (error) {
                    console.error(error.message)
                    alert(this.$t('erros.internalServerError'))
                }
            },
            edit(){
                this.editMode = true;
            },
            async saveChanges() {
                this.group = { ...this.editedGroup };
                try {
                    await gorupService.updateGroup(this.group);
                    this.editMode = false;
                    this.$router.push({ name: 'group'});
                } catch (error) {
                    console.error(error.message)
                    alert(this.$t('erros.internalServerError'))
                }
                
            },
            cancelEdit() {
                this.editedGroup = { ...this.group };
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