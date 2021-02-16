import React from "react";
import Line from "../../../../UI/Graph/Line/Line";

// Layout: Consumption per powder type 1
const layoutCPT1 = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Consumption (kg)"
};

// Layout: Consumption per powder type 2
const layoutCPT2 = {
  colors: "#e37222",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Consumption (kg)"
};

const CustomChart = ({ data, id }) => {
  let layout;

  // Use "id" to choose a layout
  if (id === "CPT1") layout = layoutCPT1;
  if (id === "CPT2") layout = layoutCPT2;

  return (
    <Line {...layout} data={data} />
  );
};

export default CustomChart;