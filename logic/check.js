"use strict";

exports.__esModule = true;
exports.checkValidIdiom = checkValidIdiom;
var _idioms = require("./idioms");
function checkValidIdiom(word, strict = false) {
  if (!strict) return true;
  return Boolean((0, _idioms.getIdiom)(word));
}