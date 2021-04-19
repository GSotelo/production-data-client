import { ReactComponent as Humidity } from "../../../../../assets/svg/humidity.svg";
import { ReactComponent as Temperature } from "../../../../../assets/svg/temperature.svg";

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
 * [propsDropdownTS]: Temperature sensor - dropdown options
 */
export const propsDropdownTS = {
  options: [
    { key: 1, text: "TS-1", value: 1 },
    { key: 2, text: "TS-2", value: 2 },
    { key: 3, text: "TS-3", value: 3 },
    { key: 4, text: "TS-4", value: 4 },
    { key: 5, text: "TS-5", value: 5 }
  ]
};

/**
 * [propsDropdownHS]: Humidity sensor - dropdown options
 */
export const propsDropdownHS = {
  options: [
    { key: 1, text: "HS-1", value: 1 },
    { key: 2, text: "HS-2", value: 2 },
    { key: 3, text: "HS-3", value: 3 },
    { key: 4, text: "HS-4", value: 4 },
    { key: 5, text: "HS-5", value: 5 }
  ]
};

