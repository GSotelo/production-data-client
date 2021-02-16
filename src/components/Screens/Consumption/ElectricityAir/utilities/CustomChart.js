import React from "react";
import Line from "../../../../UI/Graph/Line/Line";

// Layout: Electricity consumption
const layoutEC = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Consumption (kW)"
};

// Layout: Air consumption
const layoutAC = {
  colors: "#e37222",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Consumption (m3/h)"
};

const CustomChart = ({ data, id }) => {
  let layout;

  // Use "id" to choose a layout
  if (id === "EC") layout = layoutEC;
  if (id === "AC") layout = layoutAC;

  return (
    <Line {...layout} data={data} />
  );
};

export default CustomChart;