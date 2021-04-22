import { ReactComponent as PowderBox } from "../../../../../assets/svg/freshPowder.svg";

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
export const propsDropdownCPT = {
  options: [
    { key: 1, text: "T-1", value: 1 },
    { key: 2, text: "T-2", value: 2 },
    { key: 3, text: "T-3", value: 3 },
    { key: 4, text: "T-4", value: 4 },
    { key: 5, text: "T-5", value: 5 }
  ]
};

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