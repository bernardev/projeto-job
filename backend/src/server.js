const express = require('express');
const db = require('./db');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config({ path: '../.env' });

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));