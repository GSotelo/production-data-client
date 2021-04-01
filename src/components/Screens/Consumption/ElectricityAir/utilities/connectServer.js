import connectAPI from "../../../../../api/connectAPI";
import { axiosElectricityAir } from "../../../../../api/axios";

/**
 * This function works in conjuction with HTTP GET requests
 * @param {*} id Helps to determine the endpoint for API requests
 * @param {*} timeRange String with value of either "day", "week", "month"
 * @returns A string containing the API endpoint
 */
const getEndpoint = (currentValueDropdown, id, timeRange) => {
  let endpoint;
  switch (id) {
    case "ACD":
    case "ACT":
      endpoint = `/air/${currentValueDropdown}/${timeRange}`;
      break;
    case "ECD":
    case "ECT":
      endpoint = `/electricity/${currentValueDropdown}/${timeRange}`;
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
const getFilename = (currentValueDropdown, id) => {
  let filename;
  switch (id) {
    case "ACD":
    case "ACT":
      filename = `consumption_air_${currentValueDropdown}.csv`;
      break;
    case "ECD":
    case "ECT":
      filename = `consumption_electricity_${currentValueDropdown}.csv`;
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
export const connectServer = async (currentValueDropdown, id, timeRange) => {
  /**
   * Check is request comes from a control button or date picker
   */
  const timeRangeIsArray = timeRange instanceof Array;
  const timeRangeIsString = typeof timeRange === "string";

  /**
   * If control button, then triggers HTTP GET requests
   */
  if (timeRangeIsString) {
    const endpoint = getEndpoint(currentValueDropdown, id, timeRange);
    const filteredData = await connectAPI.get(axiosElectricityAir, endpoint);
    return filteredData;
  }

  /**
  * If date picker, then triggers HTTP POST requests
  */
  if (timeRangeIsArray) {
    const filename = getFilename(currentValueDropdown, id);
    const filteredData = await connectAPI.post(axiosElectricityAir, "/", { filename, timeRange })
    return filteredData;
  }
};

