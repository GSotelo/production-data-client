import connectAPI from "../../../../../api/connectAPI";
import processDataDeck from "../../../../../utils/processDataDeck";
import { axiosHumidityTemperature } from "../../../../../api/axios";
import { propsToasterDanger } from "./props";
import { toaster } from "evergreen-ui";


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
};

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
    const endpoint = getEndpoint(currentValueDropdown, id, timeRange);
    let filteredData = false;
    try {
      filteredData = await connectAPI.get(axiosHumidityTemperature, endpoint);
    } catch (err) {
      toaster.danger(...propsToasterDanger);
      console.error("[connectServer]: Request to server API failed (GET)");
    }
    return filteredData;
  }

  /**
  * If date picker, then trigger HTTP POST requests
  */
  if (timeRangeIsArray) {
    const filename = getFilename(currentValueDropdown, id);
    let filteredData = false;
    try {
      filteredData = await connectAPI.post(axiosHumidityTemperature, "/", { filename, timeRange })
    } catch (error) {
      toaster.danger(...propsToasterDanger);
      console.error("[connectServer]: Request to server API failed (POST)");
    }
    return filteredData;
  }
};

/**
 * Data from server is either for "trend" or "deck" elements
 * If data is for a "deck" element, then further processing is needed
 * If data is for a "trend" element, then it goes straight forward
 */
const processDataFromServer = async (currentValueDropdown, id, timeRange) => {
  let data;
  const dataFromServer = await connectServer(currentValueDropdown, id, timeRange);

  switch (id) {
    case "HSD":
    case "TSD":
      data = processDataDeck.run(dataFromServer, timeRange);
      break;
    case "HST":
    case "TST":
      data = dataFromServer;
      break;
    default:
      break;
  }
  return data;
};

export default processDataFromServer;
