import { ReactComponent as FreshPowder } from "../../../../../assets/svg/freshPowder.svg";
import { ReactComponent as FeedPowder } from "../../../../../assets/svg/powderFeed.svg";
import { ReactComponent as BigBag } from "../../../../../assets/svg/bigBag.svg";

/**
 * Graphcontainer
 * Properties for "Total fresh powder (TFP)"
 */
export const propsTFP = {
  icon: <FreshPowder />,
  title: "Total fresh powder",
  type: 1
}

/**
 * Graphcontainer
 * Properties for "Total fresh powder cards (TFPC)"
 */
export const propsTFPC = {
  icon: <FreshPowder />,
  title: "Total fresh powder",
  type: 1
}

/**
 * Graphcontainer
 * Properties for "Spectrum HD (SHD)"
 */
export const propsSHD = {
  icon: <FeedPowder />,
  title: "Spectrum HD",
  type: 1
}

/**
 * Graphcontainer
 * Properties for "Spectrum HD cards (SHDC)"
 */
export const propsSHDC = {
  icon: <FeedPowder />,
  title: "Spectrum HD",
  controlBarVisibility:false,
  type: 1
}

/**
 * Graphcontainer
 * Properties for "Big bag (BB)"
 */
export const propsBB = {
  icon: <BigBag />,
  title: "Big bag",
  type: 3
}

/**
 * Graphcontainer
 * Properties for "Bigbag cards (BBC)"
 */
export const propsBBC = {
  icon: <BigBag />,
  title: "Big Bag",
  controlBarVisibility:false,
  type: 1
}