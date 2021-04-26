"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _time = require("./time");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 
 * @param {*} arr Array as data source
 * @returns Number holding the average value in the array
 */
var getAverage = function getAverage(arr) {
  if (_lodash["default"].isEmpty(arr)) {
    return 0;
  }

  return _lodash["default"].round(_lodash["default"].mean(arr), 2);
};
/**
 * 
 * @param {*} arr Array as data source
 * @returns Number holding the maximum value in the array
 */


var getMaxValueFromArray = function getMaxValueFromArray(arr) {
  if (_lodash["default"].isEmpty(arr)) {
    return 0;
  }

  return _lodash["default"].round(_lodash["default"].max(arr), 2);
};
/**
 * 
 * @param {*} arr Array as data source
 * @returns Number holding the minimum value in the array
 */


var getMinValueFromArray = function getMinValueFromArray(arr) {
  if (_lodash["default"].isEmpty(arr)) {
    return 0;
  }

  return _lodash["default"].round(_lodash["default"].min(arr), 2);
};
/**
 * 
 * @param {*} arr Array as data source
 * @returns Number holding the sum of all values in the array
 */


var getTotalValueFromArray = function getTotalValueFromArray(arr) {
  if (_lodash["default"].isEmpty(arr)) {
    return 0;
  }

  return _lodash["default"].round(_lodash["default"].sum(arr), 2);
};
/**
 * 
 * @param {*} arr Array as data source
 * @param {*} property Object property
 * @returns Generates an array containing the values of the extracted property
 */


var filterArrayByObjectProperty = function filterArrayByObjectProperty(arr, property) {
  if (_lodash["default"].isEmpty(arr)) {
    return false;
  }

  return _lodash["default"].map(arr, property);
};
/**
 * 
 * @param {*} arr Array as data source
 * @param {*} date Date as string (i.e. "2021-04-08T23:59:00.000Z")
 * @param {*} func Function to create a "Dayjs" object from "date"
 * @param {*} timeRange String value as "day", "week", "month"
 * @returns Array with filtered data
 */


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
/**
 * 
 * @param {*} arr Array should contain objets, which MUST have "x"(timestamp) as property
 * @param {*} date String format (i.e. "2021-04-08T23:59:00.000Z")
 * @param {*} func Function used to convert date (string) into a "dayjs" object
 * @returns Array holding elements, which have timestamps after the "date" parameter provided
 */


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
 * @param {*} breakpoint Date used to split the "arr" in two parts (before and after date)
 * @param {*} func1 Create "Dayjs" object
 * @param {*} func2 Group data if element in "arr" is same or before "breakpoint"
 * @param {*} func3 Group data if element in "arr" is after "breakpoint"
 * @param {*} timeRange String with value of either "day", "week", "month"
 * @returns Object holding splitted data based on "breakpoint"
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
/**
 * 
 * @param {*} timeRange String value as "day", "week", "month"
 * @param {*} value Number
 * @param {*} previousValue Number
 * @returns String
 */


var setFooterLabel = function setFooterLabel(timeRange, value, previousValue) {
  var msg; // Previous day, previous week, previous month

  var indicator; // ▲, ▼, ▬

  if (!previousValue) {
    return "Not available";
  } // Switch "indicator" based on "value" and "previousValue"


  if (value < previousValue) {
    indicator = "▼";
  }

  if (value === previousValue) {
    indicator = "▬";
  }

  if (value > previousValue) {
    indicator = "▲";
  } // Switch "msg" based on time range


  switch (timeRange) {
    case "day":
      msg = "".concat(indicator, " Previous day");
      break;

    case "week":
      msg = "".concat(indicator, " Previous week");
      break;

    case "month":
      msg = "".concat(indicator, " Previous month");
      break;

    default:
      break;
  }

  if (timeRange instanceof Array) {
    msg = "Not available";
  }

  return msg;
};
/**
 * 
 * @param {*} timeRange String value as "day", "week", "month", array
 * @param {*} prevValue Number
 * @param {*} unit Number
 * @returns String
 */


var setFooterValue = function setFooterValue(timeRange, prevValue, unit) {
  if (timeRange instanceof Array) {
    return "--.--";
  }

  if (!prevValue) {
    return "--.--";
  }

  return "".concat(prevValue, " ").concat(unit);
};
/**
 * 
 * @param {*} breakpoint Date used to split the "arr" in two parts (before and after date)
 * @param {*} currentData Dates after the setpoint
 * @param {*} prevData Dates before athe setpoint
 * @returns Object
 */


