const express = require("express");
const router = express.Router();

const { getCounselor } = require("../controllers/users.controller");
const { checkObjectId } = require("../middlewares/validateObjectId");

router.get("/:user_id", checkObjectId, getCounselor);

module.exports = router;
