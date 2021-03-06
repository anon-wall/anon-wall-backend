const mongoose = require("mongoose");
const { uniqueNamesGenerator, names } = require("unique-names-generator");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "이메일은 유니크한 값이여야 합니다."],
    required: [true, "이메일은 반드시 필요합니다."],
  },
  nickname: {
    type: String,
    unique: [true, "닉네임은 유니크한 값이여야 합니다."],
    default: uniqueNamesGenerator({
      dictionaries: [names],
    }),
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
    availableDates: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: function () {
            return new mongoose.Types.ObjectId();
          },
        },
        type: { type: String },
        day: { type: Number },
        startHour: { type: Number },
        endHour: { type: Number },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
  },
});

module.exports = mongoose.model("User", UserSchema);
