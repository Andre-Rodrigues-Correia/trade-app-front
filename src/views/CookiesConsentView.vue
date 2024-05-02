<template>

    <cookie-consent :message="$t('privacy.summary')" :linkLabel="$t('buttons.gotIt')" href="http://192.168.1.100:9180/policy" buttonLabel="entendi">
  </cookie-consent>

</template>

<script>
// required and to get updates

export default {
  name: 'CookiesConsent',
  methods: {
    handleConsent() {
      // Emitir evento para indicar que o usuário deu consentimento
      this.$emit('on-consent');
    }
  }
};
</script>

<style scoped lang="scss">

@import "./node_modules/vue-cookieconsent-component/src/scss/cookie-consent";
@import "./node_modules/vue-cookieconsent-component/src/scss/cookie-consent-bottom";
@import "./node_modules/vue-cookieconsent-component/src/scss/cookie-consent-transition";
</style>
