import connectAPI from "../../../../../api/connectAPI";
import { axiosFreshPowder } from "../../../../../api/axios";

const getEndpoint = (id, timeRange) => {
  let endpoint;
  switch (id) {
    case "TFPT":
      endpoint = `/total/${timeRange}`;
      break;
    default:
      break;
  }
  return endpoint;
};

const getFilename = (id) => {
  let filename;
  switch (id) {
    case "TFPT":
      filename = "powder_total_fresh.csv"
      break;
    default:
      break;
  }
  return filename;
}

export const connectServer = async (id, timeRange) => {

  const timeRangeIsArray = timeRange instanceof Array;
  const timeRangeIsString = typeof timeRange === "string";

  if (timeRangeIsString) {
    const endpoint = getEndpoint(id, timeRange);
    const filteredData = await connectAPI.get(axiosFreshPowder, endpoint);
    return filteredData;
  }

  if (timeRangeIsArray) {
    const filename = getFilename(id);
    const filteredData = await connectAPI.post(axiosFreshPowder, "/", { filename, timeRange })
    return filteredData;
  }
};

