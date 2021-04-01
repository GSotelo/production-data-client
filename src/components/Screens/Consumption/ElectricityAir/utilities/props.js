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