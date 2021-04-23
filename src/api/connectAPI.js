/**
 * 
 * @param {*} arr Axios response
 * @returns Array holding data formatted based on "nivo" requirements
 */
const filterDataFromAPI = (arr) => {
  const results = [];
  arr.map(({ timestamp, value }) => results.push({ x: timestamp, y: value }));
  return results;
};

const get = async (axios, endpoint) => {
  const response = await axios.get(endpoint);
  return filterDataFromAPI(response.data);
};

const filterMultipleDataFromAPI = (res) => {
  const [file1, file2] = res;
  return [filterDataFromAPI(file1), filterDataFromAPI(file2)];
};

const getMultipleResources = async (axios, endpoint) => {
  const response = await axios.get(endpoint);
  return filterMultipleDataFromAPI(response.data);
};

const postAPI = async (serverAPI, endpoint, { timeRange, filename }) => {
  const body = {
    endDate: new Date(timeRange[1]._d).toISOString(),
    startDate: new Date(timeRange[0]._d).toISOString(),
    filename: filename
  }
  const response = await serverAPI.post(endpoint, body);
  return filterDataFromAPI(response.data);
};

const connectAPI = {
  get,
  getMultipleResources,
  post: postAPI
};

export default connectAPI;
