import React from "react";

export const Monitoring = React.lazy(() => import("../../Screens/Production/Monitoring/Monitoring"));
export const ColorChange = React.lazy(() => import("../../Screens/Production/ColorChange/ColorChange"));
export const BatchInformation = React.lazy(() => import("../../Screens/Production/BatchInformation/BatchInformation"));
export const SprayedPowder = React.lazy(() => import("../../Screens/Consumption/SprayedPowder/SprayedPowder"));
export const FreshPowder = React.lazy(() => import("../../Screens/Consumption/FreshPowder/FreshPowder"));
export const PowderType = React.lazy(() => import("../../Screens/Consumption/PowderType/PowderType"));
export const ElectricityAir = React.lazy(() => import("../../Screens/Consumption/ElectricityAir/ElectricityAir"));
export const HumidityTemperature = React.lazy(() => import("../../Screens/Consumption/HumidityTemperature/HumidityTemperature"));
export const AirPressure = React.lazy(() => import("../../Screens/Consumption/AirPressure/AirPressure"));
export const AverageCost = React.lazy(() => import("../../Screens/Calculator/AverageCost/AverageCost"));
export const CoatmasterFlex = React.lazy(() => import("../../Screens/Quality/CoatmasterFlex/CoatmasterFlex"));
export const Coatmaster3D = React.lazy(() => import("../../Screens/Quality/Coatmaster3D/Coatmaster3D"));
export const Performance = React.lazy(() => import("../../Screens/Efficiency/Performance/Performance")); 