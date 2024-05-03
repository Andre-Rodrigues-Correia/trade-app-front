<template>
  <div class="trade-form">
    <h2>{{ $t('trades.title') }}</h2>
    <!-- <div class="form-group">
      <label for="owner">Owner:</label>
      <input class="input-texts" type="text" id="owner" v-model="trade.owner">
    </div> -->
    <div class="form-group">
      <label for="name">{{ $t('trades.name') }}</label>
      <input class="input-texts" type="text" id="name" v-model="trade.name">
    </div>
    <div class="form-group">
      <label for="description">{{ $t('trades.description') }}</label>
      <textarea class="input-texts" id="description" v-model="trade.description" rows="5"></textarea>
    </div>
    <div class="form-group">
      <label for="status">{{ $t('trades.status') }}</label>
      <select v-model="trade.status" id="status">
        <option v-for="option in statusOptions" :value="option.value" >
          {{ option.text }}
        </option>
    </select>
    </div>
    <div class="form-group">
      <label for="visible">{{ $t('trades.visible') }}</label>
      <input type="checkbox" id="visible" v-model="trade.visible">
    </div>
    <div class="trade-list">
      <h3>{{$t('trades.investments')}}</h3>
      <div v-for="(tradeItem, index) in trade.trades" :key="index" class="trade-item">
        <div class="form-group">
          <label for="image">{{ $t('trades.image') }}</label>
          <div>
            <input type="file" id="image" accept="image/*" @change="handleImageChange($event, index)">

            <!-- <br><span>ou</span><br> -->
            
            <!-- <input type="text" placeholder="URL da imagem" v-model="tradeItem.imageUrl" @change="handleImageUrlChange($event, index)"> -->
          </div>
          <img :src="tradeItem.image" v-if="tradeItem.image" class="thumbnail" alt="Thumbnail">
        </div>
        <div class="form-group">
          <label class="label-trades" for="buyValue">{{ $t('trades.buyValue') }}</label>
          <input type="number" id="buyValue" v-model="tradeItem.buyValue">
        </div>
        <div class="form-group">
          <label class="label-trades" for="sellValue">{{ $t('trades.sellValue') }}</label>
          <input type="number" id="sellValue" v-model="tradeItem.sellValue">
        </div>
        <button @click="removeTrade(index)" class="close-button">Remover</button>
      </div>
    </div>
    <button @click="addTrade" class="add-button">Adicionar</button>
    <hr>
    <button @click="saveTrade" class="create-button">Salvar</button>
  </div>
</template>
  
  <script>
  import { mapActions } from 'vuex';
  import tradeService from '@/services/tradeService';
  import { storage } from '@/firebase/firebase';
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { v4 as uuidv4 } from 'uuid';

  export default {
    data() {
      return {
        statusOptions: [
          {text: 'Comprar', value: 'buy'},
          {text: 'Vender', value: 'sell'},
          {text: 'Aguarde', value: 'wait'}
        ],
        tradeId: this.$route.params.tradeId,
        trade: {},
        isLoading: false
      };
    },
    async created(){
      await this.getData()
    },
    methods: {
      ...mapActions('trades', ['addTrade', 'updateTrade']),
      /// Ao atualizar o trade possibiliar abrir uma guia no whatspa com mensagem pronta para alertar da atualização no trade
      async getData(){
        this.getTradeById();
      },
      addTrade() {
        this.trade.trades.push({ image: '', buyValue: null, sellValue: null });
      },
      removeTrade(index) {
        this.trade.trades.splice(index, 1);
      },
      async saveTrade() {
        await this.updateTrade(this.trade);
        this.$router.push({ name: 'group'});
      },

      async getTradeById(){
        try {
          this.trade = await tradeService.getTradeById(this.tradeId);
        } catch (error) {
          console.error(error.message)
          alert(this.$t('erros.internalServerError'))
        }
        
      },
      async handleImageChange(event, index) {
        const file = event.target.files[0];
        if (file) {
          const urlImage = await this.uploadImage(file);
          this.trade.trades[index].image = urlImage;

        }
      },
      async uploadImage (file){
        this.isLoading = true

        try {
          const id = uuidv4();
          const path = `images/groups/${this.groupId}/${id}`
          const storageRef = ref(storage, path);
          let imageUrl = ''
          await uploadBytes(storageRef, file).then((snapshot) => {

            });

          await getDownloadURL(storageRef).then((res) => {
              imageUrl = res
          });


          this.isLoading = false
          return imageUrl;
        } catch (error) {
          console.error(error.message)
          alert(this.$t('erros.internalServerError'))
        }
        
    },
    }
  };
  </script>
  
  <style scoped>
.trade-form {
  width: 50%;
  margin: 2rem auto;
  margin-bottom: 5rem;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 10px;
}

.trade-list {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.trade-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

/* .remove-button {
  margin-top: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
} */

.add-trade-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.save-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.thumbnail {
  max-width: 100px;
  max-height: 100px;
}

.input-texts {
  width: 100%;
}

.label-trades{
  display: block;
}

label{
  margin-right: 0.5rem;
}

hr{
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}
</style>
