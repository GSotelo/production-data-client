import { ReactComponent as BigBag } from "../../../../../assets/svg/bigBag.svg";
import { ReactComponent as FeedPowder } from "../../../../../assets/svg/powderFeed.svg";
import { ReactComponent as FreshPowder } from "../../../../../assets/svg/freshPowder.svg";

/**
 * General notes:
 * The following objects are used to give proper 
 * customization to the title bar contained in the 
 * "GraphContainer". I do this in a separate file 
 * because I don't want to populate the main flow 
 * of the screen with configuration data for inner
 * components. The title bar element can receive 
 * icons, description text, and dropdown elements 
 * based on the provided type
 */

/**
 * [propsTitleBarTFPT]: Title bar in total fresh powder trend
 * Title bar: Icon and description text (type 1)
 */
export const propsTitleBarTFPT = {
  icon: <FreshPowder />,
  title: "Total fresh powder",
  type: 1
}

/**
 * [propsTitleBarTFPD]: Title bar in total fresh powder deck
 * Title bar: Icon and description text (type 1)
 */
export const propsTitleBarTFPD = {
  icon: <FreshPowder />,
  title: "Total fresh powder",
  type: 1
};

/**
 * [propsTitleBarSHDT]: Title bar in spectrum hd trend
 * Title bar: Icon and description text (type 1)
 */
export const propsTitleBarSHDT = {
  icon: <FeedPowder />,
  title: "Spectrum HD",
  type: 1
};

/**
 * [propsTitleBarSHDD]: Title bar in spectrum hd deck
 * Title bar: Icon and description text (type 1)
 */
export const propsTitleBarSHDD = {
  icon: <FeedPowder />,
  title: "Spectrum HD",
  controlBarVisibility: false,
  type: 1
};

/**
 * [propsTitleBarBBT]: Title bar in bigbag trend
 * Title bar: Icon, description text and dropdown (type 3)
 */
export const propsTitleBarBBT = {
  icon: <BigBag />,
  title: "Big bag",
  type: 3
};

/**
 * [propsTitleBarBBD]: Title bar in bigbag deck
 * Title bar: Icon and description text (type 1)
 */
export const propsTitleBarBBD = {
  icon: <BigBag />,
  title: "Big Bag",
  controlBarVisibility: false,
  type: 1
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
 * [propsDropdownBB]: Bigbag - dropdown options
 */
 export const propsDropdownBB = {
  options: [
    { key: 1, text: "BB-1", value: 1 },
    { key: 2, text: "BB-2", value: 2 },
    { key: 3, text: "BB-3", value: 3 },
    { key: 4, text: "BB-4", value: 4 },
    { key: 5, text: "BB-5", value: 5 }
  ]
};