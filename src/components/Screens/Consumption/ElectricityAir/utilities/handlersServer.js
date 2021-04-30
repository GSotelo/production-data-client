import connectAPI from "../../../../../api/connectAPI";
import processDataDeck from "../../../../../utils/processDataDeck";
import { axiosElectricityAir } from "../../../../../api/axios";
import { propsToasterDanger } from "./props";
import { toaster } from "evergreen-ui";

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
      endpoint = `/air/${currentValueDropdown}/deck-${timeRange}`;
      break;
    case "ECD":
      endpoint = `/electricity/${currentValueDropdown}/deck-${timeRange}`;
      break;
    case "ACT":
      endpoint = `/air/${currentValueDropdown}/${timeRange}`;
      break;
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
};

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
    let filteredData = false;
    try {
      filteredData = await connectAPI.get(axiosElectricityAir, endpoint);
    } catch (error) {
      toaster.danger(...propsToasterDanger);
      console.error("[connectServer]: Request to server API failed (GET)");
    }
    return filteredData;
  }

  /**
  * If date picker, then triggers HTTP POST requests
  */
  if (timeRangeIsArray) {
    const filename = getFilename(currentValueDropdown, id);
    let filteredData = false;
    try {
      filteredData = await connectAPI.post(axiosElectricityAir, "/", { filename, timeRange })
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
    case "ACD":
    case "ECD":
      data = processDataDeck.run(dataFromServer, timeRange, 1);
      break;
    case "ACT":
    case "ECT":
      data = dataFromServer;
      break;
    default:
      break;
  }
  return data;
};

export default processDataFromServer;

export const getDataForDropdown = async (id, fallback) => {
  let response = false;
  try {
    response = await axiosElectricityAir.get(`/dropdowns/${id}`);
  } catch (error) {
    console.error("[getDataForDropdown]: Request to server API failed (GET)");
    return fallback;
  }

  return response.data;
};
