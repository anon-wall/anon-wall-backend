const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "이메일은 반드시 필요합니다."],
  },
  nickname: {
    type: String,
    unique: true,
    required: [true, "별명은 반드시 필요합니다."],
  },
  imageURL: {
    type: String,
  },
  notification: {
    type: Number,
    default: 60,
  },
  counselor: {
    familyTitle: {
      type: String,
      default: "효자효녀",
    },
    shortInput: {
      type: String,
      default: "안녕하세요 새로운 카운슬러입니다.",
    },
    longInput: {
      type: String,
      default: "저는 효자효녀로서 활동하고 있는 카운슬러입니다.",
    },
    tag: [
      {
        type: String,
        index: true,
      },
    ],
    validDate: [
      {
        day: String,
        start: String,
        end: String,
      },
    ],
  },
});

module.exports = mongoose.model("User", UserSchema);
