import { ReactComponent as PressureSensor } from "../../../../../assets/svg/pressureSensor.svg";

import _ from "lodash";
/**
 * [propsTitleBarAPT]: Title bar in "Air pressure sensor" (trend)
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarAPT = {
  icon: <PressureSensor />,
  title: "Air pressure sensor",
  type: 3
};

/**
 * [propsTitleBarAPD]: Title bar in "Air pressure sensor" (deck)
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarAPD = {
  icon: <PressureSensor />,
  title: "Air pressure sensor",
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
 * [propsDropdownAC]: Air comsumption - dropdown options
 */
 const numberOfAirSensors = _.range(1, 7);
 const createOptionDropdownAP = el => ({ key: el, text: `AP-${el}`, value: el });
 const dropdownOptionsAP = _.map(numberOfAirSensors, createOptionDropdownAP);
 export const propsDropdownAP = { options: dropdownOptionsAP };