import React from "react";

export const GraphContext = React.createContext({
  id: "id",
  stateDropdown: "1",
  getDataFromServer: () => { },
  updateDropdownState: () => { }
}
);

