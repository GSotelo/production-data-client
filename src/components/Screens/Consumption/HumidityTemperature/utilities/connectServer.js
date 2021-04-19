import connectAPI from "../../../../../api/connectAPI";
import { axiosHumidityTemperature } from "../../../../../api/axios";

/**
 * This function works in conjuction with HTTP GET requests
 * @param {*} id Helps to determine the endpoint for API requests
 * @param {*} timeRange String with value of either "day", "week", "month"
 * @returns String containing the API endpoint
 */
const getEndpoint = (currentValueDropdown, id, timeRange) => {
  let endpoint;
  switch (id) {
    case "HSD":
      endpoint = `/humidity/${currentValueDropdown}/deck-${timeRange}`;
      break;
    case "TSD":
      endpoint = `/temperature/${currentValueDropdown}/deck-${timeRange}`;
      break;
    case "HST":
      endpoint = `/humidity/${currentValueDropdown}/${timeRange}`;
      break;
    case "TST":
      endpoint = `/temperature/${currentValueDropdown}/${timeRange}`;
      break;
    default:
      break;
  }
  return endpoint;
};

/**
 * This function works in conjuction with HTTP POST requests
 * @param {*} id Helps to determine the filename for executing API requests
 * @returns String containing the filename
 */
const getFilename = (currentValueDropdown, id) => {
  let filename;
  switch (id) {
    case "HSD":
    case "HST":
      filename = `sensor_humidity_${currentValueDropdown}.csv`;
      break;
    case "TSD":
    case "TST":
      filename = `sensor_temperature_${currentValueDropdown}.csv`;
      break;
    default:
      break;
  }
  return filename;
}

/**
 * 
 * @param {*} id Helps to determine either the endpoint or filename for API requests
 * @param {*} timeRange String or array of two "moment" objects
 * @returns Data to feed line chart according to "nivo" library
 */
const connectServer = async (currentValueDropdown, id, timeRange) => {
  /**
   * Check is request comes from a control button or date picker
   */
  const timeRangeIsArray = timeRange instanceof Array;
  const timeRangeIsString = typeof timeRange === "string";

  /**
   * If control button, then trigger HTTP GET requests
   */
  if (timeRangeIsString) {
    // const endpoint = getEndpoint(currentValueDropdown, id, timeRange);
    // const filteredData = await connectAPI.get(axiosHumidityTemperature, endpoint);
    // return filteredData;
    const endpoint = getEndpoint(currentValueDropdown, id, timeRange);

    try {
      const filteredData = await connectAPI.get(axiosHumidityTemperature, endpoint);
      return filteredData;
    } catch (err) {
      console.error("[connectServer]: Request to server failed (GET)");
      return false;
    }
  }

  /**
  * If date picker, then trigger HTTP POST requests
  */
  if (timeRangeIsArray) {
    const filename = getFilename(currentValueDropdown, id);
    const filteredData = await connectAPI.post(axiosHumidityTemperature, "/", { filename, timeRange })
    return filteredData;
  }
};

export default connectServer