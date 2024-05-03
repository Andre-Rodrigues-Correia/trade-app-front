<template>
    <div class="content">
        <div class="content-infos">
            <h2>
                Venha fazer parte de grupos de EA FC para ganhar muitas coins.
            </h2>

            <div class="cards">
                <div class="card">
                    <div class="title-card">
                        <h4>Já tem conta, entre e confira seus grupos e o novos.</h4>
                        
                    </div>
                    <div class="card-content">
                        <button  @click="navidate('login')" class="create-button">ENTRE</button>
                    </div>
                </div>
                <div class="card">
                    <div class="title-card">
                        <h4>
                            Ainda não faz parte da comunidade ? :O, clique em cadastre-se e não perca mais uma novidade
                        </h4>
                        
                    </div>
                    <div class="card-content">
                        <button @click="navidate('signUp')" class="add-button">CADASTRE-SE</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userService from '@/services/userService';
import { mapActions } from 'vuex';
export default {
    data(){
        return {

        }
    },
    async created(){
        await this.verifyUserConnected();
    },
    methods: {
        ...mapActions('user', ['setUser']),
        ...mapActions('auth', ['setAuth']),

        navidate(detiny){
            this.$router.push({ name: detiny })
        },

        async verifyUserConnected(){
            const token = userService.getToken();
            if(token){
            const user = userService.getPayloadToken(token);
            await this.setUser(user);
            await this.setAuth(true);
            return this.$router.push({ name: 'home', params: {userId:  user._id} });
            }
      }
    }
}


</script>
<style>
.content{
    width: 80%;
    margin: auto;
    margin-top: 2rem;
}

.title-card{
    display: flex;
    width: 80%;
    margin: auto;
}
.cards{
    width: 100%;
    display: flex;
    justify-content: center;
}

.card-content{
    display: flex;
    justify-content: center;
    width: 80%;
    margin: auto;
}

.card{
    margin: 1rem;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 5px;
}
.card:hover{
    cursor: pointer;
    background-color: var(--terciary-color);
}
h2, h4{
    text-align: center;
}
button{
    margin: 1rem;
}
</style>