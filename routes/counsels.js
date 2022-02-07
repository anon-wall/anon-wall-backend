const express = require("express");
const router = express.Router();

const {
  createCounsel,
  getCounsel,
  getCounselList,
} = require("../controllers/counsels.controller");
const { checkObjectId } = require("../middlewares/validateObjectId");

router.post("/", createCounsel);
router.get("/", getCounselList);
router.get("/:counsel_id", checkObjectId, getCounsel);

module.exports = router;
