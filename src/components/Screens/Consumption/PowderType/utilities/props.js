import { ReactComponent as FreshPowder } from "../../../../../assets/svg/freshPowder.svg";

/**
 * General notes:
 * The following objects are used to give proper 
 * customization to the title bar contained in the 
 * "GraphContainer". Properties for table element
 * are provided here too. I do this in a separate file 
 * because I don't want to populate the main flow 
 * of the screen with configuration data for inner
 * components. The title bar element can receive 
 * icons, description text, and dropdown elements 
 * based on the provided type
 */

/**
 * [propsTitleBarCPT]: Title bar in "consumption per powder type" (trends)
 * Title bar: Dropdpwn, icon and description text (type 3)
 */
export const propsTitleBarCPT = {
  icon: <FreshPowder />,
  title: "Consumption per powder type",
  type: 3
};

/**
 * [propsTableCPT]: Table for all powder types
 */
export const propsTableCPT = {
  columns: [
    {
      field: "type",
      headerName: "Powder type",
      sortable: true,
      width: "50%"
    },
    {
      field: "consumption",
      headerName: "Consumption (kg)",
      sortable: true,
      type: "number",
      width: "50%"
    }
  ],
  pageSize: 14
};
