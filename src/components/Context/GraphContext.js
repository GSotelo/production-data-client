import React from "react";

export const GraphContext = React.createContext({
  id: "id",
  requestData: () => { },
  stateDropdown: "1",
  updateDropdownState: () => { }
}
);

