import { ReactComponent as Humidity } from "../../../../../assets/svg/humidity.svg";
import { ReactComponent as Temperature } from "../../../../../assets/svg/temperature.svg";

import _ from "lodash";

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
export const propsTitleBarHST = {
  icon: <Humidity />,
  title: "Humidity sensor",
  type: 3
};

/**
 * [propsTitleBarHST]: Title bar in "Temperature sensor" (trend)
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarTST = {
  icon: <Temperature />,
  title: "Temperature sensor",
  type: 3
};

/**
 * [propsTitleBarHSD]: Title bar in "Humidity sensor" (deck)
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarHSD = {
  icon: <Humidity />,
  title: "Humidity sensor",
  type: 3
};

/**
 * [propsTitleBarTSD]: Title bar in "Temperature sensor" (deck)
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarTSD = {
  icon: <Temperature />,
  title: "Temperature sensor",
  type: 3
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
 * [propsDropdownTS]: Air comsumption - dropdown options
 */
 const numberOfTempSensors = _.range(1, 7);
 const createOptionDropdownTS = el => ({ key: el, text: `TS-${el}`, value: el });
 const dropdownOptionsTS = _.map(numberOfTempSensors, createOptionDropdownTS);
 export const propsDropdownTS = { options: dropdownOptionsTS };


/**
 * [propsDropdownHS]: Air comsumption - dropdown options
 */
 const numberOfHumSensors = _.range(1, 7);
 const createOptionDropdownHS = el => ({ key: el, text: `HS-${el}`, value: el });
 const dropdownOptionsHS = _.map(numberOfHumSensors, createOptionDropdownHS);
 export const propsDropdownHS = { options: dropdownOptionsHS };
