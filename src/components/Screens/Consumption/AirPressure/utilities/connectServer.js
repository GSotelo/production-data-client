import connectAPI from "../../../../../api/connectAPI";
import { axiosAirPressure } from "../../../../../api/axios";

/**
 * This function works in conjuction with HTTP GET requests
 * @param {*} id Helps to determine the endpoint for API requests
 * @param {*} timeRange String with value of either "day", "week", "month"
 * @returns A string containing the API endpoint
 */



const getEndpoint = (currentValueDropdown, id, timeRange) => {
  let endpoint;
  const isDayRequesFromDeck = (id === "BottomAPD" || id === "TopAPD") && timeRange === "day" ? true : false;

  // New try for blue card
  //const isDayRequesFromDeck = (id === "BottomAPD" || id === "TopAPD");


  if (isDayRequesFromDeck) {
    endpoint = `/${currentValueDropdown}/custom`;
    return endpoint;
  }

  endpoint = `/${currentValueDropdown}/${timeRange}`;
  return endpoint;
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
    const filteredData = await connectAPI.get(axiosAirPressure, endpoint);
    return filteredData;
  }

  /**
  * If date picker, then triggers HTTP POST requests
  */
  if (timeRangeIsArray) {
    const filename = `sensor_air_pressure_${currentValueDropdown}.csv`;
    const filteredData = await connectAPI.post(axiosAirPressure, "/", { filename, timeRange })
    return filteredData;
  }
};

