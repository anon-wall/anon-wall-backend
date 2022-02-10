const RESPONSE = {
  SUCCESS: "success",
  FAIL: "fail",
};

const MESSAGE = {
  BAD_REQUEST: "유효하지 않은 접근입니다.",
  UNAUTHORIZED: "유효하지 않은 권한입니다.",
  INVALID_OBJECT_ID: "유효하지 않은 object id입니다.",
  UNAVAILABLE_DATE: "선택하신 날짜는 예약 할 수 없습니다.",
  DUPLICATE_REQUEST: "사연 수락은 한번만 할 수 있습니다.",
};

module.exports = { RESPONSE, MESSAGE };
