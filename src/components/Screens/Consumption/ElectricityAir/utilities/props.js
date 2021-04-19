import { ReactComponent as AirFlow } from "../../../../../assets/svg/airFlow.svg";
import { ReactComponent as Energy } from "../../../../../assets/svg/energy.svg";

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
 * [propsTitleBarECT]: Title bar in "Electricity consumption" (trend)
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarECT = {
  icon: <Energy />,
  title: "Electricity consumption",
  type: 3
};

/**
 * [propsTitleBarACT]: Title bar in "Air consumption" (trend)
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarACT = {
  icon: <AirFlow />,
  title: "Air consumption",
  type: 3
};

/**
 * [propsTitleBarECD]: Title bar in "Electricity consumption" deck
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarECD = {
  icon: <Energy />,
  title: "Electricity consumption",
  type: 3
};

/**
 * [propsTitleBarACD]: Title bar in "Air consumption" deck
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarACD = {
  icon: <AirFlow />,
  title: "Air consumption",
  type: 3
};

/**
 * [propsToasterDanger]: Alert configuration if API request fails
 */
 export const propsToasterDanger = [
  "Error",
  {
    description:"Sensor device not found."
  }
];

/**
 * [propsDropdownEC]: Electricity comsumption - dropdown options
 */
 export const propsDropdownEC = {
  options : [
    { key: 1, text: "EC-1", value: 1 },
    { key: 2, text: "EC-2", value: 2 },
    { key: 3, text: "EC-3", value: 3 },
    { key: 4, text: "EC-4", value: 4 },
    { key: 5, text: "EC-5", value: 5 }
  ]
};

/**
 * [propsDropdownAC]: Air comsumption - dropdown options
 */
 export const propsDropdownAC = {
  options : [
    { key: 1, text: "AC-1", value: 1 },
    { key: 2, text: "AC-2", value: 2 },
    { key: 3, text: "AC-3", value: 3 },
    { key: 4, text: "AC-4", value: 4 },
    { key: 5, text: "AC-5", value: 5 }
  ]
};