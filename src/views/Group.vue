<template>

    <div class="content-group" v-if="userAcessGroup">

        <!-- <h2>Menu futuro</h2> -->
        <!-- Filtro deve poder filtrar trade por status: compra, venda, aguardando -->

        
        <div class="content-filter">
            STATUS
            <select v-model="selectedStatus">
                <option value="">{{ $t('generic.all') }}</option>
                <option value="buy">{{ $t('generic.buy') }}</option>
                <option value="sell">{{ $t('generic.sell') }}</option>
                <option value="wait">{{ $t('generic.wait') }}</option>
            </select>

            <div class="owner-buttons" v-if="isOwnerGroup">
                <div class="manager-group">
                    <button class="create-button" @click="tradesGroup">{{ $t('generic.trades') }}</button>
                </div>
                <div class="manager-group">
                    <button class="create-button" @click="editGroup">{{ $t('groups.manageGroup') }}</button>
                </div>
                
                <div>
                    <button class="add-button" @click="createTrade">{{ $t('buttons.createTrade') }}</button>
                </div>
            </div>
            
            
        </div>

        
        

        <div class="content-trade">
            <div v-for="trade in filteredTrades" :key="trade._id.$oid">
                <div class="trade-card" v-if="trade.visible || isOwnerGroup">
                    <h2>{{ trade.name }}</h2>
                    <p>
                        {{ $t('generic.description') }}: {{ trade.description }}
                    </p>

                    <div class="trades-content">
                        <div>
                            <table class="table-trade">
                                <thead>
                                    <tr>
                                    <th> {{ $t('trades.investments') }}</th>
                                    <th> {{ $t('trades.buyValue') }}</th>
                                    <th> {{ $t('trades.sellValue') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(tradeInfo, index) in trade.trades" :key="index">
                                    <td><img :src="tradeInfo.image" class="trade-image" @click="viewImage(tradeInfo.image)"></td>
                                    <td>{{ tradeInfo.buyValue }} coins</td>
                                    <td>{{ tradeInfo.sellValue ? tradeInfo.sellValue: "A definir"}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="trade-status" :class="getTradeStatusClass(trade.status)">
                        <span>{{ $t(`generic.${trade.status}`) }}</span>
                    </div>
                    <div class="trade-actions" v-if="isOwnerGroup">
                        <button class="create-button" @click="editTrade(trade)">{{ $t('buttons.edit') }}</button>
                        <button class="close-button" @click="deleteTrade(trade)">{{ $t('buttons.delete') }}</button>
                    </div>
                </div>
            </div>

        </div>

        <ShowImageModal v-if="showModal" :modalImage="selectedImage" @close="closeModal"/>

    </div>

</template>

<script>
import ShowImageModal from "@/components/modals/ShowImageModal.vue"
import gorupService from "@/services/groupService"
import subscribeService from "@/services/subscribeService"
import tradeService from "@/services/tradeService"
import { mapActions } from "vuex"

export default {
    components: {
        ShowImageModal
    },
    data(){
        return {
            isOwner: false,
            showModal: false,
            selectedImage: null,
            selectedStatus: "",
            userId: this.$route.params.userId,
            groupId: this.$route.params.groupId,
            trades: [],
            isOwnerGroup: false,
            userAcessGroup: false
        }
    },
    async created(){
        //vberificar se data de expiração de assinatura é mairo que hoje!
        await this.getData()
    },
    computed: {
        filteredTrades() {
            if (!this.selectedStatus) return this.trades;
            return this.trades.filter(trade => trade.status === this.selectedStatus);
        },
    },
    methods: {
        ...mapActions('trades', ['setTrades', 'removeTrade']),
        async getData(){
            try {
                await this.setTrades(this.groupId)
                this.trades = this.$store.state.trades.trades
                await this.verifyIsOwnerGroup();
                await this.verifyUserAcessGrup()
            } catch (error) {
                console.error(error.message)
                alert(this.$t('erros.internalServerError'))
            }
            
        },
        viewImage(image){
            this.selectedImage = image;
            this.showModal = true
        },
        closeModal(){
            this.showModal = false
        },
        getTradeStatusClass(status) {
            return {
                'status-green': status === 'buy',
                'status-yellow': status === 'wait',
                'status-red': status === 'sell'
            };
        },
        async verifyIsOwnerGroup(){
            try {
                this.isOwnerGroup = await gorupService.verifyUserIsOwnerGroup(this.groupId, this.userId);
                this.userAcessGroup = this.isOwnerGroup;
                
            } catch (error) {
                console.error(error.message)
                alert(this.$t('erros.internalServerError'))
            }
        },
        async verifyUserAcessGrup(){
            try {
                if(!this.isOwnerGroup){
                    //this.userSubscriber = await subscribeService.verifyUserAccessGroup(this.groupId, this.userId);
                    const sub = await subscribeService.verifyUserAccessGroup(this.groupId, this.userId);
                    if(this.verifyExpirationDate(sub.expirationDate)){
                        this.userAcessGroup = true
                        return
                    }
                    this.$router.push({ name: 'subscriber'});
                }
                
            } catch (error) {
                console.error(error.message)
                alert(this.$t('erros.internalServerError'))
            }
        },
        verifyExpirationDate(expirationDate){
            const today = new Date();
            const expirationSubscriptionDate = new Date(expirationDate)
            return expirationSubscriptionDate >= today;
        },
        createTrade(){
            this.$router.push({ name: 'createTrade'});
        },
        tradesGroup(){
            this.$router.push({ name: 'group'});
        },
        editGroup(){
            this.$router.push({ name: 'admin'});
        },
        editTrade(trade) {
            this.$router.push({ name: 'edit', params: { tradeId: trade._id }});
        },
        async deleteTrade(trade) {
            try {
                await this.removeTrade(trade._id)
                await this.setTrades(this.groupId)
                this.trades = this.$store.state.trades.trades
            } catch (error) {
                console.error(error.message)
                alert(this.$t('erros.internalServerError'))
            }
            
        }
    }
}

</script>

<style scoped>
.content-group{
    width: 100%;
    margin-bottom: 5rem;
}

.content-filter{
    width: 80%;
    text-align: center;
    padding: 1rem;
    margin: auto;
    margin-bottom: 1rem;
}

.owner-buttons{
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

button{
    margin-right: 0.5rem;
}

.content-trade{
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 80%;
  flex-direction: row;
  justify-content: center;
  margin: auto;
}

.trade-card{
    width: 400px;
    height: 400px;
    max-width: 400px;
    max-height: 400px;
    border: 1px solid var(--text-color);
    background-color: var(--text-color);
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    border-radius: 1rem;
    padding: 0.5rem;
    margin-right: 1.5rem;
    margin-bottom: 1rem;
}

.trades-content{
    width: 100%;
    max-height: 62%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.trade-image{
    max-width: 100px;
    max-height: 100px;
}

.trade-image:hover{
    cursor: pointer;
}

.info-trade-content{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.4rem;
}

.trade-status{
    margin-top: 0.8rem;
    text-align: center;
    color: var(--text-color);
    font-weight: bold;
    border-radius: 5px;
    padding: 1rem;
}

.trade-actions button {
    margin-top: 0.5rem;
    padding: 0.5rem;
}

.status-green {
    background-color: var(--buy-color);
}

.status-yellow {
    background-color: var(--wait-color);
}

.status-red {
    background-color: var(--sell-color);
}

h2{
    text-align: center;
}
p{
    padding: 1rem;
}

table {
  width: 380px;
  height: 300px;
  max-width: 380px;
  max-height: 380px;
  border-collapse: collapse;
}



th, td {
  border: 1px solid black;
  padding: 0.5rem;
  text-align: left;
  text-align: center;
}

th {
  text-align: center;
  background-color: #f2f2f2;
}
</style>
