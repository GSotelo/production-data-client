const filterDataFromAPI = (arr) => {
  const results = [];
  arr.map(({ timestamp, value }) => results.push({ x: timestamp, y: value }));
  return results;
};

const get = async (axios, endpoint) => {
  const response = await axios.get(endpoint);
  return filterDataFromAPI(response.data);
  // try {
  //   const response = await axios.get(endpoint);
  //   return filterDataFromAPI(response.data);
  // } catch (err) {
  //   console.log(err);
  //   return false;
  // }
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
  post: postAPI
};

export default connectAPI;
