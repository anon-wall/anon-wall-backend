const express = require("express");
const router = express.Router();

const {
  createCounsel,
  getCounsel,
} = require("../controllers/counsels.controller");
const { checkObjectId } = require("../middlewares/validateObjectId");

router.post("/", createCounsel);
router.get("/:counsel_id", checkObjectId, getCounsel);

module.exports = router;
