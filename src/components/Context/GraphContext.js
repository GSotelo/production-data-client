import React from "react";

const GraphContext = React.createContext({
  id: "Graph default id",
  currentValueDropdown: 1,
  getDataFromServer: () => { },
  updateDropdownState: () => { }
}
);

export default GraphContext;
