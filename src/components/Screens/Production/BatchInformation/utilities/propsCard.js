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

import whiteHome from "../../../../../assets/icons/whiteHome.ico";
import whiteBatch from "../../../../../assets/icons/whiteBatch.ico";
import whiteAverage from "../../../../../assets/icons/whiteAverage.ico";
import whiteSystemUtility from "../../../../../assets/icons/whiteSystemUtility.ico";
import whiteColor from "../../../../../assets/icons/whiteColor.ico";
import whiteConveyor from "../../../../../assets/icons/whiteConveyor.ico";
import whiteMeasure from "../../../../../assets/icons/whiteMeasure.ico";

export const propsSystemInformation = {
  title: "System information",
  icon: <img alt="home" src={whiteHome} />,
  data: [
    {
      icon: <CoatingTime />,
      description: "Coating time",
      key: "r1",
      units: "h",
      value: 14.3,
    },
    {
      icon: <Pause />,
      description: "Standby time",
      key: "r2",
      units: "h",
      value: 1.2,
    },
    {
      icon: <Maintenance />,
      description: "Downtime",
      key: "r3",
      units: "h",
      value: 1.9,
    }
  ]
};

export const propsEstimatedCosts = {
  title: "Estimated costs",
  icon: <img alt="average" src={whiteAverage} />,
  data: [
    {
      icon: <Powder />,
      description: "Powder",
      key: "r1",
      units: "€",
      showUnitsFirst: true,
      value: 373.17,
    },
    {
      icon: <Energy />,
      description: "Energy",
      key: "r2",
      units: "€",
      showUnitsFirst: true,
      value: 175.99,
    },
    {
      icon: <AirFlow />,
      description: "Air",
      key: "r3",
      units: "€",
      showUnitsFirst: true,
      value: 277.33,
    }
  ]
};

export const propsConsumption = {
  title: "Consumption",
  icon: <img alt="system-utility" src={whiteSystemUtility} />,
  data: [
    {
      icon: <Powder />,
      description: "Powder",
      key: "r1",
      units: "kg",
      value: 185,
    },
    {
      icon: <Energy />,
      description: "Energy",
      key: "r2",
      units: "kW",
      value: 650,
    },
    {
      icon: <AirFlow />,
      description: "Air",
      key: "r3",
      units: "m3",
      value: 17,
    }
  ]
};

export const propsColorChange = {
  title: "Color change",
  icon: <img alt="color" src={whiteColor} />,
  data: [
    {
      icon: <Runtime />,
      description: "Total time",
      key: "r1",
      units: "h",
      value: 6.3,
    },
    {
      multiIcon: [<Total />, <Color />],
      description: "Total number",
      key: "r2",
      units: "#",
      value: 12,
    },
    {
      multiIcon: [<PowderGun />, <Product />],
      description: "Coated area",
      key: "r3",
      units: "m2",
      value: 26,
    }
  ]
};

export const propsConveyorInformation = {
  title: "Conveyor information",
  icon: <img alt="conveyor" src={whiteConveyor} />,
  data: [
    {
      icon: <Stop />,
      description: "Stop time",
      key: "r1",
      units: "h",
      value: 2.5,
    },
    {
      icon: <ConveyorSpeed />,
      description: "Average speed",
      key: "r2",
      units: "m/min",
      value: 3,
    },
    {
      icon: <LineDensity />,
      description: "Throughput",
      key: "r3",
      units: "m",
      value: 17,
    }
  ]
};

export const propsInstrumentation = {
  title: "Instrumentation",
  icon: <img alt="sensors" src={whiteMeasure} />,
  data: [
    {
      icon: <Temperature />,
      description: "Temperature",
      key: "r1",
      units: "°C",
      value: 28,
    },
    {
      icon: <Humidity />,
      description: "Humidity booth",
      key: "r2",
      units: "%",
      value: 17,
    },
    {
      icon: <Humidity />,
      description: "Humidity storage",
      key: "r3",
      units: "%",
      value: 23,
    }
  ]
};

export const propsBatchInformation = {
  title: "Batch information",
  icon: <img alt="batch" src={whiteBatch} />,
  data: [
    {
      icon: <BatchNumber />,
      description: "Batch number",
      key: "r1",
      units: "",
      value: "BN1785295",
    },
    {
      icon: <Calendar />,
      description: "Date",
      key: "r2",
      units: "",
      value: "20/03/2021",
    },
    {
      icon: <Runtime />,
      description: "Start time",
      key: "r3",
      units: "",
      value: "08:10:47 AM",
    },
    {
      icon: <Runtime />,
      description: "Stop time",
      key: "r4",
      units: "",
      value: "15:37:15 PM",
    },
    {
      icon: <Runtime />,
      description: "Duration time",
      key: "r5",
      units: "",
      value: "7h 17min",
    },
    {
      icon: <Color />,
      description: "Color code",
      key: "r6",
      units: "",
      value: "RAL1013",
    },
    {
      icon: <Product />,
      description: "Product",
      key: "r7",
      units: "",
      value: "Flat panel",
    },
    {
      icon: <Total />,
      description: "Coated products",
      key: "r8",
      units: "",
      value: 150,
    }
  ]
};
