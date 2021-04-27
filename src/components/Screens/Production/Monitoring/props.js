import { ReactComponent as Conveyor } from "../../../../assets/svg/conveyor.svg";
import { ReactComponent as LineDensity } from "../../../../assets/svg/lineDensity.svg";
import { ReactComponent as PowderGun } from "../../../../assets/svg/powderGun.svg";
import { ReactComponent as Product } from "../../../../assets/svg/product.svg";
import { ReactComponent as Runtime } from "../../../../assets/svg/runtime.svg";
import { ReactComponent as Speed } from "../../../../assets/svg/speed.svg";
import { ReactComponent as StatusAllrightBig } from "../../../../assets/svg/statusAllrightBig.svg";
import { ReactComponent as SystemUtility } from "../../../../assets/svg/systemUtility.svg";

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
 * [propsTitleBarSM]: Title bar in "Spraying mode" (Pie)
 * Title bar: Icon and description text (type 1)
 */
export const propsTitleBarSM = {
  icon: <PowderGun />,
  title: "Spraying Mode",
  type: 1,
};

/**
 * [propsTitleBarSS]: Title bar in "System status" (Pie)
 * Title bar: Icon and description text (type 1)
 */
export const propsTitleBarSYS = {
  icon: <StatusAllrightBig />,
  title: "System status",
  type: 1,
};

/**
 * [propsTitleBarRH]: Title bar in "Running hours" (Deck)
 * Title bar: Icon and description text (type 1)
 */
export const propsTitleBarRH = {
  icon: <Runtime />,
  title: "Running hours",
  type: 1
};

/**
 * [propsTitleBarLD]: Title bar in "Line density" (Bar)
 * Title bar: Two icons and description text (type 2)
 */
export const propsTitleBarLD = {
  icon1: <LineDensity />,
  icon2: <SystemUtility />,
  title: "Line density",
  type: 2
};

/**
 * [propsTitleBarCVS]: Title bar in "Conveyor speed" (trend)
 * Title bar: Two icons and description text (type 2)
 */
export const propsTitleBarCVS = {
  icon1: <Conveyor />,
  icon2: <Speed />,
  title: "Conveyor speed",
  type: 2
};

/**
 * [propsTitleBarCS]: Title bar in "Coated surface" (trend)
 * Title bar: Two icons and description text (type 2)
 */
export const propsTitleBarCS = {
  icon1: <PowderGun />,
  icon2: <Product />,
  title: "Coated surface",
  type: 2
};
