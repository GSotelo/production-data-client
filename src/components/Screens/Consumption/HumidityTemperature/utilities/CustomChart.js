import React from "react";
import Line from "../../../../UI/Graph/Line/Line";

// Layout: Temperature sensor
const layoutTS = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Temperature (°C)"
};

// Layout: Humidity sensor
const layoutHS = {
  colors: "#e37222",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Humidity (%)"
};

const CustomChart = ({ data, id }) => {
  let layout;

  // Use "id" to choose a layout
  if (id === "TS") layout = layoutTS;
  if (id === "HS") layout = layoutHS;

  return (
    <Line {...layout} data={data} />
  );
};

export default CustomChart;