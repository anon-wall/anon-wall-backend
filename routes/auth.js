const express = require("express");
const router = express.Router();

const { handleLogin } = require("../controllers/auth.controller");

router.post("/login", handleLogin);

module.exports = router;
