// axios-config.js

import axios from 'axios';
import router from '@/router'; // Importe o Vue Router para poder redirecionar o usuário

// Configuração dos interceptors
axios.interceptors.response.use(response => {
  // Se a resposta não for um erro, apenas a retorna
  return response;
}, error => {
  // Se ocorrer um erro na resposta
  if (error.response) {
    // Verifica se o status da resposta é 403 (não autorizado)
    if (error.response.status === 403) {
      // Redireciona para a rota de não autorizado
      router.push({ name: 'unauthorized' });
    }
  }
  // Retorna uma promessa rejeitada com o erro
  return Promise.reject(error);
});

export default axios;
