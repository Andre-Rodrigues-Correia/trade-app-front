<template>
  <div id="app">
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script>
  // fazer uma logica para verificar sempre que o app for abrto se tem um token, se tiver já seta
  import {RouterView } from 'vue-router'
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue"
  export default {
    components: {
      Header,
      Footer
    },
    async created(){
      await this.$store.dispatch('user/setUser', {/*passar user retornado do login (payload)*/});
      const teste = this.$store.state.user.user;
      console.log(teste)
    }
  }
</script>

<style scoped>

</style>

