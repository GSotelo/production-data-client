import React from "react";

export const GraphContext = React.createContext({
  id: "Graph default id",
  currentValueDropdown: 1,
  getDataFromServer: () => { },
  updateDropdownState: () => { }
}
);

