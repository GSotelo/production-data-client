import React from "react";
import Line from "../../../../UI/Graph/Line/Line";

/**
 * General notes:
 * The following objects are used to
 * customize graph templates (Line, 
 * Bar, Pie), which can be found in the 
 * UI folder. The graph templates are 
 * based on nivo library ;).
 */

/**
 * [layoutTFP]: Layout for total fresh powder trend
 */
const layoutTFP = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Powder (kg)"
};

/**
 * [layoutTFP]: Layout for Spectrum HD trend
 */
const layoutSHD = {
  colors: "#e37222",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Powder (kg)"
};

/**
 * [layoutTFP]: Layout for bigbag trend
 */
const layoutBB = {
  colors: "#6f1c75",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Powder (kg)"
};

/**
 * [CustomChart]: Creates a line chart using different layouts (see above)
 * [data]: Data for line chart
 * [id]: It's used to switch between layouts
 */
const LineChart = ({ data, id }) => {
  let layout;

  /**
   * TFPT: Total fresh powder trend
   * SHDT: Spectrum HD trend 
   * BBT: Bigbag feeder trend
   */
  if (id === "TFPT") layout = layoutTFP;
  if (id === "SHDT") layout = layoutSHD;
  if (id === "BBT") layout = layoutBB;

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

export default LineChart;