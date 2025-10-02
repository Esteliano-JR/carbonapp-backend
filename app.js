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
const recompensasRoutes = require("./src/routes/recompensas.routes");
const resgatesRoutes = require("./src/routes/resgates.routes");
const logsRoutes = require("./src/routes/logs.routes");
const agendamentoRoutes = require('./src/routes/agendamento.routes');


app.use('/api', testRoute);
app.use("/acoes", acoesRoutes);
app.use("/recompensas", recompensasRoutes);
app.use("/resgates", resgatesRoutes);
app.use("/logs", logsRoutes);
app.use('/agendamento', agendamentoRoutes);

const usuariosRoutes = require("./src/routes/usuarios.routes");
app.use("/usuarios", usuariosRoutes);

const rankingRoutes = require("./src/routes/ranking.routes");
app.use("/ranking", rankingRoutes);

const authRoutes = require("./src/routes/auth.routes");
app.use("/auth", authRoutes);


// Swagger
const setupSwagger = require("./src/swagger");
setupSwagger(app);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
