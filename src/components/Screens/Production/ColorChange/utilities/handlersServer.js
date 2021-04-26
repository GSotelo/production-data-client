import connectAPI from "../../../../../api/connectAPI";
import processDataDeck from "../../../../../utils/processDataDeck";
import groupData from "../../../../../utils/groupDataByDate";
import _ from "lodash";

import { axiosColorChange } from "../../../../../api/axios";
import { propsToasterDanger } from "./props";
import { toaster } from "evergreen-ui";

/**
 * This function works in conjuction with HTTP GET requests
 * @param {*} id Helps to determine the endpoint for API requests
 * @param {*} timeRange String with value of either "day", "week", "month"
 * @returns String containing the API endpoint
 */
const getEndpoint = (id, timeRange) => {
  let endpoint;
  switch (id) {
    case "CCA":
      endpoint = `/aborted/${timeRange}`;
      break;
    case "CCD":
      endpoint = `/duration/multi-${timeRange}`;
      break;
    case "CCQL":
      endpoint = `/quickest-longest/multi-${timeRange}`;
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
const getFilename = (id) => {
  let filename;
  switch (id) {
    case "CCA":
      filename = "color_change_aborted.csv";
      break;
    case "CCD":
      filename = "color_change_duration.csv";
      break;
    case "CCQL":
      filename = ["color_change_longest.csv", "color_change_quickest.csv"];
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
const connectServer = async (id, timeRange) => {
  /**
   * Check is request comes from a control button or date picker
   */
  const timeRangeIsArray = timeRange instanceof Array;
  const timeRangeIsString = typeof timeRange === "string";

  // Check if I should target more than one file as resource
  const isPreviousTimeRequired = (id === "CCQL");

  /**
   * If control button, then trigger HTTP GET requests
   */
  if (timeRangeIsString) {
    const endpoint = getEndpoint(id, timeRange);
    let filteredData = false;
    try {
      !isPreviousTimeRequired && (filteredData = await connectAPI.get(axiosColorChange, endpoint));
      isPreviousTimeRequired && (filteredData = await connectAPI.getMultipleResources(axiosColorChange, endpoint));
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
    const filename = getFilename(id);

    let filteredData = false;
    try {
      filteredData = await connectAPI.post(axiosColorChange, "/", { filename, timeRange })
    } catch (error) {
      toaster.danger(...propsToasterDanger);
      console.error("[connectServer]: Request to server API failed (POST)");
    }
    return filteredData;
  }
};


const processDataFromServer = async (id, timeRange) => {
  // If error, then "dataFromServer" equals to empty array
  const dataFromServer = await connectServer(id, timeRange);
  const isEmptyData = _.isEmpty(_.flatten(dataFromServer));

  if (isEmptyData) {
    return false;
  }
  
  return dataFromServer;
};

export default processDataFromServer;
