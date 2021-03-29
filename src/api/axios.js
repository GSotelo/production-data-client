import axios from "axios";

export const airPressureAPI = axios.create({
  baseURL: "/consumption/air-pressure"
});

export const colorChangeAPI = axios.create({
  baseURL: "/production/color-change"
});

export const electricityAirAPI = axios.create({
  baseURL: "/consumption/electricity-air"
});

export const axiosFreshPowder = axios.create({
  baseURL: "/consumption/fresh-powder"
});

export const humidityTemperatureAPI = axios.create({
  baseURL: "/consumption/humidity-temperature"
});

export const monitoringAPI = axios.create({
  baseURL: "/production/monitoring"
});

export const powderTypeAPI = axios.create({
  baseURL: "/consumption/powder-type"
});

export const sprayedPowderAPI = axios.create({
  baseURL: "/consumption/sprayed-powder"
});

