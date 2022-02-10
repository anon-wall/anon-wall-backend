const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/authorization");
const { checkObjectId } = require("../middlewares/validateObjectId");
const {
  createCounsel,
  getCounselList,
  getReservedCounselList,
  updateCounsel,
  getCounsel,
} = require("../controllers/counsels.controller");

router.post("/", verifyToken, createCounsel);
router.get("/", getCounselList);
router.get("/reserved", getReservedCounselList);
router.post("/:counsel_id/counselors", checkObjectId, updateCounsel);
router.get("/:counsel_id", checkObjectId, getCounsel);

module.exports = router;
