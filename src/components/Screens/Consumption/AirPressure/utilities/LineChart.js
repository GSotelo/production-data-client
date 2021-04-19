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
 * [layoutTopAPT]: Layout for air pressure sensor trend (location: top)
 */
const layoutTopAPT = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Air pressure (bar)"
};

/**
 * [layoutBottomAPT]: Layout for air pressure sensor trend (location: bottom)
 */
const layoutBottomAPT = {
  colors: "#e37222",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Air pressure (bar)"
};

const LineChart = ({ data, id }) => {
  let layout;

  /**
   * TopAPT: Air pressure sensor trend (location: top)
   * BottomAPT: Air pressure sensor trend (location: bottom)
   */
  if (id === "TopAPT") layout = layoutTopAPT;
  if (id === "BottomAPT") layout = layoutBottomAPT;

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