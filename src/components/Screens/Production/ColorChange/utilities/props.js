import { ReactComponent as Color } from "../../../../../assets/svg/color.svg";
import { ReactComponent as Speed } from "../../../../../assets/svg/speed.svg";
import { ReactComponent as Runtime } from "../../../../../assets/svg/runtime.svg";
import { ReactComponent as Off } from "../../../../../assets/svg/off.svg";

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
 * [propsCCQL]: Title bar in "Quickest/Longest color change" (bars)
 * Title bar: Two icons and description text (type 2)
 */
export const propsCCQL = {
  icon1: <Color />,
  icon2: <Speed />,
  title: "Quickest / Longest color change",
  type: 2
};

/**
 * [propsCCD]: Title bar in "Color change duration" (trend)
 * Title bar: Two icons and description text (type 2)
 */
export const propsCCD = {
  icon1: <Color />,
  icon2: <Runtime />,
  title: "Color change duration",
  type: 2
};

/**
 * [propsCCAC]: Title bar in "Color changes aborted" (card)
 * Title bar: Two icons and description text (type 2)
 */
export const propsCCAC = {
  icon1: <Color />,
  icon2: <Off />,
  title: "Color changes aborted",
  type: 2
};

/**
 * [propsCCAT]: "Color changes aborted" (table)
 */
export const propsCCAT = {
  columns: [
    {
      field: "date",
      headerName: "Date",
      sortable: true

    },
    {
      field: "pressure",
      headerName: "Pressure (bar)",
      sortable: true,
      type: "number"

    }
  ],

  pageSize: 5
};
