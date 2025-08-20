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
const acoesRoutes = require("./src/routes/acoes.routes");

app.use('/api', testRoute);
app.use("/acoes", acoesRoutes);

// Swagger
const setupSwagger = require("./src/swagger");
setupSwagger(app);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
