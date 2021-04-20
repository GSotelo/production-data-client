import connectAPI from "../../../../../api/connectAPI";
import processDataDeck from "../../../../../utils/processDataDeck";
import { axiosFreshPowder } from "../../../../../api/axios";
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
    case "TFPT":
      endpoint = `/total/${timeRange}`;
      break;
    case "TFPD":
      endpoint = `/total/deck-${timeRange}`;
      break;
    case "SHDT":
      endpoint = `/spectrum/deck-${timeRange}`;
      break;
    case "BBT":
      endpoint = `/bigbag/${currentValueDropdown}/deck-${timeRange}`;
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
    case "TFPD":
    case "TFPT":
      filename = "powder_total_fresh.csv";
      break;
    case "SHDT":
      filename = "powder_spectrum.csv";
      break;
    case "BBT":
      filename = `powder_big_bag_${currentValueDropdown}.csv`;
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
   * If control button, then triggers HTTP GET requests
   */
  if (timeRangeIsString) {
    const endpoint = getEndpoint(currentValueDropdown, id, timeRange);
    let filteredData = false;
    try {
      filteredData = await connectAPI.get(axiosFreshPowder, endpoint);
    } catch (err) {
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
      filteredData = await connectAPI.post(axiosFreshPowder, "/", { filename, timeRange })
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

  const dataFromServer = await connectServer(currentValueDropdown, id, timeRange);

  if (id === "TFPT") {
    return dataFromServer;
  }

  const dataDeck = processDataDeck.run(dataFromServer, timeRange, 2);
  if (id === "TFPD") {
    return dataDeck;
  }

  if (id === "SHDT" || id === "BBT") {
    return { dataTrend: dataDeck.currentData, dataDeck };
  }
};

export default processDataFromServer;
