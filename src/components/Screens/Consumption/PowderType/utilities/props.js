import { ReactComponent as PowderBox } from "../../../../../assets/svg/freshPowder.svg";
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
 * [propsTitleBarCPTT]: Title bar in "Consumption per powder type" (trend)
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarCPTT = {
  icon: <PowderBox />,
  title: "Consumption per powder type",
  type: 3
};

/**
 * [propsToasterDanger]: Alert configuration if API request fails
 */
export const propsToasterDanger = [
  "Error",
  {
    description: "Resource not found"
  }
];

/**
 * [propsDropdownCPT]: Consumption per powder type - dropdown options
 */
const numberOfPowderTypes = _.range(1, 256);
const createOptionDropdown = el => ({ key: el, text: `T${el}`, value: el });
const dropdownOptionsCPT = _.map(numberOfPowderTypes, createOptionDropdown);
export const propsDropdownCPT = { options: dropdownOptionsCPT };

/**
 * [propsTableCPT]: Table for all powder types
 */
export const propsTableCPT = {
  columns: [
    {
      field: "type",
      headerName: "Type",
      sortable: true,

    },
    {
      field: "consumption",
      headerName: "Kilograms",
      sortable: true,
      type: "number",
    }
  ],
  pageSize: 14
};