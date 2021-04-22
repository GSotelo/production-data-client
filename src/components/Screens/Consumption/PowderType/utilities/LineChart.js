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
 * [layoutTopSPCTT]: Layout for "Consumption per powder type" trend (location: top)
 */
const layoutTopSPCTT = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Powder (kg)"
};

/**
 * [layoutBottomSPCTT]: Layout for "Consumption per powder type" trend (location: bottom)
 */
const layoutBottomSPCTT = {
  colors: "#e37222",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Powder (kg)"
};

const LineChart = ({ data, id }) => {
  let layout;

  /**
   * TopSPCTT: Consumption per powder type trend (location: top)
   * BottomSPCTT: Consumption per powder type trend (location: bottom)
   */
  if (id === "TopSPCTT") layout = layoutTopSPCTT;
  if (id === "BottomSPCTT") layout = layoutBottomSPCTT;

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