var createDataForDeckType1 = function createDataForDeckType1(breakpoint, currentData, prevData) {
  /**
   * Each object in the array has the shape simlar to {x:"2021-04-14T23:58:00.000Z", y: 11 }
   * x: time stamp
   * y: process variable value
   */
  // Filter "y" values from grouped data
  var yValueCurrentData = filterArrayByObjectProperty(currentData, "y");
  var yValuePrevData = filterArrayByObjectProperty(prevData, "y"); // Get highest peak value from grouped data

  var yMaxValueCurrentData = getMaxValueFromArray(yValueCurrentData); // Get lowest peak value from grouped data

  var yMinValueCurrentData = getMinValueFromArray(yValueCurrentData); // Get average value from grouped data

  var avgPrevData = getAverage(yValuePrevData);
  var avgCurrentData = getAverage(yValueCurrentData);
  console.log("Breakpoint", breakpoint);
  console.log("Same or Before break point, ", prevData);
  console.log("After breakpoint, ", currentData);
  console.log("Maximum current value", yMaxValueCurrentData);
  console.log("Minimum current value", yMinValueCurrentData);
  console.log("Average current value", avgCurrentData);
  console.log("Average previous value", avgPrevData);
  return {
    prevData: prevData,
    currentData: currentData,
    average: {
      avgTimeRange: avgCurrentData,
      avgPrevTimeRange: avgPrevData
    },
    maxValue: yMaxValueCurrentData,
    minValue: yMinValueCurrentData
  };
}; // WORKING HERE...


var createDataForDeckType2 = function createDataForDeckType2(breakpoint, currentData, prevData) {
  /**
  * Each object in the array has the shape simlar to {x:"2021-04-14T23:58:00.000Z", y: 11 }
  * x: time stamp
  * y: process variable value
  */
  // Filter "y" values from grouped data
  var yValueCurrentData = filterArrayByObjectProperty(currentData, "y");
  var yValuePrevData = filterArrayByObjectProperty(prevData, "y"); // Get average value from grouped data

  var avgPrevData = getAverage(yValuePrevData);
  var avgCurrentData = getAverage(yValueCurrentData); // Get average value from grouped data

  var totalPrevData = getTotalValueFromArray(yValuePrevData);
  var totalCurrentData = getTotalValueFromArray(yValueCurrentData);
  console.log("Breakpoint", breakpoint);
  console.log("Samr or Before break point, ", prevData);
  console.log("After breakpoint, ", currentData);
  console.log("Total current value", totalCurrentData);
  console.log("Total previous value", totalPrevData);
  console.log("Average current value", avgCurrentData);
  console.log("Average previous value", avgPrevData);
  return {
    prevData: prevData,
    currentData: currentData,
    average: {
      avgTimeRange: avgCurrentData,
      avgPrevTimeRange: avgPrevData
    },
    total: {
      totalTimeRange: totalCurrentData,
      totalPrevTimeRange: totalPrevData
    }
  };
};
/**
 * 
 * @param {*} arr Array as data source
 * @param {*} timeRange timeRange String with value of either "day", "week", "month"
 * @param {*} type Fallback data selecter. Type 1: Fallback for AMM. Type2: Fallback for TA
 * @returns Object
 */


var run = function run(arr, timeRange, type) {
  var fallbackData;
  /**
   * Fallback data (when a dropdown element targets a csv, which does not exist)
   * Type 1: For deck element holding "average", "maximum", "minimum" values
   * Type 2: For deck element holding "total" and "average" values
   */

  if (type === 1) {
    fallbackData = {
      average: {
        avgTimeRange: -1,
        avgPrevTimeRange: -1
      },
      maxValue: -1,
      minValue: -1
    };
  }

  if (type === 2) {
    fallbackData = {
      average: {
        avgTimeRange: -1,
        avgPrevTimeRange: -1
      },
      total: {
        totalTimeRange: -1,
        totalPrevTimeRange: -1
      }
    };
  }

  console.log("Data from express server: ", arr); // If API request fails, then "arr" holds "undefined"

  if (typeof arr === "undefined" || arr === false) {
    console.error("[processDataDeck.run]: There is no data to process");
    return fallbackData;
  }
  /**
   * If "timeRange" is sent by datepicker,
   * there is no need to divide the data into
   * two groups
   */
  // Separates "arr" data in two parts: before and after date


  var breakpoint = (0, _time.createDateObject)(new Date()).subtract(1, timeRange);
  var argsGroupDataByDate = [arr, breakpoint, _time.createDateObject, groupByIsSameorBeforeDate, groupByAfterDate, timeRange];
  var groupedData = groupDataByDate.apply(void 0, argsGroupDataByDate); // If group data fails, the result is "false"

  if (typeof groupedData == "boolean") {
    return fallbackData;
  } // Destructuring grouped data


  if (!("prevData" in groupedData) || !("currentData" in groupedData)) {
    return fallbackData;
  } // Grouped data


  var prevData = groupedData.prevData,
      currentData = groupedData.currentData; // Deck: high, maximum, minimum values

  if (type === 1) {
    return createDataForDeckType1(breakpoint, currentData, prevData);
  } // Deck: Total, average


  if (type === 2) {
    return createDataForDeckType2(breakpoint, currentData, prevData);
  }
};

var processDataDeck = {
  filterArrayByObjectProperty: filterArrayByObjectProperty,
  getAverage: getAverage,
  getMaxValueFromArray: getMaxValueFromArray,
  getMinValueFromArray: getMinValueFromArray,
  getTotalValueFromArray: getTotalValueFromArray,
  groupDataByDate: groupDataByDate,
  setFooterLabel: setFooterLabel,
  setFooterValue: setFooterValue,
  run: run
};
var _default = processDataDeck;
exports["default"] = _default;