const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend CarbonApp rodando!');
});

const PORT = process.env.PORT || 3000;

const testRoute = require('./src/routes/testRoute');
app.use('/api', testRoute);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

