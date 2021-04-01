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
 * [layoutTFP]: Layout for consumption per powder type (location: top)
 */
const layoutTopCPT = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Consumption (kg)"
};

/**
 * [layoutTFP]: Layout for consumption per powder type (location: bottom)
 */
const layoutBottomCPT = {
  colors: "#e37222",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Consumption (kg)"
};

const LineChart = ({ data, id }) => {
  let layout;

  /**
   * topCPT: Consumption per powder type (location: top)
   * bottomCPT: Consumption per powder type (location: bottom)
   */
  if (id === "TopCPT") layout = layoutTopCPT;
  if (id === "BottomCPT") layout = layoutBottomCPT;

  const defaultLineData = [
    {
      id,
      data: [{ x: new Date().toISOString(), y: 0 }]
    }
  ];

 /**
   *  If express server provides no data, then use the default one.
   */
  
  const useDefaultData = typeof data[0].data != "undefined" && data[0].data.length > 0;
  const lineData = useDefaultData? data : defaultLineData;

  return (
    <Line {...layout} data={lineData} />
  );
};

export default LineChart;