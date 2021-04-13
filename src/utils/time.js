import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
//import utc from "dayjs/plugin/utc";
// import isoWeek from "dayjs/plugin/isoWeek";
// import duration from 'dayjs/plugin/duration';
// import isBetween from 'dayjs/plugin/isBetween';
// import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);

/**
 * Handlers
 */
export const createDateObject = dateAsString => {
  return dayjs.utc(dateAsString);
};

/**
 * 
 * @param {*} d1 Day.js object
 * @param {*} d2 Day.js object
 * @param {*} precision "day", "month", "year"
 * @returns Boolean
 */
export const isSame = (d1, d2, precision) => {
  return d1.isSame(d2, precision);
};

