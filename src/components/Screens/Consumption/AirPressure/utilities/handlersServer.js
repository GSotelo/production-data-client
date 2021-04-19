import connectAPI from "../../../../../api/connectAPI";
import processDataDeck from "../../../../../utils/processDataDeck";
import { axiosAirPressure } from "../../../../../api/axios";
import { propsToasterDanger } from "./props"
import { toaster } from "evergreen-ui";

/**
 * This function works in conjuction with HTTP GET requests
 * @param {*} id Helps to determine the endpoint for API requests
 * @param {*} timeRange String with value of either "day", "week", "month"
 * @returns String containing the API endpoint
 */
const getEndpoint = (currentValueDropdown, id, timeRange) => {
  let endpoint;

  const isDayRequesFromDeck = (id === "BottomAPD" || id === "TopAPD");

  if (isDayRequesFromDeck) {
    endpoint = `/${currentValueDropdown}/deck-${timeRange}`;
    return endpoint;
  }

  endpoint = `/${currentValueDropdown}/${timeRange}`;
  return endpoint;
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
      filteredData = await connectAPI.get(axiosAirPressure, endpoint);
    } catch (error) {
      toaster.danger(...propsToasterDanger);
      console.error("[connectServer]: Request to server API failed (GET)");
    }
    return filteredData;
  }

  /**
  * If date picker, then trigger HTTP POST requests
  */
  if (timeRangeIsArray) {
    const filename = `sensor_air_pressure_${currentValueDropdown}.csv`;
    let filteredData = false;
    try {
      filteredData = await connectAPI.post(axiosAirPressure, "/", { filename, timeRange })

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
    case "BottomAPD":
    case "TopAPD":
      data = processDataDeck.run(dataFromServer, timeRange);
      break;
    case "BottomAPT":
    case "TopAPT":
      data = dataFromServer
      break;
    default:
      break;
  }
  return data;
};

export default processDataFromServer;
