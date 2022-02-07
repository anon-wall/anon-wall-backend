const express = require("express");
const router = express.Router();

const { createCounsel, getAll } = require("../controllers/counsels.controller");
const { checkObjectId } = require("../middlewares/validateObjectId");

router.post("/", createCounsel);
router.get("/:counsel_id", checkObjectId, getAll);

module.exports = router;
