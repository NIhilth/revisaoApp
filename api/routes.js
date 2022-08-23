const express = require("express");
const router = express.Router();
const livrosController = require("./livro/livro.controller")

router.use("/livro", livrosController)

module.exports = router;