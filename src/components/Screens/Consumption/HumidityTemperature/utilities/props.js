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
 * [propsDropdownAP]: Temperature sensor - dropdown options
 */
export const propsDropdownTS = {
  options: [
    { key: 1, text: "TS1", value: 1 },
    { key: 2, text: "TS2", value: 2 },
    { key: 3, text: "TS3", value: 3 },
    { key: 4, text: "TS4", value: 4 },
    { key: 5, text: "TS5", value: 5 }
  ]
};

/**
 * [propsDropdownAP]: Humidity sensor - dropdown options
 */
export const propsDropdownHS = {
  options: [
    { key: 1, text: "HS1", value: 1 },
    { key: 2, text: "HS2", value: 2 },
    { key: 3, text: "HS3", value: 3 },
    { key: 4, text: "HS4", value: 4 },
    { key: 5, text: "HS5", value: 5 }
  ]
};

