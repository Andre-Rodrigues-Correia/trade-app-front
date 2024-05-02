const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback')

const app = express();
const PORT = 21185

// Servir arquivos estáticos da pasta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));
app.use(history({
  rewrites: [
    { from: /\/signUp/, to: '/index.html' }, // Redireciona /signUp para o index.html
    // Adicione outras regras de reescrita conforme necessário
  ]
}));

// Rota para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});