const express = require("express");
const router = express.Router();

const { getCounselor, updateUser } = require("../controllers/users.controller");
const { checkObjectId } = require("../middlewares/validateObjectId");

router.get("/:user_id", checkObjectId, getCounselor);
router.patch("/:user_id", checkObjectId, updateUser);

module.exports = router;
