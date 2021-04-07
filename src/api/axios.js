import axios from "axios";

export const axiosAirPressure = axios.create({
  baseURL: "/consumption/air-pressure"
});

export const colorChangeAPI = axios.create({
  baseURL: "/production/color-change"
});

export const axiosElectricityAir = axios.create({
  baseURL: "/consumption/electricity-air"
});

export const axiosFreshPowder = axios.create({
  baseURL: "/consumption/fresh-powder"
});

export const axiosHumidityTemperature = axios.create({
  baseURL: "/consumption/humidity-temperature"
});

export const monitoringAPI = axios.create({
  baseURL: "/production/monitoring"
});

export const axiosPowderType = axios.create({
  baseURL: "/consumption/powder-type"
});

export const sprayedPowderAPI = axios.create({
  baseURL: "/consumption/sprayed-powder"
});

