import { ReactComponent as Recipe } from "../../../../../assets/svg/programEdit.svg";
import { ReactComponent as Total } from "../../../../../assets/svg/total.svg";

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
 * [propsTitleBarSPCRT]: Title bar in "Sprayed powder calculated recipe" (trend)
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarSPCRT = {
  icon: <Recipe />,
  title: "Sprayed powder calculated - Recipe",
  type: 3
};

/**
 * [propsTitleBarSPCTT]: Title bar in "Sprayed powder calculated total" (trend)
 * Title bar: Dropdown, icon and description text (type 1)
 */
export const propsTitleBarSPCTT = {
  icon: <Total />,
  title: "Sprayed powder calculated - Total",
  type: 1
};

/**
 * [propsTitleBarHSD]: Title bar in "Sprayed powder calculated recipe" (deck)
 * Title bar: Dropdown, icon and description text (type 3)
 */
export const propsTitleBarSPCRD = {
  icon: <Recipe />,
  title: "Per recipe",
  type: 3
};

/**
 * [propsTitleBarSPCTD]: Title bar in "Sprayed powder calculated total" (deck)
 * Title bar: Dropdown, icon and description text (type 1)
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
    description: "Resource not found"
  }
];

/**
 * [propsDropdownSPCR]: Sprayed powder calculted recipe - dropdown options
 */
// Text value should be customized
const numberOfRecipes = _.range(1, 256);
const createOptionDropdown = el => ({ key: el, text: `R${el}`, value: el });
const dropdownOptions = _.map(numberOfRecipes, createOptionDropdown);
export const propsDropdownSPCR = { options: dropdownOptions };

