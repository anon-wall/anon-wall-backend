const express = require("express");
const router = express.Router();

const {
  getCounselor,
  updateUser,
  updateCounselorSchedule,
} = require("../controllers/users.controller");
const { checkObjectId } = require("../middlewares/validateObjectId");

router.get("/:user_id", checkObjectId, getCounselor);
router.patch("/:user_id", checkObjectId, updateUser);
router.post(
  "/:user_id/counselor/availableDates",
  checkObjectId,
  updateCounselorSchedule
);

module.exports = router;
