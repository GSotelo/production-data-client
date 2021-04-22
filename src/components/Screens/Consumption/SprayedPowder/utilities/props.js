import { ReactComponent as Recipe } from "../../../../../assets/svg/programEdit.svg";
import { ReactComponent as Total } from "../../../../../assets/svg/total.svg";

/**
 * General notes:
 * The following objects are used to give proper 
 * customization to the title bar contained in the 
 * "GraphContainer". Properties for card elements
 * are provided here too. I do this in a separate file 
 * because I don't want to populate the main flow 
 * of the screen with configuration data for inner
 * components. The title bar element can receive 
 * icons, description text, and dropdown elements 
 * based on the provided type
 */

/**
 * [propsTitleBarHST]: Title bar in "Humidity sensor" (trend)
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarSPCRT = {
  icon: <Recipe />,
  title: "Sprayed powder calculated - Recipe",
  type: 3
};

/**
 * [propsTitleBarSPCTT]: Title bar in "Temperature sensor" (trend)
 * Title bar: Dropdown, icon and description text (type 1)
 */
export const propsTitleBarSPCTT = {
  icon: <Total />,
  title: "Sprayed powder calculated - Total",
  type: 1
};

/**
 * [propsTitleBarHSD]: Title bar in "Humidity sensor" (deck)
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarSPCRD= {
  icon: <Recipe />,
  title: "Per recipe",
  type: 3
};

/**
 * [propsTitleBarSPCTD]: Title bar in "Temperature sensor" (deck)
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarSPCTD = {
  icon: <Total />,
  title: "Per total",
  type: 1
};

/**
 * [propsToasterDanger]: Alert configuration if API request fails
 */
export const propsToasterDanger = [
  "Error",
  {
    description: "Sensor device not found."
  }
];

/**
 * [propsDropdownHS]: Humidity sensor - dropdown options
 */
export const propsDropdownSPCR = {
  options: [
    { key: 1, text: "R-1", value: 1 },
    { key: 2, text: "R-2", value: 2 },
    { key: 3, text: "R-3", value: 3 },
    { key: 4, text: "R-4", value: 4 },
    { key: 5, text: "R-5", value: 5 }
  ]
};

