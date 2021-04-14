import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import * as isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import * as isBetween from "dayjs/plugin/isBetween";
import * as duration from "dayjs/plugin/duration";

// Extend "dayjs" configuration to use plugins
dayjs.extend(utc);
dayjs.extend(isSameOrBefore);

// Create "dayjs" object
export const createDateObject = dateAsString => {
  return dayjs.utc(dateAsString);
};
