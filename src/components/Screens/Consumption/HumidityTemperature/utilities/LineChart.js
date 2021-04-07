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
 * [layoutTST]: Layout for temperature sensor trend (location: top)
 */
const layoutTST = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Temperature (°C)"
};

/**
 * [layoutTST]: Layout for humidity sensor trend (location: bottom)
 */
const layoutHST = {
  colors: "#e37222",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Humidity (%)"
};

const LineChart = ({ data, id }) => {
  let layout;

  /**
   * TST: Temperature sensor trend (location: top)
   * HST: Humidity sensor trend (location: bottom)
   */
  if (id === "TST") layout = layoutTST;
  if (id === "HST") layout = layoutHST;

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
  const lineData = useDefaultData ? data : defaultLineData;

  return (
    <Line {...layout} data={lineData} />
  );
};

export default LineChart;