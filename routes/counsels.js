const express = require("express");
const router = express.Router();

const { createCounsel } = require("../controllers/counsels.controller");
// const { verifyToken } = require("../middlewares/authorization");

router.post("/", createCounsel);

module.exports = router;
