import connectAPI from "../../../../../api/connectAPI";
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
    case "TFPD":
      endpoint = `/total/${timeRange}`;
      break;
    case "SHDT":
      endpoint = `/spectrum/${timeRange}`;
      break;
    case "BBT":
      endpoint = `/bigbag/${currentValueDropdown}/${timeRange}`;
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
    // const endpoint = getEndpoint(id, timeRange);
    // const filteredData = await connectAPI.get(axiosFreshPowder, endpoint);
    // return filteredData;

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
    // const filename = getFilename(id);
    // const filteredData = await connectAPI.post(axiosFreshPowder, "/", { filename, timeRange })
    // return filteredData;

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


// WORKING HERE....
//const ids = ["TFPT", "TFPD", "SHDT", "BBT"];

/**
 * Data from server is either for "trend" or "deck" elements
 * If data is for a "deck" element, then further processing is needed
 * If data is for a "trend" element, then it goes straight forward
 */
 const processDataFromServer = async (currentValueDropdown, id, timeRange) => {
  let data;
  const dataFromServer = await connectServer(currentValueDropdown, id, timeRange);

  switch (id) {
    case "TFPD":
      //data = processDataDeck.run(dataFromServer, timeRange);
      data = "data for deck";
      break;
    case "BBT":
    case "SHDT":
    case "TFPT":
      data = dataFromServer;
      break;
    default:
      break;
  }
  console.log("FROM PROCESS DATA FROM SERVER:", data);
  return data;
};

export default processDataFromServer;
