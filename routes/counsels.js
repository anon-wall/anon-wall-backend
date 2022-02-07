const express = require("express");
const router = express.Router();

const { createCounsel } = require("../controllers/counsels.controller");

router.post("/", createCounsel);

module.exports = router;
