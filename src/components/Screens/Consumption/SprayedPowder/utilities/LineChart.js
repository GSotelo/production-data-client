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
 * [layoutSPCTT]: Layout for temperature sensor trend (location: top)
 */
const layoutSPCTT = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Powder (kg)"
};

/**
 * [layoutTST]: Layout for humidity sensor trend (location: bottom)
 */
const layoutSPCRT = {
  colors: "#e37222",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Powder (kg)"
};

const LineChart = ({ data, id }) => {
  let layout;

  /**
   * TST: Temperature sensor trend (location: top)
   * SPCRT: Humidity sensor trend (location: bottom)
   */
  if (id === "SPCTT") layout = layoutSPCTT;
  if (id === "SPCRT") layout = layoutSPCRT;

  const defaultLineData = [
    {
      id,
      data: [{ x: new Date().toISOString(), y: 0 }]
    }
  ];

  /**
  *  If express server provides no data, then use the default one.
  */
  const useServerData = typeof data[0].data != "undefined" && data[0].data.length > 0;
  const lineData = useServerData ? data : defaultLineData;

  return (
    <Line {...layout} data={lineData} />
  );
};

export default LineChart;