const express = require("express");
const router = express.Router();

const { checkObjectId } = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/authorization");
const {
  getUser,
  getCounselor,
  updateUser,
  updateCounselorSchedule,
  deleteCounselorSchedule,
} = require("../controllers/users.controller");

router.get("/", verifyToken, getUser);
router.get("/:user_id", verifyToken, checkObjectId, getCounselor);
router.patch("/:user_id", verifyToken, checkObjectId, updateUser);
router.post(
  "/:user_id/counselor/availableDates",
  verifyToken,
  checkObjectId,
  updateCounselorSchedule
);
router.delete(
  "/:user_id/counselor/availableDates/:id",
  verifyToken,
  checkObjectId,
  deleteCounselorSchedule
);

module.exports = router;
