const express = require("express");
const router = express.Router();

const { checkObjectId } = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/authorization");
const {
  createCounsel,
  getCounselList,
  getReservedCounselList,
  getCounsel,
  updateCounsel,
  updateCounselors,
  getSchedules,
} = require("../controllers/counsels.controller");

router.post("/", verifyToken, createCounsel);
router.get("/", getCounselList);
router.get("/reserved", verifyToken, getReservedCounselList);
router.get("/schedules", verifyToken, getSchedules);
router.get("/:counsel_id", verifyToken, checkObjectId, getCounsel);
router.post(
  "/:counsel_id/counselors/:user_id",
  verifyToken,
  checkObjectId,
  updateCounsel
);
router.post(
  "/:counsel_id/counselors",
  verifyToken,
  checkObjectId,
  updateCounselors
);

module.exports = router;
