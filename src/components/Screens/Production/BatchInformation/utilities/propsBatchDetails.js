import { ReactComponent as AirFlow } from "../../../../../assets/svg/airFlow.svg";
import { ReactComponent as BatchNumber } from "../../../../../assets/svg/program.svg";
import { ReactComponent as Calendar } from "../../../../../assets/svg/calendarMonth.svg";
import { ReactComponent as CoatingTime } from "../../../../../assets/svg/chargeMetallic.svg";
import { ReactComponent as ConveyorSpeed } from "../../../../../assets/svg/speed.svg";
import { ReactComponent as Color } from "../../../../../assets/svg/color.svg";
import { ReactComponent as Energy } from "../../../../../assets/svg/energy.svg";
import { ReactComponent as Humidity } from "../../../../../assets/svg/humidity.svg";
import { ReactComponent as LineDensity } from "../../../../../assets/svg/lineDensity.svg";
import { ReactComponent as Maintenance } from "../../../../../assets/svg/maintenance.svg";
import { ReactComponent as Pause } from "../../../../../assets/svg/pause.svg";
import { ReactComponent as Powder } from "../../../../../assets/svg/freshPowder.svg";
import { ReactComponent as PowderGun } from "../../../../../assets/svg/powderGun.svg";
import { ReactComponent as Product } from "../../../../../assets/svg/product.svg";
import { ReactComponent as Runtime } from "../../../../../assets/svg/runtime.svg";
import { ReactComponent as Stop } from "../../../../../assets/svg/stop.svg";
import { ReactComponent as Temperature } from "../../../../../assets/svg/temperature.svg";
import { ReactComponent as Total } from "../../../../../assets/svg/total.svg";
import { ReactComponent as PressureSensor } from "../../../../../assets/svg/pressureSensor.svg";

import whiteHome from "../../../../../assets/icons/whiteHome.ico";
import whiteBatch from "../../../../../assets/icons/whiteBatch.ico";
import whiteAverage from "../../../../../assets/icons/whiteAverage.ico";
import whiteSystemUtility from "../../../../../assets/icons/whiteSystemUtility.ico";
import whiteColor from "../../../../../assets/icons/whiteColor.ico";
import whiteConveyor from "../../../../../assets/icons/whiteConveyor.ico";
import whiteMeasure from "../../../../../assets/icons/whiteMeasure.ico";

/**
 * The following props (specifically "basedData") are going 
 * to be updated with data from the server.
 */
// Base props: System information
export const basePropsSI = {
  title: "System information",
  icon: <img alt="home" src={whiteHome} />,
  baseData: [
    {
      icon: <CoatingTime />,
      key: "r1",
    },
    {
      icon: <Pause />,
      key: "r2",
    },
    {
      icon: <Maintenance />,
      key: "r3",
    }
  ]
};

// Base props: Estimated costs
export const basePropsEC = {
  title: "Estimated costs",
  icon: <img alt="average" src={whiteAverage} />,
  baseData: [
    {
      icon: <Powder />,
      key: "r1",
      showUnitsFirst: true,
    },
    {
      icon: <Energy />,
      key: "r2",
      showUnitsFirst: true,
    },
    {
      icon: <AirFlow />,
      key: "r3",
      showUnitsFirst: true,
    }
  ]
};

// Base props: Total consumption
export const basePropsTC = {
  title: "Total consumption",
  icon: <img alt="system-utility" src={whiteSystemUtility} />,
  baseData: [
    {
      icon: <Powder />,
      key: "r1",

    },
    {
      icon: <Energy />,
      key: "r2",

    },
    {
      icon: <AirFlow />,
      key: "r3",
    }
  ]
};

// Base props: Color change
export const basePropsCC = {
  title: "Color change",
  icon: <img alt="color" src={whiteColor} />,
  baseData: [
    {
      icon: <Runtime />,
      key: "r1",
    },
    {
      multiIcon: [<Total />, <Color />],
      key: "r2",
    },
    {
      multiIcon: [<PowderGun />, <Product />],
      key: "r3",
    }
  ]
};

// Base props: Conveyor information
export const basePropsCI = {
  title: "Conveyor information",
  icon: <img alt="conveyor" src={whiteConveyor} />,
  baseData: [
    {
      icon: <Stop />,
      key: "r1",
    },
    {
      icon: <ConveyorSpeed />,
      key: "r2",
    },
    {
      icon: <LineDensity />,
      key: "r3",
    }
  ]
};

// Base props: Instrumentation
export const basePropsIT = {
  title: "Instrumentation",
  icon: <img alt="sensors" src={whiteMeasure} />,
  baseData: [
    {
      icon: <Temperature />,
      key: "r1",
    },
    {
      icon: <Humidity />,
      key: "r2",
    },
    {
      icon: <PressureSensor />,
      key: "r3",
    }
  ]
};

// Base props: Batch information (large card on the left side)
export const basePropsBI = {
  title: "Batch information",
  icon: <img alt="batch" src={whiteBatch} />,
  baseData: [
    {
      icon: <BatchNumber />,
      key: "r1",
      units: "",
    },
    {
      icon: <Calendar />,
      key: "r2",
      units: "",
    },
    {
      icon: <Runtime />,
      key: "r3",
    },
    {
      icon: <Runtime />,
      key: "r4",
    },
    {
      icon: <Runtime />,
      key: "r5",
    },
    {
      icon: <Color />,
      key: "r6",
    },
    {
      icon: <Product />,
      key: "r7",
    },
    {
      icon: <Total />,
      key: "r8",
    }
  ]
};
