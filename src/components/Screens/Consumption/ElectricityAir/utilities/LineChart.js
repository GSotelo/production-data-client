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
 * [layoutECT]: Layout for electricity consumption trend (location: top)
 */
const layoutECT = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Consumption (kW)"
};

/**
 * [layoutACT]: Layout for air consumption trend (location: bottom)
 */
const layoutACT = {
  colors: "#e37222",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Consumption (m3/h)"
};

const LineChart = ({ data, id }) => {
  let layout;

  /**
   * ECT: Electricity consumption (location: top)
   * ACT: Air consumption (location: bottom)
   */
  if (id === "ECT") layout = layoutECT;
  if (id === "ACT") layout = layoutACT;

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