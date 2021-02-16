import { ReactComponent as Conveyor } from "../../../../assets/svg/conveyor.svg";
import { ReactComponent as LineDensity } from "../../../../assets/svg/lineDensity.svg";
import { ReactComponent as PowderGun } from "../../../../assets/svg/powderGun.svg";
import { ReactComponent as Product } from "../../../../assets/svg/product.svg";
import { ReactComponent as Runtime } from "../../../../assets/svg/runtime.svg";
import { ReactComponent as Speed } from "../../../../assets/svg/speed.svg";
import { ReactComponent as StatusAllrightBig } from "../../../../assets/svg/statusAllrightBig.svg";
import { ReactComponent as SystemUtility } from "../../../../assets/svg/systemUtility.svg";

export const propsSprayMode = {
  graph: "pie",
  icon: <PowderGun />,
  id: "spraying-mode",
  size: "small",
  title: "Spraying Mode",
  type: 1,
};

export const propsSystemStatus = {
  graph: "pie",
  icon: <StatusAllrightBig />,
  id: "system-status",
  size: "small",
  title: "System status",
  type: 1,
};

export const propsRunningHours = {
  graph: "cards",
  icon: <Runtime />,
  id: "running-hours",
  size: "small",
  title: "Running hours",
  type: 1
};

export const propsLineDensity = {
  graph: "bar",
  icon1: <LineDensity />,
  icon2: <SystemUtility />,
  id: "line-density",
  size: "medium",
  title: "Line density",
  type: 2
};

export const propsConveyorSpeed = {
  graph: "line",
  icon1: <Conveyor />,
  icon2: <Speed />,
  id: "conveyor-speed",
  size: "medium",
  title: "Conveyor speed",
  type: 2
};

export const propsCoatedSurface = {
  graph: "line",
  icon1: <PowderGun />,
  icon2: <Product />,
  id: "coated-surface",
  size: "large",
  title: "Coated surface",
  type: 2
};

export const propsLineDensityLayout = {
  colors: "#e37222",
  indexBy: "date",
  keys: ["Coated parts"],
  translateX: -30,
  xtitle: "Date",
  ytitle: "Total(%)",
  itemWidth:100,
};

export const propsLayoutConveyorSpeed = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Speed(m/h)"
};

export const propsLayoutCoatedSurface = {
  colors: "#86a315",
  enableArea: true,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Coated area (sqm)"
};

