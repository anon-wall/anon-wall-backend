const express = require("express");
const router = express.Router();

const {
  getCounselor,
  updateUser,
  updateCounselorSchedule,
  deleteCounselorSchedule,
} = require("../controllers/users.controller");
const { verifyToken } = require("../middlewares/authorization");
const { checkObjectId } = require("../middlewares/validateObjectId");

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
