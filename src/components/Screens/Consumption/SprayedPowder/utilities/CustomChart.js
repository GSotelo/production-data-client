import React from "react";
import Line from "../../../../UI/Graph/Line/Line";

// Layout: Sprayed powder calculated total
const layoutSPCT = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Powder (kg)"
};

// Layout: Sprayed powder calculated recipe
const layoutSPCR = {
  colors: "#e37222",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Powder (kg)"
};

const CustomChart = ({ data, id }) => {
  let layout;

  // Use "id" to choose a layout
  if (id === "SPCT") layout = layoutSPCT;
  if (id === "SPCR") layout = layoutSPCR;

  return (
    <Line {...layout} data={data} />
  );
};

export default CustomChart;