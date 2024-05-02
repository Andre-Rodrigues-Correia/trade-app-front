<template>
    <div class="content">
        

        <div class="title">
            <h2>
                {{$t('groups.informations')}}
            </h2>
        </div>

        <div class="form">
                <label class="label-groups">{{ $t('groups.name') }}</label>
                <input v-model="name" type="text" required>
                <label class="label-groups">{{ $t('groups.description') }}</label>
                <input v-model="description" type="text" required>
                <label class="label-groups">{{ $t('groups.price') }}</label>
                <input v-model="price" type="number" required>
                <label class="label-groups">{{ $t('groups.image') }}</label>
                <input type="file" id="imagem" @change="onFileChange" accept="image/*" required>
                
                <hr>

                <div class="buttons">
                    <button class="create-button" @click="createGroup">{{ $t('buttons.save') }}</button>
                </div>

        </div>

    </div>
</template>

<script>
import gorupService from '@/services/groupService';
import { storage } from '@/firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

    export default {
        name: 'CreateGroup',
        data(){
            return {
                name: null,
                description: null,
                price: null,
                image: null,
                userId: this.$route.params.userId,
            }
        },
        methods: {
            async onFileChange(event) {
                this.image = event.target.files[0];
            },
            async uploadImage (id){
                const path = `images/groups/${this.userId}/${id}`

                try {
                    const storageRef = ref(storage, path);
                    let imageUrl = ''
                    await uploadBytes(storageRef, this.image).then((snapshot) => {
                        console.log('uploaded')
                        console.log(snapshot)
                    });

                    await getDownloadURL(storageRef).then((res) => {
                        imageUrl = res
                    })
                    return imageUrl;
                    
                } catch (error) {
                    console.error(error.message);
                    alert(this.$t('erros.internalServerError'))
                }
            },
            async createGroup(){
                const imageId = uuidv4();
                const imageUrl = await this.uploadImage(imageId)

                const group = {
                    name: this.name,
                    description: this.description,
                    price: this.price,
                    image: imageUrl,
                    //username: 'tese',
                    ownerId: this.userId
                }

                try {
                    await gorupService.createGroup(group);
                    this.$router.push({ name: 'myGroups'});
                } catch (error) {
                    console.error(error.message);
                    alert(this.$t('erros.internalServerError'))
                }
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