import React from "react";
import Line from "../../../../UI/Graph/Line/Line";

/**
 * General notes:
 * The following objects are used to
 * customize graph templates (Line, 
 * Bar, Pie), which can be found in the 
 * UI folder. The graph templates are 
 * based on nivo library ;)
 */

/**
 * [layoutCST]: Layout for coated surface trend
 */
const layoutCST = {
  colors: "#86a315",
  enableArea: true,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Coated surface (sqm)"
};

/**
 * [layoutCVST]: Layout for conveyor speed trend
 */
const layoutCVST = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Speed(m/h)"
};

const LineChart = ({ data, id }) => {
  let layout;

  /**
   * CST: Coated surface layout
   * CVST: Conveyor speed layout
   */
  if (id === "CS") layout = layoutCST;
  if (id === "CVS") layout = layoutCVST;

  const defaultLineData = [
    {
      id,
      data: [{ x: new Date().toISOString(), y: 0 }]
    }
  ];

  /**
  *  If express server provides no data, then use the default one.
  */
  const noDefaultData = typeof data[0].data != "undefined" && data[0].data.length > 0;
  const lineData = noDefaultData ? data : defaultLineData;

  return (
    <Line {...layout} data={lineData} />
  );
};

export default LineChart;