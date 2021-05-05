import { axiosBatchInformation } from "../../../../../api/axios";
import { propsToasterDanger } from "./props";
import { toaster } from "evergreen-ui";

export const getDataForTable = async () => {
  let response = false;
  try {
    response = await axiosBatchInformation.get("/batchs/all");
  } catch (error) {
    toaster.danger(...propsToasterDanger);
    console.error("[getDataForTable]: Request to server API failed (GET)");
  }

  return response;
};

