import React from "react";
import Line from "../../../../UI/Graph/Line/Line";

// Layout: Total fresh powder trend
const layoutTFP = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Powder (kg)"
};

// Layout: Total spectrum hd trend
const layoutSHD = {
  colors: "#e37222",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Powder (kg)"
};

// Layout: Bigbag trend
const layoutBB = {
  colors: "#6f1c75",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Powder (kg)"
};

const CustomChart = ({ data, id }) => {
  let layout;

  // Use "id" to choose a layout
  if (id === "TFP") layout = layoutTFP;
  if (id === "SHD") layout = layoutSHD;
  if (id === "BB") layout = layoutBB;

  return (
    <Line {...layout} data={data} />
  );
};

export default CustomChart;