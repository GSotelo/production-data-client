"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _time = require("./time");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAverage = function getAverage(arr) {
  if (_lodash["default"].isEmpty(arr)) {
    return 0;
  }

  return _lodash["default"].round(_lodash["default"].mean(arr), 2);
};

var getMaxValueFromArray = function getMaxValueFromArray(arr) {
  if (_lodash["default"].isEmpty(arr)) {
    return 0;
  }

  return _lodash["default"].round(_lodash["default"].max(arr), 2);
};

var getMinValueFromArray = function getMinValueFromArray(arr) {
  if (_lodash["default"].isEmpty(arr)) {
    return 0;
  }

  return _lodash["default"].round(_lodash["default"].min(arr), 2);
};

var getTotalValueFromArray = function getTotalValueFromArray(arr) {
  if (_lodash["default"].isEmpty(arr)) {
    return 0;
  }

  return _lodash["default"].round(_lodash["default"].sum(arr), 2);
};

var filterArrayByObjectProperty = function filterArrayByObjectProperty(arr, property) {
  if (_lodash["default"].isEmpty(arr)) {
    return false;
  }

  return _lodash["default"].map(arr, property);
};

var groupByIsSameorBeforeDate = function groupByIsSameorBeforeDate(arr, date, func, timeRange) {
  if (_lodash["default"].isEmpty(arr)) {
    return false;
  }

  if (!("x" in arr[0])) {
    return false;
  }

  return _lodash["default"].filter(arr, function (_ref) {
    var x = _ref.x;
    return func(x).isSameOrBefore(date, "day");
  });
};

var groupByAfterDate = function groupByAfterDate(arr, date, func, timeRange) {
  if (_lodash["default"].isEmpty(arr)) {
    return false;
  }

  if (!("x" in arr[0])) {
    return false;
  }

  return _lodash["default"].filter(arr, function (_ref2) {
    var x = _ref2.x;
    return func(x).isAfter(date, "day") === true;
  });
};
/**
 * 
 * @param {*} arr Array as data source
 * @param {*} date Date as string (i.e. "2021-04-08T23:59:00.000Z")
 * @param {*} func Function to create a "Dayjs" object from "date"
 * @param {*} timeRange String value as "day", "week", "month"
 * @returns Array with filtered data
 */


var groupDataByDate = function groupDataByDate(arr, breakpoint, func1, func2, func3, timeRange) {
  if (_lodash["default"].isEmpty(arr)) {
    return false;
  } // If "timeRange" comes from datepicker, there is no need to group data


  if (timeRange instanceof Array) {
    return {
      prevData: false,
      currentData: arr
    };
  }

  var prevData = func2(arr, breakpoint, func1, timeRange);
  var currentData = func3(arr, breakpoint, func1, timeRange);
  return {
    prevData: prevData,
    currentData: currentData
  };
};

var run = function run(data, fallbackData, timeRange) {
  // If API request fails, then "arr" holds "undefined" or "false"
  if (typeof data === "undefined" || data === false) {
    console.error("[groupDataByDate.run]: There is no data to process");
    return fallbackData;
  } // Divides "arr" in two parts: before and after breakpoint


  var breakpoint = (0, _time.createDateObject)(new Date()).subtract(1, timeRange);
  var argsGroupDataByDate = [data, breakpoint, _time.createDateObject, groupByIsSameorBeforeDate, groupByAfterDate, timeRange];
  var groupedData = groupDataByDate.apply(void 0, argsGroupDataByDate); // If group data fails, the result is "false"

  if (typeof groupedData == "boolean") {
    return fallbackData;
  } // Destructuring grouped data


  if (!("prevData" in groupedData) || !("currentData" in groupedData)) {
    return fallbackData;
  } // Grouped data


  return groupedData;
};

var groupData = {
  getAverage: getAverage,
  getMaxValueFromArray: getMaxValueFromArray,
  getMinValueFromArray: getMinValueFromArray,
  getTotalValueFromArray: getTotalValueFromArray,
  run: run
};
var _default = groupData;
exports["default"] = _default;