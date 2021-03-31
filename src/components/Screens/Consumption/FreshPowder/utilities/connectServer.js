import connectAPI from "../../../../../api/connectAPI";
import { axiosFreshPowder } from "../../../../../api/axios";

/**
 * This function works in conjuction with HTTP GET requests
 * @param {*} id Helps to determine the endpoint for API requests
 * @param {*} timeRange String with value of either "day", "week", "month"
 * @returns A string containing the API endpoint
 */
const getEndpoint = (id, timeRange) => {
  let endpoint;
  switch (id) {
    case "TFPT":
    case "TFPD":
      endpoint = `/total/${timeRange}`;
      break;
    case "SHDT":
      endpoint = `/spectrum/${timeRange}`;
      break;
    case "BBT":
      endpoint = `/bigbag/${timeRange}`;
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
    case "TFPD":
    case "TFPT":
      filename = "powder_total_fresh.csv"
      break;
    case "SHDT":
      filename = "powder_spectrum.csv"
      break;
    case "BBT":
      filename = "powder_big_bag.csv"
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
    const filteredData = await connectAPI.get(axiosFreshPowder, endpoint);
    return filteredData;
  }

   /**
   * If date picker, then triggers HTTP POST requests
   */
  if (timeRangeIsArray) {
    const filename = getFilename(id);
    const filteredData = await connectAPI.post(axiosFreshPowder, "/", { filename, timeRange })
    return filteredData;
  }
};

