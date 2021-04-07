import connectAPI from "../../../../../api/connectAPI";
import { axiosAirPressure } from "../../../../../api/axios";

/**
 * 
 * @param {*} id Helps to determine either the endpoint or filename for API requests
 * @param {*} timeRange A string or array of two "moment" objects
 * @returns Data to feed line chart according to "nivo" library
 */
export const connectServer = async (currentValueDropdown, timeRange) => {
  /**
   * Check is request comes from a control button or date picker
   */
  const timeRangeIsArray = timeRange instanceof Array;
  const timeRangeIsString = typeof timeRange === "string";

  /**
   * If control button, then triggers HTTP GET requests
   */
  if (timeRangeIsString) {
    const endpoint = `/${currentValueDropdown}/${timeRange}`;
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

