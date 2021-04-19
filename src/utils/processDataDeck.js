import _ from "lodash";
import { createDateObject } from "./time";

/**
 * 
 * @param {*} arr Array as data source
 * @returns Number holding the average value in the array
 */
const getAverage = (arr) => {
  if (_.isEmpty(arr)) {
    return 0;
  }
  return _.round(_.mean(arr), 2);
};

/**
 * 
 * @param {*} arr Array as data source
 * @returns Number holding the maximum value in the array
 */
const getMaxValueFromArray = (arr) => {
  if (_.isEmpty(arr)) {
    return 0;
  }
  return _.round(_.max(arr), 2);;
};

/**
 * 
 * @param {*} arr Array as data source
 * @returns Number holding the minimum value in the array
 */
const getMinValueFromArray = (arr) => {
  if (_.isEmpty(arr)) {
    return 0;
  }
  return _.round(_.min(arr), 2);
};

/**
 * 
 * @param {*} arr Array as data source
 * @param {*} property Object property
 * @returns Generates an array containing the values of the extracted property
 */
const filterArrayByObjectProperty = (arr, property) => {
  if (_.isEmpty(arr)) {
    return false;
  }
  return _.map(arr, property);
};

/**
 * 
 * @param {*} arr Array as data source
 * @param {*} date Date as string (i.e. "2021-04-08T23:59:00.000Z")
 * @param {*} func Function to create a "Dayjs" object from "date"
 * @param {*} timeRange String value as "day", "week", "month"
 * @returns Array with filtered data
 */
const groupByIsSameorBeforeDate = (arr, date, func, timeRange) => {
  if (_.isEmpty(arr)) {
    return false;
  }

  if (!("x" in arr[0])) {
    return false;
  }

  return _.filter(arr, ({ x }) => func(x).isSameOrBefore(date, timeRange));
};

/**
 * 
 * @param {*} arr Array should contain objets, which MUST have "x"(timestamp) as property
 * @param {*} date String format (i.e. "2021-04-08T23:59:00.000Z")
 * @param {*} func Function used to convert date (string) into a "dayjs" object
 * @returns Array holding elements, which have timestamps after the "date" parameter provided
 */
const groupByAfterDate = (arr, date, func, timeRange) => {
  if (_.isEmpty(arr)) {
    return false;
  }

  if (!("x" in arr[0])) {
    return false;
  }

  return _.filter(arr, ({ x }) => func(x).isAfter(date, timeRange) === true);
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
const groupDataByDate = (arr, breakpoint, func1, func2, func3, timeRange) => {
  if (_.isEmpty(arr)) {
    return false;
  }

  // If "timeRange" comes from datepicker, there is no need to group data
  if (timeRange instanceof Array) {
    return { prevData: false, currentData: arr };
  }

  const prevData = func2(arr, breakpoint, func1, timeRange);
  const currentData = func3(arr, breakpoint, func1, timeRange);
  return { prevData, currentData };
};

/**
 * 
 * @param {*} timeRange String value as "day", "week", "month"
 * @param {*} value Number
 * @param {*} previousValue Number
 * @returns String
 */
const setFooterLabel = (timeRange, value, previousValue) => {
  let msg; // Previous day, previous week, previous month
  let indicator; // ▲, ▼, ▬

  if (!previousValue) {
    return "Not available";
  }

  // Switch "indicator" based on "value" and "previousValue"
  if (value < previousValue) {
    indicator = "▼";
  }

  if (value === previousValue) {
    indicator = "▬";
  }

  if (value > previousValue) {
    indicator = "▲";
  }

  // Switch "msg" based on time range
  switch (timeRange) {
    case "day":
      msg = `${indicator} Previous day`;
      break;
    case "week":
      msg = `${indicator} Previous week`;
      break;
    case "month":
      msg = `${indicator} Previous month`;
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
const setFooterValue = (timeRange, prevValue, unit) => {
  if (timeRange instanceof Array) {
    return "--.--";
  }

  if (!prevValue) {
    return "--.--";
  }

  return `${prevValue} ${unit}`;
};

const run = (arr, timeRange) => {

  // The "fallbackData" structure matches the state object
  const fallbackData = {
    average: {
      avgTimeRange: -1,
      avgPrevTimeRange: -1
    },
    maxValue: -1,
    minValue: -1
  };

  console.log("Data from express server: ", arr);

  // If API request fails, then "arr" holds "undefined"
  if (typeof arr === "undefined") {
    return fallbackData;
  }

  /**
   * If "timeRange" is sent by datepicker,
   * there is no need to divide the data into
   * two groups
   */
  // Separate "arr" data in two parts: before and after date
  const breakpoint = createDateObject(new Date()).subtract(1, timeRange);
  const argsGroupDataByDate = [
    arr,
    breakpoint,
    createDateObject,
    groupByIsSameorBeforeDate,
    groupByAfterDate,
    timeRange
  ];

  const groupedData = groupDataByDate(...argsGroupDataByDate);

  // If group data fails, the result is "false"
  if (typeof groupedData == "boolean") {
    return fallbackData;
  }

  // Destructuring grouped data
  if (!("prevData" in groupedData) || !("currentData" in groupedData)) {
    return fallbackData;
  }

  const { prevData, currentData } = groupedData;

  /**
   * Each object in the array has the shape simlar to {x:"2021-04-14T23:58:00.000Z", y: 11 }
   * x: time stamp
   * y: process variable value
   */
  // Filter "y" values from grouped data
  const yValueCurrentData = filterArrayByObjectProperty(currentData, "y")
  const yValuePrevData = filterArrayByObjectProperty(prevData, "y")

  // Get highest peak value from grouped data
  const yMaxValueCurrentData = getMaxValueFromArray(yValueCurrentData)

  // Get lowest peak value from grouped data
  const yMinValueCurrentData = getMinValueFromArray(yValueCurrentData)

  // Get average value from grouped data
  const avgPrevData = getAverage(yValuePrevData);
  const avgCurrentData = getAverage(yValueCurrentData);

  console.log("Breakpoint",breakpoint );
  console.log("Before break point, ", prevData);
  console.log("After breakpoint, ", currentData);
  console.log("Maximum current value", yMaxValueCurrentData);
  console.log("Minimum current value", yMinValueCurrentData);
  console.log("Average current value", avgCurrentData);
  console.log("Average previous value", avgPrevData);

  return {
    average: {
      avgTimeRange: avgCurrentData,
      avgPrevTimeRange: avgPrevData
    },
    maxValue: yMaxValueCurrentData,
    minValue: yMinValueCurrentData
  };
}

const processDataDeck = {
  run,
  setFooterLabel,
  setFooterValue
};

export default processDataDeck;