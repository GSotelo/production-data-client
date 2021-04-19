import { ReactComponent as PressureSensor } from "../../../../../assets/svg/pressureSensor.svg";

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
 * [propsDropdownAP]: Dropdown options
 */
export const propsDropdownAP = {
  options : [
    { key: 1, text: "AP-1", value: 1 },
    { key: 2, text: "AP-2", value: 2 },
    { key: 3, text: "AP-3", value: 3 },
    { key: 4, text: "AP-4", value: 4 },
    { key: 5, text: "AP-5", value: 5 }
  ]
};