import React from "react";

import {
  Monitoring,
  ColorChange,
  BatchInformation,
  SprayedPowder,
  FreshPowder,
  PowderType,
  ElectricityAir,
  HumidityTemperature,
  AirPressure,
  AverageCost,
  CoatmasterFlex,
  Coatmaster3D,
  Performance

} from "./lazyLoad";


const productionCategory = [
  {
    key: "production-r1",
    path: "/production/monitoring",
    screen: <Monitoring />
  },
  {
    key: "production-r2",
    path: "/production/color_change",
    screen: <ColorChange />
  },
  {
    key: "production-r3",
    path: "/production/batch_information",
    screen: <BatchInformation />
  }
];

const consumptionCategory = [
  {
    key: "consumption-r1",
    path: "/consumption/sprayed_powder",
    screen: <SprayedPowder />
  },
  {
    key: "consumption-r2",
    path: "/consumption/fresh_powder",
    screen: <FreshPowder />
  },
  {
    key: "consumption-r3",
    path: "/consumption/powder_type",
    screen: <PowderType />
  },
  {
    key: "consumption-r4",
    path: "/consumption/electricity_air",
    screen: <ElectricityAir />
  },
  {
    key: "consumption-r5",
    path: "/consumption/humidity_temperature",
    screen: <HumidityTemperature />
  },
  {
    key: "consumption-r6",
    path: "/consumption/air_pressure",
    screen: <AirPressure />
  }
];

const calculatorCategory = [
  {
    key: "calculator-r1",
    path: "/calculator/average_costs",
    screen: <AverageCost />
  }
];

const qualityCategory = [
  {
    key: "quality-r1",
    path: "/quality/coatmaster_flex",
    screen: <CoatmasterFlex />
  },
  {
    key: "quality-r2",
    path: "/quality/coatmaster_3d",
    screen: <Coatmaster3D />
  }
];

const efficiencyCategory = [
  {
    key: "efficiency-r1",
    path: "/efficiency/performance",
    screen: <Performance />
  }
];

const routeCategories = [
  productionCategory,
  consumptionCategory,
  calculatorCategory,
  qualityCategory,
  efficiencyCategory
];

export default routeCategories;