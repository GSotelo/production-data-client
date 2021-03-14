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

  const defaultLineData = [
    {
      id,
      data: [{ x: new Date().toISOString(), y: 0 }]
    }
  ];

  /**
   *  If express server provides no data, then use the default one.
   *  If no default value, the line chart crashes because
   *  of the time scale defined for the x-axis
   */
  const lineData = data[0].data.length > 0 ? data : defaultLineData;

  return (
    <Line {...layout} data={lineData} />
  );
};

export default CustomChart;