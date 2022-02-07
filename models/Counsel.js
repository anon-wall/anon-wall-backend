const mongoose = require("mongoose");

const counselSchema = new mongoose.Schema({
  counselee: {
    type: String,
    required: [true, "카운슬리는 반드시 필요합니다."],
  },
  counselor: {
    type: String,
    index: true,
  },
  title: {
    type: String,
    maxlength: [30, "사연 제목의 최대 길이는 30자입니다."],
    required: [true, "사연 제목은 반드시 필요합니다."],
  },
  content: {
    type: String,
    maxlength: [2000, "사연 내용의 최대 길이는 2000자입니다."],
    required: [true, "사연 내용은 반드시 필요합니다."],
  },
  tag: [
    {
      type: String,
      validate: {
        validator: function () {
          return this.tag.length <= 10;
        },
        message: "태그는 10개를 초과할 수 없습니다.",
      },
    },
  ],
  createdAt: {
    type: Date,
    required: [true, "작성일은 반드시 필요합니다."],
  },
  counselors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Counsel", counselSchema);
