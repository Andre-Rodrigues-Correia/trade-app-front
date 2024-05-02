<template>
    <div class="language-selector">
      <div class="current-language" @click="toggleDropdown">
        <img :src="currentLanguage.flag" alt="Flag" class="flag">
      </div>
      <transition name="fade">
        <div v-if="isDropdownOpen" class="dropdown">
          <div
            v-for="(lang, index) in supportedLanguages"
            :key="index"
            @click="changeLocale(lang.locale)"
            class="language-option"
            :class="{ active: lang.locale === currentLocale }"
          >
            <img :src="lang.flag" alt="Flag" class="flag">
            <span>{{ lang.name }}</span>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDropdownOpen: false,
        supportedLanguages: [
          { locale: 'en', name: this.$t('supportedLanguages.english'), flag: 'https://firebasestorage.googleapis.com/v0/b/trade-f9dca.appspot.com/o/app%2FenglishFlag.png?alt=media&token=22bc46c1-652e-4b18-ae75-2f0beffad8da' },
          { locale: 'pt', name: this.$t('supportedLanguages.portuguese'), flag: 'https://firebasestorage.googleapis.com/v0/b/trade-f9dca.appspot.com/o/app%2FportugueseFlag.png?alt=media&token=963ae1a8-c951-4d23-831f-146979c4eb8a' }
        ],
      };
    },
    computed: {
      currentLocale() {
        return this.$i18n.locale;
      },
      currentLanguage() {
        return this.supportedLanguages.find(lang => lang.locale === this.currentLocale);
      },
    },
    methods: {
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
      changeLocale(locale) {
        this.$i18n.locale = locale;
        this.isDropdownOpen = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .language-selector {
    position: relative;
    display: inline-block;
  }
  
  .current-language {
    cursor: pointer;
  }
  
  .flag {
    width: 20px;
  }
  
  .dropdown {
    position: absolute;
    top: 30px;
    right: 0;
    background-color: #fff;
    color: var(--primary-color);
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px 0;
    z-index: 1000;
  }
  
  .language-option {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 5px;
  }
  
  .language-option.active {
    font-weight: bold;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  </style>
  