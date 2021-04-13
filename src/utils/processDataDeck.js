import _ from "lodash";
import { createDateObject } from "./time";

const getAverage = (arr, timeRange) => {

  /**
   * If API provides no data, the server responses with empty array
   * If so, then "exit" function
   */
  if (_.isEmpty(arr)) {
    return false;
  };

  // const date = createDateObject(arr[0].x);
  // const arrPreviousDay = groupBySameDate(arr, date, createDateObject);
  // const arrToday = groupByAfterDate(arr, date, createDateObject);

  const {
    currentTimeRangeData,
    previousTimeRangeData
  } = getDataForAverage(arr, groupBySameDate, groupByAfterDate, createDateObject, timeRange);

  // console.log("same date", arrPreviousDay);
  // console.log("after date", arrToday);
  console.log("FROM GET AVERAGE OUTER - same date", currentTimeRangeData);
  console.log("FROM GET AVERAGE OUTER - after date", previousTimeRangeData);

  // const meanToday = _.round(_.mean(_.map(arrToday, "y")), 2);
  // const meanPreviousDay = _.round(_.mean(_.map(arrPreviousDay, "y")), 2);
  const meanToday = _.round(_.mean(_.map(currentTimeRangeData, "y")), 2);
  const meanPreviousDay = _.round(_.mean(_.map(previousTimeRangeData, "y")), 2);

  return { meanToday, meanPreviousDay }
};

/**
 * 
 * @param {*} arr Data from API
 * @param {*} groupBySameDate Group by same date function
 * @param {*} groupByAfterDate Group by after date function
 * @param {*} createDayjsObj Convert string to Dayjs object
 * @param {*} timeRange String. It can be "day", "week", "month", "custom"
 * @returns 
 */
const getDataForAverage = (arr, groupBySameDate, groupByAfterDate, createDayjsObj, timeRange) => {
  /**
   * This is an extra guard, the calling / context function checks 
   * also if "arr" is empty before calling this function
   */
  if (_.isEmpty(arr)) {
    return false;
  }

  /**
   * The array contains objects like similar this: {x: "2021-04-13T03:58:00.000Z", y:51.4}
   * This shape is a MUST when using graphic "nivo" library
   */
  if (!arr[0] || !arr[0].x) {
    return false;
  }

  // Timestamp is a "Dayjs" object
  const timestamp = createDayjsObj(arr[0].x);

  const sameDateData = groupBySameDate(arr, timestamp, createDayjsObj, timeRange);
  const afterDateData = groupByAfterDate(arr, timestamp, createDayjsObj, timeRange);

  /**
   * There is always data held in "sameDateData".
   * In case of any unexpected behaviour, the function exits
   */
  if (_.isEmpty(sameDateData)) {
    return false;
  }

  /**
   * If "afterDateData" is empty, it means that 
   * there is no previous data for the selected 
   * timeframe. For example, if we click on the
   * control bar of any deck element, and the date
   * is 13.04.2021. To get information for the
   * average card, I would need data of 12.04.2021 as well.
   * In case there is not, then the card should
   * show only data regarding 13.04.2021. For the
   * previous day, let's show only --.--
   */
  if (_.isEmpty(afterDateData)) {
    return { currentTimeRangeData: sameDateData, previousTimeRangeData: "--.--" };
  }

  // Normal behaviour
  return { currentTimeRangeData: afterDateData, previousTimeRangeData: sameDateData };
};

/**
 * 
 * @param {*} arr Array should contain objets, which MUST have "x"(timestamp) as property
 * @param {*} date String format (i.e. "2021-04-08T23:59:00.000Z")
 * @param {*} func Function used to convert date (string) into a "dayjs" object
 * @returns Array holding elements, which have timestamps equal as the "date" parameter provided
 */
const groupBySameDate = (arr, date, func, timeRange) => _.filter(arr, ({ x }) => func(x).isSame(date, timeRange) === true);

/**
 * 
 * @param {*} arr Array should contain objets, which MUST have "x"(timestamp) as property
 * @param {*} date String format (i.e. "2021-04-08T23:59:00.000Z")
 * @param {*} func Function used to convert date (string) into a "dayjs" object
 * @returns Array holding elements, which have timestamps after the "date" parameter provided
 */
const groupByAfterDate = (arr, date, func, timeRange) => _.filter(arr, ({ x }) => func(x).isAfter(date, timeRange) === true);

const getHighPeak = (arr) => {
  return (_.max(_.map(arr, "y")));
};

const getLowPeak = (arr) => {
  return (_.min(_.map(arr, "y")));
};

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

const setFooterValue = (timeRange, prevValue, unit) => {
  if (timeRange instanceof Array) {
    return "--.--";
  }

  if (!prevValue) {
    return "--.--";
  }

  return `${prevValue} ${unit}`;
};

const processDataDeck = {
  getAverage,
  getHighPeak,
  getLowPeak,
  setFooterLabel,
  setFooterValue
};

export default processDataDeck;