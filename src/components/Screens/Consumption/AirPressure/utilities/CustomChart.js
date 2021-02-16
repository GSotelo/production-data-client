import React from "react";
import Line from "../../../../UI/Graph/Line/Line";

// Layout: Air pressure sensor 1
const layoutAP1 = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Air pressure (bar)"
};

// Layout: Air pressure sensor 2
const layoutAP2 = {
  colors: "#e37222",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Air pressure (bar)"
};

const CustomChart = ({ data, id }) => {
  let layout;

  // Use "id" to choose a layout
  if (id === "AP1") layout = layoutAP1;
  if (id === "AP2") layout = layoutAP2;

  return (
    <Line {...layout} data={data} />
  );
};

export default CustomChart;