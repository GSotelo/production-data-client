import connectAPI from "../../../../../api/connectAPI";
import { axiosPowderType } from "../../../../../api/axios";

/**
 * This function works in conjuction with HTTP GET requests
 * @param {*} id Helps to determine the endpoint for API requests
 * @param {*} timeRange String with value of either "day", "week", "month"
 * @returns A string containing the API endpoint
 */
const getEndpoint = (id, timeRange) => {
  let endpoint;
  switch (id) {
    case "CPT1":
      endpoint = `/types/t1/${timeRange}`;
      break;
    case "CPT2":
      endpoint = `/types/t2/${timeRange}`;
      break;
    default:
      break;
  }
  return endpoint;
};

/**
 * This function works in conjuction with HTTP POST requests
 * @param {*} id Helps to determine the filename for API requests
 * @returns 
 */
const getFilename = (id) => {
  let filename;
  switch (id) {
    case "CPT1":
      filename = "consumption_powder_type_1.csv"
      break;
    case "CPT2":
      filename = "consumption_powder_type_2.csv"
      break;
    default:
      break;
  }
  return filename;
}

/**
 * 
 * @param {*} id Helps to determine either the endpoint or filename for API requests
 * @param {*} timeRange A string or array of two "moment" objects
 * @returns Data to feed line chart according to "nivo" library
 */
export const connectServer = async (id, timeRange) => {
  /**
   * Check is request comes from a control button or date picker
   */
  const timeRangeIsArray = timeRange instanceof Array;
  const timeRangeIsString = typeof timeRange === "string";

  /**
   * If control button, then triggers HTTP GET requests
   */
  if (timeRangeIsString) {
    const endpoint = getEndpoint(id, timeRange);
    const filteredData = await connectAPI.get(axiosPowderType, endpoint);
    return filteredData;
  }

  /**
  * If date picker, then triggers HTTP POST requests
  */
  if (timeRangeIsArray) {
    const filename = getFilename(id);
    const filteredData = await connectAPI.post(axiosPowderType, "/", { filename, timeRange })
    return filteredData;
  }
};

