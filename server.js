const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();
const PORT = 443

// Servir arquivos estáticos da pasta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
  if (req.secure) {
    // Solicitação HTTPS
    next();
  } else {
    // Redirecionar para HTTPS
    res.redirect('https://' + req.headers.host + req.url);
  }
});

app.use(helmet.hsts({
  maxAge: 31536000, // 1 ano em segundos
  includeSubDomains: true,
  preload: true
}));



// Rota para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});