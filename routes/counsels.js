const express = require("express");
const router = express.Router();

const {
  createCounsel,
  getCounsel,
  getCounselList,
  updateCounsel,
} = require("../controllers/counsels.controller");
const { checkObjectId } = require("../middlewares/validateObjectId");

router.post("/", createCounsel);
router.get("/", getCounselList);
router.post("/:counsel_id/counselors", checkObjectId, updateCounsel);
router.get("/:counsel_id", checkObjectId, getCounsel);

module.exports = router;
