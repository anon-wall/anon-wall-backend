const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/authorization");
const { checkObjectId } = require("../middlewares/validateObjectId");
const {
  createCounsel,
  getCounselList,
  getReservedCounselList,
  getCounsel,
  updateCounsel,
  updateCounselors,
} = require("../controllers/counsels.controller");

router.post("/", verifyToken, createCounsel);
router.get("/", getCounselList);
router.get("/reserved", getReservedCounselList);
router.get("/:counsel_id", checkObjectId, getCounsel);
router.post("/:counsel_id/counselors/:user_id", checkObjectId, updateCounsel);
router.post("/:counsel_id/counselors", checkObjectId, updateCounselors);

module.exports = router;
