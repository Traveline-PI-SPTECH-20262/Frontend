const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;
const API_URL = 'http://localhost'

app.use(express.static(path.join(__dirname, 'landing')));
app.use(express.static('landing', {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.wasm')) {
      res.setHeader('Content-Type', 'application/wasm');
    }
  }
}));

app.listen(PORT, () => {
  console.log(`Servidor rodando em ${API_URL}:${PORT}`);
});