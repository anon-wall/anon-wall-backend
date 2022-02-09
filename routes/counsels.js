const express = require("express");
const router = express.Router();

const { checkObjectId } = require("../middlewares/validateObjectId");
const { pagination } = require("../middlewares/pagination");
const {
  createCounsel,
  getCounselList,
  updateCounsel,
  getCounsel,
} = require("../controllers/counsels.controller");

router.post("/", createCounsel);
router.get("/", pagination, getCounselList);
router.post("/:counsel_id/counselors", checkObjectId, updateCounsel);
router.get("/:counsel_id", checkObjectId, getCounsel);

module.exports = router;
