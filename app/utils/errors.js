exports.makeError = function (errorCode, message) {
  return JSON.stringify({ errorCode, message });
};
