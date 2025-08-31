const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/resgatesController");

router.get("/", ctrl.listarPorUsuario); // ?usuarioId=1
router.post("/", ctrl.resgatar);        // { usuarioId, recompensaId }

module.exports = router;
