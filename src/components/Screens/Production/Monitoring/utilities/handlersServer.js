import connectAPI from "../../../../../api/connectAPI";
import { axiosMonitoring } from "../../../../../api/axios";
import { propsToasterDanger } from "./props";
import { toaster } from "evergreen-ui";

/**
 * This function works in conjuction with HTTP GET requests
 * @param {*} id Helps to determine the endpoint for API requests
 * @param {*} timeRange String with value of either "day", "week", "month"
 * @returns A string containing the API endpoint
 */
const getEndpoint = (id, timeRange) => {
  let endpoint;
  switch (id) {
    case "CVS":
      endpoint = `/conveyor-speed/${timeRange}`;
      break;
    case "LD":
      endpoint = `/line-density/${timeRange}`;
      break;
    case "CS":
      endpoint = `/coated-surface/${timeRange}`;
      break;
    case "RH":
      endpoint = `/running-hours/${timeRange}`;
      break;
    case "SM":
      endpoint = `/spray-mode/${timeRange}`;
      break;
    case "SYS":
      endpoint = `/system-status/${timeRange}`;
      break;
    case "CP":
      endpoint = `/coated-parts/${timeRange}`;
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
    case "CVS":
      filename = "conveyor_speed.csv";
      break;
    case "LD":
      filename = "line_density.csv";
      break;
    case "CS":
      filename = "coated_surface.csv";
      break;
    case "RH":
      filename = "running_hours.csv";
      break;
    case "SM":
      filename = "sprayed_mode.csv";
      break;
    case "SYS":
      filename = "system_status.csv";
      break;
    case "CP":
      filename = "coated_parts.csv";
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
export const connectServer = async (id, timeRange) => {
  let filteredData = false;

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
    try {
      filteredData = await connectAPI.get(axiosMonitoring, endpoint);
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
    const filename = getFilename(id);
    try {
      filteredData = await connectAPI.post(axiosMonitoring, "/", { filename, timeRange })
    } catch (error) {
      toaster.danger(...propsToasterDanger);
      console.error("[connectServer]: Request to server API failed (POST)");
    }
    return filteredData;
  }
};

// I create this wrapper to decorate "connectServer" in case needed
const processDataFromServer = async (id, timeRange) => await connectServer(id, timeRange);

export default processDataFromServer;


