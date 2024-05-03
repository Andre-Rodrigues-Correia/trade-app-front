const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');


const app = express();
const PORT = 21185

const options = {
  cert: fs.readFileSync('../cerificados/cert.pem'),
  key: fs.readFileSync('../cerificados/privkey.pem')
};

// Servir arquivos estáticos da pasta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));




// Rota para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar o servidor
// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });

https.createServer(options, app).listen(443, () => {
  console.log('Servidor HTTPS rodando na porta 443');
});