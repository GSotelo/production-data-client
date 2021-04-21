import { sprayedPowderAPI } from "../../../../../api/axios";

export const getFilenameEndpoint = (id, timeRange, recipe) => {
  let endpoint;
  let filename;
  switch (id) {
    case "SPCT":
      filename = "sprayed_powder_total.csv";
      endpoint = `/total/${timeRange}`;
      break;
    case "SPCR":
      filename = `sprayed_powder_recipe_${recipe}.csv`;
      endpoint = timeRange instanceof Array ? "/" : `/recipes/${recipe}/${timeRange}`;
      break;
    default:
      break;
  }
  return { filename, endpoint }
};

const filterDataFromAPI = (arr) => {
  const results = [];
  arr.map(({ timestamp, value }) => results.push({ x: timestamp, y: value }))
  return results;
};

const getAPI = async (endpoint) => {
  const response = await sprayedPowderAPI.get(endpoint);
  return filterDataFromAPI(response.data);
};

const postAPI = async (endpoint, { timeRange, filename }) => {
  const body = {
    endDate: new Date(timeRange[1]._d).toISOString(),
    startDate: new Date(timeRange[0]._d).toISOString(),
    filename: filename
  }
  const response = await sprayedPowderAPI.post(endpoint, body);
  return filterDataFromAPI(response.data);
};

export const connectAPI = {
  get: getAPI,
  post: postAPI
};
